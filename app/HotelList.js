import React from "react";
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions 
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 40;
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1501117716987-c8e1ecb2106b";

// ✅ Full list of Delhi hotels
const allHotels = [
  { id: "1", name: "Hyatt Hotel", city: "Delhi", outerImage: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/c6/32/11/hyatt-regency-delhi.jpg?w=1400&h=800&s=1" },
  { id: "2", name: "The Lodhi", city: "Delhi", outerImage: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461" },
  { id: "3", name: "Radisson Blu", city: "Delhi", outerImage: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/232826678.jpg?k=c2525bacad7611054df93b85a60fcdf6b06bfcee49431b7a32545b67d43f0229&o=&hp=" },
  { id: "4", name: "The Taj Palace", city: "Delhi", outerImage: "https://imkarchitects.com/images/projects/business-hotel/taj-palace-hotel/1.jpg" },
  { id: "5", name: "The Leela Palace", city: "Delhi", outerImage: "https://www.theleela.com/prod/content/assets/aio-banner/dekstop/The-Leela-Palace-New-Delhi-FAQ.jpg" },
  { id: "6", name: "ITC Maurya", city: "Delhi", outerImage: "https://static.toiimg.com/photo/47984893.cms" },
  { id: "7", name: "Holiday Inn", city: "Delhi", outerImage: "https://digital.ihg.com/is/image/ihg/holiday-inn-new-delhi-3492356108-4x3" },
  { id: "8", name: "Eros Hotel", city: "Delhi", outerImage: "https://ik.imgkit.net/3vlqs5axxjf/external/https://www.cfmedia.vfmleonardo.com/imageRepo/1/0/177/755/583/facade_SHOT_finished_O.jpg?tr=w-1200%2Cfo-auto" },
  { id: "9", name: "The Ashok", city: "Delhi", outerImage: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201106120942397721-afe9941a2d1811eea3cd0a58a9feac02.jpg" },
  { id: "10", name: "The Suryaa", city: "Delhi", outerImage: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/4a/ab/dc/the-suryaa-new-delhi.jpg?w=900&h=500&s=1" },
];

export default function HotelList() {
  const { city } = useLocalSearchParams(); // ✅ Get the selected city from HomeScreen
  const router = useRouter();

  // ✅ Filter hotels by selected city (case-insensitive for safety)
  const filteredHotels = allHotels.filter(
    (hotel) => hotel.city.toLowerCase() === (city || "").toLowerCase()
  );

  const handleHotelPress = (hotel) => {
    router.push({
      pathname: "/HotelDetails",
      params: { hotelId: hotel.id, hotelName: hotel.name },
    });
  };

  // ✅ If no hotels found in the selected city
  if (filteredHotels.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No hotels found in {city || "this city"}.</Text>
      </View>
    );
  }

  // ✅ Render each hotel card
  const renderHotelCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.hotelName}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleHotelPress(item)} activeOpacity={0.8}>
        <Image
          source={{ uri: item.outerImage || DEFAULT_IMAGE }}
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hotels in {city}</Text>
      <FlatList
        data={filteredHotels}
        keyExtractor={(item) => item.id}
        renderItem={renderHotelCard}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#0a0a0a" 
  },
  title: { 
    color: "#fff", 
    fontSize: 26, 
    fontWeight: "bold", 
    textAlign: "center",
    marginVertical: 20,
  },
  listContent: { 
    paddingHorizontal: 20, 
    paddingBottom: 20 
  },
  card: { 
    backgroundColor: "#1e1e1e", 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 15, 
    alignItems: "center" 
  },
  hotelName: { 
    color: "#fff", 
    fontSize: 20, 
    fontWeight: "600", 
    marginBottom: 10, 
    textAlign: "center" 
  },
  image: { 
    width: CARD_WIDTH - 30, 
    height: 150, 
    borderRadius: 8 
  },
  noDataContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#0a0a0a" 
  },
  noDataText: { 
    color: "#fff", 
    fontSize: 18, 
    textAlign: "center" 
  },
});
