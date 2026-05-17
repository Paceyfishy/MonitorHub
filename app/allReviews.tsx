import React, { useEffect, useState } from "react";
import { 
  View, 
  FlatList, 
  Text, 
  ActivityIndicator, 
  StyleSheet, 
  TouchableOpacity 
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getCurrentUser, getUserReviews } from "@/lib/monitorApi";
import { ReviewCard } from "@/components/ReviewCard";
import EditReviewButton from "@/components/EditReviewButton";

export default function AllReviewsScreen() {
  const router = useRouter();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        if (user && user.id) {
          getUserReviews(user.id)
            .then((data) => {
              setReviews(data);
              setLoading(false);
            })
            .catch((error) => {
              console.error(error);
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

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
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <View style={styles.editButtonWrapper}>
              <EditReviewButton />
            </View>
            
            <ReviewCard 
              userName={item.user?.firstName || "Anonymous"}
              rating={item.rating}
              comment={item.comment}
              image={item.image ? `data:image/jpeg;base64,${item.image}` : undefined}
              userAvatar={item.user?.profilePicture ? `data:image/jpeg;base64,${item.user.profilePicture}` : undefined}
            />
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