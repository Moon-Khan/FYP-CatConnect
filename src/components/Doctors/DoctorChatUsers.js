import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const DoctorChatUsers = ({ doctorId }) => {
    const navigation = useNavigation();
    const [users, setUsers] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null); // To store the current user's ID

    useEffect(() => {
        // Fetch the current user's ID from Firebase Authentication
        const currentUser = auth().currentUser;
        if (currentUser) {
            setCurrentUserId(currentUser.uid);
        }
    }, []);

    useEffect(() => {
        if (currentUserId) {
            fetchUsers(doctorId);
        }
    }, [currentUserId, doctorId]);

    const fetchUsers = async (doctorId) => {
        try {
            // Fetch all users from the "users" collection
            const userSnapshot = await firestore().collection('users').get();
            const allUserIds = userSnapshot.docs.map(doc => doc.id);

            // Fetch conversations for each user
            const fetchedUsers = await Promise.all(allUserIds.map(async (userId) => {
                // Fetch conversation data for the current user ID and doctor ID
                const conversationSnapshot = await firestore()
                    .collection('doctorconversation')
                    .doc(`${userId}_${userId}`) // Use the combination of user ID and doctor ID as the document ID
                    .collection('messages')
                    .get();

                // Check if the user has any conversations
                if (!conversationSnapshot.empty) {
                    // If the user has conversations, fetch user data from the "users" collection
                    const userSnapshot = await firestore().collection('users').doc(userId).get();
                    return { id: userId, ...userSnapshot.data() };
                } else {
                    // If the user has no conversations, return null
                    return null;
                }
            }));

            // Filter out users with null values (no conversations)
            const filteredUsers = fetchedUsers.filter(user => user !== null);

            // Map over filteredUsers array and log the IDs
            const filteredUserIds = filteredUsers.map(user => user.id);
            console.log("Filtered User IDs:", filteredUserIds);

            setUsers(filteredUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleUserPress = (user) => {
        navigation.navigate('DoctorChat', { userId: user.id });
        console.log("Doctor ---------->", user.id);
    };

    const renderUserItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleUserPress(item)}>
            <View style={styles.userItem}>
                <Image source={require('../../../assets/Catassets/uicon.png')} style={styles.userIcon} />
                <Text style={styles.username}>{item.firstname}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={renderUserItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5'
    },
    flatListContent: {
        paddingHorizontal: 16,
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#E0E0E0',
        backgroundColor: '#EDEFF1',
        borderWidth: 1,
        borderRadius: 16,
        elevation: 2,
        padding: 16,
        marginBottom: 12,
    },
    username: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#7E7E7E',
        marginLeft: 10, // Add margin to separate username from the icon
    },
    userIcon: {
        width: 24,
        height: 24,
    },
});

export default DoctorChatUsers;