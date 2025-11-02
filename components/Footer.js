import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Footer() {
  const router = useRouter();

  return (
    <ExpoLinearGradient
      colors={["rgba(44,83,100,0.95)", "rgba(32,58,67,0.9)", "rgba(15,32,39,0.9)"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.footer}
    >
      <View style={styles.footerContent}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => router.push("/HomeScreen")}
        >
          <Ionicons name="home-outline" size={28} color="#00fff5" />
          <Text style={styles.iconLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => router.push("/RoomsScreen")}
        >
          <Ionicons name="bed-outline" size={28} color="#00fff5" />
          <Text style={styles.iconLabel}>Rooms</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => router.push("/Signup")}
        >
          <Ionicons name="map-outline" size={28} color="#00fff5" />
          <Text style={styles.iconLabel}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => router.push("/Profile")}
        >
          <Ionicons name="person-outline" size={28} color="#00fff5" />
          <Text style={styles.iconLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </ExpoLinearGradient>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#00fff5",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 15,
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  iconContainer: {
    alignItems: "center",
    transform: [{ perspective: 500 }, { rotateX: "-5deg" }],
  },
  iconLabel: {
    color: "#00fff5",
    fontSize: 13,
    marginTop: 4,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});
