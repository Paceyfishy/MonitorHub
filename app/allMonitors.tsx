import SavedButton from "@/components/SavedButton";
import { allMonitors } from "@/constants/monitors";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import React from "react";
import {
    FlatList,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { getMonitorsByIds } from "@/lib/monitorApi";
import { useUser } from "@/context/UserContext";
import MonitorItem from "@/interfaces/MonitorItem";

export default function AllMonitorsScreen() {
  const isWeb = Platform.OS === "web";
  const [favorites, setFavorites] = useState<any[]>([]);
  const { currentUser } = useUser();

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

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Saved Monitors</Text>
        </View>
      </View>

      {isWeb ? (
        <FlatList
          key="web-list"
          data={favorites}
          keyExtractor={(item) => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapperWeb}   
          contentContainerStyle={styles.webListContent}
          renderItem={({ item }) => {
            const localMonitor = allMonitors.find((m) => m.id === item.id) as MonitorItem | undefined;
            const brandName = localMonitor?.brand || "MONITOR";
            
            return (
              <View style={styles.webCard}>
                <Image source={{ uri: item.image }} style={styles.monitorImageWeb} />
                <View style={styles.infoWrapper}>
                  <Text style={styles.monitorName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.brandTag} numberOfLines={1}>{brandName}</Text>
                  <View style={styles.priceActionRow}>
                    <Text style={styles.monitorPrice}>฿{typeof item.price === 'number' ? item.price.toLocaleString() : String(item.price || 0)}</Text>
                    <SavedButton monitorId={item.id} />
                  </View>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <FlatList
          key="mobile-list"
          data={favorites}
          keyExtractor={(item) => item.id}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.mobileListContent}
          renderItem={({ item }) => {
            const localMonitor = allMonitors.find((m) => m.id === item.id) as MonitorItem | undefined;
            const brandName = localMonitor?.brand || "MONITOR";
            return (
              <View style={styles.mobileCard}>
                <Image source={{ uri: item.image }} style={styles.monitorImageMobile} />
                <View style={styles.infoWrapper}>
                  <Text style={styles.monitorName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.brandTag} numberOfLines={1}>{brandName}</Text>
                  <View style={styles.priceActionRow}>
                    <Text style={styles.monitorPrice}>฿{typeof item.price === 'number' ? item.price.toLocaleString() : String(item.price || 0)}</Text>
                    <SavedButton monitorId={item.id} />
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingTop: 60,
  },
  headerWrapper: {
    width: "100%",
    maxWidth: 1200,
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4f46e5",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 20,
    color: "#111827",
  },
  webListContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
  },
  mobileListContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  columnWrapperWeb: {
    justifyContent: "flex-start",
    gap: 16,
  },
  webCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: "rgba(0, 0, 0, 0.06)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 20,
    ...Platform.select({
      web: {
        width: "31.5%",
      },
      default: {
        width: "100%",
      }
    })
  },
  mobileCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  monitorImageWeb: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    resizeMode: "contain",
    marginBottom: 12,
  },
  monitorImageMobile: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    resizeMode: "contain",
    marginBottom: 12,
  },
  infoWrapper: {
    flexDirection: "column",
  },
  monitorName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 22,
    marginBottom: 2,
  },
  brandTag: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4f46e5",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  priceActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  monitorPrice: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6b7280",
  },
});