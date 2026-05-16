import React from 'react';
import { View, Text, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TechnicalDetails({ leftSpecs, rightSpecs, leftName, rightName }: any) {

  const { width: screenWidth } = useWindowDimensions();
  
  const SpecRow = ({ icon, label, left, right, index , leftBetter, rightBetter}: any) => (
    <View style={[
      styles.specRow, 
      { backgroundColor: index % 2 !== 0 ? 'transparent' : '#F9F9FB' } // Zebra stripes
    ]}>
      <View style={styles.labelCol}>
        <MaterialCommunityIcons name={icon} size={16} color="#4654eb" />
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <Text style={[styles.valText, { color: leftBetter ? '#23d41a' : '#2C2C2E' }]}>{left}</Text>
      <Text style={[styles.valText, { color: rightBetter ? '#23d41a' : '#2C2C2E' }]}>{right}</Text>
    </View>
  );

const specs = [
    { icon: "tag-outline", label: "Price", left: leftSpecs?.price, right: rightSpecs?.price, 
      leftBetter: leftSpecs?.price < rightSpecs?.price,
      rightBetter: rightSpecs?.price < leftSpecs?.price
    },
    { icon: "monitor", label: "Resolution", left: leftSpecs?.res, right: rightSpecs?.res },
    { 
      icon: "speedometer", label: "Refresh", left: leftSpecs?.refresh, right: rightSpecs?.refresh,
      leftBetter: leftSpecs?.refreshRaw > rightSpecs?.refreshRaw,
      rightBetter: rightSpecs?.refreshRaw > leftSpecs?.refreshRaw
    },
    { icon: "poker-chip", label: "Panel", left: leftSpecs?.panel, right: rightSpecs?.panel },
    { 
      icon: "timer-outline", label: "Response", left: leftSpecs?.response, right: rightSpecs?.response,
      leftBetter: leftSpecs?.responseRaw < rightSpecs?.responseRaw,
      rightBetter: rightSpecs?.responseRaw < leftSpecs?.responseRaw
    },
    { icon: "contrast-box", label: "Contrast Ratio", left: leftSpecs?.contrast, right: rightSpecs?.contrast },
    { icon: "palette-outline", label: "Color Depth", left: leftSpecs?.color, right: rightSpecs?.color },
    { icon: "sync", label: "Adaptive Sync", left: leftSpecs?.adaptive, right: rightSpecs?.adaptive },
    { icon: "weight", label: "Weight", left: leftSpecs?.weight, right: rightSpecs?.weight ,
      leftBetter: leftSpecs?.weight < rightSpecs?.weight,
      rightBetter: rightSpecs?.weight < leftSpecs?.weight
    },
    { icon: "cube-outline", label: "Dimensions", left: leftSpecs?.dimensions, right: rightSpecs?.dimensions },
    { icon: "screwdriver", label: "VESA Mount", left: leftSpecs?.vesa, right: rightSpecs?.vesa, 
      leftBetter: leftSpecs?.vesa === "Supported",
      rightBetter: rightSpecs?.vesa === "Supported"
    },
  ];

  return (
    <View style={[
      styles.card,
      { width: Platform.OS === 'web' ? (screenWidth > 800 ? 800 : '100%') : 350 }
    ]} >
      <Text style={styles.cardTitle}>Specifications</Text>
      <View style={styles.nameRow}>
        <View style={{ flex: 1.2 }} />
        <Text style={styles.modelName} numberOfLines={1}>{leftName}</Text>
        <Text style={styles.modelName} numberOfLines={1}>{rightName}</Text>
      </View>
      
      {specs.map((item, idx) => (
        <SpecRow 
          key={idx}
          index={idx}
          icon={item.icon}
          label={item.label}
          left={item.left}
          right={item.right}
          leftBetter={item.leftBetter}
          rightBetter={item.rightBetter}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    backgroundColor: '#F2F2F7', 
    marginHorizontal: 16, 
    borderRadius: 28, 
    paddingVertical: 20, 
    marginTop: 20,
    overflow: 'hidden',
  },
  cardTitle: { fontSize: 17, fontWeight: '700', marginBottom: 15, paddingHorizontal: 20, color: '#1C1C1E' },
  nameRow: { 
    flexDirection: 'row', 
    marginBottom: 0, 
    paddingBottom: 10, 
    paddingHorizontal: 20,
    borderBottomWidth: 1, 
    borderBottomColor: '#E5E5EA' 
  },
  modelName: { flex: 1, fontSize: Platform.OS === 'web' ? 14 : 13, fontWeight: '800', color: '#4654eb', textAlign: 'center', textTransform: 'uppercase' },
  specRow: { 
    flexDirection: 'row', 
    paddingVertical: 14, 
    paddingHorizontal: 20,
  },
  labelCol: { flex: 1.2, flexDirection: 'row', alignItems: 'center' },
  labelText: { fontSize: Platform.OS === 'web' ? 13 : 12 , color: '#2424eed2', marginLeft: 6, fontWeight: '600' },
  valText: { flex: 1, textAlign: 'center', fontSize: Platform.OS === 'web' ? 13 : 12 , fontWeight: '700', color: '#2C2C2E' },
});