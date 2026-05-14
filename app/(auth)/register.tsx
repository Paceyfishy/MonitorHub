import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

import { auth, db } from "@/services/firebase";
import { router } from "expo-router";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleRegister = async () => {
    try {
      console.log("Register button pressed");

      const user = auth.currentUser;

      if (!user) {
        Alert.alert("No user logged in");
        return;
      }

      await setDoc(doc(db, "users", user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: user.email,
      });

      console.log("User data saved to Firestore");

      Alert.alert("Success", "Profile created");

      router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error);

      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="First Name"
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        placeholder="Last Name"
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",

    padding: 20,

    backgroundColor: "#fff",
  },

  input: {
    borderWidth: 1,

    borderColor: "#ccc",

    padding: 12,

    marginBottom: 15,

    borderRadius: 10,

    fontSize: 16,
  },
});
