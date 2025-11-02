import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

export default function RoomsScreen() {
  return (
    <View style={styles.container}>
      {/* Animated Background */}
      <LottieView
        source={require("../app/(tabs)/assets/energy_wave.json")}
        autoPlay
        loop
        resizeMode="cover"
        style={styles.backgroundAnimation}
      />

      {/* Scrollable and Centered Form */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>Book Your Room</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#ccc"
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor="#ccc"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="numeric"
              placeholderTextColor="#ccc"
            />
            <TextInput
              style={styles.input}
              placeholder="Room Type"
              placeholderTextColor="#ccc"
            />

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundAnimation: {
    position: "absolute",
    width: width,
    height: height,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  formContainer: {
    width: "85%",
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#00fff5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#00fff5",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: 12,
    color: "#fff",
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(0,255,255,0.3)",
  },
  button: {
    backgroundColor: "#00fff5",
    borderRadius: 10,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },
});
