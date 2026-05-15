import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";

export default function SearchBox() {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search monitors..."
        placeholderTextColor="#888"
        style={styles.searchInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginHorizontal: 25,
    marginBottom: 20,
  },

  searchInput: {
    backgroundColor: "#1e1e1e16",
    color: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,

    // Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 3,
  },
});