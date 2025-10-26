import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // simulate login

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogin = () => {
    setMenuVisible(false);
    router.push("/Login");
  };

  const handleProfile = () => {
    setMenuVisible(false);
    router.push("/Profile");
  };

  return (
    <LinearGradient colors={["#003366", "#006699"]} style={styles.header}>
      <Text style={styles.title}>Hotel Booking</Text>
      <TouchableOpacity onPress={toggleMenu}>
        <Ionicons name="menu" size={30} color="#fff" />
      </TouchableOpacity>

      {menuVisible && (
        <View style={styles.menu}>
          {!isLoggedIn ? (
            <TouchableOpacity style={styles.menuItem} onPress={handleLogin}>
              <Text style={styles.menuText}>Login</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.menuItem} onPress={handleProfile}>
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  menu: {
    position: "absolute",
    top: 65,
    right: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
});
