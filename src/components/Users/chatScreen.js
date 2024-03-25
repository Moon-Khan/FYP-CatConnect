// ./src/Screens/splash.js

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeIcon from 'react-native-vector-icons/Feather';
import DoctorIcon from 'react-native-vector-icons/FontAwesome';
import ChatIcon from 'react-native-vector-icons/Ionicons';
import ProfileIcon from 'react-native-vector-icons/Feather';

const ChatScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.backButtonContainer}>
                    <Image source={require("../../../assets/Catassets/backbtn.png")} style={styles.bactbtn} />
                </View>
                <Text style={styles.headerText}>Chat</Text>

            </View>

            <View style={styles.bottomMenu}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
                    <HomeIcon name="home" size={24} color="#9F9F9F" />
                    <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SelectDoctor')}>
                    <DoctorIcon name="stethoscope" size={24} color="#9F9F9F" />
                    <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Doctor</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ChatScreen')}>
                    <ChatIcon name="chatbox-ellipses-outline" size={24} color="#47C1FF" />
                    <Text style={{ ...styles.menuText, color: "#47C1FF" }}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProfileScreen')}>
                    <ProfileIcon name="user" size={24} color="#9F9F9F" />
                    <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
        shadowOpacity: 1, // Increase shadow opacity to make it darker
        shadowRadius: 20, // Increase shadow radius for a more spread out shadow
        elevation: 30,
        marginBottom: 30,
    },

    headerText: {
        fontSize: 20,
        color: '#47C1FF',
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
    },

    bactbtn: {
        marginLeft: 10,
        height: 25,
        width: 25,
    },
    
    content: {
        flex: 1, // Take up all available space
        // Add other content styles as needed
    },
    bottomMenu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingVertical: 10, // Adjust as needed
    },
    // Add other styles as needed
    menuItem: {
        alignItems: 'center',
    },
    menuText: {
        marginTop: 5, // Adjust as needed
    },
});

export default ChatScreen;
