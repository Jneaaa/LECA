import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useCart } from '../context/CartContext'; 

export default function CartScreen({ navigation }) {
    const { cartItems, updateCartItemQuantity, removeCartItem } = useCart(); 

    const discountPercentage = 0.10;

   
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    
    const discountAmount = subtotal * discountPercentage;

   
    const total = subtotal - discountAmount;

    const handleQuantityChange = (itemId, change) => {
        const item = cartItems.find(i => i.id === itemId);
        if (item) {
            updateCartItemQuantity(itemId, item.quantity + change);
        }
    };

    const handleRemoveItem = (itemId) => {
        Alert.alert(
            "Remove Item",
            "Are you sure you want to remove this item from your cart?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Remove",
                    onPress: () => removeCartItem(itemId), 
                    style: "destructive"
                }
            ]
        );
    };

    const handleContinueToCheckout = () => {
        if (cartItems.length === 0) {
            Alert.alert("Your cart is empty", "Please add items to your cart before proceeding to checkout.");
            return;
        }
       
        navigation.navigate('CheckoutScreen', { cartItems, subtotal, discountAmount, total });
    };

    return (
        <View style={styles.container}>
            {/* Header Bar */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Your Cart</Text>
                <TouchableOpacity style={styles.moreOptionsButton}>
                    <Text style={styles.moreOptionsText}>...</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {cartItems.length === 0 ? (
                    <Text style={styles.emptyCartText}>Your cart is empty.</Text>
                ) : (
                    <>
                        {cartItems.map((item) => (
                            <View key={item.id} style={styles.cartItemCard}>
                                {/* Ensure item.image is a valid source (e.g., require() for local images or {uri: 'http://...'} for network) */}
                                <Image source={item.image} style={styles.productImage} />
                                <View style={styles.itemDetails}>
                                    <View style={styles.itemHeader}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        {/* Display price with currency symbol and 2 decimal places */}
                                        <Text style={styles.itemPrice}>₱{item.price.toFixed(2)}</Text>
                                    </View>
                                    <Text style={styles.itemDescription}>{item.description}</Text>
                                    <View style={styles.quantityControl}>
                                        <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)} style={styles.quantityButton}>
                                            <Text style={styles.quantityButtonText}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.quantityText}>{item.quantity}</Text>
                                        <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)} style={styles.quantityButton}>
                                            <Text style={styles.quantityButtonText}>+</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.removeButton}>
                                            <Text style={styles.removeButtonText}>Remove</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}

                        {/* Purchase Summary */}
                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryTitle}>Purchase Summary</Text>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Subtotal</Text>
                                <Text style={styles.summaryValue}>₱{subtotal.toFixed(2)}</Text>
                            </View>
                            {discountPercentage > 0 && (
                                <View style={styles.summaryRow}>
                                    <Text style={styles.summaryLabel}>Discount ({discountPercentage * 100}%)</Text>
                                    <Text style={styles.summaryDiscount}>-₱{discountAmount.toFixed(2)}</Text>
                                </View>
                            )}
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryTotalLabel}>Total</Text>
                                <Text style={styles.summaryTotalValue}>₱{total.toFixed(2)}</Text>
                            </View>
                        </View>
                    </>
                )}
            </ScrollView>

            {/* Fixed "Continue to Checkout" button at the bottom */}
            <TouchableOpacity
                style={styles.checkoutButton}
                onPress={handleContinueToCheckout}
                disabled={cartItems.length === 0} 
            >
                <Text style={styles.checkoutButtonText}>Continue to Checkout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fefce8',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 50,
        paddingBottom: 15,
        backgroundColor: '#3b5500',
    },
    backButton: {
        padding: 5,
    },
    backButtonText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    moreOptionsButton: {
        padding: 5,
    },
    moreOptionsText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    scrollViewContent: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    emptyCartText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: '#6b7280',
    },
    cartItemCard: {
        flexDirection: 'row',
        backgroundColor: '#d1fae5',
        borderRadius: 15,
        marginBottom: 15,
        padding: 10,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3b5500',
        flexShrink: 1,
        marginRight: 10,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3b5500',
    },
    itemDescription: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 10,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: '#3b5500',
        width: 30,
        height: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    quantityButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1f2937',
        marginHorizontal: 5,
        minWidth: 20,
        textAlign: 'center',
    },
    removeButton: {
        backgroundColor: '#ef4444',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginLeft: 'auto',
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },

    summaryCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginTop: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        marginBottom: 20,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3b5500',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        paddingBottom: 8,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    summaryLabel: {
        fontSize: 16,
        color: '#4b5563',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1f2937',
    },
    summaryDiscount: {
        fontSize: 16,
        fontWeight: '500',
        color: '#dc2626',
    },
    summaryTotalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3b5500',
    },
    summaryTotalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3b5500',
    },
    checkoutButton: {
        backgroundColor: '#3b5500',
        paddingVertical: 15,
        marginHorizontal: 15,
        marginBottom: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});