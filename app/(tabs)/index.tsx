import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Home from "../../app/HomeScreen";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header with navigation buttons */}
      <Header />

      {/* Main Body */}
      <View style={styles.body}>
        <Home />
    
      </View>

      {/* Footer */}
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  body: {
    flex: 1, // take all space between header and footer
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
