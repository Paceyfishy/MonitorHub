import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Pressable,
  KeyboardAvoidingView,
  Platform 
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ReviewModal() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [review, setReview] = useState("");

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.overlay}
    >
      {/* 1. Backdrop: Tap outside the white box to close */}
      <Pressable style={styles.backdrop} onPress={() => router.back()} />

      {/* 2. The Modal Card */}
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Write a Review</Text>
          <TouchableOpacity style={styles.postBtn}>
            <Text style={styles.postBtnText}>Post Review</Text>
          </TouchableOpacity>
        </View>

        {/* Content Area */}
        <View style={styles.content}>
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
              <Ionicons key={s} name="star-outline" size={30} color="#ccc" />
            ))}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)", // This dims the product page
    justifyContent: "center", // Center vertically
    alignItems: "center",     // Center horizontally
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    width: "90%",    // 5% space on left/right
    height: "80%",   // 10% space on top/bottom
    backgroundColor: "white",
    borderRadius: 25, // Rounded corners on all sides
    overflow: "hidden",
    elevation: 10,    // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
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
    backgroundColor: "#1A1A1A",
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
  }
});