import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import MonitorDropdown from '@/components/MonitorDropdown';
import RatingDisplay from '@/components/RatingDisplay';
import TechnicalDetails from '@/components/TechnicalDetails';

const monitorData = [
  {
    id: "1",
    name: "A271 (27\")",
    image: "https://dummyimage.com/200x200/333/fff.png&text=A271",
    rating: "4.6",
    specs: { price: "$250", res: "1920x1080", refresh: "100Hz", panel: "IPS", size: "27\"", response: "6ms" }
  },
  {
    id: "2",
    name: "G271 (27\")",
    image: "https://dummyimage.com/200x200/333/fff.png&text=G271",
    rating: "4.7",
    specs: { price: "$299", res: "1920x1080", refresh: "165Hz", panel: "IPS", size: "27\"", response: "1ms" }
  },
  {
    id: "3",
    name: "Samsung Odyssey",
    image: "https://dummyimage.com/200x200/333/fff.png&text=Samsung",
    rating: "4.9",
    specs: { price: "$399", res: "3840x2160", refresh: "240Hz", panel: "VA", size: "32\"", response: "0.5ms" }
  },
  // เพิ่มข้อมูลอื่นๆ ให้ครบ 10 รายการเพื่อให้เลื่อนใน Dropdown ได้
];

export default function CompareScreen() {
  const [leftId, setLeftId] = useState("1");
  const [rightId, setRightId] = useState("2");

  const leftM = monitorData.find(m => m.id === leftId) || monitorData[0];
  const rightM = monitorData.find(m => m.id === rightId) || monitorData[1];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Comparison</Text>

        <View style={styles.headerRow}>
          <Image source={{ uri: leftM.image }} style={styles.img} />
          <Text style={styles.vs}>VS</Text>
          <Image source={{ uri: rightM.image }} style={styles.img} />
        </View>

        <View style={styles.ratingRow}>
          <RatingDisplay score={leftM.rating} />
          <RatingDisplay score={rightM.rating} />
        </View>

        <View style={styles.dropdownRow}>
          <MonitorDropdown data={monitorData} selectedId={leftId} onSelect={setLeftId} />
          <MonitorDropdown data={monitorData} selectedId={rightId} onSelect={setRightId} />
        </View>

        <TechnicalDetails 
          leftSpecs={leftM.specs} 
          rightSpecs={rightM.specs} 
          leftName={leftM.name} 
          rightName={rightM.name} 
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingTop: 60 },
  title: { color: 'white', fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  img: { width: 120, height: 90, resizeMode: 'contain', backgroundColor: '#1e1e1e', borderRadius: 10 },
  vs: { color: '#444', fontWeight: 'bold', marginHorizontal: 20, fontSize: 18 },
  ratingRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 },
  dropdownRow: { flexDirection: 'row', paddingHorizontal: 12, marginBottom: 25 },
});