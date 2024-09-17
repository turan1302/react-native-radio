import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container : { flex: 1, backgroundColor: "#3c4250" },

  search_area : {
    marginBottom: 15,
    marginHorizontal: 20,
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 10,
  },
  search_input_style : { flex: 1, paddingLeft: 10 },

  list_container : { flex: 1, justifyContent: "space-between" },
  list_style : { marginTop: 20, paddingHorizontal: 20 },
  list_wrapper_style : { justifyContent: "space-between" },

  empty_data_container : { backgroundColor: "#dfe7ae", alignItems: "center", paddingVertical: 10, borderRadius: 8 },
  empty_data_text : { fontWeight: "bold",color : "black" },
});

export default styles;
