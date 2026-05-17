import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Ionicons } from "@expo/vector-icons";

interface EditReviewButtonProps {
  onPress?: () => void;
}

export default function EditReviewButton({ onPress }: EditReviewButtonProps) {
  return (
    <TouchableOpacity style={styles.editButton} onPress={onPress}
    hitSlop={{ top: 40, bottom: 40, left: 30, right: 30 }} >
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
