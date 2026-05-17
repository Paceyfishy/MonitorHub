import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";;

interface CategoryButtonsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CATEGORIES = [
  { id: "All", label: "All", icon: "grid" },
  { id: "Gaming", label: "Gaming", icon: "game-controller" },
  { id: "Work", label: "Work", icon: "briefcase" },
  { id: "Media", label: "Media", icon: "movie" },
];

export default function CategoryButtons({ selectedCategory, onCategoryChange }: CategoryButtonsProps) {
  return (
    <View style={styles.buttonRow}>
      {CATEGORIES.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.button,
            selectedCategory === category.id && styles.buttonActive,
          ]}
          onPress={() => onCategoryChange(category.id)}
        >
          {category.id === "All" && <Ionicons name="grid" size={18} color="white" />}
          {category.id === "Gaming" && <Ionicons name="game-controller" size={18} color="white" />}
          {category.id === "Work" && <Feather name="briefcase" size={18} color="white" />}
          {category.id === "Media" && <MaterialIcons name="movie" size={18} color="white" />}
          <Text style={styles.buttonText}>{category.label}</Text>
        </TouchableOpacity>
      ))}
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

  buttonActive: {
    backgroundColor: "#4654eb",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
});