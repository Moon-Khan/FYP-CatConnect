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
        <Text style={styles.header}>Welcome Back</Text>
        <Text style={styles.Username}>ADMIN</Text>


        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.monitorbutton} onPress={() => navigation.navigate('MonitorUsers')}>
            <Image source={require('../../../assets/Catassets/monitor.png')} style={styles.monitor} />
            <Text style={styles.buttonText}>Monitor </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.approvebutton} onPress={() => navigation.navigate('ApproveProfile')}>
            <Image source={require('../../../assets/Catassets/approve.png')} style={styles.approve} />

            <Text style={styles.buttonText}>Profile Requests</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.announcementbutton} onPress={() => navigation.navigate('AllAnnouncements')}>
            <Image source={require('../../../assets/Catassets/anouncemenet.png')} style={styles.announcement} />

            <Text style={styles.buttonText}>Announcements</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.supportbutton} onPress={() => navigation.navigate('SupportFeedback')}>
            <Image source={require('../../../assets/Catassets/supportfeedback.png')} style={styles.support} />

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
    padding: 15,
  },
  header: {
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'Poppins-ExtraBoldItalic',
    color: '#7E7E7E'
  },

  Username: {
    fontSize: 30,
    marginBottom: 20,
    fontFamily: 'Poppins-Italic',
    color: '#212529'
  },

  monitor: {
    position: 'absolute',
    top: 10,
    left: 15,
    width: 50,
    height: 50,
  },
  approve: {
    position: 'absolute',
    top: 10,
    left: 15,
    width: 50,
    height: 50,
  },
  announcement: {
    position: 'absolute',
    top: 10,
    left: 15,
    width: 50,
    height: 50,
  },
  support: {
    position: 'absolute',
    top: 10,
    left: 15,
    width: 50,
    height: 50,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 10,
  },
  monitorbutton: {
    backgroundColor: '#97cc5f',
    paddingVertical: 65,
    borderRadius: 20,
    alignItems: 'center',
    width: '50%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.255,
    shadowRadius: 4.84,
    elevation: 5,
  },
  approvebutton: {
    backgroundColor: '#ea5262',
    paddingVertical: 65,
    borderRadius: 20,
    marginLeft: 10,
    alignItems: 'center',
    width: '50%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.255,
    shadowRadius: 4.84,
    elevation: 5,
    elevation: 5,
  },
  announcementbutton: {
    backgroundColor: '#fdca51',
    marginTop: 10,
    paddingVertical: 65,
    borderRadius: 20,
    alignItems: 'center',
    width: '50%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.255,
    shadowRadius: 4.84,
    elevation: 5,
    elevation: 5,
  },
  supportbutton: {
    backgroundColor: '#5998e8',
    marginTop: 10,
    paddingVertical: 65,
    borderRadius: 20,
    marginLeft: 10,

    alignItems: 'center',
    width: '50%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.255,
    shadowRadius: 4.84,
    elevation: 5,
  },
  buttonText: {
    position:'absolute',
    bottom: 20,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AdminHome;
