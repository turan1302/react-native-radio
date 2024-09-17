import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "./styles";

import Animated, { LightSpeedInLeft, LightSpeedInRight } from "react-native-reanimated";


export default class ListItem extends Component {
  render() {
    const {item,index,onPlayRadio,onRemoveAlert,favourite}=this.props;

    return (
      <Animated.View entering={(index % 2 === 0) ? LightSpeedInLeft.duration(400).delay((index + 1) * 200) : LightSpeedInRight.duration(400).delay((index + 1) * 200)} style={{width : "52%",justifyContent : "space-around"}}>
        <TouchableOpacity onLongPress={()=>onRemoveAlert(item.rd_id)} onPress={() => onPlayRadio(item.rd_link, item.rd_name)} style={styles.play_remove_button_area}>
          <TouchableOpacity onPress={()=>favourite(item.rd_id)}>
            <AntDesign color={"#dfe7ae"} size={30} name={(item.isFavourite) ? "heart" : "hearto"}
                       style={styles.heart_button_area} />
          </TouchableOpacity>
          <Text style={styles.radio_name}>{item.rd_name}</Text>
          <Fontisto color={"gray"} size={30} name={"equalizer"}
                    style={styles.equalizer_icon_area} />
        </TouchableOpacity>
      </Animated.View>


    )
  }
}
