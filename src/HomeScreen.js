import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const services = [
    {
      title: 'Marketplace',
      description:
        'Support your local farmers—shop fresh, local goods straight from their hands to yours.',
      image: require('../assets/farmers.png'),
      screen: 'Marketplace',
    },
    {
      title: 'Logistic Rental Services',
      description:
        'Affordable transport solutions to help you move goods—when and where you need them.',
      image: require('../assets/truck.png'),
      screen: 'LogisticServices',
    },
    {
      title: 'Local Travel',
      description:
        'Discover the stories, flavors, and hidden gems of every place—travel.',
      image: require('../assets/map.jpeg'),
      screen: 'Map',
    },
  ];

  return (
    <View style={styles.container}>
      {/* TOP BAR */}
      <View style={styles.topBar}>
        <Image source={require('../assets/leca_logo.png')} style={styles.logo} />
        <View style={styles.searchWrapper}>
          <Text style={styles.searchBar}>Search 🔍</Text>
        </View>
        {/* These icons should ideally be TouchableOpacity for navigation */}
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.icon}>🛒</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.icon}>👤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
        {/* Welcome Banner */}
        <View style={styles.banner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitle}>Welcome!</Text>
            <Text style={styles.bannerDesc}>
              Every purchase you make helps a local farmer thrive—thank you for
              choosing to grow with us.
            </Text>
          </View>
          <Image source={require('../assets/plant.png')} style={styles.bannerImage} />
        </View>

        <Text style={styles.browseText}>Browse Our Services</Text>

        {services.map((service, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => service.screen && navigation.navigate(service.screen)}
          >
            <Image source={service.image} style={styles.cardImage} />
            <View style={{ padding: 35, flex: 1 }}>
              <Text style={styles.cardTitle}>{service.title}</Text>
              <Text style={styles.cardDesc}>{service.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.bottomIconContainer} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.bottomIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomIconContainer} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.bottomIcon}>🛒</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#fefce8',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#fefce8',
  },
  logo: {
    width: '30%',
    height: '150%',
    resizeMode: 'contain',
  },
  searchWrapper: {
    flex: 1,
    marginHorizontal: 10,
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    textAlign: 'left',
    color: '#888',
  },
  icon: {
    fontSize: 20,
    marginLeft: 10,
    color: '#3b5500',
  },

  banner: {
    backgroundColor: '#3b5500',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 30,
    fontFamily: 'Anton',
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffff',
  },
  bannerDesc: {
    fontSize: 14,
    color: '#d1fae5',
    marginRight: 10,
  },
  bannerImage: {
    width: 160,
    height: 170,
    resizeMode: 'cover',
  },

  browseText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginVertical: 20,
    color: '#3C500C',
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: 140,
    height: 100,
    margin: 10,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1f2937',
  },
  cardDesc: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 5,
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
    fontSize: 24,
    color: '#fff',
  },
});