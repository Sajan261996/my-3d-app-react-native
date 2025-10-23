import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function Footer() {
  return (
    <ExpoLinearGradient
      colors={["#2c5364", "#203a43", "#0f2027"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.footer}
    >
      <View style={styles.footerContent}>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="home-outline" size={26} color="#fff" />
          <Text style={styles.iconLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="bed-outline" size={26} color="#fff" />
          <Text style={styles.iconLabel}>Rooms</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="map-outline" size={26} color="#fff" />
          <Text style={styles.iconLabel}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="person-outline" size={26} color="#fff" />
          <Text style={styles.iconLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </ExpoLinearGradient>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 14,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 12, // Android shadow
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
    color: "#ddd",
    fontSize: 12,
    marginTop: 4,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
