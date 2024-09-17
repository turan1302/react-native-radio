import { action, makeAutoObservable, observable } from "mobx";
import cryptoJS from "react-native-crypto-js";
import jwtDecode from "jwt-decode"; // "jwt-decode" doğru import
import sign from "jwt-encode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as NavigationService from "../NavigationService";
import RestClient from "../RestAPI/RestClient";
import AppUrl from "../RestAPI/AppUrl";

class AuthStore {
  appState = null;

  constructor() {
    makeAutoObservable(this, {
      appState: observable,
      saveToken: action,
      getToken: action,
      removeToken: action,
      redirectControl: action,
      tokenControl: action,
    });
  }

  saveToken = async (appState) => {
    try {
      // JSON.stringify ile stringleştirilmiş appState'yi şifreleme
      const encryptedState = cryptoJS.AES.encrypt(JSON.stringify(appState), "radio").toString();
      await AsyncStorage.setItem("appState", encryptedState);
      this.appState = appState;
    } catch (e) {
      console.log("Error saving token:", e);
    }
  };

  getAccessToken = async () => {
    try {
      const appStateData = await AsyncStorage.getItem("appState");

      if (appStateData) {
        const bytes = cryptoJS.AES.decrypt(appStateData, "radio");
        const originalText = bytes.toString(cryptoJS.enc.Utf8);
        this.appState = JSON.parse(originalText); // JSON.parse ile stringi object'e dönüştürme
      } else {
        this.appState = null;
      }
    } catch (e) {
      console.log("Error retrieving access token:", e);
    }
  };

  getToken = async () => {
    try {
      await this.getAccessToken();
      this.redirectControl();
    } catch (e) {
      console.log("Error getting token:", e);
    }
  };

  removeToken = async () => {
    try {
      await AsyncStorage.removeItem("appState");
      this.appState = null;
      this.redirectControl();
    } catch (e) {
      console.log("Error removing token:", e);
    }
  };

  redirectControl = () => {
    if (!this.appState) {
      NavigationService.navigate("Login");
      return false;
    } else {
      this.tokenControl().then((result) => {
        if (result) {
          NavigationService.navigate("Welcome");
        }
      });
    }
  };

  tokenControl = async () => {
    try {
      await this.getAccessToken();
      const token = this.appState?.user?.access_token;

      if (!token) {
        await this.removeToken();
        return false;
      }

      const res = await RestClient.getRequest(AppUrl.check, {
        headers: {
          "Authorization": "Bearer " + token,
        },
      });

      const result = res.data;
      if (result.isLoggedIn !== true) {
        await this.removeToken();
        return false;
      } else {
        let userData = {
          id: result.data.id,
          name: result.data.name,
          email: result.data.email,
          url: result.data.url,
          channel: result.data.channel,
          access_token: result.data.access_token,
        };

        let appState = {
          isLoggedIn: true,
          user: userData,
        };

        await this.saveToken(appState);
        return true;
      }
    } catch (err) {
      console.log("Token control error:", err);
      await this.removeToken();
      return false;
    }
  };
}

export default new AuthStore();
