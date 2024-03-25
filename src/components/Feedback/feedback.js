import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createFeedback, fetchUserDataFromFirestore } from '../../Services/firebase';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

import auth from '@react-native-firebase/auth';

const FeedbackScreen = () => {
    const [feedbackText, setFeedbackText] = useState('');
    const [userData, setUserData] = useState({});
    const navigation = useNavigation(); // Initialize navigation object

    const user = auth().currentUser;

    useEffect(() => {
        const fetchUser = async () => {
            const usersSnapshot = await fetchUserDataFromFirestore(user.uid)

            if (usersSnapshot.exists) {
                const userData = usersSnapshot.data();
                setUserData(userData);
            }

            console.log('Current User name:',userData.firstname);
        };
        fetchUser();
    }, []); // Add empty dependency array to ensure it only runs once

    const sendFeedback = async () => {
        if (!feedbackText.trim()) {
            alert('Please enter your announcement text.');
            return;
        }

        const feedbackData = {
            text: feedbackText, // Change feedbackText to announcementText
        };

        try {
            await createFeedback(userData.firstname, { text: feedbackData }); // Pass correct parameters
            console.log('feedback sent successfully');
            navigation.goBack(); // Navigate back after sending feedback
        } catch (error) {
            console.error('Error sending feedback:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Feedback Screen</Text>
            </View>

            <TextInput
                style={styles.input}
                value={feedbackText}
                onChangeText={text => setFeedbackText(text)}
                placeholder="Write your Feedback here"
                multiline
            />

            <TouchableOpacity onPress={sendFeedback} style={styles.sendButton}>
                <Text style={styles.announcmentbuttonText}>Send Feedback</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    input: {
        margin: 15,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        height: 100,
    },
    sendButton: {
        backgroundColor: '#47C1FF',
        padding: 15,
        borderRadius: 25,
        marginTop: 35,
        alignItems: 'center',
        width: '70%',
        alignSelf: 'center',
        marginBottom: 20,
    },
    announcmentbuttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
    },
});

export default FeedbackScreen;
