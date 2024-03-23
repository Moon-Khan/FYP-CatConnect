// // src/Components/Doctors/DoctorInfo.js
// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     StyleSheet,
//     ScrollView,
//     Alert,
// } from 'react-native';

// import auth from '@react-native-firebase/auth';
// import { useNavigation } from '@react-navigation/native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import { Picker } from '@react-native-picker/picker';
// import { updateDoctorDataInFirestore } from '../../Services/firebase';
// import { fetchDoctorDataFromFirestore } from '../../Services/firebase';

// const DoctorUpdateScreen = () => {
//     const navigation = useNavigation();
//     const user = auth().currentUser;

//     const [specialization, setSpecialization] = useState('');
//     const [medicalQualification, setMedicalQualification] = useState('');
//     const [selectedDay, setSelectedDay] = useState('Monday');
//     const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
//     const [selectedStartTime, setSelectedStartTime] = useState('');
//     const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
//     const [selectedEndTime, setSelectedEndTime] = useState('');
//     const [contactInfo, setContactInfo] = useState('');
//     const [city, setCity] = useState('');

//     const showStartTimePicker = () => {
//         setStartTimePickerVisibility(true);
//     };

//     const hideStartTimePicker = () => {
//         setStartTimePickerVisibility(false);
//     };

//     const handleStartTimeConfirm = (time) => {
//         setSelectedStartTime(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
//         hideStartTimePicker();
//     };

//     const showEndTimePicker = () => {
//         setEndTimePickerVisibility(true);
//     };

//     const hideEndTimePicker = () => {
//         setEndTimePickerVisibility(false);
//     };

//     const handleEndTimeConfirm = (time) => {
//         setSelectedEndTime(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
//         hideEndTimePicker();
//     };

//     const handleNextPage = async () => {
//         try {
//             // Regex pattern to allow only letters, spaces, and hyphens for specialization
//             const specializationRegex = /^[a-zA-Z\s-]+$/;
//             if (!specialization || !specializationRegex.test(specialization)) {
//                 Alert.alert('Invalid input for specialization. Please use only letters, spaces, and hyphens.');
//                 return;
//             }

//             const medicalQualificationRegex = /^[a-zA-Z\s.,\-/()]+$/;
//             if (!medicalQualification || !medicalQualificationRegex.test(medicalQualification)) {
//                 Alert.alert('Invalid input for medicalQualification. Please use only letters, spaces, and certain special characters.');
//                 return;
//             }

//             if (!selectedDay || !medicalQualification || !selectedStartTime || !selectedEndTime || !contactInfo || !city) {
//                 Alert.alert('Please Fill all Fields');
//                 return;
//             }

//             const userCredential = await fetchDoctorDataFromFirestore(user.uid)
//             if (userCredential.exists) {
//                 await updateDoctorDataInFirestore(user.uid, '', '', '', specialization, medicalQualification, selectedDay, selectedStartTime, selectedEndTime, contactInfo, city);
//             } else {
//                 console.log('Doctor document does not exist in Firestore(home screen).');
//             }

//             // await addDoctorToFirestore(doctorId, doctorProfileData);

//             navigation.navigate('DoctorHomeScreen');
//         } catch (error) {
//             console.error('Error creating doctor account:', error);
//             Alert.alert('Error', 'Failed to create an account. Please try again.');
//         }
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
//             <Text style={styles.title}>Registeration</Text>

//             <TextInput
//                 style={[styles.input, styles.inputbox]}
//                 placeholder="Specialization"
//                 value={specialization}
//                 onChangeText={(text) => setSpecialization(text)}
//             />

//             <TextInput
//                 style={[styles.input, styles.inputbox]}
//                 placeholder="Medical Qualification"
//                 value={medicalQualification}
//                 onChangeText={(text) => setMedicalQualification(text)}
//             />

//             <View style={[styles.input, styles.Dayinputbox]}>
//                 <Picker
//                     style={{ color: '#7E7E7E', fontFamily: 'Poppins-SemiBold' }}
//                     selectedValue={selectedDay}
//                     onValueChange={(itemValue) => setSelectedDay(itemValue)}
//                 >
//                     <Picker.Item label="Select day you available" value="" />
//                     <Picker.Item label="Monday" value="Monday" />
//                     <Picker.Item label="Tuesday" value="Tuesday" />
//                     <Picker.Item label="Wednesday" value="Wednesday" />
//                     <Picker.Item label="Thursday" value="Thursday" />
//                     <Picker.Item label="Friday" value="Friday" />
//                     <Picker.Item label="Saturday" value="Saturday" />
//                     <Picker.Item label="Sunday" value="Sunday" />
//                 </Picker>
//             </View>


//             <TouchableOpacity onPress={showStartTimePicker} style={[styles.input, styles.inputbox]}>
//                 <Text>{selectedStartTime || 'Select Start Time'}</Text>
//             </TouchableOpacity>

//             <DateTimePickerModal
//                 isVisible={isStartTimePickerVisible}
//                 mode="time"
//                 onConfirm={handleStartTimeConfirm}
//                 onCancel={hideStartTimePicker}
//             />

//             <TouchableOpacity onPress={showEndTimePicker} style={[styles.input, styles.inputbox]}>
//                 <Text>{selectedEndTime || 'Select End Time'}</Text>
//             </TouchableOpacity>

//             <DateTimePickerModal
//                 isVisible={isEndTimePickerVisible}
//                 mode="time"
//                 onConfirm={handleEndTimeConfirm}
//                 onCancel={hideEndTimePicker}
//             />

//             <TextInput
//                 style={[styles.input, styles.inputbox]}
//                 placeholder="Contact Info"
//                 value={contactInfo}
//                 onChangeText={(text) => setContactInfo(text)}
//             />

//             <TextInput
//                 style={[styles.input, styles.inputbox]}
//                 placeholder="City"
//                 value={city}
//                 onChangeText={(text) => setCity(text)}
//             />

//             <TouchableOpacity style={styles.button} onPress={handleNextPage}>
//                 <Text style={styles.buttonText}>Submit</Text>
//             </TouchableOpacity>

//             <View style={styles.loginContainer}>
//                 <Text style={styles.loginText}>Already have an account?</Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('DoctorLoginScreen')}>
//                     <Text style={styles.loginLink}>Login</Text>
//                 </TouchableOpacity>
//             </View>
//         </ScrollView>
//     );
// };


// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: "#ffff",
//         padding: 16,
//     },
//     title: {
//         fontSize: 30,
//         marginBottom: 2,
//         fontFamily: 'Poppins-SemiBold',
//         color: '#47C1FF',
//         paddingTop: 25,
//     },
//     input: {
//         marginBottom: 14,
//         paddingHorizontal: 8,
//         paddingLeft: 12,
//         alignSelf: 'stretch',
//         color: '#7E7E7E',
//         fontFamily: 'Poppins-SemiBold',
//         fontSize: 15,
//     },
//     Dayinputbox: {
//         borderColor: '#D9D9D9',
//         borderWidth: 1,
//         padding: 0,
//         height: 45, // Adjusted height
//         borderRadius: 8,
//         width: '90%',
//         alignSelf: 'center',
//         minHeight: 1,
//         marginTop: 6,

//     },
//     inputbox: {
//         borderColor: '#D9D9D9',
//         borderWidth: 1,
//         padding: 10,
//         height: 45, // Adjusted height
//         borderRadius: 8,
//         width: '90%',
//         alignSelf: 'center',
//         minHeight: 1,
//         marginTop: 6,
//     },
//     button: {
//         backgroundColor: '#47C1FF',
//         padding: 12,
//         borderRadius: 25,
//         marginBottom: 10,
//         width: '50%',
//     },
//     buttonText: {
//         fontSize: 18,
//         color: '#ffff',
//         textAlign: 'center',
//         fontFamily: 'Poppins-Medium',
//     },
//     loginContainer: {
//         flexDirection: 'row',
//         marginTop: 20,
//     },
//     loginText: {
//         color: '#000',
//         marginRight: 5,
//         marginTop: -15,
//     },
//     loginLink: {
//         color: '#47C1FF',
//         fontWeight: 'bold',
//         marginTop: -15,
//     },
// });

// export default DoctorUpdateScreen;

// src/components/Doctors/DoctorAvbInfo.js

import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { updateDoctorDataInFirestore, approveDoctorProfile } from '../../Services/firebase'; // Import the updated Firebase function
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';


const DoctorAvailabilityScreen = ({ route }) => { // Receive route prop
    const [availability, setAvailability] = useState({
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
    });

    // Receive basic information from props
    const { name, specialization, qualification, experience, contactNumber, city } = route.params;

    const [selectedDay, setSelectedDay] = useState('');
    const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

    const user = auth().currentUser;
    const navigation = useNavigation();


    // Function to handle time slot selection
    const handleTimeChange = (day, index, key, selectedTime) => {
        const updatedAvailability = { ...availability };
        updatedAvailability[day][index][key] = selectedTime;
        setAvailability(updatedAvailability);
    };

    // Function to add a new time slot
    const handleAddTimeSlot = (day) => {
        const updatedAvailability = { ...availability };
        updatedAvailability[day] = [
            ...updatedAvailability[day],
            { startTime: null, endTime: null },
        ];
        setAvailability(updatedAvailability);
    };

    // Function to remove a time slot
    const handleRemoveTimeSlot = (day, index) => {
        const updatedAvailability = { ...availability };
        updatedAvailability[day].splice(index, 1);
        setAvailability(updatedAvailability);
    };

    // Function to handle saving availability
    const handleSaveAvailability = async () => {
        console.log('Availability:', availability);
        try {
            const doctorid = user.uid;

            // Combine availability data with basic information
            const doctorData = {
                doctorid,
                name,
                specialization,
                qualification,
                experience,
                contactNumber,
                availability,
                city,
                status: 'pending',
            };
            // Update doctor's data in Firestore
            await updateDoctorDataInFirestore(user.uid, doctorData);
            console.log('Doctor Data updated in Firestore:', doctorData);
            await approveDoctorProfile(doctorData);

            navigation.navigate('DoctorHomeScreen');

        } catch (error) {
            console.error('Error updating doctor data:', error);
            // Handle error
        }
    };

    // Function to show start time picker
    const showStartTimePicker = (day, index) => {
        setSelectedDay(day);
        setSelectedSlotIndex(index);
        setStartTimePickerVisibility(true);
    };

    // Function to hide start time picker
    const hideStartTimePicker = () => {
        setStartTimePickerVisibility(false);
    };

    // Function to confirm start time selection
    const handleStartTimeConfirm = (selectedTime) => {
        handleTimeChange(selectedDay, selectedSlotIndex, 'startTime', selectedTime);
        hideStartTimePicker();
    };

    // Function to show end time picker
    const showEndTimePicker = (day, index) => {
        setSelectedDay(day);
        setSelectedSlotIndex(index);
        setEndTimePickerVisibility(true);
    };

    // Function to hide end time picker
    const hideEndTimePicker = () => {
        setEndTimePickerVisibility(false);
    };

    // Function to confirm end time selection
    const handleEndTimeConfirm = (selectedTime) => {
        handleTimeChange(selectedDay, selectedSlotIndex, 'endTime', selectedTime);
        hideEndTimePicker();
    };
    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Set Availability</Text>

            {Object.keys(availability).map((day) => (
                <View key={day} style={styles.dayContainer}>
                    <View style={styles.dayHeader}>
                        <Text style={styles.dayText}>{day}</Text>
                        <TouchableOpacity onPress={() => handleAddTimeSlot(day)}>
                            <Text style={styles.addSlotButton}>Add Time Slot</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.timeSlotsContainer}>
                        {availability[day].map((slot, index) => (
                            <View key={index} style={styles.timeSlotContainer}>
                                <Text style={styles.TimeslotText}>Time Slot {index + 1}:</Text>
                                <View style={styles.timeSlotInputs}>
                                    {/* Start Time Picker */}
                                    <TouchableOpacity onPress={() => showStartTimePicker(day, index)}>
                                        <Text style={styles.timeText}>{slot.startTime ? slot.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select Start Time'}</Text>
                                    </TouchableOpacity>
                                    {/* End Time Picker */}
                                    <TouchableOpacity onPress={() => showEndTimePicker(day, index)}>
                                        <Text style={styles.timeText}>{slot.endTime ? slot.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select End Time'}</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => handleRemoveTimeSlot(day, index)}>
                                    <Text style={styles.removeSlotButton}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
            ))}

            {/* DateTimePickerModals for start and end time */}
            <DateTimePickerModal
                isVisible={isStartTimePickerVisible}
                mode="time"
                onConfirm={handleStartTimeConfirm}
                onCancel={hideStartTimePicker}
            />
            <DateTimePickerModal
                isVisible={isEndTimePickerVisible}
                mode="time"
                onConfirm={handleEndTimeConfirm}
                onCancel={hideEndTimePicker}
            />

            {/* Button to save availability */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveAvailability}>
                <Text style={styles.buttonText}>Save Availability</Text>
            </TouchableOpacity>
        </ScrollView>
    )
};


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffff",
        padding: 16,
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        fontFamily: 'Poppins-SemiBold',
        color: '#47C1FF',
        paddingTop: 25,
    },
    dayContainer: {
        marginBottom: 20,
    },
    dayHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Align items horizontally
        alignItems: 'center',
        marginBottom: 10,
    },
    dayText: {
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
        color: '#212529',
    },
    TimeslotText: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: '#212529',
    },

    timeSlotsContainer: {
        flexDirection: 'row', // Display time slots horizontally
        flexWrap: 'wrap', // Allow wrapping of time slots to next line if needed

    },
    timeSlotContainer: {
        flexDirection: 'row', // Display time slots horizontally
        flexWrap: 'wrap', // Allow wrapping of time slots to next line if needed
        marginRight: 10,
        marginBottom: 10,
    },
    timeSlotInputs: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeText: {
        color: '#212529',
        marginRight: 5,
        marginLeft: 5,
        height: 40,
        borderWidth: 1,
        borderColor: '#212529',
        paddingHorizontal: 10,
        textAlignVertical: 'center',
    },
    addSlotButton: {
        color: '#47C1FF',
        textDecorationLine: 'underline',
        marginBottom: 10,
        marginLeft: 40,
    },
    removeSlotButton: {
        color: 'red',
        textDecorationLine: 'underline',
        marginTop: 5,
        marginLeft: 290,
    },
    saveButton: {
        backgroundColor: '#47C1FF',
        padding: 12,
        borderRadius: 25,
        marginBottom: 10,
        width: '50%',
    },
    buttonText: {
        fontSize: 18,
        color: '#ffff',
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
    },
});


export default DoctorAvailabilityScreen;