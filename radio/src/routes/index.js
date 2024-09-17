import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import AppNavigator from "./AppNavigator";

import { navigationRef } from "../../src/NavigationService";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Splash from "../screens/Splash";


export default class Routes extends Component {

  render() {
    return (
     <NavigationContainer ref={navigationRef}>
       <Stack.Navigator screenOptions={()=>{
         return {
           headerShown : false
         }
       }} initialRouteName={"Splash"}>
         <Stack.Screen name="Welcome" component={AppNavigator} />
         <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="Register" component={Register} />
         <Stack.Screen name="Splash" component={Splash} />
       </Stack.Navigator>
     </NavigationContainer>
    )
  }
}
