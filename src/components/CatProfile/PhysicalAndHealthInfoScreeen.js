// import DocumentPicker from 'react-native-document-picker';
// import { updatePhysicalHealth } from '../../Redux/Slices/CatProfile/CatProfileSlice';
// import { saveCatProfileToFirestore } from '../../Redux/Slices/FirestoreSlice';
// dispatch(saveCatProfileToFirestore({
//     physicalHealth: {
//         color,
//         pattern,
//         eyeColor,
//         coatLength,
//         vaccinationStatus,
//         medicalCertificate,
//     },
// },
// ));

// ./src/CatProfile/PhysicalAndHealthInfoScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Button, RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addPhysicalHealth } from '../../Redux/Slices/CatProfile/PhysicalHealthSlice';

const PhysicalAndHealthScreen = () => {
    const [color, setColor] = useState('');
    const [pattern, setPattern] = useState('');
    const [eyeColor, setEyeColor] = useState('');
    const [coatLength, setCoatLength] = useState('');
    const [vaccinationStatus, setVaccinationStatus] = useState('');
    const navigation = useNavigation();

    // Redux code
    const dispatch = useDispatch();

    const colorRegex = /^[a-zA-Z\s-]*$/;
    const patternRegex = /^[a-zA-Z\s-]*$/;
    const eyeColorRegex = /^[a-zA-Z\s-]*$/;
    const coatLengthRegex = /^[a-zA-Z\s-]*$/;

    const handleColorChange = (text) => {
        setColor(text);
    };

    const handlePatternChange = (text) => {
        setPattern(text);
    };

    const handleEyeColorChange = (text) => {
        setEyeColor(text);
    };

    const handleCoatLengthChange = (text) => {
        setCoatLength(text);
    };

    const handleVaccinationStatusChange = (text) => {
        setVaccinationStatus(text);
    };

    const handleNextPage = () => {
        try {
            if (!color || !pattern || !eyeColor || !coatLength || !vaccinationStatus) {
                Alert.alert('Please Fill all Fields');
                return;
            }

            if (!colorRegex.test(color)) {
                Alert.alert('Invalid input for cat color. Please use only letters, spaces, and hyphens.');
                return;
            }

            if (!patternRegex.test(pattern)) {
                Alert.alert('Invalid input for pattern. Please use only letters, spaces, and hyphens.');
                return;
            }

            if (!eyeColorRegex.test(eyeColor)) {
                Alert.alert('Invalid input for eye color. Please use only letters, spaces, and hyphens.');
                return;
            }

            if (!coatLengthRegex.test(coatLength)) {
                Alert.alert('Invalid input for coat length. Please use only letters, spaces, and hyphens.');
                return;
            }

            dispatch(addPhysicalHealth({
                color,
                pattern,
                eyeColor,
                coatLength,
                vaccinationStatus,
            }));

            navigation.navigate('PersonalityAndAvailabilityInfo');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <ScrollView style={{ ...styles.container, backgroundColor: 'white' }}>
            <Text style={styles.title}>Physical Information</Text>

            <View style={styles.inputContainer}>
                <Text fontFamily='Poppins-Regular'>Cat Color</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. White"
                    value={color}
                    onChangeText={handleColorChange}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text fontFamily='Poppins-Regular'>Cat Pattern</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. tabby/solid"
                    value={pattern}
                    onChangeText={handlePatternChange}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text fontFamily='Poppins-Regular'>Eye Color</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. brown"
                    value={eyeColor}
                    onChangeText={handleEyeColorChange}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text fontFamily='Poppins-Regular'>Coat Length</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g. short/medium"
                    value={coatLength}
                    onChangeText={handleCoatLengthChange}
                />
            </View>

            <Text style={styles.sectionTitle}>Medical Information</Text>

            <View style={styles.inputContainer}>
                <Text fontFamily='Poppins-Regular'>Vaccination Status</Text>

                <View style={styles.radioButtonContainer}>
                    <RadioButton
                        value="Vaccinated"
                        status={vaccinationStatus === 'Vaccinated' ? 'checked' : 'unchecked'}
                        onPress={() => handleVaccinationStatusChange('Vaccinated')}
                        color="#47C1FF" // Set color for checked sta
                    />

                    <Text style={{ ...styles.radioButtonText, fontFamily: 'Poppins-Regular' }}>Vaccinated</Text>
                    <RadioButton
                        value="NotVaccinated"
                        status={vaccinationStatus === 'NotVaccinated' ? 'checked' : 'unchecked'}
                        onPress={() => handleVaccinationStatusChange('NotVaccinated')}
                        color="#47C1FF" // Set color for checked sta
                    />
                    <Text style={{ ...styles.radioButtonText, fontFamily: 'Poppins-Regular' }}>Not Vaccinated</Text>
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
    sectionTitle: {
        fontSize: 24,
        marginTop: 15,

        marginBottom: 16,
        textAlign: 'left',
        color: '#212529',
        fontFamily: 'Poppins-SemiBold',
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
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    radioButtonText: {
        marginLeft: 0,
        marginRight: 32,
    },
    attachmentButton: {
        backgroundColor: 'lightblue',
        padding: 10,
        borderRadius: 5,
        marginTop: 8,
        alignItems: 'center',
    },
    attachmentText: {
        marginTop: 8,
        color: 'white',
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
});

export default PhysicalAndHealthScreen;



// const handleMedicalCertificateChange = (text) => {
//     console.log('Selected value:', text);
//     dispatch(updatePhysicalHealth({ medicalCertificate: text.uri }));
// };


// const handleAttachment = async () => {
//     try {
//         const result = await DocumentPicker.pick({
//             type: [DocumentPicker.types.pdf],
//         });

//         // setMedicalCertificate(result);
//         handleMedicalCertificateChange(result);

//     } catch (err) {
//         if (DocumentPicker.isCancel(err)) {
//             // User cancelled the picker
//         } else {
//             console.error('Error picking document:', err);
//         }
//     }
// };

{/* <View style={styles.inputContainer}>
                <Text fontFamily='Poppins-Regular'>Medical Certificate</Text>
                <TouchableOpacity
                    style={{ ...styles.attachmentButton, backgroundColor: '#212529', width: '80%', alignSelf: 'center' }}
                    value={medicalCertificate}
                    onPress={handleAttachment}
                >

                    <Text style={{ color: 'white' }}>{medicalCertificate ? 'Change Attachment' : 'Attach PDF'}</Text>
                </TouchableOpacity>
                {medicalCertificate && (
                    <Text style={styles.attachmentText}>{medicalCertificate.name}</Text>
                )}
            </View> */}

