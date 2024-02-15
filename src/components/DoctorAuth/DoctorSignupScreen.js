// /src/Components/UserAuth/SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { setLoading, setError, setUser } from '../../Redux/Slices/Auth/AuthSlice';
import { useNavigation } from '@react-navigation/native';
import { addDoctorToFirestore, fetchDoctorDataFromFirestore } from '../../Services/firebase';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const DoctorSignup = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [password, setPassword] = useState('');


    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[a-zA-Z\s]*$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    GoogleSignin.configure({
        webClientId: '278400562229-9jso7k6r85blctogecoc8f1tmuonhguc.apps.googleusercontent.com',
    });

    const handleEmailSignup = async () => {
        try {
            if (!email || !firstname || !password) {
                Alert.alert('Please Fill all Fields');
                return;
            }

            // Validating email, name, and password using regex
            if (!emailRegex.test(email)) {
                Alert.alert('Invalid Email', 'Please enter a valid email address');
                return;
            }

            if (!nameRegex.test(firstname)) {
                Alert.alert('Invalid Name', 'Please enter a valid first name');
                return;
            }

            if (!passwordRegex.test(password)) {
                Alert.alert('Weak Password', 'Password must contain at least 8 characters including uppercase, lowercase, and digits');
                return;
            }

            dispatch(setLoading(true));
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const uid = userCredential.user.uid;

            // Wait for email verification before adding data to Firestore
            await auth().currentUser.reload(); // Reload user to check verification status
            while (!auth().currentUser.emailVerified) {
                await new Promise((resolve) => setTimeout(resolve, 5000)); // Check every 5 seconds
                await auth().currentUser.reload();
            }


            await addDoctorToFirestore(uid, email, firstname, password, '', '', '', '', '', '', '');

            dispatch(setUser(uid));
            dispatch(setLoading(false));
            navigation.navigate('DoctorsInfo');
            console.log('Account created successfully!');
        } catch (error) {
            dispatch(setError(error.message));
            dispatch(setLoading(false));
            console.log(error.message);
            Alert.alert('Error', 'Failed to create an account. Please try again.');
        }
    };

    const handleGoogleSignup = async () => {
        try {
            // Trigger Google Sign-In flow
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);

            // Sign in with Google credential
            const userCredential = await auth().signInWithCredential(googleCredential);
            console.log(userCredential.user);

            // Retrieve user data and add to Firestore
            const uid = userCredential.user.uid;
            await addDoctorToFirestore(uid, userCredential.user.email, userCredential.user.displayName, '', '', '', '', '', '', '','');
            // Check if it's an existing user or a new one
            const isExistingUser = await fetchDoctorDataFromFirestore(uid);
            if (isExistingUser) {
                // If it's an existing user, navigate to the Home screen
                navigation.navigate('DoctorHomeScreen');
            } else {
                // If it's a new user, navigate to the CatBasicInfo screen
                navigation.navigate('DoctorsInfo');
            }
        } catch (error) {
            // Handle errors
            console.error('Google Sign-In Error:', error);
            Alert.alert('Error', 'Failed to sign in with Google. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Signup</Text>
            <TextInput
                style={[styles.input, styles.inputbox]}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
            />
            <TextInput
                style={[styles.input, styles.inputbox]}
                placeholder="Firstname"
                onChangeText={(text) => setFirstname(text)}
            />
            <TextInput
                style={[styles.input, styles.inputbox]}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleEmailSignup}>
                <Text style={styles.buttonText}>Sign Up with Email</Text>
                <Image source={require('../../../assets/Catassets/email.png')} style={styles.emailIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.googlebutton} onPress={handleGoogleSignup}>
                <Text style={styles.googlebuttonText}>Continue with Google</Text>
                <Image source={require('../../../assets/Catassets/google.png')} style={styles.googleIcon} />
            </TouchableOpacity>
            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('DoctorLoginScreen')}>
                    <Text style={styles.loginLink}>Login</Text>
                </TouchableOpacity>
            </View>
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
        width: '60%',
        paddingLeft: 40,
    },
    buttonText: {
        fontSize: 18,
        color: '#ffff',
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',

    },
    googlebutton: {
        borderColor: '#47C1FF',
        padding: 12,
        borderWidth: 2,
        borderRadius: 25,
        marginTop: 15,
        width: '60%',
        fontSize: 18,
        color: '#ffff',
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
        paddingLeft: 35,

    },
    googlebuttonText: {
        fontSize: 18,
        color: '#47C1FF',
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
    },
    emailIcon: {
        position: 'absolute',
        top: 5,
        left: 5,
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    googleIcon: {
        position: 'absolute',
        top: 10,
        left: 5,
        width: 30,
        height: 30,
        resizeMode: 'contain',
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


export default DoctorSignup;
