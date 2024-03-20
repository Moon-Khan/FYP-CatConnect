// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import { useNavigation } from '@react-navigation/native';
// import { fetchUserDataFromFirestore } from '../../Services/firebase';
// import { addAppointmentsDataToFirestore } from '../../Services/firebase';

// const DoctorDetailScreen = ({ route }) => {
//     const { doctorData } = route.params;
//     const user = auth().currentUser;
//     const [userData, setUserData] = useState(null);
//     const navigation = useNavigation();

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const userDoc = await fetchUserDataFromFirestore(user.uid);
//                 if (userDoc.exists) {
//                     setUserData(userDoc.data());
//                 } else {
//                     console.log('User document does not exist in Firestore.');
//                 }
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         if (user) {
//             fetchUserData();
//         }
//     }, [user]);

//     const handleBookAppointment = async () => {
//         try {
//             console.log('Booking appointment for user:', user.uid);
//             console.log('Booking appointment with doctor:', userData.username);
//             if (user) {
//                 const appointment = {
//                     userId: user.uid,
//                     userName: userData.username,
//                     doctorId: doctorData.id,
//                     status: 'pending',
//                 };
//                 await addAppointmentsDataToFirestore(appointment);

//                 console.log('Appointment request sent');
//                 navigation.navigate('Home');
//             } else {
//                 console.log('User not logged in');
//             }
//         } catch (error) {
//             console.error('Error booking appointment:', error);
//         }
//     };

//     if (!doctorData) {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.errorText}>Doctor data not available.</Text>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <Image style={styles.doctorImage} source={require("../../../assets/Catassets/doctorPortrait.png")} />

//             <View style={styles.detailsContainer}>
//                 <Text style={styles.title}>{doctorData.username}</Text>
//                 <View style={styles.detailContainer}>
//                     <Text style={styles.label}></Text>
//                     <Text style={styles.specialvalue}>Specialization: {doctorData.specialization}</Text>
//                 </View>
//                 <View style={styles.detailContainer}>
//                     <Text style={styles.label}></Text>
//                     <Text style={styles.specialvalue}>contactInfo: {doctorData.contactNumber}</Text>
//                 </View>

//                 <View style={styles.detailContainer}>
//                     <Text style={styles.label}></Text>
//                     <Text style={styles.specialvalue}>Day Available: {doctorData.availability.day}</Text>
//                 </View>
//                 <View style={styles.detailContainer}>
//                     <Text style={styles.label}></Text>

//                     <Text style={styles.specialvalue}>Time Available: {doctorData.availability.timeRange}</Text>
//                 </View>
//                 <TouchableOpacity style={styles.button} onPress={handleBookAppointment}>
//                     <Text style={styles.buttonText}>Book Appointment</Text>
//                 </TouchableOpacity>
//             </View>


//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // padding: 10,
//         backgroundColor: '#fff'

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
//         justifyContent: 'center'
//     },
//     label: {
//         fontFamily: 'Poppins-SemiBold',
//         fontSize: 16,
//         marginRight: 8,
//         color: '#fff'
//     },
//     value: {
//         fontSize: 16,
//         fontFamily: 'Poppins-SemiBold',
//         marginRight: 8,
//         color: '#fff'
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
// });

// // export default DoctorDetailScreen;
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import { useNavigation } from '@react-navigation/native';
// import { fetchUserDataFromFirestore, addAppointmentsDataToFirestore, fetchBookedAppointmentsFromFirestore } from '../../Services/firebase';

// const DoctorDetailScreen = ({ route }) => {
//     const { doctorData } = route.params;
//     const user = auth().currentUser;
//     const [userData, setUserData] = useState(null);
//     const [selectedDay, setSelectedDay] = useState(null);
//     const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
//     const [bookedTimeSlots, setBookedTimeSlots] = useState([]);
//     const [bookedAppointments, setBookedAppointments] = useState([]);
//     const navigation = useNavigation();

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const userDoc = await fetchUserDataFromFirestore(user.uid);
//                 if (userDoc.exists) {
//                     setUserData(userDoc.data());
//                 } else {
//                     console.log('User document does not exist in Firestore.');
//                 }
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         const fetchBookedAppointments = async () => {
//             try {
//                 if (!selectedDay || !doctorData) return;
//                 const appointments = await fetchBookedAppointmentsFromFirestore(selectedDay, doctorData.id);
//                 setBookedAppointments(appointments);
//             } catch (error) {
//                 console.error('Error fetching booked appointments:', error);
//             }
//         };

//         if (user) {
//             fetchUserData();
//         }

//         fetchBookedAppointments();

//     }, [selectedDay, doctorData, user]);

//     const handleBookAppointment = async () => {
//         try {
//             if (!selectedDay || !selectedTimeSlot) {
//                 console.log('Please select a day and a time slot.');
//                 return;
//             }

//             if (bookedTimeSlots.includes(selectedTimeSlot)) {
//                 console.log('This time slot is already booked. Please select another time slot.');
//                 return;
//             }

//             if (user && userData && doctorData) {
//                 const appointment = {
//                     userId: user.uid,
//                     userName: userData.firstname,
//                     doctorId: doctorData.id,
//                     day: selectedDay,
//                     timeSlot: selectedTimeSlot,
//                     status: 'pending',
//                 };
//                 await addAppointmentsDataToFirestore(appointment);
//                 console.log('Appointment request sent');
//                 navigation.navigate('Home');
//             } else {
//                 console.log('User or doctor data not available');
//             }
//         } catch (error) {
//             console.error('Error booking appointment:', error);
//         }
//     };

//     if (!doctorData) {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.errorText}>Doctor data not available.</Text>
//             </View>
//         );
//     }
//     // Function to parse time strings into Date objects
//     const timestampToDate = (timestamp) => {
//         return timestamp.toDate();
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <Image style={styles.doctorImage} source={require("../../../assets/Catassets/doctorPortrait.png")} />
//             <View style={styles.detailsContainer}>
//                 <Text style={styles.title}>{doctorData.username}</Text>
//                 <View style={styles.detailContainer}>
//                     <Text style={styles.label}>Specialization:</Text>
//                     <Text style={styles.value}>{doctorData.specialization}</Text>
//                 </View>
//                 <View style={styles.detailContainer}>
//                     <Text style={styles.label}>Contact Info:</Text>
//                     <Text style={styles.value}>{doctorData.contactNumber}</Text>
//                 </View>
//                 <View style={styles.detailContainer}>
//                     <Text style={styles.label}>Availability:</Text>
//                     <ScrollView horizontal={true}>
//                         {Object.keys(doctorData.availability).map((day, index) => (
//                             <TouchableOpacity key={index} onPress={() => setSelectedDay(day)}>
//                                 <Text style={[styles.day, selectedDay === day && styles.selectedDay]}>{day}</Text>
//                             </TouchableOpacity>
//                         ))}
//                     </ScrollView>
//                 </View>
//                 {selectedDay && doctorData.availability[selectedDay].length > 0 ? (
//                     doctorData.availability[selectedDay].map((slot, index) => (
//                         <View key={index}>
//                             {slot.startTime && slot.endTime ? (
//                                 <TouchableOpacity
//                                     onPress={() => setSelectedTimeSlot(slot)}
//                                     style={[
//                                         styles.slot,
//                                         selectedTimeSlot === slot && styles.selectedSlot // Apply border style if selected
//                                     ]}
//                                 >
//                                     <Text style={styles.slotText}>
//                                         {timestampToDate(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {timestampToDate(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                     </Text>
//                                 </TouchableOpacity>
//                             ) : (
//                                 <Text>No valid time slot available for this day.</Text>
//                             )}
//                         </View>
//                     ))
//                 ) : (
//                     <Text>No time slots available for this day.</Text>
//                 )}

//                 <TouchableOpacity style={styles.button} onPress={handleBookAppointment}>
//                     <Text style={styles.buttonText}>Book Appointment</Text>
//                 </TouchableOpacity>
//             </View>
//         </ScrollView>
//     );
// };

// src/components/Users/DoctorDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { fetchUserDataFromFirestore, addAppointmentsDataToFirestore, fetchBookedAppointmentsFromFirestore } from '../../Services/firebase';

const DoctorDetailScreen = ({ route }) => {

    const { doctorData } = route.params;
    console.log('doctor detail screen--------->', doctorData)
    const { name, specialization, contactNumber, availability } = doctorData._data;
    console.log('doctor detail screen--------->', name)

    const user = auth().currentUser;
    const [userData, setUserData] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [bookedAppointments, setBookedAppointments] = useState([]);
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

        const fetchBookedAppointments = async () => {
            try {
                if (!selectedDay || !doctorData) return;

                console.log('doctorData--->',doctorData)

                console.log('doctorData.doctorid-->',doctorData._data.doctorid)

                const appointments = await fetchBookedAppointmentsFromFirestore(selectedDay, doctorData._data.doctorid);
                console.log('fetch appointment in detail scren', appointments)
                setBookedAppointments(appointments);
            } catch (error) {
                console.error('Error fetching booked appointments:', error);
            }
        };

        if (user) {
            fetchUserData();
        }

        fetchBookedAppointments();

    }, [selectedDay, doctorData, user]);

    const handleBookAppointment = async () => {
        try {

            console.log('book appointsment byuton pressend------>')
            if (!selectedDay || !selectedTimeSlot) {
                console.log('Please select a day and a time slot.');
                return;
            }

            const selectedSlotStart = selectedTimeSlot.startTime.toDate().getTime();
            const selectedSlotEnd = selectedTimeSlot.endTime.toDate().getTime();

            // Check if the selected time slot overlaps with any existing appointment
            const isSlotAvailable = bookedAppointments.every(appointment => {
                const appointmentStart = appointment.timeSlot.startTime.toDate().getTime();
                const appointmentEnd = appointment.timeSlot.endTime.toDate().getTime();

                return (
                    selectedSlotEnd <= appointmentStart || // Selected slot ends before existing appointment starts
                    selectedSlotStart >= appointmentEnd     // Selected slot starts after existing appointment ends
                );
            });

            if (!isSlotAvailable) {
                console.log('This time slot is already booked. Please select another time slot.');
                Alert.alert('This time slot is already booked. Please select another time slot.')
                return;
            }

            console.log('------user------>',user)
            console.log('-----userData------>',userData)
            console.log('-------doctorData------>',doctorData)



            // If the slot is available, proceed with booking
            if (user && userData && doctorData) {
                const appointment = {
                    userId: user.uid,
                    userName: userData.firstname,
                    doctorId: doctorData._data.doctorid,
                    day: selectedDay,
                    timeSlot: selectedTimeSlot,
                    status: 'pending',
                };


                await addAppointmentsDataToFirestore(appointment);
                console.log('Appointment request sent');
                navigation.navigate('Home');
            } else {
                console.log('User or doctor data not available');
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

    // Function to parse time strings into Date objects
    const timestampToDate = (timestamp) => {
        return timestamp.toDate();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image style={styles.doctorImage} source={require("../../../assets/Catassets/doctorPortrait.png")} />
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{name}</Text>
                <View style={styles.detailContainer}>
                    <Text style={styles.label}>Specialization:</Text>
                    <Text style={styles.value}>{specialization}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.label}>Contact Info:</Text>
                    <Text style={styles.value}>{contactNumber}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.label}>Availability:</Text>
                    <ScrollView horizontal={true}>
                        {Object.keys(availability).map((day, index) => (
                            <TouchableOpacity key={index} onPress={() => setSelectedDay(day)}>
                                <Text style={[styles.day, selectedDay === day && styles.selectedDay]}>{day}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {selectedDay && availability[selectedDay].length > 0 ? (
                    availability[selectedDay].map((slot, index) => (
                        <View key={index}>
                            {slot.startTime && slot.endTime ? (

                                <TouchableOpacity
                                    onPress={() => setSelectedTimeSlot(slot)}
                                    style={[
                                        styles.slot,
                                        selectedTimeSlot === slot && styles.selectedSlot, // Apply border style if selected
                                        bookedAppointments.some(appointment => appointment.timeSlot.startTime.isEqual(slot.startTime)) && styles.bookedSlot // Check if slot is booked and apply style
                                    ]}
                                >
                                    <Text style={styles.slotText}>
                                        {timestampToDate(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {timestampToDate(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <Text>No valid time slot available for this day.</Text>
                            )}
                        </View>
                    ))
                ) : (
                    <Text>No time slots available for this day.</Text>
                )}


                <TouchableOpacity style={styles.button} onPress={handleBookAppointment}>
                    <Text style={styles.buttonText}>Book Appointment</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 20,
    },
    doctorImage: {
        width: '70%',
        height: 200,
        borderRadius: 26,
        marginBottom: 20,
    },
    detailsContainer: {
        backgroundColor: '#47C1FF',
        borderRadius: 20,
        padding: 20,
        width: '90%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
        textAlign: 'center',
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 5,
        color: '#fff',
    },
    value: {
        color: '#fff',
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#47C1FF',
    },
    day: {
        marginRight: 10,
        color: '#fff',
    },
    slot: {
        marginVertical: 5,
        color: '#fff',
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 5,
    },
    bookedSlot: {
        borderColor: 'red', // Red border color for booked slots
    },
    selectedSlot: {
        borderColor: 'black', // Change border color if selected
    },
    slotText: {
        color: '#fff',
    },
});


export default DoctorDetailScreen;
