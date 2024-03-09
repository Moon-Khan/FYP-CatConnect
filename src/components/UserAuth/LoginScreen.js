// /src/Screens/Auth/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { fetchUserDataFromFirestore } from '../../Services/firebase';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();


  const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleLogin = async () => {
    try {

      if (!email || !password) {
        Alert.alert('Please Fill all Fields');
        return;
      }

      if (email == 'Admin' && password == 'Admin') {
        navigation.navigate('AdminHome');
        return;
      }
      else {

        try {

          // Validating email, name, and password using regex
          if (!emailRegex.test(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address');
            return;
          }

          const userCredential = await auth().signInWithEmailAndPassword(email, password);

          const userId = userCredential.user.uid;
          const userSnapshot = await fetchUserDataFromFirestore(userId);

          if (userSnapshot.exists) {

            navigation.navigate('Home');
          } else {
            console.log('user data not found');
          }

          console.log('Login successful!');
        } catch (error) {

          Alert.alert('Error', 'Wrong email or password. Please try again');
        }

      }
    }
    catch (error) {
      Alert.alert('Please try again!');
      console.log('Admin error',error.message);
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
    backgroundColor: '#47C1FF', // Using the same color as SignUp button
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


export default LoginScreen;
