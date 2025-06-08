import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
} from 'react-native';
// Import necessary modules for image picking.  Choose either react-native-image-picker or expo-image-picker
// import { launchImageLibrary } from 'react-native-image-picker'; // If using react-native-image-picker
import * as ImagePicker from 'expo-image-picker'; // If using expo-image-picker

export default function SellerPage({ navigation }) {
    const [sellerProducts, setSellerProducts] = useState([
        {
            id: 101,
            name: 'Organic Tomatoes',
            // image: require('../assets/tomato.jpeg'), // Example image - Static image
            price: '₱80/kg',
            location: 'Dingle, Iloilo',
            quantity: 10,
            category: 'Local',
            subCategory: 'Vegetables',
            isSoldOut: false,
        },
        {
            id: 102,
            name: 'Fresh Tilapia',
            // image: require('../assets/tilapia.jpg'), // Example image - Static image
            price: '₱120/kg',
            location: 'Dumangas, Iloilo',
            quantity: 0, // This item is sold out
            category: 'Local',
            subCategory: 'Fish',
            isSoldOut: true,
        },
        {
            id: 103,
            name: 'Native Eggs (Dozen)',
            // image: require('../assets/eggs.jpg'), // Example image - Static image
            price: '₱90/dozen',
            location: 'Pototan, Iloilo',
            quantity: 50,
            category: 'Local',
            subCategory: 'Poultry',
            isSoldOut: false,
        },
    ]);

    const allMainCategories = ['Local', 'AgriVet', 'Delicacies'];
    const allSubCategories = {
        Local: ['Fruits', 'Vegetables', 'Poultry', 'Meat', 'Fish'],
        AgriVet: ['Farm Supplies', 'Animal Feed', 'Seeds'],
        Delicacies: ['Processed Foods', 'Pastries', 'Sweets'],
    };

    // State for the new product form
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductLocation, setNewProductLocation] = useState('');
    const [newProductQuantity, setNewProductQuantity] = useState('');
    const [newProductMainCategory, setNewProductMainCategory] = useState(null);
    const [newProductSubCategory, setNewProductSubCategory] = useState(null);
    const [newProductImage, setNewProductImage] = useState(null); // URI for the new product image

    // For image picking (using expo-image-picker)
    const pickImage = async () => {
        // Request permissions if necessary (for expo-image-picker)
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Error', 'Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setNewProductImage(result.assets[0].uri);
        }
    };

    const handleAddProduct = () => {
        if (
            !newProductName ||
            !newProductPrice ||
            !newProductLocation ||
            !newProductQuantity ||
            !newProductMainCategory ||
            !newProductSubCategory ||
            !newProductImage
        ) {
            Alert.alert('Error', 'Please fill in all product details and upload an image.');
            return;
        }

        const newProduct = {
            id: sellerProducts.length > 0 ? Math.max(...sellerProducts.map(p => p.id)) + 1 : 1,
            name: newProductName,
            image: { uri: newProductImage }, // Use uri for dynamic images
            price: newProductPrice,
            location: newProductLocation,
            quantity: parseInt(newProductQuantity, 10),
            category: newProductMainCategory,
            subCategory: newProductSubCategory,
            isSoldOut: parseInt(newProductQuantity, 10) === 0,
        };

        setSellerProducts([...sellerProducts, newProduct]);
        Alert.alert('Success', `${newProductName} added to your inventory!`);

        // Clear the form
        setNewProductName('');
        setNewProductPrice('');
        setNewProductLocation('');
        setNewProductQuantity('');
        setNewProductMainCategory(null);
        setNewProductSubCategory(null);
        setNewProductImage(null);
    };

    return (
        <View style={styles.container}>
            {/* TOP BAR */}
            <View style={styles.topBar}>
                <Image source={require('../assets/leca_logo.png')} style={styles.logo} />
                <View style={styles.searchWrapper}>
                    <Text style={styles.searchBar}>Search 🔍</Text>
                </View>
                <TouchableOpacity
                    style={styles.profileIconContainer}
                    onPress={() => navigation.navigate('Profile')}
                >
                    <Text style={styles.icon}>👤</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <View style={styles.banner}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backButtonText}>{'<'} Back to Profile</Text>
                    </TouchableOpacity>

                    <View style={styles.bannerRow}>
                        <View style={styles.textContainer}>
                            <Text style={styles.marketplaceTitle}>Your Seller Hub</Text>
                            <Text style={styles.marketplaceSubtitle}>
                                Manage your products, view sales, and grow your business!
                            </Text>
                        </View>

                    </View>
                </View>

                {/* Add New Product Form */}
                <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>Add New Product</Text>

                    <TouchableOpacity style={styles.imageUploadBox} onPress={pickImage}>
                        {newProductImage ? (
                            <Image source={{ uri: newProductImage }} style={styles.uploadedImage} />
                        ) : (
                            <Text style={styles.imageUploadText}>Tap to Upload Image</Text>
                        )}
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        placeholder="Product Name"
                        value={newProductName}
                        onChangeText={setNewProductName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Price (e.g., ₱150/kg)"
                        value={newProductPrice}
                        onChangeText={setNewProductPrice}
                        keyboardType="default"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Location (e.g., Dingle, Iloilo)"
                        value={newProductLocation}
                        onChangeText={setNewProductLocation}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Quantity (e.g., 10)"
                        value={newProductQuantity}
                        onChangeText={setNewProductQuantity}
                        keyboardType="numeric"
                    />

                    {/* Main Category Selection */}
                    <Text style={styles.label}>Category:</Text>
                    <View style={styles.categorySelectionContainer}>
                        {allMainCategories.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.categoryButton,
                                    newProductMainCategory === cat && styles.categoryButtonSelected,
                                ]}
                                onPress={() => {
                                    setNewProductMainCategory(cat);
                                    setNewProductSubCategory(null); // Reset sub-category when main category changes
                                }}
                            >
                                <Text style={[
                                    styles.categoryButtonText,
                                    newProductMainCategory === cat && styles.categoryButtonTextSelected,
                                ]}>
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Sub Category Selection (conditional) */}
                    {newProductMainCategory && allSubCategories[newProductMainCategory] && (
                        <>
                            <Text style={styles.label}>Sub-Category:</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.subCategoryPillsContainer}>
                                {allSubCategories[newProductMainCategory].map((subCat) => (
                                    <TouchableOpacity
                                        key={subCat}
                                        style={[
                                            styles.subCategoryPill,
                                            newProductSubCategory === subCat && styles.subCategoryPillSelected,
                                        ]}
                                        onPress={() => setNewProductSubCategory(subCat)}
                                    >
                                        <Text style={[
                                            styles.subCategoryPillText,
                                            newProductSubCategory === subCat && styles.subCategoryPillTextSelected,
                                        ]}>
                                            {subCat}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </>
                    )}

                    <TouchableOpacity style={styles.addProductButton} onPress={handleAddProduct}>
                        <Text style={styles.addProductButtonText}>Add Product</Text>
                    </TouchableOpacity>
                </View>

                {/* My Items Section */}
                <View style={styles.myItemsContainer}>
                    <Text style={styles.myItemsTitle}>My Current Inventory</Text>
                    {sellerProducts.length === 0 ? (
                        <Text style={styles.noProductsText}>You haven't added any products yet.</Text>
                    ) : (
                        <View style={styles.productGrid}>
                            {sellerProducts.map((product) => (
                                <TouchableOpacity
                                    key={product.id}
                                    style={styles.productCard}
                                    onPress={() => navigation.navigate('SellerProductDetails', { product })} // Navigate to a seller-specific product details
                                >
                                    <Image source={product.image} style={styles.productImage} />
                                    <Text style={styles.productName}>{product.name}</Text>
                                    <Text style={styles.productPrice}>{product.price}</Text>
                                    <Text style={styles.productLocation}>{product.location}</Text>
                                    <Text style={styles.productQuantity}>
                                        Quantity: {product.quantity}
                                    </Text>
                                    {product.isSoldOut ? (
                                        <Text style={styles.soldOutText}>SOLD OUT</Text>
                                    ) : (
                                        <View style={styles.inStockButton}>
                                            <Text style={styles.inStockButtonText}>In Stock</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* BOTTOM NAVIGATION */}
            <View style={styles.bottomNav}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.bottomIconContainer}>
                    <Text style={styles.bottomIcon}>🏠</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Marketplace')} style={styles.bottomIconContainer}>
                    <Text style={styles.bottomIcon}>🛍️</Text>
                </TouchableOpacity>

                {/* Add Product Button */}
                <TouchableOpacity onPress={() => {/* Scroll to top or show product form */ }} style={styles.bottomAddProductButton}>
                    <Text style={styles.bottomAddProductIcon}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SellerProfile')} style={styles.bottomIconContainer}>
                    <Text style={styles.bottomIcon}>👤</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomIconContainer}>
                    <Text style={styles.bottomIcon}>⚙️</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fefce8' },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 50,
        paddingBottom: 10,
        backgroundColor: '#fefce8',
    },
    logo: { width: '30%', height: '150%', resizeMode: 'contain' },
    searchWrapper: { flex: 1, marginHorizontal: 10 },
    searchBar: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        textAlign: 'left',
        color: '#888',
    },
    profileIconContainer: {
        position: 'relative',
        padding: 5,
        marginLeft: 10,
    },
    icon: { fontSize: 20 },

    banner: {
        padding: 20,
        backgroundColor: '#3b5500',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    backButton: {
        marginBottom: 10,
        backgroundColor: '#fefce8',
        borderRadius: 30,
        width: 160, // Adjusted width
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: { color: '#3b5500', fontSize: 14 },
    bannerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    textContainer: { flex: 1, paddingRight: 10 },
    marketplaceTitle: {
        color: '#fff',
        fontSize: 26, // Adjusted font size
        fontWeight: 'bold',
        textAlign: 'left',
    },
    marketplaceSubtitle: {
        color: '#d1fae5',
        fontSize: 14,
        marginTop: 5,
        textAlign: 'left',
    },
    bannerImage: { width: 150, height: 120, resizeMode: 'contain' }, // Adjusted image size for seller banner

    // --- Add Product Form Styles ---
    formContainer: {
        backgroundColor: '#fff',
        margin: 15,
        borderRadius: 15,
        padding: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    formTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#3b5500',
        marginBottom: 20,
        textAlign: 'center',
    },
    imageUploadBox: {
        width: '100%',
        height: 150,
        backgroundColor: '#e5e7eb',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        overflow: 'hidden', // Ensure image stays within bounds
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imageUploadText: {
        color: '#6b7280',
        fontSize: 16,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#f9fafb',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3b5500',
        marginBottom: 10,
        marginTop: 5,
    },
    categorySelectionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
        justifyContent: 'space-between',
    },
    categoryButton: {
        backgroundColor: '#e5e7eb',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        flex: 1, // Make them take equal space
        marginHorizontal: 4,
        alignItems: 'center',
    },
    categoryButtonSelected: {
        backgroundColor: '#3b5500',
        borderColor: '#3b5500',
    },
    categoryButtonText: {
        color: '#3b5500',
        fontWeight: '500',
    },
    categoryButtonTextSelected: {
        color: '#fff',
    },
    subCategoryPillsContainer: {
        flexDirection: 'row',
        paddingVertical: 5,
        marginBottom: 15,
    },
    subCategoryPill: {
        backgroundColor: '#e5e7eb',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    subCategoryPillSelected: {
        backgroundColor: '#8BC34A',
        borderColor: '#8BC34A',
    },
    subCategoryPillText: {
        color: '#3b5500',
        fontWeight: '500',
        fontSize: 13,
    },
    subCategoryPillTextSelected: {
        color: '#fff',
    },
    addProductButton: {
        backgroundColor: '#8BC34A',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    addProductButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    // --- My Items Section Styles ---
    myItemsContainer: {
        backgroundColor: '#fff',
        margin: 15,
        borderRadius: 15,
        padding: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginTop: 20,
    },
    myItemsTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#3b5500',
        marginBottom: 20,
        textAlign: 'center',
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        
        marginTop: 10,
    },
    productCard: {
        width: '48%', 
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        marginBottom: 15,
        padding: 12,
        elevation: 1, // Lighter shadow for individual cards
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    productImage: {
        width: '100%',
        height: 100,
        borderRadius: 8,
        marginBottom: 8,
        resizeMode: 'cover',
    },
    productName: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#1f2937',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 13,
        fontWeight: '600',
        color: '#3b5500',
        marginBottom: 4,
    },
    productLocation: {
        fontSize: 11,
        color: '#6b7280',
        marginBottom: 4,
    },
    productQuantity: {
        fontSize: 12,
        color: '#4b5563',
        marginBottom: 8,
        fontWeight: '500',
    },
    soldOutText: {
        backgroundColor: '#ef4444',
        color: '#fff',
        textAlign: 'center',
        paddingVertical: 6,
        borderRadius: 8,
        fontWeight: 'bold',
        fontSize: 13,
    },
    inStockButton: {
        backgroundColor: '#8BC34A',
        borderRadius: 8,
        paddingVertical: 6,
        alignItems: 'center',
    },
    inStockButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 13,
    },

   
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 90, 
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#3b5500',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 15,
    },
    bottomIconContainer: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    bottomIcon: {
        fontSize: 28,
        color: '#fff',
    },
    bottomAddProductButton: {
        backgroundColor: '#8BC34A', 
        width: 60,
        height: 60,
        borderRadius: 30, 
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20, 
        elevation: 5, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    bottomAddProductIcon: {
        fontSize: 35,
        color: '#fff',
        fontWeight: 'bold',
        lineHeight: 35,
    },
});