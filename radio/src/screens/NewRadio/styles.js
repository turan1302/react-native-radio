import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container : { flex: 1, backgroundColor: "#3c4250",paddingHorizontal  :10},
  form_container : {flexDirection : "row",borderWidth : 1,borderColor : "#8f9197",borderRadius : 10},

  select2_style : { borderRadius: 5,color: "white"},
  select2_title_style : { color: "white" },

  rd_name_area : {flexDirection : "row",borderWidth : 1,borderColor : "#8f9197",borderRadius : 10,marginTop : 20},
  rd_name_input : {flex  :1,paddingLeft : 10,color : "white"},

  rd_link_area : {flexDirection : "row",borderWidth : 1,borderColor : "#8f9197",borderRadius : 10,marginTop : 20},
  rd_link_input : {flex  :1,paddingLeft : 10,color : "white"},

  rd_create_button : {
    marginTop: 20, backgroundColor: "#b7eacb",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    borderRadius: 20,
  },
  rd_create_button_text : { color : "black",fontWeight: "bold", fontSize: 20 },

  error_text : {color : "red"}
});

export default styles;
