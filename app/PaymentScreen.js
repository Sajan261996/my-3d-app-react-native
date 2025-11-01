import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function PaymentScreen() {
  const router = useRouter();
  const { name, email, nights } = useLocalSearchParams();

  const handlePayment = (method) => {
    Alert.alert("Payment Successful ✅", `Paid using ${method}`);
    router.replace("/HotelDetails"); // Go back to main page after payment
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Page</Text>

      <View style={styles.detailsBox}>
        <Text style={styles.details}>👤 Name: {name}</Text>
        <Text style={styles.details}>📧 Email: {email}</Text>
        <Text style={styles.details}>🛏 Nights: {nights}</Text>
      </View>

      <Text style={styles.subtitle}>Select Payment Method</Text>

      <TouchableOpacity style={styles.paymentButton} onPress={() => handlePayment("UPI")}>
        <Text style={styles.paymentText}>Pay with UPI</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.paymentButton} onPress={() => handlePayment("Credit/Debit Card")}>
        <Text style={styles.paymentText}>Pay with Card</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.paymentButton} onPress={() => handlePayment("Net Banking")}>
        <Text style={styles.paymentText}>Pay with Net Banking</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailsBox: {
    backgroundColor: "#1a1a1a",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  details: {
    color: "#fff",
    fontSize: 16,
    marginVertical: 2,
  },
  subtitle: {
    color: "#ff9800",
    fontSize: 20,
    marginBottom: 15,
  },
  paymentButton: {
    backgroundColor: "#ff9800",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  paymentText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 10,
    alignItems: "center",
  },
  backText: {
    color: "#ff9800",
    fontSize: 16,
  },
});
