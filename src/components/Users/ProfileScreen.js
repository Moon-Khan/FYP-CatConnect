// src/Components/Users/ProfileScreen.js

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

  const navigateToEditProfile = () => {
    navigation.navigate('UsersInfo');
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
      {/* <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View> */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>


      {userData && (
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoname}>{userData.firstname || ''}</Text>
          <Text style={styles.userInfo}>{userData.email}</Text>

          <TouchableOpacity style={styles.updatebutton} onPress={navigateToEditProfile}>
            <Text style={styles.updatebuttonText}>Update </Text>
          </TouchableOpacity>
          <Image source={require('../../../assets/Catassets/profile.png')} style={styles.profileIcon} />

        </View>
      )}

      <View style={styles.buttonsContainer}>


        <TouchableOpacity style={styles.button} onPress={navigateToCatBasicInfo}>
          <Text style={styles.buttonText}>Manage Cat Profiles</Text>
          <Image source={require('../../../assets/Catassets/manageProfile.png')} style={styles.manageProfileIcon} />

        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={navigateToSettings}>
          <Text style={styles.buttonText}>Settings</Text>
          <Image source={require('../../../assets/Catassets/settings.png')} style={styles.settingsIcon} />

        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={navigateToFeedback}>
          <Text style={styles.buttonText}>Feedback</Text>
          <Image source={require('../../../assets/Catassets/feedback.png')} style={styles.feedbackIcon} />

        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
          <Image source={require('../../../assets/Catassets/exit.png')} style={styles.exitIcon} />

        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  },
  // header: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },

  header: {
    backgroundColor: '#ffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1, // Increase shadow opacity to make it darker
    shadowRadius: 20, // Increase shadow radius for a more spread out shadow
    elevation: 30,
    marginBottom: 30,
  },

  headerText: {
    fontSize: 20,
    color: '#47C1FF',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },

  userInfoContainer: {
    paddingTop: 20,
    paddingHorizontal: 80,
    paddingVertical: 35,
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#ffff',
    marginBottom: 20,

  },

  profileIcon: {
    position: 'absolute',
    top: 25,
    left: 20,
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

  manageProfileIcon: {
    position: 'absolute',
    top: 12,
    left: 25,
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },

  settingsIcon: {
    position: 'absolute',
    top: 12,
    left: 25,
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },

  feedbackIcon: {
    position: 'absolute',
    top: 12,
    left: 25,
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },

  exitIcon: {
    position: 'absolute',
    top: 12,
    left: 25,
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },

  userInfo: {
    fontSize: 14,
    color: '#7E7E7E',
    fontFamily: 'Poppins-SemiBold',
  },
  userInfoname: {
    fontSize: 18,
    color: '#212529',
    fontFamily: 'Poppins-SemiBold',

  },
  buttonsContainer: {
    marginTop: 20,

  },
  button: {
    paddingHorizontal: 70,
    paddingVertical: 10,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: '#ffff',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#7E7E7E',
    fontFamily: 'Poppins-SemiBold',
  },
  updatebutton: {
    paddingRight: 10,
    position: 'absolute',
    right: 10,
    top: 30,

  },
  updatebuttonText: {
    fontSize: 20,
    color: '#47C1FF',
    fontFamily: 'Poppins-SemiBold',

  },

});

export default ProfileScreen;
