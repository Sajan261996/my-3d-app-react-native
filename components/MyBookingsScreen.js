import React, { useRef, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import * as THREE from "three";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const bookings = [
  { id: "1", hotel: "Ocean View Resort", date: "12 Dec 2025", status: "Confirmed" },
  { id: "2", hotel: "Mountain Peak Inn", date: "05 Jan 2026", status: "Pending" },
  { id: "3", hotel: "Sunrise Suites", date: "20 Jan 2026", status: "Cancelled" },
];

export default function MyBookingsScreen() {
  const cubeRef = useRef();

  useEffect(() => {
    let frameId;
    const setup3D = async (gl) => {
      const { drawingBufferWidth: w, drawingBufferHeight: h } = gl;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
      camera.position.z = 3;

      const renderer = new Renderer({ gl });
      renderer.setSize(w, h);
      renderer.setClearColor("#000");

      // Ambient Light
      const ambient = new THREE.AmbientLight(0x88ccff, 1.2);
      scene.add(ambient);

      // Directional Light
      const directional = new THREE.DirectionalLight(0xffffff, 1);
      directional.position.set(5, 5, 5);
      scene.add(directional);

      // Create a glowing rotating cube
      const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
      const material = new THREE.MeshStandardMaterial({
        color: 0x0088ff,
        emissive: 0x003366,
        roughness: 0.2,
        metalness: 0.8,
      });
      const cube = new THREE.Mesh(geometry, material);
      cubeRef.current = cube;
      scene.add(cube);

      const render = () => {
        frameId = requestAnimationFrame(render);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.015;
        renderer.render(scene, camera);
        gl.endFrameEXP();
      };
      render();
    };

    return () => cancelAnimationFrame(frameId);
  }, []);

  const renderBooking = ({ item }) => (
    <LinearGradient colors={["#003366", "#005599", "#0099cc"]} style={styles.card}>
      <Text style={styles.hotel}>{item.hotel}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={[styles.status, getStatusStyle(item.status)]}>{item.status}</Text>
    </LinearGradient>
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return { color: "#00FFAA" };
      case "Pending":
        return { color: "#FFD700" };
      case "Cancelled":
        return { color: "#FF5555" };
      default:
        return { color: "#fff" };
    }
  };

  return (
    <View style={styles.container}>
      <GLView style={StyleSheet.absoluteFill} onContextCreate={setup3D} />
      <View style={styles.overlay}>
        <Text style={styles.title}>My Bookings</Text>
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={renderBooking}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "#00ccff",
    textShadowRadius: 10,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#00aaff",
    shadowOpacity: 0.5,
    shadowRadius: 8,
    transform: [{ perspective: 1000 }, { rotateY: "-5deg" }],
  },
  hotel: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  date: {
    color: "#e0e0e0",
    fontSize: 16,
    marginTop: 5,
  },
  status: {
    marginTop: 8,
    fontWeight: "600",
  },
});
