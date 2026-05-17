// app/(tabs)/index.tsx

import {View,Text,FlatList,Image,TouchableOpacity,StyleSheet,Dimensions, Platform} from "react-native";
import CategoryButtons from "@/components/CategoryButtons";
import SearchBox from "@/components/SearchBox";
import { useEffect, useState } from "react";
import MonitorItem from "@/interfaces/MonitorItem"
import MonitorGrid from "@/components/MonitorGrid";

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Explore</Text>
        <SearchBox/>
        <View>
          <CategoryButtons
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </View>

      </View>

      <MonitorGrid category={selectedCategory} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    width: "100%",

    // Keep top space on iPhone only
    paddingTop: Platform.OS === "ios" ? 50 : 0
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
  
  }

});