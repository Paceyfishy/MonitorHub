// app/(tabs)/index.tsx

import {View,Text,FlatList,Image,TouchableOpacity,StyleSheet,Dimensions,} from "react-native";
import CategoryButtons from "@/components/CategoryButtons";
import SearchBox from "@/components/SearchBox";
import { useEffect, useState } from "react";
import MonitorItem from "@/interfaces/MonitorItem"
import MonitorGrid from "@/components/MonitorGrid";

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>MonitorHub</Text>
        <SearchBox/>
        <View>
          <CategoryButtons/>
        </View>

      </View>
      
      <MonitorGrid/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 50,
    width: "100%"
  },

  headerContainer: {
    backgroundColor: "#187ae3",
  },

  header: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: "#e318be",
  
  }

});