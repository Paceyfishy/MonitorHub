import MonitorItem from "@/interfaces/MonitorItem";
import { getAllMonitors } from "@/lib/monitorApi";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

const CARD_WIDTH =
  screenWidth >= 1400
    ? 280
    : screenWidth >= 1200
      ? 260
      : screenWidth >= 900
        ? 240
        : screenWidth >= 600
          ? 220
          : screenWidth / 2 - 24;

export default function MonitorGrid() {
  const [monitors, setMonitors] = useState<MonitorItem[]>([]);

  const router = useRouter();

  const loadMonitors = async () => {
    const data = await getAllMonitors();

    setMonitors(data);
  };

  useEffect(() => {
    loadMonitors();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.grid}>
        {monitors.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/products",
                params: { id: item.id },
              })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />

            <Text numberOfLines={2} style={styles.monitorName}>
              {item.name}
            </Text>

            <Text style={styles.price}>{item.price}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: "#ffffff",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    gap: 16,
    maxWidth: 1700,
  },

  card: {
    width: CARD_WIDTH,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 5,
  },

  image: {
    width: "100%",
    height: 140,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: "contain",
  },

  monitorName: {
    color: "black",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },

  price: {
    color: "#4654eb",
    fontWeight: "bold",
    fontSize: 16,
  },
});
