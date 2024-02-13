// /src/Components/UserAuth/SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { setLoading, setError, setUser } from '../../Redux/Slices/Auth/AuthSlice';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import { addUserDataFromFirestore } from '../../Services/firebase'

const SignupScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {

      if (!email || !username || !password) {
        Alert.alert('Please Fill all Fields');
        return;
      }

      dispatch(setLoading(true));
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const uid = userCredential.user.uid;
      const fcmToken = await messaging().getToken();


      await addUserDataFromFirestore(uid, email, username, password, fcmToken, '', '', '');

      dispatch(setUser(uid));
      dispatch(setLoading(false));
      navigation.navigate('CatBasicInfo');
      console.log('Account created successfully!');
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      console.log(error.message);
      Alert.alert('Error', 'Failed to create an account. Please try again.');
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
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={[styles.input, styles.inputbox]}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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


export default SignupScreen;
