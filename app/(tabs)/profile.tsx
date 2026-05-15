import EditReviewButton from "@/components/EditReviewButton";
import SavedButton from "@/components/SavedButton";
import { allMonitors } from "@/constants/monitors";
import { reviews } from "@/constants/reviews";
import { auth, db } from "@/services/firebase";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions,} from "react-native";
import { signOut } from "firebase/auth";
import { updateProfilePicture } from "@/lib/monitorApi";
import { useUser } from "@/context/UserContext";
import { getMonitorsByIds } from "@/lib/monitorApi";
import { getUserReviews } from "@/lib/monitorApi";



export default function ProfileScreen() {
  const [fullName, setFullName] = useState("Loading...");
  const [profileImage, setProfileImage] = useState(
    "https://dummyimage.com/200x200/cccccc/000000.png&text=Profile",
  );

  const { width } = useWindowDimensions();
  const { currentUser, refreshUser } = useUser();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [userReviews, setUserReviews] = useState<any[]>([]);

  let visibleMonitors = 2;

  if (width >= 1200) {
    visibleMonitors = 8;
  } else if (width >= 900) {
    visibleMonitors = 6;
  } else if (width >= 600) {
    visibleMonitors = 4;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        if (!user) {
          setFullName("No User");
          return;
        }

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();

          const firstName = data.firstName ?? "";
          const lastName = data.lastName ?? "";

          setFullName(`${firstName} ${lastName}`.trim());

          // OPTIONAL
          // setProfileImage(data.profileImage);
        } else {
          setFullName("No Profile Data");
        }
      } catch (error) {
        console.log("Error fetching user:", error);
        setFullName("Error Loading Name");
      }
    });

    return unsubscribe;
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];

    setProfileImage(asset.uri);

    const base64Image = asset.base64;

    console.log(base64Image);

    if (!base64Image || !currentUser) return;
    
    // Upload to backend
    await updateProfilePicture(currentUser!.id, base64Image!);
    await refreshUser();
    }
  };

  // set profile image
  useEffect(() => {

    if (!currentUser) return;

    const pic = currentUser.profilePicture;

    setProfileImage(
      pic
        ? `data:image/jpeg;base64,${pic}`
        : "https://dummyimage.com/200x200/cccccc/000000.png&text=Profile"
    );

  }, [currentUser]);

  // fetch user's favorites
  useEffect(() => {

    const fetchFavorites = async () => {

      if (!currentUser?.favorites?.length) {
        setFavorites([]);
        return;
      }

      const data = await getMonitorsByIds(currentUser.favorites);

      setFavorites(data);
    };

    fetchFavorites();

  }, [currentUser]);

  useEffect(() => {

    const fetchReviews = async () => {

      if (!currentUser?.id) return;

      const data = await getUserReviews(currentUser.id);

      setUserReviews(data);

      console.log("REVIEWS:", data);
    };

    fetchReviews();

  }, [currentUser?.id]);

  return (
    <FlatList
      data={userReviews.slice(0, 3)}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
      ListHeaderComponent={
        <>
          {/* Profile Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.editButton} onPress={pickImage}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>

            <Text style={styles.username}>{fullName}</Text>
          </View>

          {/* Saved Section */}
          <View style={styles.monitorHeader}>
            <Text style={styles.sectionTitle}>Saved Monitors</Text>

            <Text
              style={styles.viewAllButton}
              onPress={() => router.push("/allMonitors")}
            >
              View All
            </Text>
          </View>

          <View style={styles.section}>
            <FlatList
              data={favorites.slice(0, visibleMonitors)}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingRight: 20,
              }}
              ListEmptyComponent={
                <View
                  style={[
                    styles.card,
                    {
                      width:
                        width >= 1200
                          ? 180
                          : width >= 900
                            ? 170
                            : width >= 600
                              ? 160
                              : 150,

                      justifyContent: "center",
                      alignItems: "center",
                    },
                  ]}
                >
                  <Text style={{ color: "gray", fontSize: 14, textAlign: "center" }}>
                    No saved monitors
                  </Text>
                </View>
              }
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.card,
                    {
                      width:
                        width >= 1200
                          ? 180
                          : width >= 900
                            ? 170
                            : width >= 600
                              ? 160
                              : 150,
                    },
                  ]}
                >

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

          {/* Reviews Header */}
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

            <Text style={styles.reviewText}>{item.comment}</Text>

            <Text style={styles.reviewRating}>
              Rating : {"⭐".repeat(item.rating)}
            </Text>
          </View>
        </View>
      )}

      ListFooterComponent={
        <View
          style={{
            alignItems: "center",
            marginTop: 40,
            marginBottom: 40,
          }}
        >
          <TouchableOpacity
            onPress={async () => { await signOut(auth); }}
          >
            <Text
              style={{
                textDecorationLine: "underline",
                color: "red",
                fontSize: 16,
              }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
}
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
    marginBottom: 20,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    marginTop: 5,
  },

  editButton: {
    position: "absolute",
    top: 0,
    right: 20,
    backgroundColor: "#2424eed2",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },

  editButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
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
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#ffffffff",
    borderRadius: 15,
    padding: 10,
    marginRight: 15,
  },

  monitorHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 20,
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
    backgroundColor: "#ffffffff",
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
    marginBottom: 10,
    paddingHorizontal: 20,
  },

  viewAllButton: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2424eed2",
  },
});