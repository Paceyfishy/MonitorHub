import EditReviewButton from "@/components/EditReviewButton";
import { reviews } from "@/constants/reviews";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AllReviewsScreen() {
  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>All Reviews</Text>
      </View>

      {/* Reviews List */}
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <EditReviewButton />

            <Text style={styles.reviewTitle}>{item.monitor}</Text>

            <Text style={styles.reviewText}>{item.review}</Text>

            <Text style={styles.reviewRating}>{"⭐".repeat(item.rating)}</Text>
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

  reviewCard: {
    backgroundColor: "#e0ffe6ff",
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
  },

  reviewTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },

  reviewText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },

  reviewRating: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "gray",
  },
});
