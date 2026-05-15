import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RatingBoxProps {
  rating: number;
  reviewCount?: number; // Added dynamic review count
  photoCount?: number;  // Added dynamic photo count
}

export const RatingBox = ({ rating, reviewCount = 0, photoCount = 0 }: RatingBoxProps) => {
  return (
    <View style={styles.ratingBox}>
      <View>
        <Text style={styles.ratingSubText}>Overall Score</Text>
        <View style={styles.ratingRow}>
          <Text style={styles.ratingNumber}>{rating}</Text>
          <Text style={styles.ratingMax}>/5</Text>
        </View>
        <View style={styles.starRow}>
          {[1, 2, 3, 4, 5].map((s) => (
            <Ionicons
              key={s} 
              name="star" 
              size={14} 
              color={s <= Math.round(rating) ? "#FFD700" : "#E0E0E0"} 
            />
          ))}
        </View>
      </View>
      <View style={styles.ratingDivider} />
      <View style={styles.statsContainer}>
        <Text style={styles.statItem}>• {reviewCount} reviewers</Text>
        <Text style={styles.statItem}>• {photoCount} photos</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingBox: {
    flexDirection: "row", 
    backgroundColor: "#F9F9F9", 
    borderRadius: 16,
    padding: 15, 
    marginVertical: 20, 
    alignItems: "center"
  },
  ratingSubText: { fontSize: 12, color: "#666" },
  ratingRow: { flexDirection: "row", alignItems: "baseline" },
  ratingNumber: { fontSize: 32, fontWeight: "bold", color: "#1A1A1A" },
  ratingMax: { fontSize: 16, color: "#999", marginLeft: 2 },
  starRow: { flexDirection: "row", marginTop: 4 },
  ratingDivider: { width: 1, height: 40, backgroundColor: "#E0E0E0", marginHorizontal: 20 },
  statsContainer: { flex: 1 },
  statItem: { fontSize: 12, color: "#666", marginBottom: 4 },
});