import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";

export default function EditReviewModal() {
  const params = useLocalSearchParams();
  const router = useRouter();

  // Retrieve existing review values passed via router navigation params
  const { reviewId, currentRating, currentComment, currentImage } = params;

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  // Populate state with the existing review data when the modal screen mounts
  useEffect(() => {
    if (currentComment) setReview(currentComment as string);
    if (currentRating) setRating(Number(currentRating));
    if (currentImage) setImage(currentImage as string);
  }, [currentComment, currentRating, currentImage]);

  // Open the photo library allowing user to select a replacement image
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

  // Temporarily handles only the UI back action (Logic pending setup)
  const handleUpdateReview = () => {
    // Return to previous view context on completion
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.overlay}
    >
      {/* Click overlay mask to easily drop out of modal scope */}
      <Pressable style={styles.backdrop} onPress={() => router.back()} />

      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Review</Text>
          <TouchableOpacity style={styles.postBtn} onPress={handleUpdateReview}>
            <Text style={styles.postBtnText}>Save Changes</Text>
          </TouchableOpacity>
        </View>

        {/* Content Area */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <Text style={styles.sectionLabel}>Your Review</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Share your experience..."
              multiline
              maxLength={2000}
              value={review} // Bind value to State to display the prior text comment
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
          <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={() => {
                console.log("Delete button clicked");
              }}
            >
              <Text style={styles.deleteButtonText}>Delete Review</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

// Built directly off the layout footprints matching ReviewModal
const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" },
  backdrop: { ...StyleSheet.absoluteFillObject },
  modalContainer: {
    width: "90%", height: "80%", backgroundColor: "white", borderRadius: 25, overflow: "hidden",
    elevation: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 10,
    paddingLeft: 5, paddingRight: 5,
  },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20, borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  postBtn: { backgroundColor: "#4654eb", paddingHorizontal: 15, paddingVertical: 8, borderRadius: 8 },
  postBtnText: { color: "white", fontWeight: "600" },
  content: { padding: 20, paddingBottom: 40 },
  sectionLabel: { fontSize: 16, fontWeight: "600", marginTop: 20, marginBottom: 10 },
  inputWrapper: { borderWidth: 1, borderColor: "#EAEAEA", borderRadius: 12, padding: 12, height: 180, backgroundColor: "#FAFAFA" },
  textInput: { flex: 1, textAlignVertical: "top", fontSize: 15 },
  charCount: { alignSelf: "flex-end", color: "#999", fontSize: 12 },
  starRow: { flexDirection: "row", gap: 8 },
  imageBoxRow: { marginTop: 10, flexDirection: "row" },
  addImageBox: { width: 160, height: 160, borderRadius: 12, borderWidth: 1, borderColor: "#ddd", backgroundColor: "#f5f5f5", justifyContent: "center", alignItems: "center" },
  imagePreviewBox: { width: 180, height: 180, borderRadius: 12 },
deleteButtonWrapper: {
    position: "absolute",
    bottom: 25,          
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    width: 140,
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "#ef4444", 
    paddingHorizontal: 15, 
    paddingVertical: 8,    
    borderRadius: 8,       
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  deleteButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",      
    fontSize: 14,
  },
});