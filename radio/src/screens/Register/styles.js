import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container : { flex: 1, backgroundColor: "#3c4250", paddingHorizontal: 30 },
  screen_title : { marginTop: 150, color: "#b7eacb", fontWeight: "bold", fontSize: 25 },
  screen_subtitle : { marginTop: 5, fontSize: 15, color: "#abacb3" },

  name_container : { marginTop: 30 },
  name_input : {
    color: "#c4c4c4",
    borderBottomWidth: 1,
    borderBottomColor: "#8f9197",
    height: 35,
    textTransform: "capitalize",
  },

  email_container : { marginTop: 30 },
  email_input : {
    color: "#c4c4c4",
    borderBottomWidth: 1,
    borderBottomColor: "#8f9197",
    height: 35,
    textTransform: "capitalize",
  },

  password_container : { marginTop: 30, borderBottomWidth: 1.5, borderBottomColor: "#8f9197" },
  password_input : {
    color: "#c4c4c4",
    height: 35,
    textTransform: "capitalize",
    flex : 1
  },

  password_confirmation_container : { marginTop: 30, borderBottomWidth: 1.5, borderBottomColor: "#8f9197" },
  password_confirmation_input : {
    color: "#c4c4c4",
    height: 35,
    textTransform: "capitalize",
    flex : 1
  },

  button_container : { marginTop: 30 },
  button : {
    backgroundColor: "#b7eacb",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    marginTop: 20,
    borderRadius: 20,
  },
  button_text : { fontWeight: "bold", fontSize: 20,color : "black" },

  form_footer_area : { marginTop: 100, marginBottom: 20, alignItems: "center" },
  footer_title : { color: "#bebfc4", fontSize: 15 },

  footer_button_text : { color: "#c6cea0", fontSize: 15, marginTop: 5 },

  error_text : {color : "red",marginTop : 6}
});

export default styles;
