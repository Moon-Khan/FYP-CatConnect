import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const DoctorChatUsers = () => {
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
            fetchUsers();
        }
    }, [currentUserId]);

    // const fetchUsers = async () => {
    //     try {
    //         const userSnapshot = await firestore().collection('users').get();
    //         const fetchedUsers = userSnapshot.docs.map(doc => ({
    //             id: doc.id,
    //             ...doc.data(),
    //         }));

    //         // Filter out the current user
    //         const filteredUsers = fetchedUsers.filter(user => user.id !== currentUserId);

    //         setUsers(filteredUsers);
    //     } catch (error) {
    //         console.error('Error fetching users:', error);
    //     }
    // };


    // const fetchUsers = async () => {
    //     try {
    //         // Fetch all users from the "users" collection
    //         const userSnapshot = await firestore().collection('users').get();
    //         const allUsers = userSnapshot.docs.map(doc => ({
    //             id: doc.id,
    //             ...doc.data()
    //         }));

    //         console.log('All User IDs:', allUsers.map(user => user.id)); // Log all user IDs

    //         // Fetch conversations where the current user (doctor) is one of the participants
    //         const conversationSnapshot = await firestore()
    //             .collection('doctorconversation')
    //             .doc(currentUserId)
    //             .collection('messages')
    //             .get();

    //         const userIds = conversationSnapshot.docs.map(doc => doc.data().senderId);

    //         // Filter users based on whether they have a conversation with the current user (doctor)
    //         const filteredUsers = allUsers.filter(user => userIds.includes(user.id));

    //         setUsers(filteredUsers);
    //     } catch (error) {
    //         console.error('Error fetching users:', error);
    //     }
    // };



    const fetchUsers = async () => {
        try {
            // Fetch all users from the "users" collection
            const userSnapshot = await firestore().collection('users').get();
            const allUserIds = userSnapshot.docs.map(doc => doc.id);

            // Fetch conversations for each user
            const fetchedUsers = await Promise.all(allUserIds.map(async (userId) => {
                // Fetch conversation data for the current user ID
                const conversationSnapshot = await firestore()
                    .collection('doctorconversation')
                    .doc(userId) // Use the user ID as the document ID in the doctorconversation collection
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

            setUsers(filteredUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    



    const handleUserPress = (user) => {
        navigation.navigate('DoctorChat', { userId: user.id });
        console.log("Doctor ---------->",  user.id );
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
