import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function EditReviewButton() {
  return (
    <TouchableOpacity style={styles.editButton}>
      <Ionicons name="create-outline" size={18} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  editButton: {
    position: "absolute",
    top: 12,
    right: 12,

    backgroundColor: "white",
    padding: 6,
    borderRadius: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,

    elevation: 3,
  },
});
