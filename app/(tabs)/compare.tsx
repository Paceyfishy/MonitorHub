import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import MonitorDropdown from '@/components/MonitorDropdown';
import RatingDisplay from '@/components/RatingDisplay';
import TechnicalDetails from '@/components/TechnicalDetails';
import { getAllMonitors } from "@/lib/monitorApi";
import MonitorItem from "@/interfaces/MonitorItem";

export default function CompareScreen() {
  const [monitors, setMonitors] = useState<MonitorItem[]>([]);
  const [leftId, setLeftId] = useState("");
  const [rightId, setRightId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllMonitors().then(data => {
      if (data?.length) {
        setMonitors(data);
        setLeftId(data[0].id);
        setRightId(data[1]?.id || data[0].id);
      }
      setLoading(false);
    });
  }, []);

  const leftM = monitors.find(m => m.id === leftId);
  const rightM = monitors.find(m => m.id === rightId);

  const mapSpecs = (m?: MonitorItem) => m ? ({
    price: `฿${m.price.toLocaleString()}`,
    res: m.resolution,
    refresh: `${m.refreshRate}Hz`,
    panel: m.panelType,
    size: `${m.screenSize}"`,
    response: `${m.responseTime}ms`
  }) : {};

  if (loading) return <View style={styles.center}><ActivityIndicator color="#4654eb" /></View>;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Compare Monitors</Text>

        <View style={styles.headerRow}>
          <View style={styles.imgCard}>
            <Image source={{ uri: leftM?.image }} style={styles.img} />
          </View>
          <View style={styles.vsCircle}><Text style={styles.vsText}>VS</Text></View>
          <View style={styles.imgCard}>
            <Image source={{ uri: rightM?.image }} style={styles.img} />
          </View>
        </View>

        <View style={styles.ratingRow}>
          <RatingDisplay score={leftM?.rating.toString() || "0"} />
          <RatingDisplay score={rightM?.rating.toString() || "0"} />
        </View>

        <View style={styles.dropdownRow}>
          <MonitorDropdown data={monitors} selectedId={leftId} onSelect={setLeftId} />
          <MonitorDropdown data={monitors} selectedId={rightId} onSelect={setRightId} />
        </View>

        <TechnicalDetails 
          leftSpecs={mapSpecs(leftM)} 
          rightSpecs={mapSpecs(rightM)} 
          leftName={leftM?.name || ""} 
          rightName={rightM?.name || ""} 
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingTop: 60 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' },
  title: { fontSize: 24, fontWeight: '800', textAlign: 'center', marginBottom: 25, color: '#1A1A1A' },
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 2,
    marginBottom: 10 
  },
  imgCard: { 
    backgroundColor: '#F8F9FB', 
    borderRadius: 24, 
    padding: 15, 
    width: 160, // Increased width
    height: 140, // Increased height
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#F0F0F0' 
  },
  img: { width: '100%', height: '100%', resizeMode: 'contain' },
  vsCircle: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#4654eb', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginHorizontal: -20, // Overlap the larger cards
    zIndex: 10, 
    elevation: 4,
    borderWidth: 3,
    borderColor: 'white'
  },
  vsText: { color: 'white', fontWeight: '900', fontSize: 13 },
  ratingRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  dropdownRow: { flexDirection: 'row', paddingHorizontal: 16, marginTop: 25, gap: 10 },
});