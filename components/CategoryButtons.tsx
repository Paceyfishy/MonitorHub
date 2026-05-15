import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";;

export default function CategoryButtons() {
  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.button}>
        <Ionicons name="grid" size={18} color="white" />
        <Text style={styles.buttonText}>All</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Ionicons name="game-controller" size={18} color="white" />
        <Text style={styles.buttonText}>Gaming</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Feather name="briefcase" size={18} color="white" />
        <Text style={styles.buttonText}>Work</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <MaterialIcons name="movie" size={18} color="white" />
        <Text style={styles.buttonText}>Media</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginBottom: 20,
  },

  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,

    backgroundColor: "#2424eed2",
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 20,

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
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
});