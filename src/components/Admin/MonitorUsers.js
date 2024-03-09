import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from @react-navigation/native
import { fetchAllUserDataFromFirestore } from '../../Services/firebase';

const MonitorUsers = () => {
    const navigation = useNavigation(); // Use useNavigation hook here

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await fetchAllUserDataFromFirestore();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const UserCard = ({ user, onPress }) => (
        <TouchableOpacity style={styles.userCard} onPress={onPress}>
            <View style={styles.userIconContainer}>
                <Image
                    style={styles.thumbnailImage}
                    resizeMode="cover"
                    source={require("../../../assets/Catassets/doctoruser2.png")}
                />
            </View>
            <View style={styles.userInfoContainer}>
                <Text style={styles.userName}>{user.firstname}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Profile</Text>
            </View>
            <Text style={styles.userCount}>Active Users:{users.length}</Text>

            <FlatList
                data={users}
                renderItem={({ item }) => (
                    <UserCard
                        user={item}
                        onPress={() => navigation.navigate('UserDetailScreen', { userData: item })}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#ffff',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 30,
        marginBottom: 40,
    },
    headerText: {
        fontSize: 20,
        color: '#47C1FF',
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
    },
    userCount: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'Poppins-SemiBold',
        fontWeight: 'bold',
        position: 'relative',
        left: 300,

    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#fff',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 16,
        elevation: 2,
        padding: 16,
        marginBottom: 12,
        height: 100,
    },
    userIconContainer: {
        marginRight: 16,
        backgroundColor: '#CAEDFF',
        padding: 10,
        borderRadius: 100,
    },
    thumbnailImage: {
        width: 30,
        height: 30,
        borderRadius: 5,
    },
    userInfoContainer: {
        flex: 1, // Fill remaining space in the row
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    // Add styles for other user information here
});

export default MonitorUsers;