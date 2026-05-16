import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, Platform ,Dimensions, useWindowDimensions} from 'react-native';
import MonitorDropdown from '@/components/MonitorDropdown';
import RatingDisplay from '@/components/RatingDisplay';
import TechnicalDetails from '@/components/TechnicalDetails';
import { getAllMonitors } from "@/lib/monitorApi";
import MonitorItem from "@/interfaces/MonitorItem";


export default function CompareScreen() {
  const { width: screenWidth } = useWindowDimensions();
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
    refreshRaw: m.refreshRate,      
    panel: m.panelType,
    size: `${m.screenSize}"`,
    response: `${m.responseTime}ms`,
    responseRaw: m.responseTime,    
    contrast: m.contrastRatio,
    color: m.colorDepth,
    adaptive: Array.isArray(m.adaptiveSync) ? m.adaptiveSync.join(", ") : m.adaptiveSync || "None",
    weight: m.weight,
    dimensions: m.dimensions,
    vesa: m.vesaMount ? "Supported" : "Not Supported"
  }) : {};

  if (loading) return <View style={styles.center}><ActivityIndicator color="#4654eb" /></View>;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Compare Monitors</Text>

        <View style={[styles.mainComparisonWrapper, { width: Platform.OS === 'web' ? (screenWidth > 1024 ?  800 : '80%') : 350}]}>
          
          <View style={styles.columnBox}>
            <View style={styles.imgCard}>
              <Image source={{ uri: leftM?.image }} style={styles.img} />
            </View>
            <View style={styles.ratingContainer}>
              <RatingDisplay score={leftM?.rating.toString() || "0"} />
            </View>
            <MonitorDropdown data={monitors} selectedId={leftId} onSelect={setLeftId} />
          </View>

          <View style={styles.vsSpace}>
            <View style={styles.vsCircle}><Text style={styles.vsText}>VS</Text></View>
          </View>


          <View style={styles.columnBox}>
            <View style={styles.imgCard}>
              <Image source={{ uri: rightM?.image }} style={styles.img} />
            </View>
            <View style={styles.ratingContainer}>
              <RatingDisplay score={rightM?.rating.toString() || "0"} />
            </View>
            <MonitorDropdown data={monitors} selectedId={rightId} onSelect={setRightId} />
          </View>
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
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingTop: 60 , alignItems: 'center',},
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' },
  title: { fontSize: 24, fontWeight: '800', textAlign: 'center', marginBottom: 25, color: '#1A1A1A' },
  mainComparisonWrapper : { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'flex-start', 
    alignSelf: 'center',
    marginTop: 10,
  },
  imgCard: { 
    backgroundColor: '#FFFFFF',
    borderRadius: 24, 
    padding: Platform.OS === 'web' ? 15 : 8, 
    width: "100%", 
    height: Platform.OS === 'web' ? 240 : 140,
    justifyContent: 'center', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#F0F0F0',
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 6, 
      },
      web: {
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.06)'
      }
    })
  },
  img: { width: '100%', height: '100%', resizeMode: 'contain' },
  vsCircle: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#4654eb', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginHorizontal: 16, 
    zIndex: 10, 
    elevation: 4,
    borderWidth: 3,
    borderColor: 'white'
  },
  vsText: { color: 'white', fontWeight: '900', fontSize: 13 },
  ratingRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  dropdownRow: { flexDirection: 'row', paddingHorizontal: 16, marginTop: 25, gap: 10 },
  columnBox: {
    flex: 1,
    alignItems: 'stretch', 
  },
  vsSpace: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Platform.OS === 'web' ? 240 : 140, 
    paddingHorizontal: Platform.OS === 'web' ? 24 : 4,
  },
  ratingContainer: {
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 14,
  },
});