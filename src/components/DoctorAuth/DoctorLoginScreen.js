// /src/Components/DoctorAuth/DoctorLoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { fetchDoctorDataFromFirestore } from '../../Services/firebase'

const DoctorLoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();


    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;


    const handleLogin = async () => {
        try {

            if (!email || !password) {
                Alert.alert('Please Fill all Fields');
                return;
            }

            // Validating email, name, and password using regex
            if (!emailRegex.test(email)) {
                Alert.alert('Invalid Email', 'Please enter a valid email address');
                return;
            }

            if (!passwordRegex.test(password)) {
                Alert.alert('Weak Password', 'Password must contain at least 8 characters including uppercase, lowercase, and digits');
                return;
            }

            const userCredential = await auth().signInWithEmailAndPassword(email, password);

            const doctorId = userCredential.user.uid;
            const doctorSnapshot = await fetchDoctorDataFromFirestore(doctorId);

            if (doctorSnapshot.exists) {

                navigation.navigate('DoctorBasicInfo1');
            } else {
                console.log('Doctor data not found');
            }

            console.log('Login successful!');
        } catch (error) {
            Alert.alert('Error', 'Invalid email or password. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={[styles.input, styles.inputbox]}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
            />
            <TextInput
                style={[styles.input, styles.inputbox]}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
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
});

export default DoctorLoginScreen;
