import MonitorItem from "@/interfaces/MonitorItem";
import { getAllMonitors, getMonitorsByCategory } from "@/lib/monitorApi";
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

interface MonitorGridProps {
  category?: string;
}

export default function MonitorGrid({ category = "All" }: MonitorGridProps) {
  const [monitors, setMonitors] = useState<MonitorItem[]>([]);

  const router = useRouter();

  const loadMonitors = async () => {
    let data: MonitorItem[];

    if (category === "All") {
      data = await getAllMonitors();
    } else {
      data = await getMonitorsByCategory(category);
    }

    setMonitors(data);
  };

  useEffect(() => {
    loadMonitors();
  }, [category]);

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

            <Text style={styles.brand}>
              {item.brand}
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
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: 1700,
    alignSelf: "center",
    justifyContent: "center",
  },

  card: {
    width: CARD_WIDTH,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 10,
    margin: 8,

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
    fontSize: 14,
  },
  brand: {
    color: "#8E8E93",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
    textTransform: "uppercase",
  },
});
