import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {

        console.log('Attempting to log in with:', { email, password });
        navigation.navigate('Home');
    };

    return (
        <ImageBackground
            source={require('../assets/loginpic.jpeg')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.card}>
                <Text style={styles.title}>Log in</Text>

                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter email address..."
                    placeholderTextColor="#888"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Password:</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter password...'
                    placeholderTextColor="#888"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    value={password}
                    onChangeText={setPassword}
                />

                <Text style={styles.orSignIn}>— Or sign-in instead —</Text>

                <TouchableOpacity style={styles.facebookButton}>

                    <Image source={require('../assets/fblogo.png')} style={styles.facebookIcon} />
                    <Text style={styles.facebookButtonText}>Continue with Facebook</Text>
                </TouchableOpacity>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogin}
                    >
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    card: {
        width: '90%',
        maxWidth: 350,
        backgroundColor: '#fefce8',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 8,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#3b5500',
        marginBottom: 30,
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 14,
        color: '#3b5500',
        marginBottom: 5,
        marginTop: 15,
    },
    input: {
        width: '100%',
        height: 45,
        borderColor: '#d1fae5',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 15,
        backgroundColor: '#fff',
        marginBottom: 5,
    },
    orSignIn: {
        color: '#6b7280',
        marginVertical: 20,
        fontSize: 14,
    },
    facebookButton: {
        flexDirection: 'row',
        backgroundColor: '#4267B2',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 30,
    },
    facebookIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    facebookButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#e5e7eb',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginRight: 10,
    },
    cancelButtonText: {
        color: '#3b5500',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginButton: {
        flex: 1,
        backgroundColor: '#3b5500',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});