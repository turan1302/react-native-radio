import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const Controls = ({ name, loading, paused, playRadio, pauseRadio }) => {

  return (
      <View style={styles.container}>
        <Text style={styles.play_radio_name_text}>{name}</Text>
        {loading && <ActivityIndicator color={"#dfe7ae"} />}
        {!loading && <TouchableOpacity onPress={(!paused) ? pauseRadio : playRadio}>
          <Text style={styles.paused_text}>{paused ? "Oynat" : "Durdur"}</Text>
        </TouchableOpacity>}
      </View>
  );
};

export default Controls;
