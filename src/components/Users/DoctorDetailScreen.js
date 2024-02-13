import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { fetchUserDataFromFirestore } from '../../Services/firebase';
import { addAppointmentsDataToFirestore } from '../../Services/firebase';

const DoctorDetailScreen = ({ route }) => {
    const { doctorData } = route.params;
    const user = auth().currentUser;
    const [userData, setUserData] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await fetchUserDataFromFirestore(user.uid);
                if (userDoc.exists) {
                    setUserData(userDoc.data());
                } else {
                    console.log('User document does not exist in Firestore.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (user) {
            fetchUserData();
        }
    }, [user]);

    const handleBookAppointment = async () => {
        try {
            console.log('Booking appointment for user:', user.uid);
            console.log('Booking appointment with doctor:', userData.username);
            if (user) {
                const appointment = {
                    userId: user.uid,
                    userName: userData.username,
                    doctorId: doctorData.id,
                    status: 'pending',
                };
                await addAppointmentsDataToFirestore(appointment);

                console.log('Appointment request sent');
                navigation.navigate('Home');
            } else {
                console.log('User not logged in');
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
        }
    };

    if (!doctorData) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Doctor data not available.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image style={styles.doctorImage} source={require("../../../assets/Catassets/doctorPortrait.png")} />

            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{doctorData.username}</Text>
                <View style={styles.detailContainer}>
                    <Text style={styles.label}></Text>
                    <Text style={styles.specialvalue}>Specialization: {doctorData.specialization}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.label}></Text>
                    <Text style={styles.specialvalue}>contactInfo: {doctorData.contactInfo}</Text>
                </View>
          
                <View style={styles.detailContainer}>
                    <Text style={styles.label}></Text>
                    <Text style={styles.specialvalue}>Day Available: {doctorData.availability.day}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.label}></Text>

                    <Text style={styles.specialvalue}>Time Available: {doctorData.availability.timeRange}</Text>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleBookAppointment}>
                    <Text style={styles.buttonText}>Book Appointment</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10,
        backgroundColor: '#fff'

    },
    doctorImage: {
        width: '70%', // Adjust the width as needed
        height: '60%',   // Adjust the height as needed
        borderRadius: 26, // Adjust the borderRadius as needed
        marginTop: 10,
        marginBottom: 16,
        marginLeft: 50,
    },


    specialvalue: {
        position: 'absolute',
        color: '#fff',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
    },

    detailsContainer: {
        marginTop: -50,
        backgroundColor: '#47C1FF',
        height: '60%',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: '#47C1FF',
    },
    title: {
        fontSize: 28,
        marginBottom: 5,
        marginTop: 15,
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Poppins-ExtraBold',
    },
    detailContainer: {
        flexDirection: 'row',
        marginBottom: 8,
        justifyContent: 'center'
    },
    label: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        marginRight: 8,
        color: '#fff'
    },
    value: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        marginRight: 8,
        color: '#fff'
    },
    button: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 26,
        marginTop: 15,
        width: '70%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#47C1FF',
        fontFamily: 'Poppins-SemiBold',
    },
});

export default DoctorDetailScreen;
