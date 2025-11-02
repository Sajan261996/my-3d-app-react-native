import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur"; // 👈 adds transparent blur effect
import { useRouter } from "expo-router";

export default function Header() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Animation refs
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (menuVisible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 250,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [menuVisible]);

  const toggleMenu = () => setMenuVisible((prev) => !prev);
  const navigate = (path) => {
    setMenuVisible(false);
    router.push(path);
  };

  return (
    <LinearGradient colors={["#001f3f", "#004c99"]} style={styles.header}>
      <Text style={styles.title}>Hotel Booking</Text>

      <TouchableOpacity onPress={toggleMenu} activeOpacity={0.7}>
        <Ionicons name="menu" size={30} color="#fff" />
      </TouchableOpacity>

      {menuVisible && (
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.overlay}>
            <Animated.View
              style={[
                styles.menuContainer,
                {
                  transform: [
                    { scale: scaleAnim },
                    {
                      rotateX: opacityAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["90deg", "0deg"],
                      }),
                    },
                  ],
                  opacity: opacityAnim,
                },
              ]}
            >
              {/* Glass Blur Background */}
              <BlurView
                intensity={80}
                tint={Platform.OS === "ios" ? "light" : "default"}
                style={styles.blurBackground}
              >
                <LinearGradient
                  colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
                  style={styles.menuInner}
                >
                  {/* Menu Items */}
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigate("/HomeScreen")}
                  >
                    <Ionicons name="home-outline" size={22} color="#2f11dcff" />
                    <Text style={styles.menuText}>Home</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigate("/MyBookingScreen")}
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={22}
                      color="#220594ff"
                    />
                    <Text style={styles.menuText}>My Bookings</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => navigate("/Signup")}
                  >
                    <Ionicons
                      name="person-add-outline"
                      size={22}
                      color="#2f0ab7ff"
                    />
                    <Text style={styles.menuText}>Signup</Text>
                  </TouchableOpacity>

                  {!isLoggedIn ? (
                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={() => navigate("/Login")}
                    >
                      <Ionicons
                        name="log-in-outline"
                        size={22}
                        color="#17056dff"
                      />
                      <Text style={styles.menuText}>Login</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={() => navigate("/Profile")}
                    >
                      <Ionicons
                        name="person-circle-outline"
                        size={22}
                        color="#3b0cb1ff"
                      />
                      <Text style={styles.menuText}>Profile</Text>
                    </TouchableOpacity>
                  )}
                </LinearGradient>
              </BlurView>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
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
    zIndex: 10,
    elevation: 6,
  },
  title: {
    fontSize: 22,
    color: "#b01198ff",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 5,
  },
  menuContainer: {
    position: "absolute",
    top: 65,
    right: 15,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#00aaff",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 12,
    zIndex: 10,
    backdropFilter: "blur(10px)",
  },
  blurBackground: {
    borderRadius: 16,
    overflow: "hidden",
  },
  menuInner: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginVertical: 4,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  menuText: {
    fontSize: 16,
    color: "#1d0fdbff",
    marginLeft: 10,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
});
