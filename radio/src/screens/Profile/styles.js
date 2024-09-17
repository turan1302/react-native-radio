import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#3c4250", paddingHorizontal: 10 },

  name_area: { flexDirection: "row", borderWidth: 1, borderColor: "#8f9197", borderRadius: 10, marginTop: 20 },
  email_area: { flexDirection: "row", borderWidth: 1, borderColor: "#8f9197", borderRadius: 10, marginTop: 20 },
  password_area: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#8f9197",
    borderRadius: 10,
    marginTop: 20,
  },
  password_confirmation_area: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#8f9197",
    borderRadius: 10,
    marginTop: 20,
  },


  input_style: { flex: 1, paddingLeft: 10, color: "white" },
  button_style : {
    marginVertical: 20,
    backgroundColor: "#b7eacb",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    borderRadius: 20,
  },
  button_text : { color : "black",fontWeight: "bold", fontSize: 20 },
  error_text: { color: "red", marginTop: 6 },
});

export default styles;
