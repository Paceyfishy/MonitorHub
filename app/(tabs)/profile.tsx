import EditReviewButton from "@/components/EditReviewButton";
import SavedButton from "@/components/SavedButton";
import { reviews } from "@/constants/reviews";
import { auth, db } from "@/services/firebase";
import { router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

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

export default function ProfileScreen() {
  const [fullName, setFullName] = useState("Loading...");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          setFullName("No User");
          return;
        }

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          console.log("Firestore Data:", data);

          const firstName = data.firstName || "";
          const lastName = data.lastName || "";

          setFullName(`${firstName} ${lastName}`);
        } else {
          setFullName("No Profile Data");
        }
      } catch (error) {
        console.log("Error fetching user:", error);
        setFullName("Error Loading Name");
      }
    };

    fetchUserData();
  }, []);

  return (
    <FlatList
      data={reviews.slice(0, 3)}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
      ListHeaderComponent={
        <>
          {/* Profile Header */}
          <View style={styles.header}>
            <Image
              source={{
                uri: "https://i.pravatar.cc/300",
              }}
              style={styles.profileImage}
            />

            <Text style={styles.username}>{fullName || "No name"}</Text>
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

                  <Image
                    source={{ uri: item.image }}
                    style={styles.monitorImage}
                  />

                  <Text style={styles.monitorName}>{item.name}</Text>

                  <Text style={styles.monitorPrice}>{item.price}</Text>
                </View>
              )}
            />
          </View>

          {/* Reviews Title */}
          <View style={styles.reviewHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>

            <Text
              style={styles.viewAllButton}
              onPress={() => router.push("/allReviews")}
            >
              View All
            </Text>
          </View>
        </>
      }
      renderItem={({ item }) => (
        <View style={styles.reviewContainer}>
          <View style={styles.reviewCard}>
            <EditReviewButton />

            <Text style={styles.reviewTitle}>{item.monitor} :</Text>

            <Text style={styles.reviewText}>{item.review}</Text>

            <Text style={styles.reviewRating}>
              Rating : {"⭐".repeat(item.rating)}
            </Text>
          </View>
        </View>
      )}
    />
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

  reviewContainer: {
    paddingHorizontal: 20,
  },

  reviewCard: {
    width: "100%",
    backgroundColor: "#e0ffe6ff",
    borderRadius: 15,
    padding: 15,
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
    fontWeight: "600",
    color: "gray",
  },

  reviewText: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
    lineHeight: 20,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 20,
  },

  viewAllButton: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
  },
});
