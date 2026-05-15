import SavedButton from "@/components/SavedButton";
import { allMonitors } from "@/constants/monitors";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AllMonitorsScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Saved Monitors</Text>
      </View>

      {/* Monitor List */}
      <FlatList
        data={allMonitors}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <SavedButton />

            <Image source={{ uri: item.image }} style={styles.monitorImage} />

            <Text style={styles.monitorName}>{item.name}</Text>

            <Text style={styles.monitorPrice}>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  backButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2424eed2",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 20,
  },

  card: {
    backgroundColor: "#fffee7ff",
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
  },

  monitorImage: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },

  monitorName: {
    fontSize: 18,
    fontWeight: "600",
  },

  monitorPrice: {
    fontSize: 15,
    color: "gray",
    marginTop: 5,
  },
});
