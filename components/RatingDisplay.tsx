import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RatingDisplay({ score }: { score: string }) {
  const numericScore = parseFloat(score);
  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>{score}</Text>
      <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map((s) => (
          <Ionicons key={s} name={s <= Math.round(numericScore) ? "star" : "star-outline"} size={13} color="#FFD700" />
        ))}
      </View>
      <Text style={styles.subText}>SCORE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  scoreText: { fontSize: 26, fontWeight: '900', color: '#1C1C1E' },
  starRow: { flexDirection: 'row', marginVertical: 3 },
  subText: { fontSize: 9, color: '#8E8E93', fontWeight: '800', letterSpacing: 0.5 },
});