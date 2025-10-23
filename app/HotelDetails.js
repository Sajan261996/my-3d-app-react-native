import React, { useEffect, useRef, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  FlatList, 
  Image 
} from "react-native";
import { useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get("window");
const IMAGE_WIDTH = width;
const DEFAULT_INNER_IMAGE = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?fit=crop&w=1000&q=80";

const allHotels = [
  { 
    id: "1", 
    name: "Hyatt Hotel", 
    city: "Delhi", 
    outerImage: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/c6/32/11/hyatt-regency-delhi.jpg?w=1400&h=800&s=1",
    innerImages: [
      "https://pix8.agoda.net/hotelImages/5513/0/c3d2206d8a209f79b3c761d51c738c89.jpg?ca=7&ce=1&s=1024x768",
      "https://arenatours.com/wp-content/uploads/2016/11/Hyatt-Regency-Delhi-3.jpg",
      "https://images.trvl-media.com/lodging/1000000/30000/20400/20313/6285dc7a.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
    ],
    description: "Experience luxury and comfort at Hyatt Hotel, a prime location in Delhi.",
  },
  { 
    id: "2", 
    name: "The Lodhi", 
    city: "Delhi", 
    outerImage: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
    innerImages: [
      "https://lh3.googleusercontent.com/proxy/BGHV2x8ZHo6jlXCjQsfLQPrz3x962F0jeL1fN6-1pitXr1BJC7hnI1c0m4Rky-S7yzb5IwqdDe1DtqvI1d07Tf1p5eqWGmfCEN_MuAnSqqd38EQUNjaOBfx2JeDKH3jWR66BMMDIOx53fkNa8Z6MYb7pH6PzEg=s1360-w1360-h1020-rw",
      "https://lh3.googleusercontent.com/proxy/Xc-RPz41NGV70jfYJUy_dMpveBOGZnYPj37N0OF-J0O9PTjoODGR6pxh3ry6lSMOjqvKkr4yJoudDmINofsS3nbnxklpi9Y4Tpi-JS-GVQ7Yqfy82bk617Z8sUjGztAipIBl0P8bOl1oOJSKb31HwgV8oOs1c1Y=s1360-w1360-h1020-rw",
      "https://lh3.googleusercontent.com/proxy/ur8BUfztF19om1WuK5jHN_Y5s2JAClem_VwatS3Lz5zWDyvNqd4RZZCUIAspaVGk3blS4Pjr-JjEs0RG0YGoLmUZapJZW29vUFf7AXkWTyg1WRqvopCvHy3uY5hdP86-sKZmz7ghf-nn04MzM36XEP4QycZvEQQ=s1360-w1360-h1020-rw",
    ],
    description: "The Lodhi offers a sophisticated and tranquil stay with exceptional service.",
  },
  { 
    id: "3", 
    name: "Radisson Blu", 
    city: "Delhi", 
    outerImage: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/232826678.jpg?k=c2525bacad7611054df93b85a60fcdf6b06bfcee49431b7a32545b67d43f0229&o=&hp=",
    innerImages: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/17315537.jpg?k=46b47f76a9b431f39496fa579a45777c11c8695be82f3429a961feb15bdc64b5&o=",
      "https://images.trvl-media.com/lodging/2000000/1980000/1971600/1971533/7c248710.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
      "https://media.flughafen-zuerich.ch/-/jssmedia/airport/portal/bilder/shopfinder/bilder/dienstleistungen/radisson_lobby.jpg?sc_lang=en&vs=1&sc_site=dxp-portal&rev=06cc18a2a984483191873ab3fa5b5208",
    ],
    
    description: "A business-friendly hotel with modern amenities and great connectivity.",
  },
  { 
    id: "4", 
    name: "The Taj Palace", 
    city: "Delhi", 
    outerImage: "https://imkarchitects.com/images/projects/business-hotel/taj-palace-hotel/1.jpg",
    innerImages: [
      "https://lh3.googleusercontent.com/proxy/BGHV2x8ZHo6jlXCjQsfLQPrz3x962F0jeL1fN6-1pitXr1BJC7hnI1c0m4Rky-S7yzb5IwqdDe1DtqvI1d07Tf1p5eqWGmfCEN_MuAnSqqd38EQUNjaOBfx2JeDKH3jWR66BMMDIOx53fkNa8Z6MYb7pH6PzEg=s1360-w1360-h1020-rw",
      "https://lh3.googleusercontent.com/proxy/Xc-RPz41NGV70jfYJUy_dMpveBOGZnYPj37N0OF-J0O9PTjoODGR6pxh3ry6lSMOjqvKkr4yJoudDmINofsS3nbnxklpi9Y4Tpi-JS-GVQ7Yqfy82bk617Z8sUjGztAipIBl0P8bOl1oOJSKb31HwgV8oOs1c1Y=s1360-w1360-h1020-rw",
      "https://lh3.googleusercontent.com/proxy/ur8BUfztF19om1WuK5jHN_Y5s2JAClem_VwatS3Lz5zWDyvNqd4RZZCUIAspaVGk3blS4Pjr-JjEs0RG0YGoLmUZapJZW29vUFf7AXkWTyg1WRqvopCvHy3uY5hdP86-sKZmz7ghf-nn04MzM36XEP4QycZvEQQ=s1360-w1360-h1020-rw",
    ],
    description: "The Taj Palace a sophisticated and tranquil stay with exceptional service.",
  },
  { 
    id: "5", 
    name: "The Leela Palace", 
    city: "Delhi", 
    outerImage: "https://www.theleela.com/prod/content/assets/aio-banner/dekstop/The-Leela-Palace-New-Delhi-FAQ.jpg?VersionId=fRNi5Ik7t0UGo6cA8otxHBZFCFDAnsHH",
    innerImages: [
      "https://cdn.kiwicollection.com/media/property/PR008716/xxl/00871601-LD%20Lobby%20Lounge%20opt-1-at%20-The%20Leela%20Palace%20New%20Delhi.jpg?cb=1712619279",
      "https://www.theleela.com/prod/content/assets/aio-banner/dekstop/weddings-leela-palace-hotel-delhi.jpg?VersionId=JE3Hq7qAucgMTcYHZ2kQjY5cW1P3Taug",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/232257471.jpg?k=a99a9b39e0508af02699e36ed8cc704bf4c8f628888f062297ab2e49df7051f0&o=&hp=1",
    ],
    description: "The Leela Palace offers a sophisticated and tranquil stay with exceptional service.",
  },
  { 
    id: "6", 
    name: "ITC Maurya", 
    city: "Delhi", 
    outerImage: "https://static.toiimg.com/photo/47984893.cms",
    innerImages: [
      "https://www.itchotels.com/content/dam/itchotels/in/umbrella/itc/hotels/itcmaurya-new-delhi/images/overview-landing-page/headmast/desktop/lobby-panorama.png",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/472131934.jpg?k=2e082501da4b8bb28a32d01fce8a9b20fac9b21ee5663a38ed59f9efcce69a8f&o=",
      "https://www.itchotels.com/content/dam/itchotels/in/umbrella/itc/hotels/itcmaurya-new-delhi/images/overview-landing-page/meeting-and-weddings-overview/desktop/kamal-mahal-meeting.png",
    ],
    description: "ITC Maurya offers a sophisticated and tranquil stay with exceptional service.",
  },
  { 
    id: "7", 
    name: "Holiday Inn", 
    city: "Delhi", 
    outerImage: "https://digital.ihg.com/is/image/ihg/holiday-inn-new-delhi-3492356108-4x3",
    innerImages: [
      "https://digital.ihg.com/is/image/ihg/holiday-inn-new-delhi-9594111416-4x3",
      "https://www.kayak.ie/rimg/himg/42/d8/1a/leonardo-2012881-151185463-953754.jpg?width=1366&height=768&crop=true",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/274552335.jpg?k=99b929358ff31b8a388fb856ed89498fdcf4695e94bb17192db7fc4da43db09c&o=&hp=1",
    ],
    description: "Holiday inn offers a sophisticated and tranquil stay with exceptional service.",
  },
  { 
    id: "8", 
    name: "Eros Hotel", 
    city: "Delhi", 
    outerImage: "https://digital.ihg.com/is/image/ihg/holiday-inn-new-delhi-3492356108-4x3",
    innerImages: [
      "https://blupp.b-cdn.net/eroshotel/c58308a5-ad22-42f0-aa3c-97f75e27d029/home-slider-3.jpeg?quality=80",
      "https://images.trvl-media.com/lodging/1000000/70000/63600/63545/fd7af319.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/160096546.jpg?k=e5bd2e4f460b3bc57c056c623473934f8b301a866c622e8862e994aaba1f2eb9&o=&hp=1",
    ],
    description: "Eros Hotel offers a sophisticated and tranquil stay with exceptional service.",
  },
  { 
    id: "9", 
    name: "The Ashoka", 
    city: "Delhi", 
    outerImage: "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201106120942397721-afe9941a2d1811eea3cd0a58a9feac02.jpg",
    innerImages: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/48879167.jpg?k=4178c9ffb74a3f73770a824cc86f310a9e586b3a2601401bfd868b29df77fe6b&o=&hp=1",
      "https://media-cdn.tripadvisor.com/media/photo-m/1280/13/fe/51/4d/lobby.jpg",
      "https://itdc.co.in/wp-content/uploads/2019/03/Presidential-suite-The-ashok.jpg",
    ],
    description: "The Ashoka offers a sophisticated and tranquil stay with exceptional service.",
  },
  { 
    id: "10", 
    name: "The Suryaa", 
    city: "Delhi", 
    outerImage: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/4a/ab/dc/the-suryaa-new-delhi.jpg?w=900&h=500&s=1",
    innerImages: [
      "https://media.easemytrip.com/media/Hotel/SHL-2001134915596/Common/CommonamMUP0.jpg",
      "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_3337/x_0,y_423,w_5000,h_2811,r_0,c_crop,q_80,fl_progressive/w_900,f_auto,c_fit/the-suryaa-new-delhi/Sampan_1_ivzbiq?1759536000025",
      "https://images.trvl-media.com/lodging/1000000/450000/444800/444749/466e4075.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
    ],
    description: "The Suryaa offers a sophisticated and tranquil stay with exceptional service.",
  },
];

export default function HotelDetails() {
  const { hotelId } = useLocalSearchParams();
  const hotel = allHotels.find(h => h.id === hotelId);

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide images
  useEffect(() => {
    if (!hotel) return;

    const totalImages = hotel.innerImages.length;
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % totalImages;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex, hotel]);

  if (!hotel) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>Hotel details not found.</Text>
      </View>
    );
  }

  const renderImageSlide = ({ item }) => (
    <Image
      source={{ uri: item || DEFAULT_INNER_IMAGE }}
      style={styles.image}
      resizeMode="cover"
    />
  );

  return (
    <View style={styles.container}>
      {/* Auto-Sliding Image Carousel */}
      <View style={styles.sliderContainer}>
        <FlatList
          ref={flatListRef}
          data={hotel.innerImages}
          renderItem={renderImageSlide}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false} // disables manual swiping
        />
      </View>

      {/* Hotel Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{hotel.name}</Text>
        <Text style={styles.heading}>About this Hotel</Text>
        <Text style={styles.description}>{hotel.description}</Text>
        <Text style={styles.detailsText}>• City: {hotel.city}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#0a0a0a",
  },
  sliderContainer: {
    height: 250, 
    marginBottom: 15,
  },
  image: { 
    width: IMAGE_WIDTH, 
    height: 250, 
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  title: { 
    color: "#fff", 
    fontSize: 28, 
    fontWeight: "bold", 
    marginBottom: 15,
    textAlign: "center",
  },
  heading: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingBottom: 5,
  },
  description: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  detailsText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 5,
  },
  noDataContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#0a0a0a" 
  },
  noDataText: { 
    color: "#fff", 
    fontSize: 18 
  },
});
