import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore'; // Import firestore from Firebase SDK

const AdminFeedbackScreen = () => {
    const [feedbackData, setFeedbackData] = useState([]);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                // Fetch all feedback documents from the "feedback" collection
                const feedbackSnapshot = await firestore().collection('feedback').get();
                const feedbackList = feedbackSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setFeedbackData(feedbackList);
            } catch (error) {
                console.error('Error fetching feedback:', error);
            }
        };

        fetchFeedback(); // Fetch feedback data when component mounts
    }, []);

    const renderFeedbackItem = ({ item }) => (
        <View style={styles.feedbackItem}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.feedbackText}>Feedback: {item.feedbackData.text && item.feedbackData.text.text}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
                    <Image source={require("../../../assets/Catassets/backbtn.png")} style={styles.bactbtn} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Support and Feedback</Text>
            </View>

            <FlatList
                data={feedbackData}
                renderItem={renderFeedbackItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
            />
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
        flexDirection: 'row',
    },
    headerText: {
        fontSize: 20,
        color: '#47C1FF',
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        flex: 1,
    },

    bactbtn: {
        marginLeft: 10,
        height: 25,
        width: 25,
    },
    listContainer: {
        flexGrow: 1,
    },
    feedbackItem: {
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        elevation: 2, // Add elevation for Android shadow
        shadowColor: '#000', // Add shadow color
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        margin: 15,
    },
    username: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
    },
    feedbackText: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
    },
});

export default AdminFeedbackScreen;
