import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Platform,
  StatusBar,
  ActivityIndicator,
  useWindowDimensions,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { RatingBox } from "@/components/RatingBox";
import { SpecsSection } from "@/components/SpecsSection";
import { ReviewCard } from "@/components/ReviewCard";
import { getMonitorById, getMonitorReviews } from "@/lib/monitorApi";
import MonitorItem from "@/interfaces/MonitorItem";
import { ReviewItem } from "@/interfaces/ReviewItem";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [product, setProduct] = useState<MonitorItem | null>(null);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  const isWeb = width > 1024;

  useEffect(() => {
    getMonitorById(id as string).then(setProduct);
    getMonitorReviews(id as string).then(setReviews);
  }, [id]);

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4654eb" />
      </View>
    );
  }

  const renderReviewItems = () => {
    const data = (product as any).reviews?.length > 0 ? (product as any).reviews : [];
    return data.map((item: any, index: number) => {
      let reviewData;
      try {
        reviewData = typeof item === 'string' ? JSON.parse(item.replace(/\n/g, "\\n")) : item;
      } catch (e) { return null; }

      return (
        <ReviewCard 
          key={index}
          userName={reviewData.username || "Anonymous"} 
          rating={reviewData.rating || 0} 
          comment={reviewData.text || ""} 
          image={reviewData.image}
          userAvatar={reviewData.userAvatar} 
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <TouchableOpacity onPress={() => router.back()} style={styles.floatingBackButton}>
        <Ionicons name="arrow-back" size={22} color="black" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={isWeb ? styles.webScrollContent : styles.mobileScrollContent}>
        
        {/* TOP SECTION: WHITE BANNER (Smaller height) */}
        <View style={isWeb ? styles.webBannerContainer : styles.bannerContainer}>
          <Image source={{ uri: product.image }} style={isWeb ? styles.webMainImage : styles.mainImage} />
          {isWeb && (
            <View style={styles.webHeaderInfo}>
               <Text style={styles.webTitleText}>{product.name}</Text>
               <RatingBox rating={product.rating} reviewCount={reviews.length} />
            </View>
          )}
        </View>

        {/* BOTTOM SECTION: GRID CONTENT */}
        <View style={[styles.contentLayout, isWeb && styles.webRow]}>
          
          {/* LEFT COLUMN: Specs */}
          <View style={isWeb ? styles.leftCol : styles.mobileInfoContainer}>
            {!isWeb && (
              <View style={styles.mobileTitleBox}>
                <RatingBox rating={product.rating} />
                <Text style={styles.brandTag}>{product.brand}</Text>
                <Text style={styles.title}>{product.name}</Text>
              </View>
            )}
            <SpecsSection 
              specs={[
                { label: "Resolution", value: product.resolution, icon: "tv-outline" },
                { label: "Refresh Rate", value: `${product.refreshRate}Hz`, icon: "speedometer-outline" },
                { label: "Panel Type", value: product.panelType, icon: "layers-outline" },
              ]} 
            />
          </View>

          {/* RIGHT COLUMN: Reviews */}
          <View style={isWeb ? styles.rightCol : styles.mobileInfoContainer}>
            <View style={styles.reviewHeaderRow}>
              <Text style={styles.reviewSectionTitle}>User Reviews</Text>
              <TouchableOpacity 
                style={styles.inlineWriteBtn}
                onPress={() => router.push({ pathname: "/ReviewModal", params: { id } })}
              >
                <Ionicons name="create-outline" size={18} color="#4654eb" />
                <Text style={styles.inlineWriteBtnText}>Write Review</Text>
              </TouchableOpacity>
            </View>

            {renderReviewItems()}
            {reviews.length === 0 && <Text style={styles.noReviewsText}>No reviews yet</Text>}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Background fixed to Grey
  container: { flex: 1, backgroundColor: "#F2F2F2" }, 
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F2F2F2" },
  
  webScrollContent: { alignSelf: 'center', width: '100%', maxWidth: 1200, paddingBottom: 50 },
  mobileScrollContent: { paddingBottom: 120 },
  contentLayout: { paddingHorizontal: 20 },
  webRow: { flexDirection: 'row', marginTop: 20, gap: 20, alignItems: 'flex-start' },
  
  // Banner fixed to White and smaller
  webBannerContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#FFFFFF', // White banner
    borderRadius: 16, 
    marginHorizontal: 20,
    marginTop: 20,
    padding: 30, // Reduced padding to make it smaller
    height: 280, // Fixed height to keep it from being too big
    alignItems: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  bannerContainer: { width: '100%', height: 300, backgroundColor: '#FFFFFF' },
  mainImage: { width: "100%", height: "100%", resizeMode: "contain" },
  webMainImage: { width: 300, height: 220, resizeMode: "contain" }, // Reduced image size
  
  webHeaderInfo: { flex: 1, paddingLeft: 40 },
  webTitleText: { fontSize: 28, fontWeight: '800', marginBottom: 15, color: '#1A1A1A' },

  // Columns
  leftCol: { 
    width: 320, 
    backgroundColor: '#FFFFFF', 
    padding: 20, 
    borderRadius: 16, 
  },
  rightCol: { flex: 1 },
  mobileInfoContainer: { marginTop: 10 },
  mobileTitleBox: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, marginBottom: 15 },

  // Interface Elements
  floatingBackButton: {
    position: "absolute", top: 20, left: 20,
    zIndex: 99, backgroundColor: "white", width: 40, height: 40, borderRadius: 20,
    justifyContent: "center", alignItems: "center", shadowOpacity: 0.1, shadowRadius: 5,
  },
  brandTag: { color: "#888", fontWeight: "700", textTransform: "uppercase", fontSize: 11, marginTop: 10 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 10 },
  reviewHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  reviewSectionTitle: { fontSize: 18, fontWeight: "700" },
  inlineWriteBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#E0E0E0' },
  inlineWriteBtnText: { color: '#4654eb', fontWeight: '700', marginLeft: 5, fontSize: 13 },
  noReviewsText: { textAlign: 'center', color: '#999', marginTop: 20 },
});