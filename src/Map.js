import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922; 
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function LocalTravelMapScreen({ navigation }) {
    const [userLocation, setUserLocation] = useState(null);
    const [mapRegion, setMapRegion] = useState({
        latitude: 10.8931, 
        longitude: 122.5693,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    });

   
    const localSpots = [
        {
            id: '1',
            name: 'Pavia Public Market (Local Flavors)',
            description: 'Experience authentic Ilonggo street food and fresh produce.',
            latitude: 10.8870,
            longitude: 122.5700,
            type: 'flavor',
            image: 'https://via.placeholder.com/60',
        },
        {
            id: '2',
            name: 'Pavia Church (Local Story)',
            description: 'Learn about the history and significance of the Santa Monica Parish Church.',
            latitude: 10.8931,
            longitude: 122.5693,
            type: 'story',
            image: 'https://via.placeholder.com/60',
        },
        {
            id: '3',
            name: 'Local Pottery Shop (Local Store)',
            description: 'Handcrafted pottery, a traditional art in Pavia.',
            latitude: 10.8950,
            longitude: 122.5720,
            type: 'store',
            image: 'https://via.placeholder.com/60',
        },
        {
            id: '4',
            name: 'Carabao Festival Grounds (Local Place)',
            description: 'Site of the annual Carabao-Carroza Festival.',
            latitude: 10.8900,
            longitude: 122.5650,
            type: 'place',
            image: 'https://via.placeholder.com/60',
        },
        
    ];

    // Function to get user's current location (optional)
    // useEffect(() => {
    //     (async () => {
    //         let { status } = await Location.requestForegroundPermissionsAsync();
    //         if (status !== 'granted') {
    //             Alert.alert('Permission to access location was denied');
    //             return;
    //         }

    //         let location = await Location.getCurrentPositionAsync({});
    //         setUserLocation(location.coords);
    //         setMapRegion({
    //             latitude: location.coords.latitude,
    //             longitude: location.coords.longitude,
    //             latitudeDelta: LATITUDE_DELTA,
    //             longitudeDelta: LONGITUDE_DELTA,
    //         });
    //     })();
    // }, []);


    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>{'<'} Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Explore Pavia</Text>
            </View>

            <MapView
                style={styles.map}
                region={mapRegion}
                onRegionChangeComplete={setMapRegion}
                showsUserLocation={true} 
                initialRegion={mapRegion}
            >
                {/* User's current location marker (if fetched) */}
                {/* {userLocation && (
                    <Marker
                        coordinate={{
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude,
                        }}
                        title="Your Location"
                        pinColor="blue"
                    />
                )} */}

                {/* Pre-pinned local spots markers */}
                {localSpots.map(spot => (
                    <Marker
                        key={spot.id}
                        coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
                        title={spot.name}
                        description={spot.description}
                        pinColor={
                            spot.type === 'flavor' ? 'red' :
                            spot.type === 'story' ? 'purple' :
                            spot.type === 'store' ? 'green' :
                            'orange' 
                        }
                    >
                        <Callout onPress={() => navigation.navigate('LocalSpotDetail', { spot })}>
                            <View style={styles.calloutContainer}>
                                <Text style={styles.calloutTitle}>{spot.name}</Text>
                                <Text style={styles.calloutDescription}>{spot.description}</Text>
                                {spot.image && <Image source={{ uri: spot.image }} style={styles.calloutImage} />}
                                <Text style={styles.calloutLink}>Tap to learn more...</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>

           
            <View style={styles.legendContainer}>
                <Text style={styles.legendText}>Legend:</Text>
                <View style={styles.legendItem}>
                    <View style={[styles.legendColorBox, { backgroundColor: 'red' }]} />
                    <Text style={styles.legendItemText}>Flavors</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendColorBox, { backgroundColor: 'purple' }]} />
                    <Text style={styles.legendItemText}>Stories</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendColorBox, { backgroundColor: 'green' }]} />
                    <Text style={styles.legendItemText}>Stores</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendColorBox, { backgroundColor: 'orange' }]} />
                    <Text style={styles.legendItemText}>Places</Text>
                </View>
            </View>

          
            <View style={styles.bottomNav}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.bottomIconContainer}>
                    <Text style={styles.bottomIcon}>🏠</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Marketplace')} style={styles.bottomIconContainer}>
                    <Text style={styles.bottomIcon}>🛍️</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomIconContainer}>
                    <Text style={styles.bottomIcon}>📍</Text> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomIconContainer}>
                    <Text style={styles.bottomIcon}>💬</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomIconContainer}>
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
        backgroundColor: '#3b5500', 
        justifyContent: 'flex-start',
    },
    backButton: {
        paddingVertical: 8,
        paddingRight: 15,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    map: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    calloutContainer: {
        width: 150, // Adjust width as needed
        padding: 5,
        alignItems: 'center',
    },
    calloutTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 3,
        textAlign: 'center',
    },
    calloutDescription: {
        fontSize: 11,
        color: '#555',
        textAlign: 'center',
    },
    calloutImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: 5,
        marginBottom: 5,
    },
    calloutLink: {
        fontSize: 12,
        color: 'blue',
        marginTop: 5,
    },
    legendContainer: {
        position: 'absolute',
        bottom: 110, // Adjust to be above bottom nav
        left: 15,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'column',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    legendText: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
    },
    legendColorBox: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        marginRight: 8,
    },
    legendItemText: {
        fontSize: 13,
    },

    // Bottom Navigation Styles (copy from your existing component)
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