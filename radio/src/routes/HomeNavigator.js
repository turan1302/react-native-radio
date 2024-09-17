import React, { Component } from "react";
import { Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

const Stack = createNativeStackNavigator();

export default class HomeNavigator extends Component {

  render() {

    return (
      <Stack.Navigator screenOptions={() => {
        return {
          headerShown: true,
          header: () => (
            <View style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#3c4250",
            }}>
              <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                <MaterialIcons name={"menu"} color={"#b7eacb"} size={30} />
              </TouchableOpacity>
            </View>
          ),
        };
      }} initialRouteName={"Home"}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    );
  }
}
