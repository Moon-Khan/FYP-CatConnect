// src/Components/Users/ProfileScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'; // Import Alert
import { CommonActions } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { fetchUserDataFromFirestore, deleteUserProfile } from '../../Services/firebase';

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


  const navigateToCatManageProfile = () => {
    navigation.navigate('ManageCatProfiles');
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };

  const navigateToFeedback = () => {
    navigation.navigate('feedbackscreen');
  };
  const handleDeleteProfile = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete your profile?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteUserProfile(user.uid);
              navigation.navigate('Signup')
            } catch (error) {
              console.error('Error deleting user profile:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  }


  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
          <Image source={require("../../../assets/Catassets/backbtn.png")} style={styles.bactbtn} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
      </View>


      {userData && (
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoname}>{userData.firstname || ''}</Text>
          <Text style={styles.userInfo}>{userData.email}</Text>

          <TouchableOpacity style={styles.updatebutton} onPress={navigateToEditProfile}>
            <Text style={styles.updatebuttonText}>Update </Text>
          </TouchableOpacity>
          <Image source={require("../../../assets/Catassets/doctoruser2.png")}
            style={styles.profileIcon} />

        </View>
      )}

      <View style={styles.buttonsContainer}>


        <TouchableOpacity style={styles.button} onPress={navigateToCatManageProfile}>
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

        <TouchableOpacity style={styles.delbutton} onPress={handleDeleteProfile}>
          <Text style={styles.delbuttonText}>Delete Profile</Text>
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

  userInfoContainer: {
    paddingTop: 20,
    paddingHorizontal: 80,
    paddingVertical: 25,
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#ffff',
    marginBottom: 10,

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
    fontSize: 12,
    color: '#7E7E7E',
    fontFamily: 'Poppins-SemiBold',
  },
  userInfoname: {
    fontSize: 14,
    color: '#212529',
    fontFamily: 'Poppins-Bold',

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
    fontSize: 14,
    color: '#212529',
    fontFamily: 'Poppins-Bold',
  },
  delbutton: {
    paddingVertical: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    marginTop: 40,
    width: '90%',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  delbuttonText: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',

  },
  updatebutton: {
    paddingRight: 10,
    position: 'absolute',
    right: 10,
    top: 30,

  },
  updatebuttonText: {
    fontSize: 14,
    color: '#47C1FF',
    fontFamily: 'Poppins-Bold',

  },

});

export default ProfileScreen;
