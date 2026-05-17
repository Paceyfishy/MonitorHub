import React, { useEffect, useState } from "react";
import { 
  View, 
  FlatList, 
  Text, 
  ActivityIndicator, 
  StyleSheet, 
  TouchableOpacity 
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getMonitorReviews } from "@/lib/monitorApi";
import { ReviewCard } from "@/components/ReviewCard";

export default function AllMonitorReviewsScreen() {
  const { id } = useLocalSearchParams(); // รับ id จอมอนิเตอร์มาจากหน้า ProductDetail
  const router = useRouter();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Fetch ข้อมูลรีวิวของ Monitor ตัวนี้โดยเฉพาะ เหมือนในหน้า ProductDetail
      getMonitorReviews(id as string)
        .then((data) => {
          setReviews(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching monitor reviews:", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4654eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header ส่วนบนของหน้าจอ */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Reviews ({reviews.length})</Text>
        <View style={{ width: 40 }} /> {/* ส่วนเว้นระยะบาลานซ์ซ้ายขวา */}
      </View>

      {/* รายการรีวิวทั้งหมดของมอนิเตอร์ตัวนี้ */}
      <FlatList
        data={reviews}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <Text style={styles.noReviewsText}>No reviews yet for this monitor</Text>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ReviewCard 
            userName={item.user?.firstName || "Anonymous"}
            rating={item.rating}
            comment={item.comment}
            image={item.image ? `data:image/jpeg;base64,${item.image}` : undefined}
            userAvatar={item.user?.profilePicture ? `data:image/jpeg;base64,${item.user.profilePicture}` : undefined}
          />
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
  noReviewsText: {
    textAlign: "center",
    color: "#8e8e93",
    marginTop: 40,
    fontSize: 16,
  },
});