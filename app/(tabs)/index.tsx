// app/(tabs)/index.tsx

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import CategoryButtons from "@/components/CategoryButtons";
import SearchBox from "@/components/SearchBox";
import { useRouter } from "expo-router";

const monitorData = [
  {
    id: "1",
    name: "LG UltraGear",
    price: "$299",
    image:
      "https://dummyimage.com/300x300/cccccc/000000.png&text=LG",
  },
  {
    id: "2",
    name: "Samsung Odyssey",
    price: "$399",
    image:
      "https://dummyimage.com/300x300/cccccc/000000.png&text=Samsung",
  },
  {
    id: "3",
    name: "ASUS TUF",
    price: "$249",
    image:
      "https://dummyimage.com/300x300/cccccc/000000.png&text=ASUS",
  },
  {
    id: "4",
    name: "MSI Optix",
    price: "$279",
    image:
      "https://dummyimage.com/300x300/cccccc/000000.png&text=MSI",
  },
  {
    id: "5",
    name: "AOC Gaming",
    price: "$199",
    image:
      "https://dummyimage.com/300x300/cccccc/000000.png&text=AOC",
  },
  {
    id: "6",
    name: "AOC Gaming",
    price: "$199",
    image:
      "https://dummyimage.com/300x300/cccccc/000000.png&text=AOC",
  },
  {
    id: "7",
    name: "AOC Gaming",
    price: "$199",
    image:
      "https://dummyimage.com/300x300/cccccc/000000.png&text=AOC",
  },
  {
    id: "8",
    name: "AOC Gaming",
    price: "$199",
    image:
      "https://dummyimage.com/300x300/cccccc/000000.png&text=AOC",
  },
  {
    id: "9",
    name: "AOC Gaming",
    price: "$199",
    image:
      "https://dummyimage.com/300x300/cccccc/000000.png&text=AOC",
  },
];

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 16;

export default function HomeScreen() {
  const router = useRouter();
  const renderMonitorCard = ({ item }: any) => {
    return (
      <TouchableOpacity style={styles.card} 
      onPress={() => router.push({
        pathname: "/products",
        params: { id: item.id }
      })}>
        <Image source={{ uri: item.image }} style={styles.image} />

        <Text numberOfLines={2} style={styles.monitorName}>
          {item.name}
        </Text>

        <Text style={styles.price}>{item.price}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>MonitorHub</Text>
        <SearchBox/>
        <View>
          <CategoryButtons/>
        </View>

      </View>
      
      <FlatList
        data={monitorData}
        renderItem={renderMonitorCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 50,
    width: "100%"
  },

  headerContainer: {
    backgroundColor: "#187ae3",
  },

  header: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginBottom: 20,
    backgroundColor: "#e318be",
  
  },

  listContainer: {
    paddingHorizontal: 8,
    paddingBottom: 20,
    borderWidth: 5,
    backgroundColor: "#ffffff",
  },

  row: {
    justifyContent: "space-between",
  },

  card: {
    width: cardWidth,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
     // iOS Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // Android Shadow
    elevation: 5,
  },

  image: {
    width: "100%",
    height: 90,
    borderRadius: 8,
    marginBottom: 8,
  },

  monitorName: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },

  price: {
    color: "#4654eb",
    fontWeight: "bold",
    fontSize: 14,
  },
});