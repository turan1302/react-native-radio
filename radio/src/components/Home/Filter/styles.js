import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container : {flexDirection : "row",justifyContent : "space-between",alignItems : "center",paddingHorizontal : 20,marginVertical : 10},
  button_text : (checkFilter,value)=>({fontWeight : "400",fontSize : 20,color :(checkFilter===value) ? "#b7eacb" : "#838790"}),
  button_border : {borderBottomWidth : 1,marginHorizontal : 15,borderColor : "#b7eacb",marginTop : 2}
});

export default styles;
