import React, { useRef } from 'react';
import {
    Animated,
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

const { height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
    const scrollY = useRef(new Animated.Value(0)).current;

    const logoOpacity1 = scrollY.interpolate({
        inputRange: [0, height * 0.3],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const logoOpacity2 = scrollY.interpolate({
        inputRange: [0, height * 0.3],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    return (
        <Animated.ScrollView
            contentContainerStyle={styles.scrollContainer}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
            )}
        >

            <View style={styles.logoContainer}>
                <Animated.Image
                    source={require('../assets/leca_logo1.png')}
                    style={[styles.logo, styles.absoluteLogo, { opacity: logoOpacity1 }]}
                    resizeMode="contain"
                />
                <Animated.Image
                    source={require('../assets/leca_logo.png')}
                    style={[styles.logo1, { opacity: logoOpacity2 }]}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.bottomContainer}>
                <Text style={styles.welcomeTitle}>Welcome!</Text>
                <Text style={styles.description}>
                    This is a digital platform connecting producers, consumers, retailers, and government agencies in the Philippines.
                    It aims to create an efficient, transparent, and equitable food system. LECA empowers local farmers, reduces food
                    waste, and provides access to fresh, affordable, and sustainably-sourced produce for all Filipinos.
                </Text>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.signInButton}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.signInButtonText}>Sign in</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Animated.ScrollView>
    );
}



const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#fefce8',
    },
    logoContainer: {
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fefce8',

    },
    logo: {
        width: '80%',
        height: 400,
    },
    logo1: {
        width: '100%',
        marginTop: '80%'
    },
    absoluteLogo: {
        position: 'absolute',
    },
    bottomContainer: {
        backgroundColor: '#3b5500',
        padding: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        height: 400
    },
    welcomeTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fefce8',
        marginBottom: 20,
    },
    description: {
        color: '#fff',
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'left'
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },

    signInButton: {
        flex: 1,
        backgroundColor: '#fefce8',
        paddingVertical: 12,
        marginRight: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#3b5500',
        alignItems: 'center',
    },

    signInButtonText: {
        color: '#3b5500',
        fontWeight: 'bold',
        fontSize: 16,
    },

    registerButton: {
        flex: 1,
        backgroundColor: '#cbdc90',
        paddingVertical: 12,
        marginLeft: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    registerButtonText: {
        color: '#3b5500',
        fontWeight: 'bold',
        fontSize: 16,
    },

});



