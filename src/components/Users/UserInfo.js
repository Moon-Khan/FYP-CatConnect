// /src/Screens/Auth/SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { addUserDataFromFirestore } from '../../Services/firebase'
import { fetchUserDataFromFirestore } from '../../Services/firebase';

const UpdateUserScreen = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');

    const user = auth().currentUser;

    const handleUserUpdate = async () => {
        try {

            if (!contact || !address || !gender) {
                Alert.alert('Please fill all data');
                return;
            }

            const userCredential = await fetchUserDataFromFirestore(user.uid)
            if (userCredential.exists) {
                await addUserDataFromFirestore(user.uid, '', '', '', '', contact, address, gender);
            } else {
                console.log('User document does not exist in Firestore(home screen).');
            }

            navigation.navigate('Home');
            console.log('user updated successfully!');
        } catch (error) {

            console.log(error.message);
            Alert.alert('Error', 'Failed to update an account. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, styles.inputbox]}
                placeholder="Contact"
                onChangeText={(text) => setContact(text)}
            />
            <TextInput
                style={[styles.input, styles.inputbox]}
                placeholder="Address"
                onChangeText={(text) => setAddress(text)}
                keyboardType="email-address"
            />
            <TextInput
                style={[styles.input, styles.inputbox]}
                placeholder="Gender"
                onChangeText={(text) => setGender(text)}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Profile Updated</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ffff",
        padding: 16,
    },
    title: {
        fontSize: 34,
        marginBottom: 20,
        fontFamily: 'Poppins-SemiBold',
        color: '#47C1FF',
    },
    input: {
        marginBottom: 16,
        paddingHorizontal: 8,
        paddingLeft: 12,
        alignSelf: 'stretch',
        color: '#7E7E7E',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
    },
    inputbox: {
        borderColor: '#D9D9D9',
        borderWidth: 1,
        padding: 10,
        height: 50,
        borderRadius: 8,
        width: '90%',
        alignSelf: 'center',
        minHeight: 1,
        marginTop: 6,
    },
    button: {
        backgroundColor: '#47C1FF',
        padding: 12,
        borderRadius: 25,
        marginTop: 15,
        width: '50%',
    },
    buttonText: {
        fontSize: 18,
        color: '#ffff',
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',

    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    loginText: {
        color: '#000',
        marginRight: 5,
    },
    loginLink: {
        color: '#47C1FF',
        fontWeight: 'bold',
    },
});


export default UpdateUserScreen;
