// src/Screens/ProfileScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'; // Import Alert
import { CommonActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { fetchUserDataFromFirestore } from '../../Services/firebase';

const ProfileScreen = ({ navigation }) => {
  const user = auth().currentUser;
  const [userData, setUserData] = useState(null);

  const fetchUserData = async (userId) => {
    try {
      const userDoc = await fetchUserDataFromFirestore(userId);
      if (userDoc.exists) {
        setUserData(userDoc.data());
      } else {
        console.log('User document does not exist in Firestore.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData(user.uid);
    }
  }, [user]);


  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.'); // Use Alert
    }
  };

  const navigateToCatBasicInfo = () => {
    navigation.navigate('CatBasicInfo');
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };

  const navigateToFeedback = () => {
    navigation.navigate('Feedback');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Image source={require('../../../assets/Catassets/profile.png')} style={styles.profileIcon} />
      </View>

      {userData && (
        <View>
          <Text style={styles.userInfo}>Email: {userData.email}</Text>
          <Text style={styles.userInfo}>User Name: {userData.username || ''}</Text>
        </View>
      )}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {/* Handle 'My Profile' action */ }}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={navigateToCatBasicInfo}>
          <Text style={styles.buttonText}>Add Cat Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={navigateToSettings}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={navigateToFeedback}>
          <Text style={styles.buttonText}>Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Poppins-SemiBold',
  },
  profileIcon: {
    marginTop: 35,
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  userInfo: {
    fontSize: 14,
    color: '#7E7E7E',
    marginBottom: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  buttonsContainer: {
    marginTop: 20,
  },
  button: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonText: {
    fontSize: 24,
    color: '#7E7E7E',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default ProfileScreen;
