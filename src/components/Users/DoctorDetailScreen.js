// // src/components/Users/DoctorDetailScreen.js
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import { useNavigation } from '@react-navigation/native';
// import { fetchUserDataFromFirestore, addAppointmentsDataToFirestore, fetchBookedAppointmentsFromFirestore } from '../../Services/firebase';

// const DoctorDetailScreen = ({ route }) => {

//     const { doctorData } = route.params;
//     console.log('-------------DETAIL doctorData--->', doctorData);
//     const { name, specialization, qualification, availability, experience, city, doctorId } = doctorData;
//     console.log('----------------doctorId------------>', doctorId)

//     const user = auth().currentUser;
//     const [userData, setUserData] = useState(null);
//     const [selectedDay, setSelectedDay] = useState(null);
//     const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
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

//                 console.log('-------fetchBookedAppointments doctorData--->', doctorData)

//                 console.log('----------fetchBookedAppointments doctorData.doctorid-->', doctorId)

//                 const appointments = await fetchBookedAppointmentsFromFirestore(selectedDay, doctorId);
//                 console.log('fetch appointment in detail scren', appointments)
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

//             console.log('book appointsment byuton pressend------>')
//             if (!selectedDay || !selectedTimeSlot) {
//                 console.log('Please select a day and a time slot.');
//                 Alert.alert('Please select a day and a time slot. ')

//                 return;
//             }

//             const selectedSlotStart = selectedTimeSlot.startTime.toDate().getTime();
//             const selectedSlotEnd = selectedTimeSlot.endTime.toDate().getTime();

//             // Check if the selected time slot overlaps with any existing appointment
//             const isSlotAvailable = bookedAppointments.every(appointment => {
//                 const appointmentStart = appointment.timeSlot.startTime.toDate().getTime();
//                 const appointmentEnd = appointment.timeSlot.endTime.toDate().getTime();

//                 return (
//                     selectedSlotEnd <= appointmentStart || // Selected slot ends before existing appointment starts
//                     selectedSlotStart >= appointmentEnd     // Selected slot starts after existing appointment ends
//                 );
//             });

//             if (!isSlotAvailable) {
//                 console.log('This time slot is already booked. Please select another time slot.');
//                 Alert.alert('This time slot is already booked. Please select another time slot.')
//                 return;
//             }

//             // If the slot is available, proceed with booking
//             if (user && userData && doctorData) {
//                 const appointment = {
//                     userId: user.uid,
//                     userName: userData.firstname,
//                     doctorId: doctorData.doctorId,
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

//     const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

//     const sortDays = (availability) => {
//         // Create a copy of weekdays array to avoid mutation
//         const sortedWeekdays = [...weekdays];
//         // Filter out days not present in availability
//         const availableDays = sortedWeekdays.filter((day) => Object.keys(availability).includes(day));
//         // Sort the available days based on their index in weekdays
//         availableDays.sort((a, b) => weekdays.indexOf(a) - weekdays.indexOf(b));
//         return availableDays;
//     };

//     // Function to parse time strings into Date objects
//     const timestampToDate = (timestamp) => {
//         return timestamp.toDate();
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <Text style={styles.headerText}>Appointment</Text>
//             </View>
//             <View style={styles.doctorCard}>
//                 <View style={styles.doctorIconContainer}>
//                     <Image
//                         style={styles.thumbnailImage}
//                         resizeMode="cover"
//                         source={require("../../../assets/Catassets/doctoruser2.png")}
//                     />
//                 </View>
//                 <View style={styles.doctorInfoContainer}>
//                     <Text style={styles.doctorName}>Dr. {name}</Text>

//                     <View style={styles.qualificationspecializationContainer}>
//                         <Text style={styles.specialization}>{specialization}</Text>
//                         <Text style={styles.qualification}> {qualification}</Text>
//                     </View>

//                 </View>
//             </View>


//             <View style={styles.exp_City_container}>
//                 <View style={styles.experienceContainer}>
//                     <Text style={styles.experience}>{experience} yrs. of experience</Text>
//                 </View>
//                 <View style={styles.cityContainer}>
//                     <Text style={styles.city}>{city}</Text>
//                 </View>
//             </View>

//             <View style={styles.scheduleContainer}>
//                 <Text style={styles.scheduleText}>Schedules</Text>
//                 <ScrollView horizontal={true}>
//                     {sortDays(availability).map((day, index) => (
//                         <TouchableOpacity
//                             key={index}
//                             onPress={() => setSelectedDay(day)}
//                             style={[styles.day, selectedDay === day && { borderRadius: 20, backgroundColor: '#CCEEFF' }]}
//                         >
//                             <Text style={styles.dayText}>{day}</Text>
//                         </TouchableOpacity>
//                     ))}
//                 </ScrollView>
//             </View>

//             <View style={styles.timeContainer1}>
//                 <Text style={styles.timeText}>Choose Time</Text>

//                 {selectedDay && availability[selectedDay].length > 0 ? (
//                     <ScrollView horizontal={true}>
//                         {availability[selectedDay].map((slot, index) => (
//                             <View key={index} style={styles.timeslotContainer2}>
//                                 {slot.startTime && slot.endTime ? (
//                                     <TouchableOpacity
//                                         key={index}
//                                         onPress={() => setSelectedTimeSlot(slot)}
//                                         style={[styles.timeslot3, selectedTimeSlot === slot && styles.selectedSlot, bookedAppointments.some(appointment => appointment.timeSlot.startTime.isEqual(slot.startTime)) && styles.bookedSlot]}
//                                     >
//                                         <Text style={styles.slotText}>
//                                             {timestampToDate(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {timestampToDate(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                         </Text>
//                                     </TouchableOpacity>
//                                 ) : (
//                                     <Text>No valid time slot available for this day.</Text>
//                                 )}
//                             </View>
//                         ))}
//                     </ScrollView>
//                 ) : (
//                     <Text style={{ marginTop: 5, fontSize: 12, fontFamily: 'Poppins-SemiBold' }} >OOPS! No slots Available</Text>
//                 )}
//             </View>

//             <TouchableOpacity style={styles.button} onPress={handleBookAppointment}>
//                 <Text style={styles.buttonText}>Book Appointment</Text>
//             </TouchableOpacity>

//         </View >
//     );
// };


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     header: {
//         backgroundColor: '#ffff',
//         borderBottomLeftRadius: 20,
//         borderBottomRightRadius: 20,
//         paddingHorizontal: 20,
//         paddingVertical: 35,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 5,
//         },
//         shadowOpacity: 1,
//         shadowRadius: 20,
//         elevation: 30,
//         marginBottom: 30,
//     },
//     headerText: {
//         fontSize: 20,
//         color: '#47C1FF',
//         textAlign: 'center',
//         fontFamily: 'Poppins-SemiBold',
//     },

//     doctorCard: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginLeft: 10,
//         width: '95%',
//         borderRadius: 20, // Add border radius
//         shadowColor: '#000', // Add shadow
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 1,
//         backgroundColor: '#fff', // Set background color

//     },
//     doctorIconContainer: {
//         position: 'absolute',
//         top: 20,
//         marginLeft: 20,
//         backgroundColor: '#CAEDFF',
//         borderRadius: 100,
//         padding: 10,

//     },
//     doctorInfoContainer: {
//         marginTop: 20,
//         marginBottom: 10,
//         marginLeft: 100,
//         flex: 1,
//         width: '90%', // Adjust the width as needed

//     },

//     doctorName: {
//         fontSize: 20,
//         fontFamily: 'Poppins-SemiBold',
//         color: '#212529',
//     },
//     qualificationspecializationContainer: {
//         flexDirection: 'row',
//     },

//     qualification: {
//         marginLeft: 155,
//         fontSize: 16,
//         fontFamily: 'Poppins-SemiBold',
//         color: '#7E7E7E',
//     },
//     specialization: {
//         fontSize: 16,
//         fontFamily: 'Poppins-SemiBold',
//         color: '#7E7E7E',
//     },

//     thumbnailImage: {
//         width: 40,
//         height: 40,
//         borderRadius: 10,
//     },

//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 10,
//         color: 'green',
//         textAlign: 'center',
//     },


//     exp_City_container: {
//         flexDirection: 'row', // Arrange children horizontally
//         marginTop: 15,
//         marginLeft: 10,
//     },

//     cityContainer: {
//         width: '20%', // Match width of leftContainer for equal size
//         backgroundColor: 'white',
//         borderRadius: 20,
//         height: 45,
//         alignItems: 'center',
//         paddingTop: 12,
//         marginLeft: 145,
//     },
//     city: {
//         color: '#47C1FF',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     experienceContainer: {
//         width: '40%',
//         backgroundColor: 'white',
//         borderRadius: 20,
//         height: 45,
//         alignItems: 'center',
//         paddingTop: 10,
//     },
//     experience: {
//         color: '#47C1FF',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     demographyContainer: {
//         backgroundColor: 'white',
//         marginTop: 15,
//         marginLeft: 10,
//         marginRight: 10,
//         padding: 10,
//         borderRadius: 20,

//     },
//     demographyText: {
//         fontSize: 20,
//         fontFamily: 'Poppins-SemiBold',
//         color: '#212529',
//     },
//     demographyDetail: {
//         fontSize: 14,
//         fontFamily: 'Poppins-Regular',
//         color: '#212529',
//     },

//     scheduleContainer: {
//         backgroundColor: 'white',
//         marginTop: 15,
//         marginLeft: 10,
//         marginRight: 10,
//         padding: 10,
//         borderRadius: 20,
//     },
//     scheduleText: {
//         fontSize: 20,
//         fontFamily: 'Poppins-SemiBold',
//         color: '#212529',
//     },
//     day: {
//         marginRight: 10,
//         padding: 10, // Add padding for better spacing
//         borderRadius: 5, // Apply border radius for a softer look
//     },
//     dayText: {
//         color: '#212529',
//         fontSize: 12,
//         fontFamily: 'Poppins-SemiBold',
//     },

//     timeContainer1: {
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 10,
//         margin: 15,
//     },
//     timeslotContainer2: {
//         flexDirection: 'row', // Remove if not needed for layout
//         marginTop: 10,
//         marginLeft: 10,
//     },
//     timeText: {
//         fontSize: 20,
//         fontFamily: 'Poppins-SemiBold',
//         color: '#212529',
//     },
//     timeslot3: {
//         marginVertical: 5,
//         color: '#fff',
//         borderWidth: 1,
//         borderColor: 'transparent',
//         borderRadius: 5,
//         width: 'auto', // Remove fixed width
//         height: 50,
//         alignItems: 'center',
//         paddingTop: 15,
//         marginRight: 10, // Add margin for spacing between time slots
//     },

//     bookedSlot: {
//         padding: 10,
//         borderRadius: 20,
//         backgroundColor: '#FFD8D8'
//     },
//     selectedSlot: {
//         borderRadius: 20,
//         padding: 10,
//         backgroundColor: '#CAEDFF'
//     },
//     slotText: {
//         fontSize: 12,
//         fontFamily: 'Poppins-SemiBold',
//         color: '#212529',
//     },
//     button: {
//         backgroundColor: '#47C1FF',
//         paddingVertical: 15,
//         borderRadius: 20,
//         marginTop: 20,
//         alignItems: 'center',
//         margin: 20,
//     },
//     buttonText: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: 'white',
//     },
// });


// export default DoctorDetailScreen;



// src/components/Users/DoctorDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { fetchUserDataFromFirestore, addAppointmentsDataToFirestore, fetchBookedAppointmentsFromFirestore } from '../../Services/firebase';

const DoctorDetailScreen = ({ route }) => {

    const { doctorData } = route.params;
    console.log('-------------DETAIL doctorData--->', doctorData);
    const { name, specialization, qualification, availability, experience, city, doctorId } = doctorData;
    console.log('----------------doctorId------------>', doctorId)

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

                console.log('-------fetchBookedAppointments doctorData--->', doctorData)

                console.log('----------fetchBookedAppointments doctorData.doctorid-->', doctorId)

                const appointments = await fetchBookedAppointmentsFromFirestore(selectedDay, doctorId);
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

            // If the slot is available, proceed with booking
            if (user && userData && doctorData) {
                const appointment = {
                    userId: user.uid,
                    userName: userData.firstname,
                    doctorId: doctorData.doctorId,
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

    const handleChat = () => {
        if (doctorData) {
            // Navigate to the chat screen passing the doctor's ID

            navigation.navigate('DoctorChat', { doctorId: doctorData.doctorId });
            console.log("userID------>", doctorData.doctorId)
        }
    };

    if (!doctorData) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Doctor data not available.</Text>
            </View>
        );
    }

    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const sortDays = (availability) => {
        // Create a copy of weekdays array to avoid mutation
        const sortedWeekdays = [...weekdays];
        // Filter out days not present in availability
        const availableDays = sortedWeekdays.filter((day) => Object.keys(availability).includes(day));
        // Sort the available days based on their index in weekdays
        availableDays.sort((a, b) => weekdays.indexOf(a) - weekdays.indexOf(b));
        return availableDays;
    };

    // Function to parse time strings into Date objects
    const timestampToDate = (timestamp) => {
        return timestamp.toDate();
    };

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
                    <Image source={require("../../../assets/Catassets/backbtn.png")} style={styles.bactbtn} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Appointment</Text>
            </View>
            <View style={styles.doctorCard}>
                <View style={styles.doctorIconContainer}>
                    <Image
                        style={styles.thumbnailImage}
                        resizeMode="cover"
                        source={require("../../../assets/Catassets/doctoruser2.png")}
                    />
                </View>
                <View style={styles.doctorInfoContainer}>
                    <Text style={styles.doctorName}>Dr. {name}</Text>

                    <View style={styles.qualificationspecializationContainer}>
                        <Text style={styles.specialization}>{specialization}</Text>
                        <Text style={styles.qualification}> {qualification}</Text>
                    </View>

                </View>
            </View>


            <View style={styles.exp_City_container}>
                <View style={styles.experienceContainer}>
                    <Text style={styles.experience}>{experience} yrs. of experience</Text>
                </View>
                <View style={styles.cityContainer}>
                    <Text style={styles.city}>{city}</Text>
                </View>
            </View>

            <View style={styles.scheduleContainer}>
                <Text style={styles.scheduleText}>Schedules</Text>
                <ScrollView horizontal={true}>
                    {sortDays(availability).map((day, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedDay(day)}
                            style={[styles.day, selectedDay === day && { borderRadius: 20, backgroundColor: '#CCEEFF' }]}
                        >
                            <Text style={styles.dayText}>{day}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.timeContainer1}>
                <Text style={styles.timeText}>Choose Time</Text>

                {selectedDay && availability[selectedDay].length > 0 ? (
                    <ScrollView horizontal={true}>
                        {availability[selectedDay].map((slot, index) => (
                            <View key={index} style={styles.timeslotContainer2}>
                                {slot.startTime && slot.endTime ? (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => setSelectedTimeSlot(slot)}
                                        style={[styles.timeslot3, selectedTimeSlot === slot && styles.selectedSlot, bookedAppointments.some(appointment => appointment.timeSlot.startTime.isEqual(slot.startTime)) && styles.bookedSlot]}
                                    >
                                        <Text style={styles.slotText}>
                                            {timestampToDate(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {timestampToDate(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </Text>
                                    </TouchableOpacity>
                                ) : (
                                    <Text>No valid time slot available for this day.</Text>
                                )}
                            </View>
                        ))}
                    </ScrollView>
                ) : (
                    <Text style={{ marginTop: 5, fontSize: 12, fontFamily: 'Poppins-SemiBold' }} >OOPS! No slots Available</Text>
                )}

            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleBookAppointment}>
                    <Text style={styles.buttonText}>Book Appointment</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.chatbutton]} onPress={handleChat}>
                    <Text style={styles.buttonText}>Let's Chat</Text>
                </TouchableOpacity>
            </View>



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

    doctorCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        width: '95%',
        borderRadius: 20, // Add border radius
        shadowColor: '#000', // Add shadow
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        backgroundColor: '#fff', // Set background color

    },
    doctorIconContainer: {
        position: 'absolute',
        top: 15,
        marginLeft: 20,
        backgroundColor: '#CAEDFF',
        borderRadius: 100,
        padding: 10,

    },
    doctorInfoContainer: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 100,
        flex: 1,
        width: '90%', // Adjust the width as needed

    },

    doctorName: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        color: '#212529',
    },
    qualificationspecializationContainer: {
        flexDirection: 'row',
    },

    qualification: {
        marginLeft: 185,
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
        color: '#7E7E7E',
    },
    specialization: {
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
        color: '#7E7E7E',
    },

    thumbnailImage: {
        width: 40,
        height: 40,
        borderRadius: 10,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'green',
        textAlign: 'center',
    },

    exp_City_container: {
        flexDirection: 'row', // Arrange children horizontally
        marginTop: 15,
        marginLeft: 10,
    },

    cityContainer: {
        width: '20%', // Match width of leftContainer for equal size
        backgroundColor: 'white',
        borderRadius: 20,
        height: 45,
        alignItems: 'center',
        paddingTop: 12,
        marginLeft: 145,
    },

    city: {
        color: '#47C1FF',
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
    },

    experienceContainer: {
        width: '40%',
        backgroundColor: 'white',
        borderRadius: 20,
        height: 45,
        alignItems: 'center',
        paddingTop: 10,
    },

    experience: {
        color: '#47C1FF',
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',

    },

    scheduleContainer: {
        backgroundColor: 'white',
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        borderRadius: 20,
    },

    scheduleText: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        color: '#212529',
    },

    day: {
        marginRight: 10,
        padding: 10, // Add padding for better spacing
        borderRadius: 5, // Apply border radius for a softer look
    },

    dayText: {
        color: '#212529',
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
    },

    timeContainer1: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        margin: 15,
    },
    timeslotContainer2: {
        flexDirection: 'row', // Remove if not needed for layout
        marginTop: 10,
        marginLeft: 10,
    },
    timeText: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        color: '#212529',
    },
    timeslot3: {
        marginVertical: 5,
        color: '#fff',
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 5,
        width: 'auto', // Remove fixed width
        height: 50,
        alignItems: 'center',
        paddingTop: 15,
        marginRight: 10, // Add margin for spacing between time slots
    },

    bookedSlot: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#FFD8D8'
    },
    selectedSlot: {
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#CAEDFF'
    },
    slotText: {
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
        color: '#212529',
    },
    buttonContainer: {
        flexDirection: 'row'

    },

    chatbutton: {
        backgroundColor: '#47C1FF',
        paddingVertical: 15,
        borderRadius: 20,
        marginTop: 20,
        alignItems: 'center',
        marginLeft: 25,
        width: '30%'
    },


    button: {
        backgroundColor: '#47C1FF',
        paddingVertical: 15,
        borderRadius: 20,
        marginTop: 20,
        alignItems: 'center',
        width: '55%',
        marginLeft: 15
    },
    buttonText: {
        fontSize: 12,
        fontFamily: 'Poppins-Bold',
        color: 'white',
    },
    chatButton: {
        backgroundColor: '#fff',
        marginTop: 40,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        paddingVertical: 10,
    },
});


export default DoctorDetailScreen;