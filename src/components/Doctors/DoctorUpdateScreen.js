// // DoctorSignupScreen.js
// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     StyleSheet,
//     ScrollView,
//     Alert,
//     Image
// } from 'react-native';

// import auth from '@react-native-firebase/auth';
// import { useNavigation } from '@react-navigation/native';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import { Picker } from '@react-native-picker/picker';
// import { addDoctorToFirestore } from '../../Services/firebase';
// import { fetchDoctorDataFromFirestore } from '../../Services/firebase';


// const DoctorUpdateScreen = () => {
//     const navigation = useNavigation();
//     const user = auth().currentUser;

//     const [specialization, setSpecialization] = useState('');
//     const [selectedDay, setSelectedDay] = useState('Monday');
//     const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
//     const [selectedStartTime, setSelectedStartTime] = useState('');
//     const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
//     const [selectedEndTime, setSelectedEndTime] = useState('');
//     const [contactInfo, setContactInfo] = useState('');
//     const [city, setCity] = useState('');
//     const [address, setAddress] = useState('');


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

//             if (!specialization || !selectedDay || !selectedStartTime || !selectedEndTime || !contactInfo || !city || !address) {
//                 Alert.alert('Please Fill all Fields');
//                 return;
//             }


//             const userCredential = await fetchDoctorDataFromFirestore(user.uid)
//             if (userCredential.exists) {
//                 await addDoctorToFirestore(user.uid, '', '', '', specialization, selectedDay, selectedStartTime, selectedEndTime, contactInfo, city, address);
//             } else {
//                 console.log('User document does not exist in Firestore(home screen).');
//             }

//             await addDoctorToFirestore(doctorId, doctorProfileData);

//             navigation.navigate('DoctorHomeScreen');
//         } catch (error) {
//             console.error('Error creating doctor account:', error);
//             Alert.alert('Error', 'Failed to create an account. Please try again.');
//         }
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
//             <View style={styles.header}>
//                 <View style={styles.backButtonContainer}>
//                     <Image source={require("../../../assets/Catassets/backbtn.png")} style={styles.bactbtn} />
//                 </View>
//                 <Text style={styles.headerText}>Profile</Text>

//             </View>
//             <TextInput
//                 style={[styles.input, styles.inputbox]}
//                 placeholder="Specialization"
//                 value={specialization}
//                 onChangeText={(text) => setSpecialization(text)}
//             />
//             <View style={[styles.input, styles.Dayinputbox]}
//             >
//                 <Picker
//                     style={{ color: '#7E7E7E', fontFamily: 'Poppins-SemiBold' }}
//                     selectedValue={selectedDay}
//                     onValueChange={(itemValue) => setSelectedDay(itemValue)}
//                 >
//                     <Picker.Item label="Monday" value="Monday" />
//                     <Picker.Item label="Tuesday" value="Tuesday" />
//                     <Picker.Item label="Wednesday" value="Wednesday" />
//                     <Picker.Item label="Thursday" value="Thursday" />
//                     <Picker.Item label="Friday" value="Friday" />
//                     <Picker.Item label="Saturday" value="Saturday" />
//                     <Picker.Item label="Sunday" value="Sunday" />
//                     {/* Add other days as needed */}
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

//             <TextInput
//                 style={[styles.input, styles.inputbox]}
//                 placeholder="Address"
//                 value={address}
//                 onChangeText={(text) => setAddress(text)}
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
//     header: {
//         backgroundColor: '#ffff',
//         borderBottomLeftRadius: 30,
//         borderBottomRightRadius: 30,
//         paddingHorizontal: 20,
//         paddingVertical: 40,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 5,
//         },
//         shadowOpacity: 1,
//         shadowRadius: 20,
//         elevation: 30,
//         marginBottom: 20,
//         flexDirection: 'row',
//     },
//     headerText: {
//         fontSize: 20,
//         color: '#47C1FF',
//         textAlign: 'center',
//         fontFamily: 'Poppins-Bold',
//         flex: 1,
//     },

//     bactbtn: {
//         marginLeft: 10,
//         height: 25,
//         width: 25,
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
