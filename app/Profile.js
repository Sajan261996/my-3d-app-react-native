import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function MyBookingScreen() {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const bookings = [
    {
      id: 1,
      roomType: "Deluxe Ocean View",
      checkIn: "Dec 20, 2025",
      checkOut: "Dec 25, 2025",
      guests: "2 Adults, 1 Child",
      status: "Confirmed",
    },
    {
      id: 2,
      roomType: "Mountain Suite",
      checkIn: "Jan 10, 2026",
      checkOut: "Jan 14, 2026",
      guests: "2 Adults",
      status: "Pending",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Layer 1: Main Animated Energy Wave */}
      <LottieView
        source={require("../app/(tabs)/assets/energy_wave.json")}
        autoPlay
        loop
        resizeMode="cover"
        style={styles.backgroundAnimation}
      />

      {/* Layer 2: Floating Particles */}
      <LottieView
        source={require("../app/(tabs)/assets/energy_wave.json")}
        autoPlay
        loop
        resizeMode="cover"
        style={[styles.backgroundAnimation, { opacity: 0.6 }]}
      />

      {/* Layer 3: Gradient Overlay */}
      <LinearGradient
        colors={["rgba(0,0,0,0.7)", "rgba(0,30,60,0.6)", "rgba(0,255,255,0.1)"]}
        style={styles.gradientOverlay}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>My Bookings</Text>

          {bookings.map((item) => (
            <Animated.View
              key={item.id}
              style={[styles.bookingWrapper, { transform: [{ translateY: floatAnim }] }]}
            >
              <LinearGradient
                colors={["rgba(0,255,255,0.25)", "rgba(0,0,0,0.7)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.bookingCard}
              >
                <Text style={styles.roomType}>{item.roomType}</Text>

                <View style={styles.detailRow}>
                  <Text style={styles.label}>Check-In:</Text>
                  <Text style={styles.value}>{item.checkIn}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.label}>Check-Out:</Text>
                  <Text style={styles.value}>{item.checkOut}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.label}>Guests:</Text>
                  <Text style={styles.value}>{item.guests}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.label}>Status:</Text>
                  <Text
                    style={[
                      styles.value,
                      item.status === "Confirmed"
                        ? { color: "#00ffb3" }
                        : { color: "#ffcc00" },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>

                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.btnOutline}>
                    <Text style={styles.btnOutlineText}>View Details</Text>
                  </TouchableOpacity>

                  <LinearGradient
                    colors={["#00fff5", "#008080"]}
                    style={styles.btnSolid}
                  >
                    <Text style={styles.btnSolidText}>Cancel</Text>
                  </LinearGradient>
                </View>
              </LinearGradient>
            </Animated.View>
          ))}
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
  gradientOverlay: {
    position: "absolute",
    width: width,
    height: height,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#00fff5",
    marginBottom: 25,
    textShadowColor: "#00fff5",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  bookingWrapper: {
    width: "90%",
  },
  bookingCard: {
    borderRadius: 25,
    padding: 25,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(0,255,255,0.5)",
    shadowColor: "#00fff5",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 12,
  },
  roomType: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00fff5",
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: {
    color: "#aaa",
    fontSize: 15,
  },
  value: {
    color: "#fff",
    fontSize: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: "#00fff5",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  btnOutlineText: {
    color: "#00fff5",
    fontWeight: "600",
  },
  btnSolid: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 25,
  },
  btnSolidText: {
    color: "#000",
    fontWeight: "bold",
  },
});
