import EditReviewButton from "@/components/EditReviewButton";
import SavedButton from "@/components/SavedButton";
import React from "react";
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const savedMonitors = [
  {
    id: "1",
    name: "MSI Optix",
    price: "$279",
    image: "https://dummyimage.com/300x300/cccccc/000000.png&text=MSI",
  },
  {
    id: "2",
    name: "AOC Gaming",
    price: "$199",
    image: "https://dummyimage.com/300x300/cccccc/000000.png&text=AOC",
  },
  {
    id: "3",
    name: "LG UltraGear",
    price: "$499",
    image: "https://dummyimage.com/300x300/cccccc/000000.png&text=LG",
  },
  {
    id: "4",
    name: "Samsung Odyssey",
    price: "$699",
    image: "https://dummyimage.com/300x300/cccccc/000000.png&text=Samsung",
  },
];

const reviews = [
  {
    id: "1",
    monitor: "MSI Optix G27",
    review: "Amazing colors and very smooth gameplay.",
    rating: "5/5",
  },
  {
    id: "2",
    monitor: "LG UltraGear",
    review: "Very sharp display and great for editing.",
    rating: "4/5",
  },
  {
    id: "3",
    monitor: "Samsung Odyssey",
    review: "Curved screen feels immersive while gaming.",
    rating: "4/5",
  },
  {
    id: "4",
    monitor: "AOC Gaming",
    review: "Affordable monitor with high refresh rate.",
    rating: "4/5",
  },
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://i.pravatar.cc/300",
          }}
          style={styles.profileImage}
        />

        <Text style={styles.username}>Alex Chen</Text>
      </View>

      {/* Saved Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Saved Monitors</Text>

        <FlatList
          data={savedMonitors}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
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

      {/* Reviews Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviews</Text>

        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          style={styles.reviewList}
          renderItem={({ item }) => (
            <View style={styles.reviewCard}>
              {/* Edit Button */}
              <EditReviewButton />
              <Text style={styles.reviewTitle}>{item.monitor} :</Text>
              <Text style={styles.reviewText}>{item.review}</Text>
              <Text style={styles.reviewRating}>
                Rating : {"⭐".repeat(parseInt(item.rating))}{" "}
              </Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 30,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },

  username: {
    fontSize: 24,
    fontWeight: "bold",
  },

  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
  },

  card: {
    width: 160,
    backgroundColor: "#fffee7ff",
    borderRadius: 15,
    padding: 10,
    marginRight: 15,
  },

  monitorImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },

  monitorName: {
    fontSize: 16,
    fontWeight: "600",
  },

  monitorPrice: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  reviewList: {
    height: 300,
  },

  reviewCard: {
    width: "100%",
    backgroundColor: "#e0ffe6ff",
    borderRadius: 15,
    padding: 15,
    marginRight: 10,
    marginBottom: 10,
  },

  reviewTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },

  reviewRating: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: 600,
    color: "gray",
  },
  reviewText: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
    lineHeight: 20,
  },
});
