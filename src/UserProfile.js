import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Alert, Modal } from 'react-native';


export default function UserProfileScreen({ navigation }) {
   
    const [isEditing, setIsEditing] = useState(false);
    const [lastName, setLastName] = useState('Dela Cruz');
    const [firstName, setFirstName] = useState('Juan');
    const [location, setLocation] = useState('Roxas City, Capiz');
    const [phoneNumber, setPhoneNumber] = useState('0912345784393');
    const [allowPhoneVisibility, setAllowPhoneVisibility] = useState(false);
    const joinDate = 'May 6, 2028';

    
    const [showSellerModal, setShowSellerModal] = useState(false);
    const [accountType, setAccountType] = useState(null); 
    const [validId1, setValidId1] = useState(null); 
    const [validId2, setValidId2] = useState(null); 

    const handleUpdate = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = () => {
        console.log('Saving changes:', { lastName, firstName, location, phoneNumber, allowPhoneVisibility });
        Alert.alert('Success', 'Profile updated successfully!');
        setIsEditing(false);
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to log out?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Yes', onPress: () => navigation.navigate('Login') }
            ],
            { cancelable: true }
        );
    };

    const handleNavigate = (screenName) => {
        navigation.navigate(screenName);
    };

    
    const handleBecomeSeller = () => {
        Alert.alert(
            'Become a Seller',
            'Do you want to apply for a seller account?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Yes', onPress: () => setShowSellerModal(true) } 
            ],
            { cancelable: true }
        );
    };

    // You will need to uncomment and ensure ImagePicker is correctly imported and configured
    // const pickImage = async (setId) => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     if (!result.canceled) {
    //         setId(result.assets[0].uri);
    //     }
    // };

    const handleSubmitSellerApplication = () => {
        if (!accountType) {
            Alert.alert('Error', 'Please select an account type.');
            return;
        }

        // --- TEMPORARILY REMOVE ID VALIDATION FOR DEVELOPMENT ---
        // if (!validId1 || !validId2) {
        //     Alert.alert('Error', 'Please upload two valid IDs for verification.');
        //     return;
        // }
        // --- END TEMPORARY REMOVAL ---

        // Here, you would typically send accountType and validId URIs to your backend
        console.log('Seller application submitted (ID validation bypassed):', { accountType, validId1, validId2 });

        Alert.alert(
            'Application Submitted',
            'Your seller application has been submitted for review (ID requirement temporarily bypassed). We will notify you once it\'s approved!',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        setShowSellerModal(false); // Close modal
                        // Redirect to SellerPage or SellerProfile as desired
                        navigation.navigate('SellerPage'); // Or 'SellerProfile'
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <Image source={require('../assets/leca_logo.png')} style={styles.logo} />
                <View style={styles.searchWrapper}>
                    <Text style={styles.searchBar}>Search 🔍</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <Text style={styles.icon}>🛒</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Text style={styles.icon}>👤</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.profileHeader}>
                        <Image source={require('../assets/profile.jpeg')} style={styles.profileImage} />
                        {!isEditing ? (
                            <>
                                <Text style={styles.userName}>{firstName} {lastName}</Text>
                                <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                                    <Text style={styles.updateButtonText}>Update</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            // Edit mode fields
                            <View style={styles.editFields}>
                                <Text style={styles.editLabel}>Last Name:</Text>
                                <TextInput
                                    style={styles.editInput}
                                    value={lastName}
                                    onChangeText={setLastName}
                                    placeholder="Last Name"
                                />
                                <Text style={styles.editLabel}>First Name:</Text>
                                <TextInput
                                    style={styles.editInput}
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    placeholder="First Name"
                                />
                                <Text style={styles.editLabel}>Location:</Text>
                                <TextInput
                                    style={styles.editInput}
                                    value={location}
                                    onChangeText={setLocation}
                                    placeholder="Location"
                                />
                                <Text style={styles.editLabel}>Phone #:</Text>
                                <TextInput
                                    style={styles.editInput}
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                    keyboardType="phone-pad"
                                    placeholder="Phone Number"
                                />
                                <View style={styles.phoneVisibilityContainer}>
                                    <Text style={styles.editLabel}>Allow phone # to be visible?</Text>
                                    <TouchableOpacity
                                        style={[styles.toggleButton, allowPhoneVisibility ? styles.toggleButtonActive : styles.toggleButtonInactive]}
                                        onPress={() => setAllowPhoneVisibility(!allowPhoneVisibility)}
                                    >
                                        <Text style={styles.toggleButtonText}>{allowPhoneVisibility ? '✓' : '✗'}</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.editLabel}>License:</Text>
                                <TouchableOpacity style={styles.tapToViewButton}>
                                    <Text style={styles.tapToViewButtonText}>Tap to view</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.saveChangesButton} onPress={handleSaveChanges}>
                                    <Text style={styles.saveChangesButtonText}>Save Changes</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    {/* My Account Menu */}
                    {!isEditing && (
                        <View style={styles.accountMenu}>
                            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('MyAccount')}>
                                <Text style={styles.menuItemText}>My Account</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('Notifications')}>
                                <Text style={styles.menuItemText}>Notifications</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('Help')}>
                                <Text style={styles.menuItemText}>Need some Help?</Text>
                            </TouchableOpacity>
                            {/* Option to become a seller */}
                            <TouchableOpacity style={styles.menuItem} onPress={handleBecomeSeller}>
                                <Text style={styles.menuItemText}>Become a Seller</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {!isEditing && (
                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Text style={styles.logoutButtonText}>Log Out</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>

            {/* Seller Application Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showSellerModal}
                onRequestClose={() => setShowSellerModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Become a Seller</Text>

                        <Text style={styles.disclaimerText}>
                            **Disclaimer:** Choose wisely!
                            Seller accounts are for individuals independently selling goods from their own farms or places.
                            Business accounts are for small or large businesses. Both require valid IDs for verification to prevent scams.
                        </Text>

                        <View style={styles.accountTypeSelection}>
                            <TouchableOpacity
                                style={[styles.accountTypeButton, accountType === 'seller' && styles.accountTypeButtonSelected]}
                                onPress={() => setAccountType('seller')}
                            >
                                <Text style={[styles.accountTypeButtonText, accountType === 'seller' && styles.accountTypeButtonTextSelected]}>Individual Seller</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.accountTypeButton, accountType === 'business' && styles.accountTypeButtonSelected]}
                                onPress={() => setAccountType('business')}
                            >
                                <Text style={[styles.accountTypeButtonText, accountType === 'business' && styles.accountTypeButtonTextSelected]}>Business Account</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.uploadIdText}>Upload 2 Valid IDs for Verification:</Text>

                        {/* ID Upload Buttons (functionality commented out but kept for future use) */}
                        <TouchableOpacity style={styles.uploadIdButton} /*onPress={() => pickImage(setValidId1)}*/>
                            <Text style={styles.uploadIdButtonText}>
                                {validId1 ? 'ID 1 Selected ✓' : 'Upload ID 1 (temporarily skipped)'}
                            </Text>
                        </TouchableOpacity>
                        {validId1 && <Image source={{ uri: validId1 }} style={styles.idPreview} />}

                        <TouchableOpacity style={styles.uploadIdButton} /*onPress={() => pickImage(setValidId2)}*/>
                            <Text style={styles.uploadIdButtonText}>
                                {validId2 ? 'ID 2 Selected ✓' : 'Upload ID 2 (temporarily skipped)'}
                            </Text>
                        </TouchableOpacity>
                        {validId2 && <Image source={{ uri: validId2 }} style={styles.idPreview} />}

                        <TouchableOpacity style={styles.submitSellerButton} onPress={handleSubmitSellerApplication}>
                            <Text style={styles.submitSellerButtonText}>Submit Application</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelButton} onPress={() => setShowSellerModal(false)}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.bottomIconContainer}>
                    <Text style={styles.bottomIcon}>🏠</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.bottomIconContainer}>
                    <Text style={styles.bottomIcon}>🛒</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomIconContainer}>
                    <Text style={styles.bottomIcon}>📦</Text>
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
        backgroundColor: '#fefce8',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    logo: {
        width: 80,
        height: 40,
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
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingBottom: 90,
    },
    profileCard: {
        backgroundColor: '#3b5500',
        borderRadius: 15,
        marginTop: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#d1fae5',
        borderWidth: 3,
        borderColor: '#fff',
        marginBottom: 10,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    updateButton: {
        backgroundColor: '#8BC34A',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    updateButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    editFields: {
        width: '100%',
        alignItems: 'flex-start',
    },
    editLabel: {
        fontSize: 14,
        color: '#fff',
        marginTop: 10,
        marginBottom: 5,
    },
    editInput: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    phoneVisibilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },
    toggleButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    toggleButtonActive: {
        backgroundColor: '#8BC34A',
    },
    toggleButtonInactive: {
        backgroundColor: '#e5e7eb',
    },
    toggleButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    tapToViewButton: {
        backgroundColor: '#e5e7eb',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    tapToViewButtonText: {
        color: '#3b5500',
        fontWeight: 'bold',
    },
    saveChangesButton: {
        backgroundColor: '#8BC34A',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    saveChangesButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    accountMenu: {
        width: '100%',
        marginTop: 20,
        backgroundColor: '#d1fae5',
        borderRadius: 10,
        paddingVertical: 10,
    },
    menuItem: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#b2dfdb',
    },
    menuItemText: {
        fontSize: 16,
        color: '#3b5500',
        fontWeight: '500',
    },
    logoutButton: {
        backgroundColor: '#e5e7eb',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    logoutButtonText: {
        color: '#3b5500',
        fontWeight: 'bold',
        fontSize: 16,
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
    
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 25,
        width: '90%',
        maxHeight: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#3b5500',
    },
    disclaimerText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 20,
    },
    accountTypeSelection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    accountTypeButton: {
        backgroundColor: '#e5e7eb',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    accountTypeButtonSelected: {
        backgroundColor: '#3b5500',
        borderColor: '#3b5500',
    },
    accountTypeButtonText: {
        color: '#3b5500',
        fontWeight: 'bold',
        fontSize: 16,
    },
    accountTypeButtonTextSelected: {
        color: '#fff',
    },
    uploadIdText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        marginTop: 10,
    },
    uploadIdButton: {
        backgroundColor: '#8BC34A',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginTop: 10,
        width: '80%',
        alignItems: 'center',
    },
    uploadIdButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    idPreview: {
        width: 100,
        height: 75,
        resizeMode: 'cover',
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    submitSellerButton: {
        backgroundColor: '#3b5500',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    submitSellerButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    cancelButton: {
        marginTop: 10,
        paddingVertical: 10,
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
    },
});