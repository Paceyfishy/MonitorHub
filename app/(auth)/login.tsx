import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View, KeyboardAvoidingView, Platform, Text, TouchableOpacity } from "react-native";

import { auth } from "@/services/firebase";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";


export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);;
    } catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        Alert.alert("Login Failed", "Invalid email or password");
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {/* Login Card */}
        <View style={styles.card}>
          <Text style={styles.title}>MonitorHub</Text>

          <Text style={styles.subtitle}>Find your perfect monitor</Text>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#888"
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#888"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 14 }} />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => router.push("/register")}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f7ff",
  },

  card: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,

    width: Platform.OS === "web" ? "50%" : "100%",
    alignSelf: "center",

    marginTop: Platform.OS === "web" ? 0 : -60,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,

    elevation: 6,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2424eed2",
    marginBottom: 6,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: "#d8dcff",
    backgroundColor: "#f8f9ff",

    padding: 14,
    marginBottom: 16,
    borderRadius: 14,

    fontSize: 16,
  },

  buttonContainer: {
    borderRadius: 12,
    overflow: "hidden",
  },

  loginButton: {
    backgroundColor: "#2424eed2",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  signUpButton: {
    backgroundColor: "#2424eed2",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
