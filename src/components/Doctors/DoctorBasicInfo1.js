// src/components/Doctors/DoctorBasicInfo.js
// src/components/Doctors/DoctorBasicInfo.js

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';

import DoctorAvailabilityScreen from './DoctorsAvbInfo';

const DoctorBasicInfoScreen = ({ navigation }) => { // Receive navigation prop
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [qualification, setQualification] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [experience, setExperience] = useState('');


    // Regular expressions for input validation
    const nameRegex = /^[a-zA-Z\s]*$/; // Allows only alphabets and spaces
    const cityRegex = /^[a-zA-Z\s]*$/; // Allows only alphabets and spaces
    const specializationRegex = /^[a-zA-Z\s]*$/; // Allows only alphabets and spaces
    const qualificationRegex = /^[a-zA-Z0-9\s]*$/; // Allows alphabets, numbers, and spaces
    const contactNumberRegex = /^\d{10}$/; // Allows 10 digits only
    const experienceRegex = /^\d+$/;



    // Function to handle form submission
    const handleSubmit = () => {
        if (!cityRegex.test(city)) {
            Alert.alert('Invalid User Name', 'Please enter a valid user name.');
            return;
        }
        if (!nameRegex.test(name)) {
            Alert.alert('Invalid User Name', 'Please enter a valid user name.');
            return;
        }
        if (!specializationRegex.test(specialization)) {
            Alert.alert('Invalid Specialization', 'Please enter a valid specialization.');
            return;
        }
        if (!qualificationRegex.test(qualification)) {
            Alert.alert('Invalid Qualification', 'Please enter a valid qualification.');
            return;
        }
        if (!contactNumberRegex.test(contactNumber)) {
            Alert.alert('Invalid Contact Number', 'Please enter a valid 10-digit contact number.');
            return;
        }
        if (!experienceRegex.test(experience)) {
            Alert.alert('Invalid experience', 'Please enter a number.');
            return;
        }
        // If all inputs are valid, proceed to DoctorAvailabilityScreen
        navigation.navigate('DoctorsAvbInfo', { // Navigate and pass data as props
            name,
            specialization,
            qualification,
            experience,
            contactNumber,
            city
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

            <Text style={styles.title}>Create Your Doctor profile</Text>
            <Text style={styles.title2}>Basic Info</Text>

            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Specialization e.g Cardiologist"
                value={specialization}
                onChangeText={setSpecialization}
            />
            <TextInput
                style={styles.input}
                placeholder="Qualification e.g MBBS"
                value={qualification}
                onChangeText={setQualification}
            />
            <TextInput
                style={styles.input}
                placeholder="Experience in years e.g 5 "
                value={experience}
                onChangeText={setExperience}
            />
            <TextInput
                style={styles.input}
                placeholder="Contact Number e.g 123456789"
                keyboardType="numeric"
                value={contactNumber}
                onChangeText={setContactNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="City e.g Lahore"
                value={city}
                onChangeText={setCity}
            />

            <Text style={styles.title2}></Text>


            <DoctorAvailabilityScreen />


            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffffff",
    },
    title: {
        fontSize: 20,
        marginBottom: 30,
        textAlign: 'left',
        color: '#212529',
        fontFamily: 'Poppins-SemiBold'
    },
    title2: {
        fontSize: 20,
        color: '#212529',
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'left',
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#47C1FF',
        padding: 12,
        borderRadius: 25,
        width: '50%',
    },
    buttonText: {
        fontSize: 18,
        color: '#ffff',
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
    },
});

export default DoctorBasicInfoScreen;
