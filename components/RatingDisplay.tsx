import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RatingDisplay({ score }: { score: string }) {
  const numericScore = parseFloat(score);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.scoreText}>{score}</Text>
        <View style={styles.starRow}>
          {[1, 2, 3, 4, 5].map((s) => (
            <Ionicons 
              key={s} 
              name={s <= Math.round(numericScore) ? "star" : "star-outline"} 
              size={16} 
              color="#FFD700" 
            />
          ))}
        </View>
      </View>
      <Text style={styles.subText}>Overall Rating</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 10 },
  row: { flexDirection: 'row', alignItems: 'center' },
  scoreText: { fontSize: 22, fontWeight: 'bold', color: 'white', marginRight: 8 },
  starRow: { flexDirection: 'row' },
  subText: { fontSize: 11, color: '#888', marginTop: 2 },
});