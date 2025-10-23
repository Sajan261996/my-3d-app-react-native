import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    console.log("Signup pressed:", name, email, password);
  };

  return (
    <LinearGradient
      colors={["#0f2027", "#203a43", "#2c5364"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.innerContainer}
      >
        <Animatable.View animation="fadeInDown" duration={1200} style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" duration={1200} style={styles.form}>
          <TextInput
            label="Full Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry
          />

          <Button
            mode="contained"
            onPress={handleSignup}
            style={styles.button}
            contentStyle={{ paddingVertical: 8 }}
          >
            Sign Up
          </Button>

          <Text
            style={styles.link}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            Already have an account? Login
          </Text>
        </Animatable.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { flex: 1, justifyContent: "center", paddingHorizontal: 20 },
  header: {
    alignItems: "center",
    marginBottom: 30,
    transform: [{ perspective: 800 }, { rotateX: "5deg" }],
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 6,
  },
  subtitle: { fontSize: 16, color: "#ddd", marginTop: 4 },
  form: {
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  button: {
    borderRadius: 12,
    marginTop: 10,
    backgroundColor: "#6200ee",
  },
  link: {
    color: "#fff",
    marginTop: 12,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
