// /src/Components/UserAuth/EmailVerificationScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { setLoading, setError, setUser } from '../../Redux/Slices/Auth/AuthSlice';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addUserDataFromFirestore } from '../../Services/firebase';

const EmailVerificationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerify = async () => {
    try {
      const email = route.params?.email;
      const firstname = route.params?.firstname;
      const password = route.params?.password;
      const fcmToken = route.params.fcmToken;

      if (!verificationCode) {
        Alert.alert('Verification Code Required', 'Please enter the verification code received in your email.');
        return;
      }
      dispatch(setLoading(true));
      await auth().signInWithEmailLink(email, verificationCode);
      const user = auth().currentUser;
      const { uid } = user;
      // Add user data to Firestore
      await addUserDataFromFirestore(uid, email, firstname, password,fcmToken, '', '', '', '');
      dispatch(setUser(uid));
      dispatch(setLoading(false));
      navigation.navigate('Home');
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      console.log(error.message);
      Alert.alert('Error', 'Failed to verify email. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email Verification</Text>
      <TextInput
        style={[styles.input, styles.inputbox]}
        placeholder="Verification Code"
        onChangeText={(text) => setVerificationCode(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmailVerificationScreen;
