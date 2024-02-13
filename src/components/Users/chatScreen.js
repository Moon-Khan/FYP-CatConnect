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
            <View style={styles.content}>
            </View>

            <View style={styles.bottomMenu}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
                    <HomeIcon name="home" size={24} color="#9F9F9F" />
                    <Text style={{ ...styles.menuText,color: '#9F9F9F'}}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SelectDoctor')}>
                    <DoctorIcon name="stethoscope" size={24} color="#9F9F9F" />
                    <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Doctor</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ChatScreen')}>
                    <ChatIcon name="chatbox-ellipses-outline" size={24}  color="#47C1FF"  />
                    <Text style={{ ...styles.menuText,  color:"#47C1FF"  }}>Chat</Text>
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
        backgroundColor: '#F5F5F5', // Set your background color here
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
