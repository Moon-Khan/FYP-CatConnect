// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import { useNavigation } from '@react-navigation/native';
// import { fetchDoctorDataFromFirestore } from '../../Services/firebase';

// const DoctorHome = () => {
//     const [doctorProfile, setDoctorProfile] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const user = auth().currentUser;
//     const navigation = useNavigation();

//     const handleDoctorDetail = () => {
//         navigation.navigate('DoctorAppointment', { doctorId: user.uid });
//     };

//     useEffect(() => {
//         const fetchDoctorProfile = async () => {
//             try {
//                 if (user) {

//                     const doctorSnapshot = await fetchDoctorDataFromFirestore(user.uid)

//                     if (doctorSnapshot.exists) {
//                         const doctorData = doctorSnapshot.data();
//                         setDoctorProfile(doctorData);
//                     } else {
//                         console.log('Doctor data not found');
//                     }
//                 } else {
//                     console.log('Invalid navigation, doctorId not provided.');
//                 }

//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching doctor profile:', error);
//                 setLoading(false);
//             }
//         };

//         fetchDoctorProfile();
//     }, [user]);

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#2A2A72" />
//             </View>
//         );
//     }

//     if (!doctorProfile) {
//         return <Text>Doctor profile data not available.</Text>;
//     }

//     return (
//         // <ScrollView >
//         <View style={styles.container}>
//             <Image style={styles.doctorImage} source={require("../../../assets/Catassets/doctorPortrait.png")} />

//             <View style={styles.detailsContainer}>
//                 <Text style={styles.title}>{doctorProfile.username}</Text>
//                 <View style={styles.detailContainer}>
//                     <Text style={styles.label}></Text>
//                     <Text style={styles.specialvalue}>Specialization: {doctorProfile.specialization}</Text>
//                 </View>
//                 <View style={styles.detailContainer}>
//                     <Text style={styles.label}></Text>
//                     <Text style={styles.specialvalue}>Contact Info: {doctorProfile.contactNumber}</Text>
//                 </View>
//                 <View style={styles.detailContainer}>
//                     <Text style={styles.label}></Text>
//                     <Text style={styles.specialvalue}>City: {doctorProfile.city}</Text>
//                 </View>

//                 <TouchableOpacity style={styles.button} onPress={handleDoctorDetail}>
//                     <Text style={styles.buttonText}>View Appointments</Text>
//                 </TouchableOpacity>
//             </View>

//         </View>

//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     doctorImage: {
//         width: '70%', // Adjust the width as needed
//         height: '60%',   // Adjust the height as needed
//         borderRadius: 26, // Adjust the borderRadius as needed
//         marginTop: 10,
//         marginBottom: 16,
//         marginLeft: 50,
//     },

//     specialvalue: {
//         position: 'absolute',
//         color: '#fff',
//         fontFamily: 'Poppins-SemiBold',
//         fontSize: 18,
//     },
//     detailsContainer: {
//         marginTop: -50,
//         backgroundColor: '#47C1FF',
//         height: '60%',
//         borderTopRightRadius: 50,
//         borderTopLeftRadius: 50,
//         width: '100%',
//         borderWidth: 1,
//         borderColor: '#47C1FF',
//         paddingHorizontal: 20,
//     },
//     title: {
//         fontSize: 28,
//         marginBottom: 5,
//         marginTop: 15,
//         textAlign: 'center',
//         color: '#fff',
//         fontFamily: 'Poppins-ExtraBold',
//     },
//     detailContainer: {
//         flexDirection: 'row',
//         marginBottom: 8,
//         justifyContent: 'center',
//     },
//     label: {
//         fontFamily: 'Poppins-SemiBold',
//         fontSize: 16,
//         marginRight: 8,
//         color: '#fff',
//     },
//     button: {
//         backgroundColor: '#fff',
//         padding: 10,
//         borderRadius: 26,
//         marginTop: 15,
//         width: '70%',
//         alignItems: 'center',
//         alignSelf: 'center',
//     },
//     buttonText: {
//         fontSize: 18,
//         color: '#47C1FF',
//         fontFamily: 'Poppins-SemiBold',
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });

// export default DoctorHome;


// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         backgroundColor: '#fff',
// //     },
// //     icon: {
// //         width: 30,
// //         height: 30,
// //         position: 'absolute',
// //         top: 10,
// //         left: 10,
// //     },
// //     header: {
// //         height: 190,
// //         width: '100%',
// //         flexDirection: 'row',
// //         backgroundColor: '#47C1FF',  // Set a background color that contrasts with the icon and name
// //         elevation: 10,  // Increase the elevation to make it appear above the other components
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //     },
// //     title: {
// //         fontSize: 35,
// //         fontWeight: 'bold',
// //         marginBottom: 16,
// //         marginTop: 25,
// //         textAlign: 'center',
// //         color: 'white',
// //     },
// //     profileContainer: {
// //         alignItems: 'center',
// //         padding: 20,
// //     },
// //     profileImageContainer: {
// //         marginBottom: 20,
// //         alignItems: 'center',
// //     },
// //     profileName: {
// //         fontSize: 24,
// //         fontWeight: '700',
// //         marginTop: 10,
// //         color: '#47C1FF',
// //     },
// //     profileSection: {
// //         marginBottom: 20,
// //         width: '100%',
// //     },
// //     sectionTitle: {
// //         fontSize: 18,
// //         fontWeight: '700',
// //         marginBottom: 10,
// //     },
// //     sectionContent: {
// //         fontSize: 16,
// //         textAlign: 'center',
// //         color: '#666',
// //     },
// //     button: {
// //         backgroundColor: '#47C1FF',
// //         padding: 5,
// //         borderRadius: 15,
// //         marginTop: 15,
// //         width: '100%',
// //     },
// //     buttonText: {
// //         fontSize: 18,
// //         color: '#ffff',
// //         textAlign: 'center',
// //         fontFamily: 'Poppins-Medium',
// //         fontWeight: 'bold',
// //     },
// //     loadingContainer: {
// //         flex: 1,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //     },
// // });

// // export default DoctorHome;



import auth from '@react-native-firebase/auth';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import { fetchDoctorDataFromFirestore, fetchAppointmentsFromFirestore, updateAppointmentsFromFirestore, fetchUserDataFromFirestore, fetchAppointmentsCondFromFirestore, addNotificationToFirestore } from '../../Services/firebase';

const AppointmentCard = ({ appointment, onAccept, onReject }) => {
    const { userName, status, timeSlot, day } = appointment;
    const startTime = new Date(timeSlot.startTime.toDate());
    const endTime = new Date(timeSlot.endTime.toDate());

    const formattedStartTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedEndTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <View style={styles.appointmentCard}>
            <Text style={styles.userName}>User: {userName}</Text>
            <Text style={styles.status}>Day: {day}</Text>
            <Text style={styles.status}>Time slot: {formattedStartTime} - {formattedEndTime}</Text>
            <View style={styles.actionButtonsContainer}>

                <TouchableOpacity style={styles.actionButtonReject} onPress={() => onReject(appointment.id)}>
                    <Text style={styles.actionButtonTextReject}>Reject  ❌</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => onAccept(appointment.id)}>
                    <Text style={styles.actionButtonText}>Accept  ✅</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};
const AppointmentHomeScreen = () => {
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const navigation = useNavigation();
    const user = auth().currentUser;

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const doctorsSnapshot = await fetchDoctorDataFromFirestore(user.uid);
                console.log('doctorsSnapshot data----------------<', doctorsSnapshot);

                if (doctorsSnapshot) {
                    console.log('--------------doctors data', doctorsSnapshot._data);
                    setDoctors(doctorsSnapshot);
                } else {
                    console.log('No doctors found in Firestore.');
                }
            } catch (error) {
                console.error('Error fetching doctors data:', error);
            }
        };

        fetchDoctors();
    }, []);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const appointmentsSnapshot = await fetchAppointmentsCondFromFirestore(user.uid);
                const appointmentsData = appointmentsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setAppointments(appointmentsData);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, [user.uid]);


    const handleAccept = async (appointmentId) => {
        try {
            await updateAppointmentsFromFirestore(appointmentId, 'Accepted')

            const appointmentSnapshot = await fetchAppointmentsFromFirestore(appointmentId);
            const userId = appointmentSnapshot.data().userId;
            const userSnapshot = await fetchUserDataFromFirestore(userId);
            const userToken = userSnapshot.data().fcmToken;

            const doctorName = doctors._data.name;
            const day = appointmentSnapshot.data().day;
            const startTime = appointmentSnapshot.data().timeSlot.startTime.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const endTime = appointmentSnapshot.data().timeSlot.endTime.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const message = `Appointment accepted with ${doctorName} on ${day} at ${startTime} - ${endTime}.`;

            await addNotificationToFirestore(userId, message, 'unread');

            await sendPushNotification(userToken, 'Appointment Accepted', message);
            // navigation.navigate('DoctorHomeScreen');
        } catch (error) {
            console.error('Error accepting appointment:', error);
        }
    };

    const handleReject = async (appointmentId) => {
        try {
            await updateAppointmentsFromFirestore(appointmentId, 'Rejected')

            // Fetch user's FCM token from Firestore
            const appointmentSnapshot = await fetchAppointmentsFromFirestore(appointmentId);
            const userId = appointmentSnapshot.data().userId;

            const doctorName = appointmentSnapshot.data().doctorName;
            const day = appointmentSnapshot.data().day;

            const message = `Appointment rejected with ${doctorName} for this ${day}.`;

            const userSnapshot = await fetchUserDataFromFirestore(userId);
            const userToken = userSnapshot.data().fcmToken;
            await addNotificationToFirestore(userId, message, 'unread');

            // Send a push notification to the user
            await sendPushNotification(userToken, 'Appointment Rejected', message);
            // navigation.navigate('DoctorHomeScreen')
        } catch (error) {
            console.error('Error rejecting appointment:', error);
        }
    };
    const sendPushNotification = async (userToken, title, message) => {
        try {
            await messaging().sendMessage({
                data: {
                    title,
                    body: message,
                },
                token: userToken,
            });
        } catch (error) {
            console.error('Error sending push notification:', error);
        }
    };


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header1}>
                    <Text style={styles.greeting}>Hi  Dr. {doctors?._data?.name} 👋</Text>
                </View>
                <Text style={styles.greeting2}>Please approve your appointment requests!</Text>

                <View >
                    {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <AppointmentCard
                                key={appointment.id}
                                appointment={appointment}
                                onAccept={handleAccept}
                                onReject={handleReject}
                            />
                        ))
                    ) : (
                        <Text style={styles.noAppointmentsText}>No appointments available today.</Text>
                    )}
                </View>
            </ScrollView>
            <View style={styles.bottomMenu}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
                    <Image source={require('../../../assets/Catassets/appointment.png')} style={{ width: 30, height: 30 }} />
                    <Text style={{ ...styles.menuText, color: '#47C1FF' }}>Appointments</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('DoctorChatUsers')}>
                    <Image source={require('../../../assets/Catassets/chat.png')} style={{ width: 24, height: 24 }} />
                    <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('DoctorProfileScreen')}>
                    <Image source={require('../../../assets/Catassets/profilehome.png')} style={{ width: 24, height: 27 }} />
                    <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#F5F5F5'
    },

    header1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    greeting: {
        paddingTop: 15,
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        color: '#212529',
        flex: 1,
        flexDirection: 'row',
    },
    greeting2: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#212529',
        flex: 1,
        flexDirection: 'row',
    },
    appointmentCard: {
        marginTop: 20,
        borderRadius: 15,
        padding: 16,
        marginBottom: 16,
        backgroundColor: 'white',
        elevation: 2,
        width: '100%'
    },
    userName: {
        fontSize: 16,
        marginBottom: 8,
        fontFamily: 'Poppins-SemiBold'
    },
    status: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 12,
    },
    actionButtonsContainer: {
        flexDirection: 'row',

    },
    actionButton: {
        backgroundColor: '#47C1FF',
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 8,
        width: '45%',
        marginLeft: 5,
        marginRight: 10,

    },
    actionButtonReject: {
        backgroundColor: '#D4F1FF',
        padding: 10,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 8,
        width: '45%',
        marginLeft: 5,
        marginRight: 10,
    },
    noAppointmentsText: {

        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        marginTop: 100,
    },


    actionButtonTextReject: {
        color: '#47C1FF',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },

    actionButtonText: {
        fontSize: 16,
        color: 'white',
        fontFamily: 'Poppins-SemiBold',
    },

    bottomMenu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        marginTop: 2,
    },

    menuItem: {
        alignItems: 'center',
    },
});


export default AppointmentHomeScreen;
