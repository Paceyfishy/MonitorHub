import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { addFavorite, removeFavorite } from "@/lib/monitorApi";
import { useUser } from "@/context/UserContext";

export default function SavedButton({ monitorId }: { monitorId: string }) {

  const { currentUser, refreshUser } = useUser();

  const [saved, setSaved] = useState(false);

  // sync with backend on load
  useEffect(() => {

    if (!currentUser) return;

    setSaved(currentUser.favorites?.includes(monitorId));

  }, [currentUser]);

  const toggleSave = async () => {

    if (!currentUser) return;

    if (saved) {

      setSaved(false);

      await removeFavorite(
        currentUser.id,
        monitorId
      );

    } else {

      setSaved(true);

      await addFavorite(
        currentUser.id,
        monitorId
      );
    }

    // refresh global user state
    await refreshUser();
  };

  return (
    <TouchableOpacity
      style={styles.savedButton}
      onPress={toggleSave}
    >
      <Ionicons
        name={saved ? "bookmark" : "bookmark-outline"}
        size={18}
        color={saved ? "red" : "white"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  savedButton: {
    position: "absolute",
    bottom: 10,
    right: 10,

    backgroundColor: "rgb(104, 145, 235)",
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
