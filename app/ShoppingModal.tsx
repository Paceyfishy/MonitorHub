import { getShoppingResults } from "@/lib/monitorApi";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Linking,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  monitorName: string;
  visible: boolean;
  onClose: () => void;
};

export default function ShoppingModal({
  monitorName,
  visible,
  onClose,
}: Props) {
  const [shoppingResults, setShoppingResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!visible) {
      setLoading(true);
      setShoppingResults([]);
      return;
    }

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
  }, [visible, monitorName]);

  const handleOpenStore = (url: string) => {
    Linking.openURL(url).catch(() => {
      console.log("Failed to open URL:", url);
    });
  };

  const numColumns = Platform.OS === "web" ? 3 : 2;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Where to Buy</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color="#1C1C1E" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4654eb" />
            <Text style={styles.loadingText}>Finding best prices...</Text>
          </View>
        ) : shoppingResults.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Ionicons name="search-outline" size={60} color="#d0d0d0" />
            <Text style={styles.emptyStateText}>No prices found</Text>
            <Text style={styles.emptyStateSubtext}>
              Check back later for pricing information
            </Text>
          </View>
        ) : (
          <View style={styles.content}>
            <View style={styles.countRow}>
              <Text style={styles.countText}>
                Found {shoppingResults.length} pricing options
              </Text>
            </View>

            <FlatList
              data={shoppingResults}
              numColumns={numColumns}
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
                    <Text numberOfLines={3} style={styles.shopTitle}>
                      {item.title}
                    </Text>

                    <View style={styles.storeRow}>
                      <Ionicons
                        name="storefront-outline"
                        size={14}
                        color="#8E8E93"
                      />
                      <Text style={styles.shopStore} numberOfLines={1}>
                        {item.store}
                      </Text>
                    </View>

                    <View style={styles.priceContainer}>
                      <Text style={styles.shopPrice}>{item.price}</Text>
                      <View style={styles.visitButton}>
                        <Ionicons
                          name="arrow-forward"
                          size={16}
                          color="#4654eb"
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1C1C1E",
  },

  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  countRow: {
    marginBottom: 16,
  },

  countText: {
    fontSize: 14,
    color: "#8E8E93",
    fontWeight: "500",
  },

  loadingContainer: {
    flex: 1,
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyStateText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1C1C1E",
    marginTop: 16,
  },

  emptyStateSubtext: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 8,
    textAlign: "center",
  },

  gridContent: {
    paddingBottom: 20,
  },

  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },

  shopCard: {
    flex: 0.48,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    minHeight: 300,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },

  imageContainer: {
    backgroundColor: "#f8f8f8",
    height: 160,
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
    marginTop: 10,
    marginBottom: 10,
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
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },

  shopPrice: {
    fontSize: Platform.select({ web: 18, default: 14 }),
    fontWeight: "700",
    color: "#4654eb",
  },

  visitButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#f0f0ff",
    justifyContent: "center",
    alignItems: "center",
  },
});
