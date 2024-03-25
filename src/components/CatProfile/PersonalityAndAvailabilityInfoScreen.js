// import { saveCatProfileToFirestore } from '../../Redux/Slices/FirestoreSlice';
// import { updatePersonalityAndAvailability } from '../../Redux/Slices/CatProfile/CatProfileSlice';
// dispatch(saveCatProfileToFirestore({
//     personalityAndAvailability: {
//         temperament,
//         socialCompatibility,
//         description,
//         availabilityStatus,
//     },
// },
// ));


// ./src/CatProfile/PersonalityAndAvailabilityInfoScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addPersonalityAndAvailability } from '../../Redux/Slices/CatProfile/PersonalityandAvailabilitySlice';

const PersonalityAvialabilityScreen = () => {

    const [temperament, setTemperament] = useState('');
    const [socialCompatibility, setSocialCompatibility] = useState('');
    const [description, setDescription] = useState('');
    const [availabilityStatus, setAvailabilityStatus] = useState('');
    const navigation = useNavigation();

    //redux code
    const dispatch = useDispatch();

    const temperamentRegex = /^[a-zA-Z-]+$/;
    const socialCompatibilityRegex = /^[a-zA-Z\s-]+$/;

    const handleTemparamentChange = (text) => {
        setTemperament(text);
    };

    const handleSocialCompatibilityChange = (text) => {
        setSocialCompatibility(text);
    };

    const handleDescriptionChange = (text) => {
        setDescription(text);
    };

    const handleAvailabilityStatusChange = (text) => {
        setAvailabilityStatus(text);
    };

    const handleNextPage = () => {
        try {
            if (!temperament || !socialCompatibility || !description || !availabilityStatus) {
                Alert.alert('Please Fill all Fields');
                return;
            }

            if (!temperamentRegex.test(temperament)) {
                Alert.alert('Invalid input for temperament. Please use only letters and hyphens.');
                return;
            }

            if (!socialCompatibilityRegex.test(socialCompatibility)) {
                Alert.alert('Invalid input for social compatibility. Please use only letters, spaces, and hyphens.');
                return;
            }

            dispatch(addPersonalityAndAvailability({
                temperament,
                socialCompatibility,
                description,
                availabilityStatus,
            }));

            navigation.navigate('CatMediaUpload');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <ScrollView style={{ ...styles.container, backgroundColor: 'white' }}>
            <Text style={styles.title}>Personality and Behavior</Text>

            <View style={styles.inputContainer}>
                <Text>Temperament</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. playful/shy"
                    value={temperament}
                    onChangeText={handleTemparamentChange}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Social Compatibility</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. behaviour with other cats"
                    value={socialCompatibility}
                    onChangeText={handleSocialCompatibilityChange}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Description</Text>
                <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="e.g. Description"
                    multiline
                    value={description}
                    onChangeText={handleDescriptionChange}
                />
            </View>

            <Text style={styles.title}>Breeding Availability</Text>

            <View style={styles.inputContainer}>
                <Text>Availability Status</Text>

                <View style={styles.radioButtonContainer}>
                    <RadioButton
                        value="Available"
                        status={availabilityStatus === 'Available' ? 'checked' : 'unchecked'}
                        onPress={() => handleAvailabilityStatusChange('Available')}
                        color="#47C1FF" // Set color for checked sta
                    />

                    <Text style={{ ...styles.radioButtonText, fontFamily: 'Poppins-Regular' }}>Available</Text>
                    <RadioButton
                        value="NotAvailable"
                        status={availabilityStatus === 'NotAvailable' ? 'checked' : 'unchecked'}
                        onPress={() => handleAvailabilityStatusChange('NotAvailable')}
                        color="#47C1FF" // Set color for checked sta
                    />
                    <Text style={{ ...styles.radioButtonText, fontFamily: 'Poppins-Regular' }}>Not Available</Text>
                </View>

            </View>

            <TouchableOpacity style={styles.button} onPress={handleNextPage}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    title: {
        fontSize: 24,
        marginTop: 15,

        marginBottom: 16,
        textAlign: 'left',
        color: '#212529',
        fontFamily: 'Poppins-SemiBold',
    },

    inputContainer: {
        marginBottom: 10,
    },
    input: {
        height: 50,
        borderColor: '#D9D9D9',
        color: '#7E7E7E',
        borderWidth: 1,
        borderRadius: 8,
        minHeight: 1,
        marginTop: 6,
        padding: 10,
        fontFamily: 'Poppins-SemiBold',

    },
    descriptionInput: {
        height: 80, // Adjust the height for a multiline description input
    },
    button: {
        backgroundColor: '#47C1FF',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        width: '70%',
        alignSelf: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    saveButton: {
        marginTop: 16,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    radioButtonText: {
        marginLeft: 0,
        marginRight: 32,
    },
});

export default PersonalityAvialabilityScreen;
