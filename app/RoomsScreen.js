import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

export default function RoomsScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nights, setNights] = useState("");
  const [availability, setAvailability] = useState(null);
  const [loading, setLoading] = useState(false);

  // Replace this with your backend URL
  const API_URL = "http://192.168.1.5:5000/api/rooms/check"; 
  // ⚠️ Change 192.168.1.5 to your PC’s local IP address

  const checkAvailability = async () => {
    if (!nights) {
      alert("Please enter the number of nights first.");
      return;
    }

    setLoading(true);
    setAvailability(null);

    try {
      const response = await fetch(`${API_URL}?nightCount=${nights}`);
      const text = await response.text(); // Read raw response first for debugging
      console.log("Server Response:", text);

      // Safely parse to JSON if it's valid
      const data = JSON.parse(text);

      if (data.available) {
        setAvailability(true);
      } else {
        setAvailability(false);
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
      alert("Failed to check room availability. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = () => {
    if (!name || !email || !nights) {
      alert("Please fill in all details");
      return;
    }
    if (availability === null) {
      alert("Please check room availability first!");
      return;
    }
    if (!availability) {
      alert("Rooms are not available for the selected duration.");
      return;
    }

    router.push({
      pathname: "/PaymentScreen",
      params: { name, email, nights },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Room Booking</Text>

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email Address"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Number of Nights"
        placeholderTextColor="#aaa"
        style={styles.input}
        keyboardType="numeric"
        value={nights}
        onChangeText={setNights}
      />

      <TouchableOpacity
        style={styles.checkButton}
        onPress={checkAvailability}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.checkText}>Check Availability</Text>
        )}
      </TouchableOpacity>

      {availability !== null && (
        <Text style={[styles.statusText, { color: availability ? "#4caf50" : "#f44336" }]}>
          {availability ? "✅ Rooms are available!" : "❌ No rooms available for the selected dates."}
        </Text>
      )}

      {availability && (
        <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
          <Text style={styles.bookText}>Proceed to Payment</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  checkButton: {
    backgroundColor: "#2196f3",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  checkText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  statusText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  bookButton: {
    backgroundColor: "#ff9800",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  bookText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 20,
    alignItems: "center",
  },
  backText: {
    color: "#ff9800",
    fontSize: 16,
  },
});
