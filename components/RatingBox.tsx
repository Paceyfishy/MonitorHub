import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RatingBoxProps {
  rating: number;
}

export const RatingBox = ({ rating }: RatingBoxProps) => {
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
            <Ionicons key={s} name="star" size={14} color="#FFD700" />
          ))}
        </View>
      </View>
      <View style={styles.ratingDivider} />
      <View style={styles.statsContainer}>
        <Text style={styles.statItem}>• 12.8k reviewers</Text>
        <Text style={styles.statItem}>• 3.2k real photos</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingBox: {
    flexDirection: "row", backgroundColor: "#F9F9F9", borderRadius: 16,
    padding: 15, marginVertical: 20, alignItems: "center"
  },
  ratingSubText: { fontSize: 12, color: "#666" },
  ratingRow: { flexDirection: "row", alignItems: "baseline" },
  ratingNumber: { fontSize: 32, fontWeight: "bold" },
  ratingMax: { fontSize: 16, color: "#999" },
  starRow: { flexDirection: "row", marginTop: 4 },
  ratingDivider: { width: 1, height: "80%", backgroundColor: "#DDD", marginHorizontal: 20 },
  statsContainer: { gap: 5 },
  statItem: { fontSize: 13, color: "#666" },
});