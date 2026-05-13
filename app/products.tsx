import React from "react";
import { 
  View, 
  Text, 
  Image, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Platform,
  StatusBar 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// --- Components ---
import { RatingBox } from "@/components/RatingBox";
import { SpecsSection } from "@/components/SpecsSection";
import { ReviewCard } from "@/components/ReviewCard";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  /**
   * DATA SOURCE
   * If 'image' is missing or null, the placeholder text will show.
   */
  const product = {
    name: "UltraGear 27GR95QE",
    brand: "LG",
    price: 29990,
    rating: 4.8,
    image: null, // Test: Change to your URL to see the image return
    specs: [
      { label: "Resolution", value: "2560x1440", icon: "tv-outline" as const },
      { label: "Refresh Rate", value: "240Hz", icon: "speedometer-outline" as const },
      { label: "Panel Type", value: "OLED", icon: "layers-outline" as const },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Alex Chen",
        userAvatar: "https://i.pravatar.cc/150?u=alex",
        rating: 4.9,
        comment: "Excellent color accuracy for design work. The factory calibration was spot on.",
        image: "https://dummyimage.com/600x400/2c3e50/ffffff&text=Setup+View",
        isVerified: true
      }
    ]
  };

  const renderHeader = () => (
    <View>
      {/* BANNER SECTION: Image or Monitor Name Placeholder */}
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
        {/* Rating Box - Always First */}
        <RatingBox rating={product.rating} />

        <Text style={styles.brandTag}>{product.brand}</Text>
        <Text style={styles.title}>{product.name}</Text>

        <SpecsSection specs={product.specs} />

        {/* Review Section Header with Write Button */}
        <View style={styles.reviewHeaderRow}>
          <View>
            <Text style={styles.reviewSectionTitle}>User Reviews</Text>
            <Text style={styles.reviewCount}>{product.reviews.length} reviews</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.inlineWriteBtn}
            onPress={() => router.push({ pathname: "/ReviewModal", params: { id } })}
          >
            <Ionicons name="create-outline" size={18} color="#007AFF" />
            <Text style={styles.inlineWriteBtnText}>Write</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Floating Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.floatingBackButton}>
        <Ionicons name="arrow-back" size={22} color="black" />
      </TouchableOpacity>

      <FlatList
        data={product.reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 24 }}>
            <ReviewCard {...item} />
          </View>
        )}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={<View style={{ height: 120 }} />}
        showsVerticalScrollIndicator={false}
      />

      {/* Fixed Bottom Navigation */}
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
  floatingBackButton: {
    position: "absolute",
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
    zIndex: 99,
    backgroundColor: "white",
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  bannerContainer: {
    width: '100%',
    height: 350,
  },
  mainImage: { 
    width: "100%", 
    height: "100%", 
    resizeMode: "contain" 
  },
  placeholderBanner: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F9F9FB",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  placeholderText: {
    fontSize: 26,
    fontWeight: "800",
    color: "#D1D1D6",
    textAlign: "center",
    marginTop: 10
  },
  infoContainer: { 
    paddingHorizontal: 24, 
    paddingTop: 10, 
    marginTop: -30, 
    backgroundColor: 'white', 
    borderTopLeftRadius: 32, 
    borderTopRightRadius: 32 
  },
  brandTag: { color: "#888", fontWeight: "700", textTransform: "uppercase", fontSize: 11, marginTop: 15 },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 20 },
  
  reviewHeaderRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center', 
    marginTop: 35, 
    marginBottom: 20 
  },
  reviewSectionTitle: { fontSize: 20, fontWeight: "700" },
  reviewCount: { fontSize: 13, color: '#999' },
  inlineWriteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
  },
  inlineWriteBtnText: { color: '#007AFF', fontWeight: '700', marginLeft: 5 },

  bottomBarContainer: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    backgroundColor: "white", borderTopWidth: 1, borderTopColor: "#F2F2F2",
    elevation: 10, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10
  },
  bottomBarContent: {
    flexDirection: "row", alignItems: "center", paddingHorizontal: 24,
    height: Platform.OS === 'ios' ? 85 : 95,
  },
  monitorInfoContainer: { flex: 1 },
  bottomMonitorName: { fontSize: 18, fontWeight: "700" },
  bottomPriceText: { fontSize: 14, color: "#666", fontWeight: '500' },
});