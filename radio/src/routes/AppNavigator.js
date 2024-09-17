import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from "react-native";

import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

import HomeNavigator from "./HomeNavigator";
import CustomDrawer from "../components/Drawer/CustomDrawer";
import NewRadio from "../screens/NewRadio";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "./styles/Drawer/NewRadio/styles";
import Profile from "../screens/Profile";
export default class AppNavigator extends Component {
  render() {
    return (
      <Drawer.Navigator drawerContent={({navigation})=><CustomDrawer navigation={navigation}/>} screenOptions={()=>{
        return {
          headerShown : false,
          drawerStyle : {
            zIndex : 11
          },
        }
      }}>
        <Drawer.Screen name="HomeNavigator" component={HomeNavigator} />
        <Drawer.Screen options={{
          headerShown  :true,
          header: ({navigation}) => (
            <View style={styles.container}>
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <MaterialIcons name={"menu"} color={"#b7eacb"} size={30} />
              </TouchableOpacity>
              <Text style={styles.header_text}>Yeni Radyo Ekle</Text>
            </View>
          ),
        }} name="NewRadio" component={NewRadio} />
        <Drawer.Screen options={{
          headerShown  :true,
          header: ({navigation}) => (
            <View style={styles.container}>
              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <MaterialIcons name={"menu"} color={"#b7eacb"} size={30} />
              </TouchableOpacity>
              <Text style={styles.header_text}>Profilim</Text>
            </View>
          ),
        }} name="Profile" component={Profile} />
      </Drawer.Navigator>
    )
  }
}
