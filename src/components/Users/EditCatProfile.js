import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView, Image, Alert } from 'react-native';
import { updateCatProfile } from '../../Services/firebase';
import { RadioButton } from 'react-native-paper';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useDispatch } from 'react-redux';
import { addMedia } from '../../Redux/Slices/CatProfile/MeduaUploadSlice';
import auth from '@react-native-firebase/auth';

const CatEditProfile = ({ navigation, route }) => {
    const { catProfile } = route.params;
    const [updatedCatProfile, setUpdatedCatProfile] = useState(catProfile);
    const [vaccinationStatus, setVaccinationStatus] = useState(catProfile.physicalHealth.vaccinationStatus);
    const [availabilityStatus, setAvailabilityStatus] = useState(catProfile.personalityAndAvailability.availabilityStatus);
    const [image, setImage] = useState([]);
    const dispatch = useDispatch();
    const [isBtnPressed, setIsBtnPressed] = useState(false);
    const user = auth().currentUser;


    const handleUpdateProfile = async () => {
        // Validation: Check if any field is empty
        const isEmptyField = Object.values(updatedCatProfile).some(value => value === '');
        if (isEmptyField) {
            Alert.alert('Error', 'Please fill all the fields.');
            return;
        }

        // Validation: Apply regex validation
        const regexCatName = /^[a-zA-Z\s]+$/;
        const regexBreed = /^[a-zA-Z\s]+$/;
        const regexPedigree = /^[a-zA-Z\s]+$/;
        const regexGender = /^(Male|Female)$/i;
        const regexAge = /^(0?[1-9]|[1-9][0-9])$/;
        const regexColor = /^[a-zA-Z\s]+$/;
        const regexPattern = /^[a-zA-Z\s]+$/;
        const regexEyeColor = /^[a-zA-Z\s]+$/;
        const regexCoatLength = /^[a-zA-Z\s]+$/;
        const regexTemperament = /^[a-zA-Z\s]+$/;
        const regexSocialCompatibility = /^[a-zA-Z\s]+$/;
        const regexDescription = /^[a-zA-Z\s]+$/;

        if (!regexCatName.test(updatedCatProfile.basicInfo.catName)) {
            Alert.alert('Error', 'Please enter a valid cat name.');
            return;
        }

        if (!regexBreed.test(updatedCatProfile.basicInfo.breed)) {
            Alert.alert('Error', 'Please enter a valid breed.');
            return;
        }

        if (!regexPedigree.test(updatedCatProfile.basicInfo.pedigree)) {
            Alert.alert('Error', 'Please enter a valid pedigree.');
            return;
        }

        if (!regexGender.test(updatedCatProfile.basicInfo.gender)) {
            Alert.alert('Error', 'Please enter a valid gender (Male or Female).');
            return;
        }

        if (!regexAge.test(updatedCatProfile.basicInfo.age)) {
            Alert.alert('Error', 'Please enter a valid age.');
            return;
        }

        if (!regexColor.test(updatedCatProfile.physicalHealth.color)) {
            Alert.alert('Error', 'Please enter a valid color.');
            return;
        }

        if (!regexPattern.test(updatedCatProfile.physicalHealth.pattern)) {
            Alert.alert('Error', 'Please enter a valid pattern.');
            return;
        }

        if (!regexEyeColor.test(updatedCatProfile.physicalHealth.eyeColor)) {
            Alert.alert('Error', 'Please enter a valid eye color.');
            return;
        }

        if (!regexCoatLength.test(updatedCatProfile.physicalHealth.coatLength)) {
            Alert.alert('Error', 'Please enter a valid coat length.');
            return;
        }

        if (!regexTemperament.test(updatedCatProfile.personalityAndAvailability.temperament)) {
            Alert.alert('Error', 'Please enter a valid temperament.');
            return;
        }

        if (!regexSocialCompatibility.test(updatedCatProfile.personalityAndAvailability.socialCompatibility)) {
            Alert.alert('Error', 'Please enter a valid social compatibility.');
            return;
        }

        if (!regexDescription.test(updatedCatProfile.personalityAndAvailability.description)) {
            Alert.alert('Error', 'Please enter a valid description.');
            return;
        }
        try {
            console.log(catProfile.id)
            await updateCatProfile(user.uid, catProfile.id, updatedCatProfile);
            navigation.goBack();
        } catch (error) {
            console.error('Error updating cat profile:', error);
        }
    };

    const handleVaccinationStatusChange = (status) => {
        setVaccinationStatus(status);
        setUpdatedCatProfile({ ...updatedCatProfile, physicalHealth: { ...updatedCatProfile.physicalHealth, vaccinationStatus: status } });
    };

    const handleAvailabilityStatusChange = (status) => {
        setAvailabilityStatus(status);
        setUpdatedCatProfile({ ...updatedCatProfile, personalityAndAvailability: { ...updatedCatProfile.personalityAndAvailability, availabilityStatus: status } });
    };

    const onPressIn = () => {
        setIsBtnPressed(true);
    };

    const onPressOut = () => {
        setIsBtnPressed(false);
    };

    const photoCamera = () => {
        ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then((pickedImage) => {
            dispatch(addMedia({ media: pickedImage.path }));
            setImage([pickedImage.path]);
            setUpdatedCatProfile({ ...updatedCatProfile, mediaUpload: { mediaList: [pickedImage.path] } });
        });
    };


    const photoLib = () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then((pickedImage) => {
            dispatch(addMedia({ media: pickedImage.path }));
            setImage([pickedImage.path]);
            setUpdatedCatProfile({ ...updatedCatProfile, mediaUpload: { mediaList: [pickedImage.path] } });
        });
    };


    return (

        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
                    <Image source={require("../../../assets/Catassets/backbtn.png")} style={styles.bactbtn} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Edit Profile</Text>
            </View>
            <Text style={styles.label}>Cat Name:</Text>
            <TextInput
                style={styles.input}
                value={updatedCatProfile.basicInfo.catName}
                onChangeText={(value) => setUpdatedCatProfile({ ...updatedCatProfile, basicInfo: { ...updatedCatProfile.basicInfo, catName: value } })}
            />
            <Text style={styles.label}>Breed:</Text>
            <TextInput
                style={styles.input}
                value={updatedCatProfile.basicInfo.breed}
                onChangeText={(value) => setUpdatedCatProfile({ ...updatedCatProfile, basicInfo: { ...updatedCatProfile.basicInfo, breed: value } })}
            />
            <Text style={styles.label}>Pedigree:</Text>

            <TextInput
                style={styles.input}
                value={updatedCatProfile.basicInfo.pedigree}
                onChangeText={(value) => setUpdatedCatProfile({ ...updatedCatProfile, basicInfo: { ...updatedCatProfile.basicInfo, pedigree: value } })}
            />
            <Text style={styles.label}>Gender:</Text>

            <TextInput
                style={styles.input}
                value={updatedCatProfile.basicInfo.gender}
                onChangeText={(value) => setUpdatedCatProfile({ ...updatedCatProfile, basicInfo: { ...updatedCatProfile.basicInfo, gender: value } })}
            />
            <Text style={styles.label}>Age:</Text>

            <TextInput
                style={styles.input}
                value={updatedCatProfile.basicInfo.age}
                onChangeText={(value) => setUpdatedCatProfile({ ...updatedCatProfile, basicInfo: { ...updatedCatProfile.basicInfo, age: value } })}
            />
            <Text style={styles.label}>Color:</Text>

            <TextInput
                style={styles.input}
                value={updatedCatProfile.physicalHealth.color}
                onChangeText={(value) => setUpdatedCatProfile({ ...updatedCatProfile, physicalHealth: { ...updatedCatProfile.physicalHealth, color: value } })}
            />
            <Text style={styles.label}>Pattern:</Text>

            <TextInput
                style={styles.input}
                value={updatedCatProfile.physicalHealth.pattern}
                onChangeText={(value) => setUpdatedCatProfile({ ...updatedCatProfile, physicalHealth: { ...updatedCatProfile.physicalHealth, pattern: value } })}
            />
            <Text style={styles.label}>Eye Color:</Text>

            <TextInput
                style={styles.input}
                value={updatedCatProfile.physicalHealth.eyeColor}
                onChangeText={(value) => setUpdatedCatProfile({ ...updatedCatProfile, physicalHealth: { ...updatedCatProfile.physicalHealth, eyeColor: value } })}
            />
            <Text style={styles.label}>coatLength:</Text>

            <TextInput
                style={styles.input}
                value={updatedCatProfile.physicalHealth.coatLength}
                onChangeText={(value) => setUpdatedCatProfile({ ...updatedCatProfile, physicalHealth: { ...updatedCatProfile.physicalHealth, coatLength: value } })}
            />
            <View style={styles.inputContainer}>
                <Text>Vaccination Status</Text>
                <View style={styles.radioButtonContainer}>
                    <RadioButton
                        value="Vaccinated"
                        status={vaccinationStatus === 'Vaccinated' ? 'checked' : 'unchecked'}
                        onPress={() => handleVaccinationStatusChange('Vaccinated')}
                        color="#47C1FF"
                    />
                    <Text style={styles.radioButtonText}>Vaccinated</Text>
                    <RadioButton
                        value="NotVaccinated"
                        status={vaccinationStatus === 'NotVaccinated' ? 'checked' : 'unchecked'}
                        onPress={() => handleVaccinationStatusChange('NotVaccinated')}
                        color="#47C1FF"
                    />
                    <Text style={styles.radioButtonText}>Not Vaccinated</Text>
                </View>
            </View>
            <Text style={styles.label}>Temperament:</Text>

            <TextInput
                style={styles.input}
                value={updatedCatProfile.personalityAndAvailability.temperament}
                onChangeText={(value) => setUpdatedCatProfile({ ...updatedCatProfile, personalityAndAvailability: { ...updatedCatProfile.personalityAndAvailability, temperament: value } })}
            />
            <Text style={styles.label}>Social Compatibility:</Text>

            <TextInput
                style={styles.input}
                value={updatedCatProfile.personalityAndAvailability.socialCompatibility}
                onChangeText={(value) => setUpdatedCatProfile({ ...updatedCatProfile, personalityAndAvailability: { ...updatedCatProfile.personalityAndAvailability, socialCompatibility: value } })}
            />
            <Text style={styles.label}>Description:</Text>

            <TextInput
                style={styles.input}
                value={updatedCatProfile.personalityAndAvailability.description}
                onChangeText={(value) => setUpdatedCatProfile({ ...updatedCatProfile, personalityAndAvailability: { ...updatedCatProfile.personalityAndAvailability, description: value } })}
            />
            <View style={styles.inputContainer}>
                <Text>Availability Status</Text>
                <View style={styles.radioButtonContainer}>
                    <RadioButton
                        value="Available"
                        status={availabilityStatus === 'Available' ? 'checked' : 'unchecked'}
                        onPress={() => handleAvailabilityStatusChange('Available')}
                        color="#47C1FF"
                    />
                    <Text style={styles.radioButtonText}>Available</Text>
                    <RadioButton
                        value="NotAvailable"
                        status={availabilityStatus === 'NotAvailable' ? 'checked' : 'unchecked'}
                        onPress={() => handleAvailabilityStatusChange('NotAvailable')}
                        color="#47C1FF"
                    />
                    <Text style={styles.radioButtonText}>Not Available</Text>
                </View>
            </View>
            <Text style={styles.label}>Media:</Text>
            <View style={styles.imageContainer}>
                {updatedCatProfile.mediaUpload && updatedCatProfile.mediaUpload.mediaList && updatedCatProfile.mediaUpload.mediaList.map((media, index) => (
                    <Image key={index} source={{ uri: media }} style={styles.image} />
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableHighlight
                    style={[styles.picbutton, isBtnPressed && styles.buttonPressed]}
                    onPress={photoCamera}
                    onPressIn={() => setIsBtnPressed(true)}
                    onPressOut={() => setIsBtnPressed(false)}
                    underlayColor="#47C1FF"
                >
                    <Text style={[styles.picbuttonText, isBtnPressed && { color: '#fff' }]}>Upload Photo from Camera</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={[styles.picbutton, isBtnPressed && styles.buttonPressed]}
                    onPress={photoLib}
                    onPressIn={() => setIsBtnPressed(true)}
                    onPressOut={() => setIsBtnPressed(false)}
                    underlayColor="#47C1FF"
                >
                    <Text style={[styles.picbuttonText, isBtnPressed && { color: '#fff' }]}>Upload Photo from Drive</Text>
                </TouchableHighlight>
            </View>

            <TouchableOpacity style={styles.updatebutton} onPress={handleUpdateProfile}>
                <Text style={styles.updatebuttonText}>Update Profile</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = {
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
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButtonText: {
        marginLeft: 5,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 10,
        marginBottom: 10,
    },
    picbutton: {
        backgroundColor: '#47C1FF',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: '45%', // Adjust button width as needed
    },
    updatebutton: {
        backgroundColor: '#47C1FF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center', // Center the button horizontally
        marginTop: 20, // Add margin from the top
        width: '50%', // Adjust button width as needed
        marginBottom: 20,
    },
    picbuttonText: {
        color: 'white',
        fontSize: 16,
    },
    updatebuttonText: {
        color: 'white',
        fontSize: 18,
    },
    buttonPressed: {
        backgroundColor: '#368CBF',
    },
};

export default CatEditProfile;
