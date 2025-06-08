import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

type ProdCardProps = {
  name: string;
  desc: string;
  price: number;
  image: string;
};

const ProdCard = ({ name, desc, price, image }: ProdCardProps) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.desc}>{desc}</Text>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.quantityControl}>
            <TouchableOpacity
              onPress={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Text style={styles.controlText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity((q) => q + 1)}>
              <Text style={styles.controlText}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.priceTag}>
            <Text style={styles.price}>₱{(price * quantity).toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    width: 300,
    alignSelf: "center",
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
  },
  textContainer: {
    marginBottom: 6,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  desc: {
    fontSize: 12,
    textAlign: "center",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quantityControl: {
    flexDirection: "row",
    backgroundColor: "#445500",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: "center",
  },
  controlText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginHorizontal: 6,
  },
  quantity: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginHorizontal: 6,
  },
  priceTag: {
    backgroundColor: "#C8F169",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  price: {
    fontWeight: "bold",
    color: "#333",
  },
});

export default ProdCard;
