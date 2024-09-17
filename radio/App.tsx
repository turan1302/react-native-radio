import React, { Component } from 'react'
import { Alert, BackHandler, Platform, SafeAreaView } from "react-native";
import Routes from "./src/routes";
import { checkMultiple, openSettings, PERMISSIONS, requestMultiple } from "react-native-permissions";
import NetInfo from "@react-native-community/netinfo";
import { Provider } from "mobx-react";
import Store from "./src/store";
import { AlertNotificationRoot } from "react-native-alert-notification";


export default class App extends Component {

  isConnected = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected==false){
        Alert.alert('Bir Ricam Var', 'İnternete Bağlanır Mısın :)', [
          {text: 'Tamamdır', onPress: () => BackHandler.exitApp()},
        ]);
      }
    });
  }

  componentDidMount() {

    this.isConnected();

    const RecordAudio = Platform.select({
      android : PERMISSIONS.ANDROID.RECORD_AUDIO
    });

    const ForegroundService = Platform.select({
      android : PERMISSIONS.ANDROID.FOREGROUND_SERVICE
    });

    checkMultiple([RecordAudio,ForegroundService]).then((res)=>{
      if (res[RecordAudio]==="denied" || res[ForegroundService]){
        requestMultiple([RecordAudio,ForegroundService]).then((req)=>{
          if ((req[RecordAudio]==="denied" || req[RecordAudio]==="blocked") || req[ForegroundService]==="denied" || req[ForegroundService]==="blocked"){
            openSettings().catch(err=>console.log(err));
          }
        }).catch((err)=>{
          console.log(err);
        })
      }
    }).catch((err)=>{
      console.log(err);
    })

  }

  render() {
    return (
      <AlertNotificationRoot>
        <Provider {...Store}>
          <SafeAreaView style={{flex : 1}}>
            <Routes/>
          </SafeAreaView>
        </Provider>
      </AlertNotificationRoot>

    )
  }
}
