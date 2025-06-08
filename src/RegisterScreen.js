import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';

export default function RegisterScreen({ navigation }) { 
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [contactNum, setContactNum] = useState(''); 
    const [password, setPassword] = useState('');  
    const [reenterPassword, setReenterPassword] = useState(''); 

    const handleRegister = () => {
        if (password !== reenterPassword) {
            alert("Passwords do not match!");
            return;
        }
        if (!username || !email || !contactNum || !password) {
            alert("Please fill in all fields!");
            return;
        }
      
        console.log('Registering with:', { username, email, contactNum, password });
      
        navigation.navigate('Login');
    };

    const handleCancel = () => {
      
        navigation.goBack(); 
    };

    return (
        <ImageBackground
            source={require('../assets/loginpic.jpeg')} 
            style={styles.background}
            resizeMode="cover"
        >

            <View style={styles.card}>
                <Text style={styles.title}>Register</Text>

                <Text style={styles.label}>Username:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter username"
                    placeholderTextColor="#888"
                    keyboardType="default"
                    autoCapitalize="none"
                    value={username}
                    onChangeText={setUsername}
                />

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

                <Text style={styles.label}>Contact Number:</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter number...'
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                    autoCapitalize="none"
                    value={contactNum}
                    onChangeText={setContactNum}
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

                <Text style={styles.label}>Re-enter Password:</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Re-enter password...'
                    placeholderTextColor="#888"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    value={reenterPassword}
                    onChangeText={setReenterPassword}
                />

                <Text style={styles.orSignIn}>— Or sign-in instead —</Text>

                <TouchableOpacity style={styles.facebookButton}>
                    {/* Ensure '../assets/fblogo.png' exists and is your Facebook icon */}
                    <Image source={require('../assets/fblogo.png')} style={styles.facebookIcon} />
                    <Text style={styles.facebookButtonText}>Continue with Facebook</Text>
                </TouchableOpacity>

                <View style={styles.signInLinkContainer}>
                    <Text style={styles.signInText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.signInLink}>Sign-in here!</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.termsText}>
                    By pressing confirm, you agree to LECA's {'\n'}terms and services.
                </Text>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={handleCancel}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={handleRegister}
                    >
                        <Text style={styles.confirmButtonText}>Confirm</Text>
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
    topIconContainer: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1,
    },
    profileIcon: {
        width: 40,
        height: 40,
        borderRadius: 20, 
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
        marginBottom: 20,
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 14,
        color: '#3b5500',
        marginBottom: 5,
        marginTop: 10,
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
        marginBottom: 15,
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
    signInLinkContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 15,
    },
    signInText: {
        fontSize: 14,
        color: '#6b7280',
    },
    signInLink: {
        fontSize: 14,
        color: '#3b5500',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    termsText: {
        fontSize: 12,
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: 25,
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
    confirmButton: {
        flex: 1,
        backgroundColor: '#3b5500', 
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});