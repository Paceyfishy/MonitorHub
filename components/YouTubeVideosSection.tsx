import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { searchYoutubeVideos } from "@/lib/monitorApi";

type Props = {
  monitorName: string;
};

type YouTubeVideo = {
  videoId: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
};

export default function YouTubeVideosSection({ monitorName }: Props) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await searchYoutubeVideos(monitorName);
        setVideos(data); // Get top 3 videos
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [monitorName]);

  const handleOpenVideo = (videoId: string) => {
    Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>YouTube Reviews</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4654eb" />
          <Text style={styles.loadingText}>Loading videos...</Text>
        </View>
      </View>
    );
  }

  if (videos.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>YouTube Reviews</Text>
        <View style={styles.emptyStateContainer}>
          <Ionicons name="videocam-outline" size={48} color="#d0d0d0" />
          <Text style={styles.emptyStateText}>No videos found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>YouTube Reviews</Text>

      <FlatList
        scrollEnabled={false}
        data={videos}
        keyExtractor={(item) => item.videoId}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.videoCard}
            onPress={() => handleOpenVideo(item.videoId)}
            activeOpacity={0.7}
          >
            <View style={styles.thumbnailContainer}>
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.thumbnail}
              />
              <View style={styles.playOverlay}>
                <Ionicons name="play-circle" size={60} color="#fff" />
              </View>
            </View>

            <View style={styles.videoInfo}>
              <Text numberOfLines={2} style={styles.videoTitle}>
                {item.title}
              </Text>
              <View style={styles.channelRow}>
                <Ionicons name="logo-youtube" size={14} color="#ff0000" />
                <Text style={styles.channelName} numberOfLines={1}>
                  {item.channelTitle}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 20,
  },

  title: { fontSize: 18, fontWeight: "bold", marginBottom: 16, color: "#1C1C1E" },

  loadingContainer: {
    paddingVertical: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 12,
    color: "#8E8E93",
    fontSize: 14,
    fontWeight: "500",
  },

  emptyStateContainer: {
    paddingVertical: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyStateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
    marginTop: 16,
  },

  listContent: {
    gap: 12,
  },

  videoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    flexDirection: "row",
    height: 100,
    marginBottom: 16,
  },

  thumbnailContainer: {
    width: 160,
    height: 100,
    position: "relative",
    backgroundColor: "#f0f0f0",
  },

  thumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  playOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },

  videoInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },

  videoTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1C1C1E",
    lineHeight: 18,
  },

  channelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  channelName: {
    fontSize: 12,
    color: "#8E8E93",
    fontWeight: "500",
  },
});
