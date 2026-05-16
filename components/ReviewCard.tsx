import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
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
  card: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    padding: 24,           
    marginBottom: 16, 
    borderRadius: 16,      
    boxShadow: "0px 6px 24px rgba(0, 0, 0, 0.04)", 
    borderWidth: 1,
    borderColor: "#f0f0f2",
    position: 'relative',
    minHeight : Platform.select({
      web: 180,      
    })
  },
  textSide: { 
    flex: 1, 
    paddingRight: 24,      
    justifyContent: "center" 
  },
  userHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 }, 
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 }, 
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  userName: { fontWeight: '700', fontSize: 15, color: '#1c1c1e' },
  starRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  ratingDigit: { fontSize: 12, marginLeft: 5, color: '#666', fontWeight: '600' },
  comment: { fontSize: 14, color: '#48484a', lineHeight: 22 }, 
  reviewImg: { 
    position: 'absolute', 
    top: Platform.select({
      web: '10%',      
      default: '20%'   
    }),           

    bottom: Platform.select({
      web: '10%',    
      default: '20%'   
    }),
    right: '5%',
    
    width: "30%",          
    borderRadius: 12, 
    backgroundColor: '#f5f5f7',
    resizeMode: 'cover'   
  },
});