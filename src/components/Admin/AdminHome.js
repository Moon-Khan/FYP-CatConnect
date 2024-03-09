import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';


const AdminHome = () => {

  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to the App Admin</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.monitorbutton} onPress={() => navigation.navigate('MonitorUsers')}>
            <Text style={styles.buttonText}>Monitor Users Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.approvebutton} onPress={() => navigation.navigate('ApproveCatProfiles')}>
            <Text style={styles.buttonText}>Approve Cat/Doctor Profiles</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.announcementbutton} onPress={() => navigation.navigate('MakeAnnouncements')}>
            <Text style={styles.buttonText}>Make Announcements</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.supportbutton} onPress={() => navigation.navigate('SupportFeedback')}>
            <Text style={styles.buttonText}>Support and Feedback</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
    fontFamily: 'Poppins-SemiBold',
    color:'#212529'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  monitorbutton: {
    backgroundColor: '#47C1FF',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  approvebutton: {
    backgroundColor: '#47C1FF',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  announcementbutton: {
    backgroundColor: '#47C1FF',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  supportbutton: {
    backgroundColor: '#47C1FF',
    paddingVertical: 40,
    paddingHorizontal: 30,
    marginHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AdminHome;
