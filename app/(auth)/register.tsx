import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View, KeyboardAvoidingView, Platform, Text, TouchableOpacity } from "react-native";
import { auth, db } from "@/services/firebase";
import { router } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import { createUser } from "@/lib/monitorApi";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useUser } from "@/context/UserContext";

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const { refreshUser } = useUser();

  const handleRegister = async () => {
    try {
      setErrorText("");
      console.log("Register button pressed");
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("No user logged in");
        return;
      }

      await createUser(firstName, lastName);
      console.log("User data saved to MongoDB");

      await setDoc(doc(db, "users", user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: user.email,
      });

      console.log("User data saved to Firestore");
      Alert.alert("Success", "Profile created");

      await refreshUser();
      router.replace("/(tabs)");

    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setErrorText("This email is already registered.");
      } 
      else {
        setErrorText(error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Create Profile</Text>

          <Text style={styles.subtitle}>Create your MonitorHub account</Text>

          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#888"
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#888"
          />

          <TextInput
            placeholder="First Name"
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholderTextColor="#888"
          />

          <TextInput
            placeholder="Last Name"
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholderTextColor="#888"
          />

          {errorText ? (
            <Text style={{ color: "red", marginBottom: 10,}}>
              {errorText}
            </Text>
          ) : null}

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
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
    backgroundColor: "#ffffff",
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
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginBottom: 28,
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

  registerButton: {
    backgroundColor: "#2424eed2",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
