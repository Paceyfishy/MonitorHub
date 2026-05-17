import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { createReview } from "@/lib/monitorApi";
import { useUser } from "@/context/UserContext";

export default function ReviewModal() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const { currentUser } = useUser();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImage(asset.uri);
      setImageBase64(asset.base64 ?? null);
    }
  };

  const handlePostReview = async () => {
    if (!review || rating === 0) return;

    await createReview(
      currentUser!.id,
      id as string,
      rating,
      review,
      imageBase64
    );

    router.back();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.overlay}
    >
      {/* 1. Backdrop */}
      <Pressable style={styles.backdrop} onPress={() => router.back()} />

      {/* 2. The Modal Card */}
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Write a Review</Text>
          <TouchableOpacity style={styles.postBtn} onPress={handlePostReview}>
            <Text style={styles.postBtnText}>Post Review</Text>
          </TouchableOpacity>
        </View>

        {/* Content Area - เปิด ScrollView แค่ชั้นเดียวครอบเนื้อหาทั้งหมดไว้ข้างในเพื่อกันหลุดหน้าเว็บ */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <Text style={styles.sectionLabel}>Your Review (ID: {id})</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Share your experience..."
              multiline
              maxLength={2000}
              onChangeText={setReview}
            />
            <Text style={styles.charCount}>{review.length}/2000</Text>
          </View>

          <Text style={styles.sectionLabel}>Overall Rating</Text>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <TouchableOpacity key={s} onPress={() => setRating(s)}>
                <Ionicons
                  name={s <= rating ? "star" : "star-outline"}
                  size={30}
                  color={s <= rating ? "#FFD700" : "#ccc"}
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionLabel}>Image</Text>
          <View style={styles.imageBoxRow}>
            {!image ? (
              <TouchableOpacity style={styles.addImageBox} onPress={pickImage}>
                <Ionicons name="add" size={40} color="#999" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={pickImage}>
                <Image source={{ uri: image }} style={styles.imagePreviewBox} />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    width: "90%",
    height: "80%",
    backgroundColor: "white",
    borderRadius: 25,
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postBtn: {
    backgroundColor: "#4654eb",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  postBtnText: {
    color: "white",
    fontWeight: "600",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 12,
    padding: 12,
    height: 180,
    backgroundColor: "#FAFAFA",
  },
  textInput: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 15,
  },
  charCount: {
    alignSelf: "flex-end",
    color: "#999",
    fontSize: 12,
  },
  starRow: {
    flexDirection: "row",
    gap: 8,
  },
  imagePickerBtn: {
    backgroundColor: "#1A1A1A",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  previewImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginTop: 10,
  },
  imageBoxRow: {
    marginTop: 10,
    flexDirection: "row",
  },
  addImageBox: {
    width: 160,
    height: 160,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreviewBox: {
    width: 180,
    height: 180,
    borderRadius: 12,
  },
});