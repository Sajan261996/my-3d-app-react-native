import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function HotelDetails() {
  const router = useRouter();

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1560347876-aeef00ee58a1",
    "https://images.unsplash.com/photo-1501117716987-c8e1ecb210d9",
    "https://images.unsplash.com/photo-1559599101-f09722fb4948",
  ];

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
      />

      {/* Overlay Content */}
      <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} style={styles.overlay}>
        <Text style={styles.title}>Grand Elite Hotel</Text>
        <Text style={styles.location}>Paris, France</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/RoomsScreen")}
        >
          <Text style={styles.buttonText}>View Rooms</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  image: {
    width: width,
    height: 400,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  location: {
    color: "#ddd",
    fontSize: 18,
    marginVertical: 5,
  },
  button: {
    marginTop: 15,
    backgroundColor: "#ff9800",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
