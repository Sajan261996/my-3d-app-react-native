import React from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient"; // expo install expo-linear-gradient

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 30;
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1501117716987-c8e1ecb2106b";

// ----------------------------------------------------------------
// --- DATA ---
// ----------------------------------------------------------------
const HOTEL_DATA = {
    Delhi: [
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
    ],

    // MUMBAI DATA
    Mumbai: [
        { id: "11", name: "The Taj Mahal Palace", city: "Mumbai", outerImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Taj_Mahal_Palace_Hotel%2C_Mumbai.jpg/800px-Taj_Mahal_Palace_Hotel%2C_Mumbai.jpg" },
        { id: "12", name: "The Oberoi", city: "Mumbai", outerImage: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/713559046.jpg?k=b387147330a220a9025a4cab5bb39bed1b78ce0ed854fd8d6f3eb6e664eec846&o=&hp=1" },
        { id: "13", name: "Taj Lands End", city: "Mumbai", outerImage: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/77/b1/ef/exterior.jpg?w=1400&h=800&s=1" },
        { id: "14", name: "Four Seasons Hotel", city: "Mumbai", outerImage: "https://api.blessingsonthenet.com/uploads/hotels/fe96984e8491deff4ebf70f8d49e5e9c-1695813551822-Four%20Seasons%20Hotel%20Mumbai.jpg" },
        { id: "15", name: "JW Marriott Juhu", city: "Mumbai", outerImage: "https://api.blessingsonthenet.com/uploads/hotels/076e5fa264ff3bb675993cd29148cb6b-1688989718969-JW%20Marriott%20Mumbai%20Juhu1.avif" },
        { id: "16", name: "The St. Regis", city: "Mumbai", outerImage: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/655796367.jpg?k=da6057f8bcb731958ff8eac7219925de3fecfb44a41a56a851c95067749e13e9&o=&hp=1" },
        { id: "17", name: "Trident Nariman Point", city: "Mumbai", outerImage: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/604298804.jpg?k=cce8e6992a6c78904e7a67b9611da9a34ed490aada9e82aa865b70f308200755&o=&hp=1" },
        { id: "18", name: "ITC Grand Central", city: "Mumbai", outerImage: "https://images.trvl-media.com/lodging/2000000/1160000/1157500/1157448/58056653.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill" },
        { id: "19", name: "The Leela Mumbai", city: "Mumbai", outerImage: "https://www.theleela.com/prod/content/assets/2025-04/Intro_1035x600_3.jpg?VersionId=gLArvKeXn4F7iTNM31y8qbxHD0kkfBFp" },
        { id: "20", name: "Grand Hyatt Mumbai", city: "Mumbai", outerImage: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/53396781.jpg?k=156d9539cc233d6b23d9b4c0944e8c187fa2d3989c93397943485675c918c541&o=&hp=1" },
    ],
    
    // Additional cities can be added here
    Bangalore: [
        { id: "21", name: "The Ritz-Carlton", city: "Bangalore", outerImage: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/200021606.jpg?k=e182372d80c3f55c517f69420d41e57c6742540b06b9b1e95c1c0e3a6288a707&o=&hp=1" },
        { id: "22", name: "ITC Gardenia", city: "Bangalore", outerImage: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/f8/f0/73/itc-gardenia-a-luxury.jpg?w=1400&h=800&s=1" },
    ]

};

// ----------------------------------------------------------------
// --- MAIN COMPONENT ---
// ----------------------------------------------------------------
const HotelListScreen = () => {
    const { city } = useLocalSearchParams();
    const router = useRouter();

    const filteredHotels = HOTEL_DATA[city] || [];
    const currentCity = city || "All Cities";

    const handlePress = (hotel) => {
        router.push({
            pathname: "/HotelDetails",
            params: {
                hotelId: hotel.id,
                hotelName: hotel.name,
                hotelCity: hotel.city,
                hotelImage: hotel.outerImage,
            },
        });

        Alert.alert("Navigating...", `Opening ${hotel.name} in ${hotel.city}.`);
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
            <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.7)"]}
                style={styles.overlay}
            >
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardCity}>{item.city}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#e0f7fa", "#bbdefb", "#90caf9"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
            />

            <View style={styles.contentLayer}>
                <Text style={styles.headerTitle}>
                    {currentCity}
                    <Text style={styles.headerSubtitle}> Accommodation</Text>
                </Text>

                <FlatList
                    data={filteredHotels}
                    keyExtractor={(item) => item.id}
                    renderItem={HotelCard}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.emptyText}>
                            No hotels found for {currentCity}.
                        </Text>
                    )}
                />
            </View>
        </View>
    );
};

// ----------------------------------------------------------------
// --- STYLES ---
// ----------------------------------------------------------------
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentLayer: {
        flex: 1,
        backgroundColor: "transparent",
        paddingTop: 10,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: "800",
        marginHorizontal: 15,
        marginBottom: 10,
        color: "rgb(65, 105, 225)",
    },
    headerSubtitle: {
        fontSize: 22,
        fontWeight: "400",
        color: "rgb(65, 105, 225)",
    },
    listContent: {
        paddingBottom: 30,
    },
    card: {
        width: CARD_WIDTH,
        height: 250,
        marginHorizontal: 15,
        marginBottom: 20,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: "#fff",
        elevation: 8,
        shadowColor: "#333",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 15,
        paddingTop: 40,
        justifyContent: "flex-end",
    },
    cardName: {
        fontSize: 22,
        fontWeight: "700",
        color: "#fff",
        textShadowColor: "rgba(0, 0, 0, 0.7)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    cardCity: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ffdd00",
        marginTop: 4,
        textShadowColor: "rgba(0, 0, 0, 0.7)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    emptyText: {
        textAlign: "center",
        marginTop: 50,
        fontSize: 16,
        color: "#999",
    },
});

export default HotelListScreen;
