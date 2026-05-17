import EditReviewButton from "@/components/EditReviewButton";
import { ReviewCard } from "@/components/ReviewCard";
import { getAllMonitors, getCurrentUser, getUserReviews } from "@/lib/monitorApi";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function AllReviewsScreen() {
  const router = useRouter();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);
  const [monitors, setMonitors] = useState<any[]>([]);

  const fetchReviews = async () => {
    try {
      const [user, allMonitors] = await Promise.all([
        getCurrentUser().catch(() => null),
        getAllMonitors().catch(() => [])
      ]);
      
      if (user && user.id) {
        setProfileData(user);
        setMonitors(allMonitors);
        const data = await getUserReviews(user.id);
        setReviews(data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Fetch reviews when screen is first loaded
  useEffect(() => {
    fetchReviews();
  }, []);

  // Refresh reviews when returning to screen (after edit/delete)
  useFocusEffect(
    React.useCallback(() => {
      fetchReviews();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4654eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Reviews ({reviews.length})</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={reviews}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <Text style={styles.noReviewsText}>You haven't written any reviews yet</Text>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
  const matchedMonitor = monitors.find(m => m.id === item.monitorId);
  const monitorName = matchedMonitor ? matchedMonitor.name : "Unknown Monitor";

  return (
    <View style={styles.cardContainer}>
      <View style={styles.editButtonWrapper}>
        <EditReviewButton 
            onPress={() => router.push({
              pathname: "/editReviewModal" as any, 
              params: {
              reviewId: item.id,
              currentRating: item.rating,
              currentComment: item.comment,
              currentImage: item.image ? `data:image/jpeg;base64,${item.image}` : ""
              }
            })}
          />
      </View>
      
      <ReviewCard 
        userName={(
        <Text style={{ color: "#1c1c1e" }}>
          {profileData?.firstName || "peace"}
          {Platform.OS === 'web' ? (
            <Text> • <Text style={{ color: "#4654eb", fontWeight: "700" }}>{monitorName}</Text></Text>
          ) : (
            
            <Text>{"\n"}<Text style={{ color: "#4654eb", fontWeight: "700", fontSize: 14 }}>{monitorName}</Text></Text>
      )}
    </Text>
  ) as any}
        rating={item.rating}
        comment={item.comment}
        image={item.image ? `data:image/jpeg;base64,${item.image}` : undefined}
        userAvatar={profileData?.profilePicture ? `data:image/jpeg;base64,${profileData.profilePicture}` : undefined}
      />
    </View>
  );
}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#f0f0f2",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1c1c1e",
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  cardContainer: {
    position: "relative",
    marginBottom: 15,
  },
  editButtonWrapper: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 99, // ดันให้อยู่ชั้นบนสุดเพื่อให้กดปุ่มได้
  },
  noReviewsText: {
    textAlign: "center",
    color: "#8e8e93",
    marginTop: 40,
    fontSize: 16,
  },
  productNameTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4654eb", 
    paddingHorizontal: 16,
    marginBottom: 4,
    paddingRight: 50, 
  },
});