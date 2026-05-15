import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ReviewProps {
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  image?: string;
  isVerified?: boolean;
}

export const ReviewCard = ({ userName, userAvatar, rating, comment, image, isVerified }: ReviewProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.textSide}>
        <View style={styles.userHeader}>
          <Image
            source={{
              uri:
                userAvatar ||
                "https://dummyimage.com/100x100/cccccc/000000.png&text=User",
            }}
            style={styles.avatar}
          />
          <View>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>{userName}</Text>
              {isVerified && <Ionicons name="checkmark-circle" size={14} color="#27ae60" style={{marginLeft: 4}} />}
            </View>
            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Ionicons key={s} name="star" size={12} color={s <= rating ? "#FFD700" : "#E0E0E0"} />
              ))}
              <Text style={styles.ratingDigit}>{rating}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.comment} numberOfLines={3}>{comment}</Text>
      </View>

      {image && <Image source={{ uri: image }} style={styles.reviewImg} />}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 12, marginBottom: 12, borderRadius: 12 },
  textSide: { flex: 1, paddingRight: 10 },
  userHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  avatar: { width: 35, height: 35, borderRadius: 17.5, marginRight: 10 },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  userName: { fontWeight: '700', fontSize: 14 },
  starRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  ratingDigit: { fontSize: 12, marginLeft: 5, color: '#666', fontWeight: '600' },
  comment: { fontSize: 13, color: '#444', lineHeight: 18 },
  reviewImg: { width: 100, height: 100, borderRadius: 8 },
});