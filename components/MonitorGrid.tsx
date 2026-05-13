import {View,Text,FlatList,Image,TouchableOpacity,StyleSheet,Dimensions,} from "react-native";
import { useState, useEffect } from "react";
import MonitorItem from "@/interfaces/MonitorItem";
import { getAllMonitors } from "@/lib/monitorApi";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 16;

export default function MonitorGrid () {

  const [monitors, setMonitors] = useState<MonitorItem[]>([]);
  
  const loadMonitors = async () => {

    const data = await getAllMonitors();

    setMonitors(data);
  };

  useEffect(() => {

    loadMonitors();

  }, []);
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


  return(
    <FlatList
            data={monitors}
            renderItem={renderMonitorCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
  );
};



  const styles = StyleSheet.create({

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
       // For IOS
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
  
      // For Android
      elevation: 5,
    },
  
    image: {
      width: "100%",
      height: 90,
      borderRadius: 8,
      marginBottom: 8,
    },
  
    monitorName: {
      color: "black",
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
