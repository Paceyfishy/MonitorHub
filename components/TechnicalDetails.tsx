import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TechnicalDetails({ leftSpecs, rightSpecs, leftName, rightName }: any) {
  
  const SpecRow = ({ icon, label, left, right, index }: any) => (
    <View style={[
      styles.specRow, 
      { backgroundColor: index % 2 !== 0 ? 'transparent' : '#F9F9FB' } // Zebra stripes
    ]}>
      <View style={styles.labelCol}>
        <MaterialCommunityIcons name={icon} size={16} color="#4654eb" />
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <Text style={styles.valText}>{left}</Text>
      <Text style={styles.valText}>{right}</Text>
    </View>
  );

  const specs = [
    { icon: "tag-outline", label: "Price", left: leftSpecs?.price, right: rightSpecs?.price },
    { icon: "monitor", label: "Resolution", left: leftSpecs?.res, right: rightSpecs?.res },
    { icon: "speedometer", label: "Refresh", left: leftSpecs?.refresh, right: rightSpecs?.refresh },
    { icon: "poker-chip", label: "Panel", left: leftSpecs?.panel, right: rightSpecs?.panel },
    { icon: "timer-outline", label: "Response", left: leftSpecs?.response, right: rightSpecs?.response },
  ];

  return (
    <View style={styles.card}>
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
    paddingVertical: 20, // Padding moved to top/bottom only
    marginTop: 10,
    overflow: 'hidden' // Ensures zebra rows don't bleed out of corners
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
  modelName: { flex: 1, fontSize: 10, fontWeight: '800', color: '#4654eb', textAlign: 'center', textTransform: 'uppercase' },
  specRow: { 
    flexDirection: 'row', 
    paddingVertical: 14, 
    paddingHorizontal: 20, // Padding inside each row
  },
  labelCol: { flex: 1.2, flexDirection: 'row', alignItems: 'center' },
  labelText: { fontSize: 12, color: '#8E8E93', marginLeft: 6, fontWeight: '600' },
  valText: { flex: 1, textAlign: 'center', fontSize: 12, fontWeight: '700', color: '#2C2C2E' },
});