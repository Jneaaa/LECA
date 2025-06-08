import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'; 
import { useCart } from '../context/CartContext'; 

export default function ProductDetailScreen({ route, navigation }) {
    const { product } = route.params;
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);

    const increment = () => setQuantity(q => q + 1);
    const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    const handleAddToCart = () => {
        addToCart(product, quantity); 
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Back button */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>{'<'} Back to Marketplace</Text>
                </TouchableOpacity>

                <Image source={product.image} style={styles.image} />
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.rating}>⭐ 4.8</Text>

                <View style={styles.counter}>
                    <TouchableOpacity onPress={decrement}><Text style={styles.button}>-</Text></TouchableOpacity>
                    <Text style={styles.quantity}>{quantity}</Text>
                    <TouchableOpacity onPress={increment}><Text style={styles.button}>+</Text></TouchableOpacity>
                </View>


                <Text style={styles.price}>{product.price}</Text>
                <Text style={styles.descLabel}>Description</Text>

                <Text style={styles.description}>
                    {product.description || 'No description available.'}
                </Text>
            </ScrollView>

            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                    <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    backButton: {
        margin: 15,
        backgroundColor: '#3b5500',
        borderRadius: 30,
        width: 180,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '15%'
    },
    backButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    image: { width: '100%', height: 250, resizeMode: 'cover' },
    title: { fontSize: 28, fontWeight: 'bold', marginHorizontal: 15, marginTop: 10 },
    rating: { fontSize: 16, marginHorizontal: 15, color: '#999', marginBottom: 10 },
    counter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15
    },
    button: {
        fontSize: 28,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#f3f4f6',
        borderRadius: 10,
    },
    quantity: { fontSize: 20, marginHorizontal: 20 },
    price: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#3b5500' },
    descLabel: { marginTop: 20, fontSize: 18, fontWeight: 'bold', marginHorizontal: 15 },
    description: { marginHorizontal: 15, fontSize: 16, color: '#666', lineHeight: 24, marginBottom: 20 },
    bottomBar: {
        padding: 30,
        backgroundColor: '#fefce8',
        alignItems: 'center',
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    addToCartButton: {
        backgroundColor: '#3b5500',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 30,
        width: '90%',
        alignItems: 'center',
    },
    addToCartButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});