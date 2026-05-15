import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Platform,
  StatusBar,
  ActivityIndicator 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { RatingBox } from "@/components/RatingBox";
import { SpecsSection } from "@/components/SpecsSection";
import { ReviewCard } from "@/components/ReviewCard";
import { getMonitorById } from "@/lib/monitorApi";
import MonitorItem from "@/interfaces/MonitorItem";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<MonitorItem | null>(null);

  useEffect(() => {
    getMonitorById(id as string).then(setProduct);
  }, [id]);

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4654eb" />
      </View>
    );
  }

  const renderHeader = () => (
    <View>
      <View style={styles.bannerContainer}>
        {product.image ? (
          <Image source={{ uri: product.image }} style={styles.mainImage} />
        ) : (
          <View style={styles.placeholderBanner}>
            <Ionicons name="desktop-outline" size={50} color="#E0E0E0" />
            <Text style={styles.placeholderText}>{product.name}</Text>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <RatingBox rating={product.rating} />
        <Text style={styles.brandTag}>{product.brand}</Text>
        <Text style={styles.title}>{product.name}</Text>

        <SpecsSection 
          specs={[
            { label: "Resolution", value: product.resolution, icon: "tv-outline" },
            { label: "Refresh Rate", value: `${product.refreshRate}Hz`, icon: "speedometer-outline" },
            { label: "Panel Type", value: product.panelType, icon: "layers-outline" },
          ]} 
        />

        <View style={styles.reviewHeaderRow}>
          <View>
            <Text style={styles.reviewSectionTitle}>User Reviews</Text>
            <Text style={styles.reviewCount}>{(product as any).reviews?.length || 0} reviews</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.inlineWriteBtn}
            onPress={() => router.push({ pathname: "/ReviewModal", params: { id } })}
          >
            <Ionicons name="create-outline" size={18} color="#4654eb" />
            <Text style={styles.inlineWriteBtnText}>Write</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <TouchableOpacity onPress={() => router.back()} style={styles.floatingBackButton}>
        <Ionicons name="arrow-back" size={22} color="black" />
      </TouchableOpacity>

    
      <FlatList
        ListHeaderComponent={renderHeader}
        // 1. Basic check: if reviews array exists and is not empty, use it
        data={(product as any).reviews?.length > 0 ? (product as any).reviews : []} 
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.noReviewsText}>No reviews yet</Text>}
        contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 20 }}
        renderItem={({ item }) => {
        // 2. Parse the string from DB into an object
        let reviewData;
        try {
            reviewData = typeof item === 'string' ? JSON.parse(item.replace(/\n/g, "\\n")) : item;
        } catch (e) {
            return null; // Skip if data is broken
        }

        // 3. Render the card with the EXACT keys from your JSON
        return (
            <ReviewCard 
            userName={reviewData.username || "Anonymous"} 
            rating={reviewData.rating || 0} 
            comment={reviewData.text || ""} // Your JSON uses "text"
            image={reviewData.image}
            userAvatar={reviewData.userAvatar} 
            />
        );
        }}
      />

      <View style={styles.bottomBarContainer}>
        <SafeAreaView edges={['bottom']}>
          <View style={styles.bottomBarContent}>
            <View style={styles.monitorInfoContainer}>
              <Text numberOfLines={1} style={styles.bottomMonitorName}>{product.name}</Text>
              <Text style={styles.bottomPriceText}>฿{product.price.toLocaleString()}</Text>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  floatingBackButton: {
    position: "absolute", top: Platform.OS === 'ios' ? 60 : 40, left: 20,
    zIndex: 99, backgroundColor: "white", width: 45, height: 45, borderRadius: 22.5,
    justifyContent: "center", alignItems: "center", elevation: 8,
    shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6,
  },
  bannerContainer: { width: '100%', height: 350 },
  mainImage: { width: "100%", height: "100%", resizeMode: "contain" },
  placeholderBanner: { width: "100%", height: "100%", backgroundColor: "#F9F9FB", justifyContent: "center", alignItems: "center", padding: 30 },
  placeholderText: { fontSize: 26, fontWeight: "800", color: "#D1D1D6", textAlign: "center", marginTop: 10 },
  infoContainer: { paddingHorizontal: 24, paddingTop: 10, marginTop: -30, backgroundColor: 'white', borderTopLeftRadius: 32, borderTopRightRadius: 32 },
  brandTag: { color: "#888", fontWeight: "700", textTransform: "uppercase", fontSize: 11, marginTop: 15 },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 20 },
  reviewHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 35, marginBottom: 20 },
  reviewSectionTitle: { fontSize: 20, fontWeight: "700" },
  reviewCount: { fontSize: 13, color: '#999' },
  inlineWriteBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F7FF', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 25 },
  inlineWriteBtnText: { color: '#4654eb', fontWeight: '700', marginLeft: 5 },
  noReviewsText: { textAlign: 'center', color: '#999', marginTop: 20 },
  bottomBarContainer: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "white", borderTopWidth: 1, borderTopColor: "#F2F2F2", elevation: 10 },
  bottomBarContent: { flexDirection: "row", alignItems: "center", paddingHorizontal: 24, height: Platform.OS === 'ios' ? 85 : 95 },
  monitorInfoContainer: { flex: 1 },
  bottomMonitorName: { fontSize: 18, fontWeight: "700" },
  bottomPriceText: { fontSize: 14, color: "#666", fontWeight: '500' },
});