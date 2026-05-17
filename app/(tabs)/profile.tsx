import EditReviewButton from "@/components/EditReviewButton";
import { useUser } from "@/context/UserContext";
import {
  getMonitorsByIds,
  getUserReviews,
  updateProfilePicture,
} from "@/lib/monitorApi";
import { auth, db } from "@/services/firebase";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function ProfileScreen() {
  const [fullName, setFullName] = useState("Loading...");
  const [profileImage, setProfileImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  );

  const { width } = useWindowDimensions();
  const isWebLargeScreen = width >= 900;

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

      if (!base64Image || !currentUser) return;

      await updateProfilePicture(currentUser.id, base64Image);

      await refreshUser();
    }
  };

  useEffect(() => {
    if (!currentUser) return;

    const pic = currentUser.profilePicture;

    setProfileImage(
      pic
        ? `data:image/jpeg;base64,${pic}`
        : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    );
  }, [currentUser]);

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

  useFocusEffect(
    useCallback(() => {

      const fetchReviews = async () => {

        if (!currentUser?.id) return;

        const data = await getUserReviews(currentUser.id);

        setUserReviews(data);
      };

      fetchReviews();

    }, [currentUser?.id])
  );

  return (
    <FlatList
      data={isWebLargeScreen ? [] : userReviews.slice(0, 3)}
      keyExtractor={(item: any) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 40,
        backgroundColor: "#ffffff",
      }}
      ListHeaderComponent={
        <>
          {/* PROFILE HEADER */}
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

          {/* WEB */}
          {isWebLargeScreen ? (
            <View style={styles.desktopContainer}>
              {/* LEFT CONTAINER */}
              <View style={styles.leftColumnContainer}>
                <View style={styles.monitorHeader}>
                  <Text style={styles.sectionTitle}>Saved Monitors</Text>

                  <Text
                    style={styles.viewAllButton}
                    onPress={() => router.push("/allMonitors")}
                  >
                    View All
                  </Text>
                </View>

                <FlatList
                  key={width >= 1400 ? "3-cols" : "2-cols"}
                  data={favorites.slice(0, visibleMonitors)}
                  keyExtractor={(item) => item.id}
                  numColumns={width >= 1400 ? 3 : 2}
                  scrollEnabled={false}
                  columnWrapperStyle={styles.columnWrapper}
                  contentContainerStyle={{
                    paddingBottom: 10,
                  }}
                  renderItem={({ item }) => (
                    <View
                      style={[
                        styles.card,
                        {
                          flex: width >= 1400 ? 1 / 3 : 1 / 2,

                          maxWidth: width >= 1400 ? "31.5%" : "48.5%",
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

              {/* RIGHT CONTAINER */}
              <View style={styles.rightColumnContainer}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.sectionTitle}>Reviews</Text>

                  <Text
                    style={styles.viewAllButton}
                    onPress={() => router.push("/allReviews")}
                  >
                    View All
                  </Text>
                </View>

                {userReviews.slice(0, 3).map((item) => (
                  <View key={item.id} style={styles.reviewContainer}>
                    <View style={styles.reviewCard}>
                      <EditReviewButton />

                      <Text style={styles.reviewText}>{item.comment}</Text>

                      <Text style={styles.reviewRating}>
                        Rating : {"⭐".repeat(item.rating)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <>
              {/* MOBILE */}
              <View style={styles.monitorHeaderMobile}>
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
                  renderItem={({ item }) => (
                    <View style={styles.mobileCard}>
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

              <View style={styles.reviewHeaderMobile}>
                <Text style={styles.sectionTitle}>Reviews</Text>

                <Text
                  style={styles.viewAllButton}
                  onPress={() => router.push("/allReviews")}
                >
                  View All
                </Text>
              </View>
            </>
          )}
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
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={async () => {
              await signOut(auth);
            }}
          >
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 25,
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
    backgroundColor: "#4f46e5",
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },

  desktopContainer: {
    flexDirection: "row",
    gap: 18,
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },

  leftColumnContainer: {
    width: "50%",
    backgroundColor: "#f8fafc",
    borderRadius: 24,
    padding: 16,
  },

  rightColumnContainer: {
    width: "50%",
    backgroundColor: "#f8fafc",
    borderRadius: 24,
    padding: 16,
  },

  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  monitorHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  monitorHeaderMobile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 14,
  },

  reviewHeaderMobile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  viewAllButton: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4f46e5",
  },

  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 10,
  },

  mobileCard: {
    width: 150,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 10,
    marginRight: 12,
  },

  columnWrapper: {
    gap: 14,
    marginBottom: 14,
  },

  monitorImage: {
    width: "100%",
    height: 110,
    borderRadius: 12,
    marginBottom: 10,
  },

  monitorName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  monitorPrice: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 5,
  },

  reviewContainer: {
    marginBottom: 12,
  },

  reviewCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
  },

  reviewText: {
    fontSize: 14,
    color: "#353b44ff",
    marginTop: 2,
    lineHeight: 20,
  },

  reviewRating: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
  },

  footer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },

  signOutText: {
    textDecorationLine: "underline",
    color: "red",
    fontSize: 16,
  },
});
