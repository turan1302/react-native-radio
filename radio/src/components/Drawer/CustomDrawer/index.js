import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from "react-native";
import { inject, observer } from "mobx-react";
import MusicControl from "react-native-music-control";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import Feather from "react-native-vector-icons/Feather";
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from "react-native-alert-notification";


@inject("AuthStore")
@observer

export default class CustomDrawer extends Component {

  constructor(props) {
    super(props);
  }

  logOut = ()=>{
    MusicControl.resetNowPlaying();
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Başarılı",
      textBody: "Çıkış işleminiz gerçekleştiriliyor. Lütfen bekleyiniz...",
      autoClose : 2000
    });
    setTimeout(()=>{
      this.props.navigation.toggleDrawer();
      this.props.AuthStore.removeToken();
    },2000);
  }

  render() {
    const {navigation} = this.props;

    return (
        <View style={styles.container}>
          <TouchableOpacity onPress={()=>navigation.navigate("HomeNavigator")} style={styles.button_area}>
            <View style={styles.button_container}>
              <Ionicons name={"home"} color={"black"} size={20}/>
              <Text style={styles.button_text}>Anasayfa</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate("NewRadio")} style={styles.button_area}>
            <View style={styles.button_container}>
              <Ionicons name={"radio"} color={"black"} size={20}/>
              <Text style={styles.button_text}>Yeni Radyo Ekle</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate("Profile")} style={styles.button_area}>
            <View style={styles.button_container}>
              <Feather name={"user"} color={"black"} size={20}/>
              <Text style={styles.button_text}>Profilim</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.logOut} style={styles.button_area}>
            <View style={styles.button_container}>
              <MaterialIcons name={"logout"} color={"black"} size={20}/>
              <Text style={styles.button_text}>Çıkış Yap</Text>
            </View>
          </TouchableOpacity>
        </View>
    )
  }
}
