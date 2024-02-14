import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const ChatUsers = () => {
    const navigation = useNavigation();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userSnapshot = await firestore().collection('users').get();
                const fetchedUsers = userSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleUserPress = (user) => {
        navigation.navigate('UserChat', { user });
    };

    const renderUserItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleUserPress(item)}>
            <View style={styles.userItem}>
                <Image source={require('../../../assets/Catassets/uicon.png')} style={styles.userIcon} />
                <Text style={styles.username}>{item.username}</Text>
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
        borderColor: '#E0E0E0', // Light gray border color
        backgroundColor: '#EDEFF1', // Light blue background color
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
        width: 24, // Adjust the width as per your design
        height: 24, // Adjust the height as per your design
    },
});

export default ChatUsers;
