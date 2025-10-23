// components/Header.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const handleLogin = () => {
    setMenuVisible(false);
    setIsLoggedIn(true); // Simulate login
    router.push("/Profile");
  };

  const handleSignup = () => {
    setMenuVisible(false);
    router.push("/Signup");
  };

  const handleProfile = () => {
    setMenuVisible(false);
    router.push("/Profile");
  };

  const handleLogout = () => {
    setMenuVisible(false);
    setIsLoggedIn(false);
    router.push("/");
  };

  // Menu items depending on login state
  const menuItems = isLoggedIn
    ? [
        { label: "Profile", action: handleProfile },
        { label: "Logout", action: handleLogout },
      ]
    : [
        { label: "Login", action: handleLogin },
        { label: "Signup", action: handleSignup },
      ];

  return (
    <LinearGradient
      colors={["#1e3c72", "#2a5298"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.header}
    >
      <View style={styles.topRow}>
        <Text style={styles.title}>Hotel Booking System</Text>

        {/* Floating Action Button */}
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
            <Text style={styles.fabIcon}>⚡</Text>
          </TouchableOpacity>

          {menuVisible && (
            <View style={styles.dropdown}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownButton}
                  onPress={item.action}
                >
                  <Text style={styles.dropdownText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      <Text style={styles.subtitle}>Find your perfect stay ✨</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 12,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  fab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ffcc00",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 24,
  },
  dropdown: {
    position: "absolute",
    top: 60,
    right: 0,
    width: 160,
    backgroundColor: "#2a5298",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
  },
  dropdownButton: {
    paddingVertical: 10,
  },
  dropdownText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#eee",
    fontSize: 14,
    marginTop: 10,
    alignSelf: "center",
    fontStyle: "italic",
    opacity: 0.9,
  },
});
