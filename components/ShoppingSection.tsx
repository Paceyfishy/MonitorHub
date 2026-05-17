import { getShoppingResults } from "@/lib/monitorApi";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Linking,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type Props = {
  monitorName: string;
};

export default function ShoppingSection({ monitorName }: Props) {
  const [shoppingResults, setShoppingResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopping = async () => {
      try {
        const data = await getShoppingResults(monitorName);
        setShoppingResults(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopping();
  }, [monitorName]);

  const handleOpenStore = (url: string) => {
    Linking.openURL(url).catch(() => {
      console.log("Failed to open URL:", url);
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Where to Buy</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4654eb" />
          <Text style={styles.loadingText}>Finding best prices...</Text>
        </View>
      </View>
    );
  }

  if (shoppingResults.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Where to Buy</Text>
        <View style={styles.emptyStateContainer}>
          <Ionicons name="search-outline" size={48} color="#d0d0d0" />
          <Text style={styles.emptyStateText}>No prices found</Text>
          <Text style={styles.emptyStateSubtext}>
            Check back later for pricing
          </Text>
        </View>
      </View>
    );
  }

  const numColumns = Platform.OS === "web" ? 4 : 2;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Where to Buy</Text>
        <Text style={styles.resultCount}>{shoppingResults.length} options</Text>
      </View>

      <FlatList
        scrollEnabled={false}
        numColumns={numColumns}
        data={shoppingResults}
        keyExtractor={(_, index) => index.toString()}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.gridContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.shopCard}
            onPress={() => handleOpenStore(item.link)}
            activeOpacity={0.7}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.shopImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.cardContent}>
              <Text numberOfLines={2} style={styles.shopTitle}>
                {item.title}
              </Text>

              <View style={styles.storeRow}>
                <Ionicons name="storefront-outline" size={14} color="#8E8E93" />
                <Text style={styles.shopStore} numberOfLines={1}>
                  {item.store}
                </Text>
              </View>

              <View style={styles.priceContainer}>
                <Text style={styles.shopPrice}>{item.price}</Text>
                <View style={styles.visitButton}>
                  <Ionicons name="open-outline" size={14} color="#4654eb" />
                </View>
              </View>
            </View>

            <View style={styles.cardOverlay} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 25,
    marginHorizontal: 0,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: Platform.OS === "web" ? 0 : 0,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1C1C1E",
    letterSpacing: 0.3,
  },

  resultCount: {
    fontSize: 14,
    color: "#8E8E93",
    fontWeight: "600",
  },

  loadingContainer: {
    paddingVertical: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 12,
    color: "#8E8E93",
    fontSize: 14,
    fontWeight: "500",
  },

  emptyStateContainer: {
    paddingVertical: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyStateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
    marginTop: 16,
  },

  emptyStateSubtext: {
    fontSize: 13,
    color: "#8E8E93",
    marginTop: 6,
  },

  gridContent: {
    paddingBottom: 8,
  },

  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 12,
  },

  shopCard: {
    flex: Platform.OS === "web" ? 0.23 : 0.48,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginRight: Platform.OS === "web" ? 12 : 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    minHeight: 280,
  },

  imageContainer: {
    backgroundColor: "#f8f8f8",
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  shopImage: {
    width: "100%",
    height: "100%",
  },

  cardContent: {
    padding: 12,
    flex: 1,
    justifyContent: "space-between",
  },

  shopTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1C1C1E",
    lineHeight: 18,
  },

  storeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
    marginBottom: 8,
  },

  shopStore: {
    fontSize: 12,
    color: "#8E8E93",
    fontWeight: "500",
  },

  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },

  shopPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4654eb",
  },

  visitButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#f0f0ff",
    justifyContent: "center",
    alignItems: "center",
  },

  cardOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
    opacity: 0,
    pointerEvents: "none",
  },
});
