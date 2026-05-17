import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RatingBox } from "@/components/RatingBox";
import { ReviewCard } from "@/components/ReviewCard";
import SavedButton from "@/components/SavedButton";
import ShoppingModal from "@/components/ShoppingModal";
import WhereToBuyButton from "@/components/WhereToBuyButton";
import { SpecsSection } from "@/components/SpecsSection";
import MonitorItem from "@/interfaces/MonitorItem";
import { getMonitorById, getMonitorReviews } from "@/lib/monitorApi";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<MonitorItem | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [shoppingModalVisible, setShoppingModalVisible] = useState(false);
  const allUserIds = reviews.map((rev) => rev.user?.id);
  const uniqueReviewersCount = new Set(allUserIds).size;
  const photosCount = reviews.filter((rev) => rev.image && rev.image.trim() !== "").length;

  useEffect(() => {
    if (id) {
      getMonitorById(id as string).then(setProduct);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {

      if (!id) return;

      getMonitorReviews(id as string).then(setReviews);

    }, [id])
  );

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4654eb" />
      </View>
    );
  }

  // --- RENDER FOR WEB ---
  if (Platform.OS === "web") {
    return (
      <View style={styles.webMainContainer}>
        <StatusBar barStyle="dark-content" />
        
        <View style={styles.webNavBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.webNavButton}>
            <Ionicons name="arrow-back" size={22} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.webContentGrid}>
          {/* ฝั่งซ้าย: รูปภาพและ Spec (Scroll แยกส่วน) */}
          <View style={styles.webLeftColumn}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
              <View style={styles.webImageCard}>
                <Image source={{ uri: product.image }} style={styles.webMainImage} resizeMode="contain" />
              </View>
              <View style={styles.webHorizontalDivider} />
              <SpecsSection
                specs={[
                  { label: "Resolution", value: product.resolution, icon: "tv-outline" },
                  { label: "Refresh Rate", value: `${product.refreshRate}Hz`, icon: "speedometer-outline" },
                  { label: "Panel Type", value: product.panelType, icon: "layers-outline" },
                  { label: "Contrast Ratio", value: product.contrastRatio, icon: "contrast-outline" },
                  { label: "Color Depth", value: product.colorDepth, icon: "color-palette-outline" },
                  { label: "Response Time", value: `${product.responseTime}ms`, icon: "flash-outline" },
                  { label: "Adaptive Sync", value: Array.isArray(product.adaptiveSync) ? product.adaptiveSync.join(", ") : "None", icon: "sync-outline" },
                  { label: "Weight", value: product.weight, icon: "barbell-outline" },
                  { label: "Dimensions", value: product.dimensions, icon: "cube-outline" },
                  { label: "VESA Mount", value: product.vesaMount ? "Supported" : "Not Supported", icon: "build-outline" },
                ]}
              />

            </ScrollView>
          </View>

          <View style={styles.webRightColumn}>
            <View style={styles.reviewHeaderRow}>
              <View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <Text style={styles.reviewSectionTitle}>User Reviews</Text>
                  <Text
                    style={styles.viewAllButton}
                    onPress={() => router.push({ pathname: "/allMonitorReviews", params: { id } })}
                  >
                    View All
                  </Text>
                </View>
                <Text style={styles.reviewCount}>{reviews.length} reviews</Text>
              </View>
              <TouchableOpacity 
                style={styles.inlineWriteBtn}
                onPress={() => router.push({ pathname: "/ReviewModal", params: { id } })}
              >
                <Ionicons name="create-outline" size={18} color="#fff" />
                <Text style={styles.inlineWriteBtnText}>Write</Text>
              </TouchableOpacity>
            </View>

            {/* 💡 แก้ไขจุดที่ 1 (Web): ย้ายและรวมกล่อง RatingBox ให้อยู่ตรงกลางพื้นที่รีวิว และส่ง Props เข้าไปครบถ้วน */}
            <View style={styles.webRatingWrapper}>
              <RatingBox 
                rating={product.rating} 
                reviewCount={uniqueReviewersCount} 
                photoCount={photosCount} 
              />
            </View>

            <FlatList
              data={reviews.slice(0, 4)} 
              keyExtractor={(_, index) => index.toString()}
              ListEmptyComponent={<Text style={styles.noReviewsText}>No reviews yet</Text>}
              contentContainerStyle={{ paddingBottom: 120 }}
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
        </View>

        <View style={styles.webBottomStickyBar}>
          <View style={styles.webBottomContent}>
            <View style={styles.webBottomTextGroup}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={styles.webBottomTitle} numberOfLines={1}>{product.name}</Text>
                <Text style={styles.brandTag}>{product.brand}</Text>
              </View>
              <Text style={styles.webBottomPrice}>฿{product.price.toLocaleString()}</Text>
            </View>
          </View>
          <WhereToBuyButton onPress={() => setShoppingModalVisible(true)} />
          <SavedButton monitorId={id as string} />
        </View>

        <ShoppingModal
          monitorName={product.name}
          visible={shoppingModalVisible}
          onClose={() => setShoppingModalVisible(false)}
        />
      </View>
    );
  }

  // --- RENDER FOR MOBILE ---
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
        {/* 💡 แก้ไขจุดที่ 2 (Mobile ท่อนบน): อัปเดตเพิ่มการส่ง Props สถิติตัวเลขจริงตรงหัวการ์ดมอนิเตอร์ */}
        <RatingBox 
          rating={product.rating} 
          reviewCount={uniqueReviewersCount} 
          photoCount={photosCount} 
        />
        
        <Text style={styles.brandTag}>{product.brand}</Text>
        <Text style={styles.title}>{product.name}</Text>

        <SpecsSection
          specs={[
            { label: "Resolution", value: product.resolution, icon: "tv-outline" },
            { label: "Refresh Rate", value: `${product.refreshRate}Hz`, icon: "speedometer-outline" },
            { label: "Panel Type", value: product.panelType, icon: "layers-outline" },
            { label: "Contrast Ratio", value: product.contrastRatio, icon: "contrast-outline" },
            { label: "Color Depth", value: product.colorDepth, icon: "color-palette-outline" },
            { label: "Response Time", value: `${product.responseTime}ms`, icon: "flash-outline" },
            { label: "Adaptive Sync", value: Array.isArray(product.adaptiveSync) ? product.adaptiveSync.join(", ") : "None", icon: "sync-outline" },
            { label: "Weight", value: product.weight, icon: "barbell-outline" },
            { label: "Dimensions", value: product.dimensions, icon: "cube-outline" },
            { label: "VESA Mount", value: product.vesaMount ? "Supported" : "Not Supported", icon: "build-outline" },
          ]}
        />

        <View style={styles.mobileReviewHeaderRow}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <Text style={styles.mobileReviewSectionTitle}>User Reviews</Text>
            </View>
            <Text style={styles.reviewCount}>{reviews.length} reviews</Text>
            <Text
                style={styles.viewAllButton}
                onPress={() => router.push({ pathname: "/allMonitorReviews", params: { id } })}
              >
                View All
              </Text>
          </View>
          <TouchableOpacity 
            style={styles.inlineWriteBtn}
            onPress={() => router.push({ pathname: "/ReviewModal", params: { id } })}
          >
            <Ionicons name="create-outline" size={18} color="#fff" />
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
        data={reviews.slice(0, 4)}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.noReviewsText}>No reviews yet</Text>}
        contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 20 }}
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

      <View style={styles.bottomBarContainer}>
        <SafeAreaView edges={['bottom']}>
          <View style={styles.bottomBarContent}>
            <View style={styles.monitorInfoContainer}>
              <Text numberOfLines={1} style={styles.bottomMonitorName}>{product.name}</Text>
              <Text style={styles.bottomPriceText}>฿{product.price.toLocaleString()}</Text>
            </View>
          </View>
          <WhereToBuyButton onPress={() => setShoppingModalVisible(true)} />
          <SavedButton monitorId={id as string} />
        </SafeAreaView>
      </View>

      <ShoppingModal
        monitorName={product.name}
        visible={shoppingModalVisible}
        onClose={() => setShoppingModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  brandTag: { color: "#4654eb", fontWeight: "700", textTransform: "uppercase", fontSize: 11, marginTop: 15, marginBottom: 8 },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 20 },
  noReviewsText: { textAlign: "center", color: "#8E8E93", marginTop: 40, fontSize: 16 },
  floatingBackButton: {
    position: "absolute", top: Platform.OS === 'ios' ? 60 : 40, left: 20, zIndex: 99,
    backgroundColor: "white", width: 45, height: 45, borderRadius: 22.5,
    justifyContent: "center", alignItems: "center", elevation: 8,
    shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6,
  },
  bannerContainer: { width: '100%', height: 350, },
  mainImage: { width: "100%", height: "100%", resizeMode: "contain" },
  placeholderBanner: { width: "100%", height: "100%", backgroundColor: "#F9F9FB", justifyContent: "center", alignItems: "center", padding: 30 },
  placeholderText: { fontSize: 26, fontWeight: "800", color: "#D1D1D6", textAlign: "center", marginTop: 10 },
  infoContainer: { paddingHorizontal: 24, paddingTop: 10, marginTop: -30, backgroundColor: 'white', borderTopLeftRadius: 32, borderTopRightRadius: 32 },
  bottomBarContainer: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "white", borderTopWidth: 1, borderTopColor: "#F2F2F2", elevation: 10 },
  bottomBarContent: { flexDirection: "row", alignItems: "center", paddingHorizontal: 24, height: Platform.OS === 'ios' ? 85 : 95 },
  monitorInfoContainer: { flex: 1 },
  bottomMonitorName: { fontSize: 18, fontWeight: "700" },
  bottomPriceText: { fontSize: 14, color: "#666", fontWeight: '500' },
  
  // --- WEB STYLES ---
  webMainContainer: { flex: 1, backgroundColor: "#ffffff" },
  webNavBar: { height: 60, justifyContent: "center", paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: "#F2F2F7" },
  webNavButton: { padding: 8 },
  webContentGrid: {
    flex: 1, flexDirection: "row", maxWidth: 1400, width: "100%", alignSelf: "center",
    paddingHorizontal: 40, paddingTop: 20, gap: 40, overflow: 'hidden' 
  },
  webLeftColumn: { flex: 0.35, height: '100%' }, 
  webRightColumn: { flex: 0.65, height: '100%' }, 
  webImageCard: { backgroundColor: "#fff", borderRadius: 20, padding: 20, alignItems: "center", justifyContent: "center", minHeight: 300 },
  webMainImage: { width: "100%", height: 300 },
  webHorizontalDivider: { height: 1, backgroundColor: "#F2F2F7", marginVertical: 25 },
  reviewHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  reviewSectionTitle: { fontSize: 24, fontWeight: "800", color: "#1C1C1E" },
  reviewCount: { fontSize: 14, color: "#8E8E93", marginTop: 4 },
  webRatingWrapper: { marginBottom: 25, width: "100%" },
  webBottomStickyBar: {
    position: "absolute", bottom: 0, left: 0, right: 0, height: 90, backgroundColor: "#ffffff",
    borderTopWidth: 1, borderTopColor: "#E5E5EA", flexDirection: "row", alignItems: "center",
    justifyContent: "center", paddingHorizontal: 40, zIndex: 1000,
    shadowColor: "#000", shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.05, shadowRadius: 10,
  },
  webBottomContent: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", maxWidth: 1200, width: "100%", gap: 12 },
  webBottomTextGroup: { flex: 1 },
  webBottomTitle: { fontSize: 20, fontWeight: "800", color: "#1C1C1E" },
  webBottomPrice: { fontSize: 14, color: "#8E8E93", marginTop: 2, fontWeight: "600" },
  inlineWriteBtn: { flexDirection: "row", alignItems: "center", backgroundColor: "#4654eb", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  inlineWriteBtnText: { color: "#fff", fontWeight: "700", marginLeft: 8 },
  viewAllButton: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4654eb"
  },
  mobileReviewHeaderRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginTop: 30,      
    marginBottom: 15,
  },
  mobileReviewSectionTitle: { 
    fontSize: 20,        
    fontWeight: "800", 
    color: "#1C1C1E" 
  },
});