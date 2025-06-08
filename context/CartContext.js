import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity) => {
        // Extract the numerical part from the price string (e.g., "₱150/kg" -> 150)
        // This is a robust way to handle prices that might include currency symbols or text.
        const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, ''));

        if (isNaN(numericPrice)) {
            Alert.alert("Error", "Invalid product price encountered.");
            console.error("Invalid price for product:", product);
            return; // Don't add to cart if price is invalid
        }

        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.id === product.id);

            if (existingItemIndex > -1) {
                // Item already in cart, update quantity
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + quantity,
                };
                Alert.alert("Item Added", `${quantity} more ${product.name}(s) added to cart!`);
                return updatedItems;
            } else {
                // Item not in cart, add new item with numeric price
                Alert.alert("Item Added", `${quantity} ${product.name}(s) added to cart!`);
                return [...prevItems, { ...product, quantity, price: numericPrice }]; // Store numeric price
            }
        });
    };

    const updateCartItemQuantity = (itemId, newQuantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId
                    ? { ...item, quantity: Math.max(1, newQuantity) }
                    : item
            )
        );
    };

    const removeCartItem = (itemId) => {
        Alert.alert(
            "Remove Item",
            "Are you sure you want to remove this item from your cart?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Remove",
                    onPress: () => setCartItems(prevItems => prevItems.filter(item => item.id !== itemId)),
                    style: "destructive"
                }
            ]
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateCartItemQuantity, removeCartItem }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);