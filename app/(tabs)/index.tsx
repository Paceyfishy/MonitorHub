// app/(tabs)/index.tsx

import CategoryButtons from "@/components/CategoryButtons";
import MonitorGrid from "@/components/MonitorGrid";
import SearchBox from "@/components/SearchBox";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Explore</Text>

        <SearchBox />

        <View>
          <CategoryButtons />
        </View>
      </View>

      <MonitorGrid />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    width: "100%",

    // Keep top space on iPhone only
    paddingTop: Platform.OS === "ios" ? 50 : 0,
  },

  headerContainer: {
    backgroundColor: "#ffffff",
  },

  header: {
    color: "black",
    fontSize: 32,
    fontWeight: "bold",
    paddingHorizontal: 25,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#ffffff",
  },
});
