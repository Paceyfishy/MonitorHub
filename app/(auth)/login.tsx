import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

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
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button title="Login" onPress={handleLogin} />

      <View style={{ height: 10 }} />

      <Button title="Sign Up" onPress={() => router.push("/register")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
  },
});
