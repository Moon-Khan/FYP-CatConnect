import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { fetchAllAnnouncementsForAdmin } from '../../Services/firebase';
import { useNavigation } from '@react-navigation/native';

const AllAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const notificationColors = ['#fa425e', '#30cb79', '#01b6ed']; // Colors for notification bells
    const navigation = useNavigation();

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const announcementsData = await fetchAllAnnouncementsForAdmin();
            setAnnouncements(announcementsData);
        } catch (error) {
            console.error('Error fetching announcements:', error);
        }
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.itemContainer}>
            <View style={[styles.notificationBellContainer, { backgroundColor: notificationColors[index % notificationColors.length] }]}>
                <Image
                    source={require("../../../assets/Catassets/bell.png")}
                    style={styles.notificationBell}
                />
            </View>
            <View style={styles.item}>
                <Text style={styles.itemtext} >{item.text}</Text>
            </View>
        </View>
    );

    const handleAddAnnouncement = () => {
        navigation.navigate('SelectRecepientsforAnnouncmenets');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Announcements</Text>
            </View>
            <FlatList
                data={announcements}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
            />

            <TouchableOpacity style={styles.addButton} onPress={handleAddAnnouncement}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#ffff',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 30,
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        color: '#47C1FF',
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        backgroundColor: '#47C1FF',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    addButtonText: {
        fontSize: 30,
        color: '#fff',
    },
    itemContainer: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 4,
    },
    notificationBellContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 25,
        backgroundColor: '#97cc5f', // Default background color
     
    },
    notificationBell: {
        width: 30,
        height: 30,
    },
    item: {
        flex: 1,
    },
    itemtext: {
        color: '#212529',
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        marginLeft: 10,
    }
});

export default AllAnnouncements;
