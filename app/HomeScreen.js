import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 40;

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1501117716987-c8e1ecb2106b";

// ✅ Cities and preview hotels
const hotelsData = [
  { id: "1", name: "Delhi Hotel", city: "Delhi", outerImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?fit=crop&w=800&q=80" },
  { id: "2", name: "Mumbai Grand", city: "Mumbai", outerImage: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?fit=crop&w=800&q=80" },
  { id: "3", name: "Bangalore Towers", city: "Bangalore", outerImage: "https://images.unsplash.com/photo-1549488344-9d5206c9e83c?fit=crop&w=800&q=80" },
];

export default function HomeScreen() {
  const router = useRouter();

  const handlePress = (hotel) => {
    router.push({
      pathname: "/HotelList",
      params: { city: hotel.city }, // ✅ Send city name to HotelList
    });
  };

  const HotelCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handlePress(item)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: item.outerImage || DEFAULT_IMAGE }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.hotelNameOverlay}>
        <Text style={styles.hotelName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ Page Header */}
      <Text style={styles.headerText}>Select Your Destination</Text>

      {/* ✅ City Cards */}
      <FlatList
        data={hotelsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HotelCard item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#0a0a0a" 
  },
  headerText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  listContent: { 
    paddingHorizontal: 20, 
    paddingBottom: 40 
  },
  card: {
    width: CARD_WIDTH,
    height: 250,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    alignSelf: "center",
    backgroundColor: "#1e1e1e",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  hotelNameOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  hotelName: { 
    color: "#fff", 
    fontSize: 28, 
    fontWeight: "bold", 
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 8,
  },
});
