import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useCart } from '../context/CartContext'; 

export default function MarketplaceScreen({ navigation }) {
  const { cartItems } = useCart();
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  
  const allProducts = [
    { id: 1, name: 'Mango', market: 'La Paz Market', price: '₱150/kg', type: 'Local', category: 'Fruits', description: 'Fresh and sweet carabao mangoes from local farms.'},
    { id: 2, name: 'Native Chicken', market: 'Local Farms', price: '₱350/kg', type: 'Local', category: 'Poultry', description: 'Locally raised native chicken, perfect for savory dishes.'},
    { id: 3, name: 'Homemade Atsara', market: 'Mama Nena\'s Kitchen', price: '₱120/jar', type: 'Delicacies', category: 'Processed Foods', description: 'Tangy and sweet homemade pickled papaya.'},
    { id: 4, name: 'Organic Fertiliser', market: 'AgriSupply', price: '₱250/bag', type: 'AgriVet', category: 'Farm Supplies', description: 'Environmentally friendly organic fertilizer for healthier crops.'},
    { id: 5, name: 'Grapes', market: 'La Paz Market', price: '₱150/kg', type: 'Local', category: 'Fruits', description: 'Juicy and seedless grapes, perfect for snacking.'},
    { id: 6, name: 'Cabbage', market: 'Jaro Market', price: '₱80/kg', type: 'Local', category: 'Vegetables', description: 'Crisp and fresh cabbage, ideal for salads and cooking.'},
    { id: 7, name: 'Tilapia', market: 'Iloilo Fishing Port', price: '₱120/kg', type: 'Local', category: 'Fish', description: 'Freshly caught tilapia, excellent for frying or stewing.'},
    { id: 8, name: 'Pork Belly', market: 'Mandurriao Market', price: '₱300/kg', type: 'Local', category: 'Meat', description: 'Premium pork belly, perfect for roasting or grilling.'},
    { id: 9, name: 'Fish Meal', market: 'AgriVet Solutions', price: '₱180/kg', type: 'AgriVet', category: 'Animal Feed', description: 'High-protein fish meal for animal feed.'},
    { id: 10, name: 'Piaya', market: 'Bongbong\'s Delicacies', price: '₱80/pack', type: 'Delicacies', category: 'Pastries', description: 'Sweet flatbread filled with muscovado sugar, a famous Negrense delicacy.'},
  ];

  const mainCategories = ['All', 'Local', 'AgriVet', 'Delicacies'];
  const subCategories = ['All', 'Fruits', 'Vegetables', 'Poultry', 'Meat', 'Fish', 'Processed Foods', 'Farm Supplies', 'Animal Feed', 'Pastries'];

  const [selectedMainCategory, setSelectedMainCategory] = useState('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(allProducts); 

  useEffect(() => {
    let currentFilteredProducts = allProducts;

    if (selectedMainCategory !== 'All') {
      currentFilteredProducts = currentFilteredProducts.filter(
        (product) => product.type === selectedMainCategory
      );
    }

    if (selectedSubCategory !== 'All') {
      currentFilteredProducts = currentFilteredProducts.filter(
        (product) => product.category === selectedSubCategory
      );
    }

    setFilteredProducts(currentFilteredProducts);
  }, [selectedMainCategory, selectedSubCategory, allProducts]); 

  const handleMainCategoryPress = (type) => {
    setSelectedMainCategory(type);
    setSelectedSubCategory('All');
  };

  const handleSubCategoryPress = (category) => {
    setSelectedSubCategory(category);
  };

  const getAvailableSubCategories = () => {
    if (selectedMainCategory === 'All') {
      return subCategories;
    } else {
      const available = allProducts
        .filter(product => product.type === selectedMainCategory)
        .map(product => product.category);
      return ['All', ...new Set(available)].sort();
    }
  };

  return (
    <View style={styles.container}>
      {/* TOP BAR */}
      <View style={styles.topBar}>
        <Image source={require('../assets/leca_logo.png')} style={styles.logo} />
        <View style={styles.searchWrapper}>
          <Text style={styles.searchBar}>Search 🔍</Text>
        </View>
        {/* Cart Icon in Top Bar - clickable */}
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.icon}>🛒</Text>
          {totalCartItems > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalCartItems}</Text>
            </View>
          )}
        </TouchableOpacity>
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
            <Text style={styles.backButtonText}>{'<'} Back to Home</Text>
          </TouchableOpacity>

          <View style={styles.bannerRow}>
            <View style={styles.textContainer}>
              <Text style={styles.marketplaceTitle}>Marketplace</Text>
              <Text style={styles.marketplaceSubtitle}>
                Support your local farmers—shop fresh, local goods straight from their hands to yours.
              </Text>
            </View>
            <Image source={require('../assets/farmers.png')} style={styles.bannerImage} />
          </View>
        </View>

        {/* Main category tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryTabsContainer}
        >
          {mainCategories.map((type, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryTab,
                selectedMainCategory === type && styles.selectedMainCategoryTab,
              ]}
              onPress={() => handleMainCategoryPress(type)}
            >
              <Text
                style={[
                  styles.categoryTabText,
                  selectedMainCategory === type && styles.selectedMainCategoryTabText,
                ]}
              >
                {type === 'Local' && '🧑‍🌾 Local'}
                {type === 'AgriVet' && '🐮 AgriVet'}
                {type === 'Delicacies' && '🍽️ Delicacies'}
                {type === 'All' && '🌟 All Markets'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sub-category pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {getAvailableSubCategories().map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryPill,
                selectedSubCategory === category && styles.selectedSubCategoryPill,
              ]}
              onPress={() => handleSubCategoryPress(category)}
            >
              <Text
                style={[
                  styles.categoryPillText,
                  selectedSubCategory === category && styles.selectedSubCategoryPillText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.productGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => navigation.navigate('ProdDetails', { product })}
              >
                {/* Ensure product.image is a valid source */}
                <Image source={product.image} style={styles.productImage} />
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productMarket}>{product.market}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                <View style={styles.buyButton}>
                  <Text style={styles.buyButtonText}>Buy Now</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noProductsText}>No products found for the selected filters.</Text>
          )}
        </View>
      </ScrollView>

      {/* BOTTOM NAVIGATION - Consolidated and fixed */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.bottomIconContainer}>
          <Text style={styles.bottomIcon}>🏠</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={styles.bottomIconContainer}
        >
          <Text style={styles.bottomIcon}>🛒</Text>
          {totalCartItems > 0 && (
            <View style={styles.bottomCartBadge}>
              <Text style={styles.bottomCartBadgeText}>{totalCartItems}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomIconContainer} onPress={() => navigation.navigate('SellerPage')}>
          <Text style={styles.bottomIcon}>📦</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomIconContainer} onPress={() => navigation.navigate('MessagesPage')}>
          <Text style={styles.bottomIcon}>💬</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomIconContainer} onPress={() => navigation.navigate('Profile')}>
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
  },
  iconContainer: {
    position: 'relative',
    padding: 5,
    marginLeft: 10,
  },
  profileIconContainer: {
    position: 'relative',
    padding: 5,
    marginLeft: 10,
  },
  icon: { fontSize: 20 },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: -5,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 20,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },

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
    width: 140,
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
    fontSize: 29,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  marketplaceSubtitle: {
    color: '#d1fae5',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'left',
  },
  bannerImage: { width: 180, height: 150 },

  categoryTabsContainer: {
    flexDirection: 'row',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  categoryTab: {
    backgroundColor: '#e5e7eb',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  selectedMainCategoryTab: {
    backgroundColor: '#3b5500',
  },
  categoryTabText: {
    fontWeight: '600',
    color: '#3b5500',
  },
  selectedMainCategoryTabText: {
    color: '#fff',
  },

  categoriesContainer: {
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 5,
  },
  categoryPill: {
    backgroundColor: '#e5e7eb',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
  },
  selectedSubCategoryPill: {
    backgroundColor: '#3b5500',
  },
  categoryPillText: {
    color: '#3b5500',
    fontWeight: '500',
  },
  selectedSubCategoryPillText: {
    color: '#fff',
  },

  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 12,
    elevation: 2,
    shadowColor: '#000', // Added for iOS shadow
    shadowOffset: { width: 0, height: 1 }, // Added for iOS shadow
    shadowOpacity: 0.2, // Added for iOS shadow
    shadowRadius: 1.41, // Added for iOS shadow
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover', // Ensures image covers the area
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1f2937',
  },
  productMarket: {
    fontSize: 12,
    color: '#6b7280',
    marginVertical: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b5500',
  },
  buyButton: {
    backgroundColor: '#3b5500',
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
  },
  buyButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  noProductsText: {
    textAlign: 'center',
    marginTop: 20,
    width: '100%',
    fontSize: 16,
    color: '#6b7280',
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90, // Adjusted height slightly for better fit, original was 100
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
    position: 'relative',
    paddingVertical: 10,
  },
  bottomIcon: {
    fontSize: 24,
    color: '#fff',
  },
  bottomCartBadge: {
    position: 'absolute',
    top: 5, // Adjusted position slightly
    right: '25%', // Keep as percentage relative to container width
    backgroundColor: '#ef4444',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 20,
  },
  bottomCartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});