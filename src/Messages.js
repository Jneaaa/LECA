import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList // Still using FlatList for the main chat list
} from 'react-native';

export default function MessagesPage({ navigation }) {
    // We will NOT include recentChatsData or its FlatList

    // Dummy data for chat messages - replace with actual chat data
    const chatMessagesData = [
        {
            id: 'chat1',
            name: 'Jane Doe',
            lastMessage: 'Hi, thanks for ordering! Please don\'t forget to rate us if you were satisfied with your...',
            time: '3:42 AM',
            
            seen: true,
        },
        {
            id: 'chat2',
            name: 'John Smith', // Changed name for variety
            lastMessage: 'Your order has been shipped and should arrive within 2-3 days.',
            time: 'Yesterday',
          
            seen: false, // Example: Mark as unread
        },
        {
            id: 'chat3',
            name: 'Marketplace Support',
            lastMessage: 'We received your inquiry. A representative will get back to you shortly.',
            time: 'Monday',
            
            seen: true,
        },
        {
            id: 'chat4',
            name: 'Farmer Ben',
            lastMessage: 'Got fresh produce today! Message me for details.',
            time: 'May 20',
            
            seen: false,
        },
        {
            id: 'chat5',
            name: 'Cook Sarah',
            lastMessage: 'The adobo recipe was a hit!',
            time: 'May 18',
           
            seen: true,
        },
        {
            id: 'chat6',
            name: 'Local Store',
            lastMessage: 'New stock of organic honey available.',
            time: 'May 15',
           
            seen: true,
        },
        {
            id: 'chat7',
            name: 'Delivery Guy',
            lastMessage: 'On my way with your delivery!',
            time: '3:42 AM',
           
            seen: true,
        },
    ];

    // The renderRecentChatItem function is no longer needed

    const renderChatItem = ({ item }) => (
        <TouchableOpacity style={styles.chatItem} onPress={() => {/* Navigate to individual chat screen */ }}>
            <Image source={item.avatar} style={styles.chatAvatar} />
            <View style={styles.chatContent}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatLastMessage} numberOfLines={1}>{item.lastMessage}</Text>
                <Text style={styles.chatSeenText}>{item.seen ? `Seen at ${item.time}` : 'New message'}</Text>
            </View>
            <TouchableOpacity style={styles.chatOptions}>
                <Text style={styles.chatOptionsText}>•••</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonIcon}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Messages</Text>
                <TouchableOpacity style={styles.moreOptionsButton}>
                    <Text style={styles.moreOptionsIcon}>•••</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Recent Chats Section - REMOVED */}
                {/* You can re-add this if you decide to include it later */}

                {/* Chat List */}
                {/* We still use a FlatList for the main messages, as it's efficient for lists */}
                <FlatList
                    data={chatMessagesData}
                    renderItem={renderChatItem}
                    keyExtractor={item => item.id}
                    scrollEnabled={false} // Keep false if the ScrollView handles overall scrolling
                    contentContainerStyle={styles.chatListContainer}
                />
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.bottomIconContainer}>
                    <Text style={styles.bottomIcon}>🏠</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Marketplace')} style={styles.bottomIconContainer}>
                    <Text style={styles.bottomIcon}>🛍️</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SellerPage')} style={styles.bottomIconContainer}>
                    <Text style={styles.bottomIcon}>📦</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('MessagesPage')} style={[styles.bottomIconContainer, styles.bottomIconContainerActive]}>
                    <Text style={[styles.bottomIcon, styles.bottomIconActive]}>💬</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.bottomIconContainer}>
                    <Text style={styles.bottomIcon}>👤</Text>
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
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 50,
        paddingBottom: 15,
        backgroundColor: '#3b5500',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    backButton: {
        padding: 5,
    },
    backButtonIcon: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    moreOptionsButton: {
        padding: 5,
    },
    moreOptionsIcon: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    sectionTitle: { // This style is still here but not used since the section is removed
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3b5500',
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 20,
    },
    recentChatsContainer: { // This style is still here but not used
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    recentChatAvatarContainer: { // This style is still here but not used
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#6C8350',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#d1fae5',
    },
    recentChatAvatar: { // This style is still here but not used
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    chatListContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        // If there's no "Recent Chats" section, you might want to adjust top padding here if needed
        marginTop: 10, // Added some top margin to the chat list for spacing
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e5e7eb',
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    chatAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#6C8350',
        marginRight: 15,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#d1fae5',
    },
    chatContent: {
        flex: 1,
    },
    chatName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    chatLastMessage: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    chatSeenText: {
        fontSize: 12,
        color: '#888',
    },
    chatOptions: {
        padding: 5,
    },
    chatOptionsText: {
        fontSize: 18,
        color: '#888',
        fontWeight: 'bold',
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
    bottomIconContainerActive: {
        backgroundColor: '#6C8350',
        borderRadius: 15,
    },
    bottomIcon: {
        fontSize: 24,
        color: '#fff',
    },
    bottomIconActive: {
        color: '#fefce8',
    },
});