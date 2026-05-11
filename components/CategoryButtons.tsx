import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function CategoryButtons() {
  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>All</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Gaming</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>OLED</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>4K</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
  },

  button: {
    flex: 1,
    backgroundColor: "#4654eb",
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 10,
    alignItems: "center",

    // Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 4,
  },

  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});