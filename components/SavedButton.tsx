import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function SavedButton() {
  const [saved, setSaved] = useState(false);

  return (
    <TouchableOpacity
      style={styles.savedButton}
      onPress={() => setSaved(!saved)}
    >
      <Ionicons name="bookmark" size={18} color={saved ? "red" : "white"} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  savedButton: {
    position: "absolute",
    bottom: 10,
    right: 10,

    backgroundColor: "#d5ecf5ff",
    padding: 8,
    borderRadius: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    elevation: 3,
    zIndex: 1,
  },
});
