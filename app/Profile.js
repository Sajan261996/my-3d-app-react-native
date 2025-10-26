import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: () => {
            router.push("/Login");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <LinearGradient
      colors={["#0f2027", "#203a43", "#2c5364"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileCard}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
            style={styles.avatar}
          />

          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>johndoe@email.com</Text>

          <View style={styles.infoBox}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Bookings</Text>
              <Text style={styles.infoValue}>12</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Rewards</Text>
              <Text style={styles.infoValue}>₹2,500</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  profileCard: {
    width: "85%",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    elevation: 10,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#ffcc00",
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  email: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 20,
  },
  infoBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  infoItem: {
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 15,
    color: "#ddd",
  },
  infoValue: {
    fontSize: 18,
    color: "#ffcc00",
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#ffcc00",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
  },
  editText: {
    color: "#222",
    fontWeight: "600",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#e63946",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
