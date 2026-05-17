import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SpecData {
  label: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
}

export const SpecsSection = ({ specs }: { specs: SpecData[] }) => {
  return (
    <View>
      <View style={styles.specsHeader}>
        <Text style={styles.sectionTitle}>Specifications</Text>
      </View>

      <View style={styles.specsCard}>
        {specs.map((item, index) => (
          <View key={index} style={styles.specRow}>
            <View style={styles.specLabelGroup}>
              <Ionicons name={item.icon} size={20} color="#2424eed2" />
              <Text style={styles.specLabel}>{item.label}</Text>
            </View>
            <Text style={styles.specValue}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  specsHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: "bold" },
  specsCard: { backgroundColor: "#fff", gap: 18 },
  specRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  specLabelGroup: { flexDirection: "row", alignItems: "center", gap: 10 },
  specLabel: { color: "#2424eed2", fontSize: 14 },
  specValue: { fontWeight: "600", fontSize: 14 },
});