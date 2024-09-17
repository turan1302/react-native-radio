import React, { Component } from 'react'
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { inject, observer } from "mobx-react";
import Entypo from "react-native-vector-icons/Entypo";
import styles from "./styles";

@inject("AuthStore")
@observer

export default class Splash extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.isAuthenticated();
  }
  isAuthenticated = async ()=>{
    const {navigation} = this.props;


    navigation.addListener("focus",()=>{
      setTimeout(()=>{
        this.props.AuthStore.getToken();
      },2000);
    });
  }

  render() {
    return (
        <View style={styles.container}>
          <Entypo name={"radio"} size={100} color={"#dfe7ae"}/>
          <ActivityIndicator color={"#dfe7ae"} size={30} style={styles.indicator_style}/>
        </View>
    )
  }
}
