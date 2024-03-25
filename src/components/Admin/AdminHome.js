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
import auth from '@react-native-firebase/auth';
import { fetchUserDataFromFirestore } from '../../Services/firebase';


const AdminHome = () => {

  const navigation = useNavigation();
  const user = auth().currentUser;
  const [userData, setUserData] = useState({});


  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Fetch user data
        const userDoc = await fetchUserDataFromFirestore(user.uid);

        if (userDoc.exists) {
          console.log('userDoc.data())------------->', userDoc.data())
          setUserData(userDoc.data());
        } else {
          console.log('User document does not exist in Firestore(home screen).');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    checkAuthentication();
  }, [user, navigation]);


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.menuContainer}>

          <Text style={styles.greeting}>Welcome Back</Text>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AdminProfile')}>
            <Image source={require('../../../assets/Catassets/profilehome.png')} style={{ width: 30, height: 30, marginTop:15, marginLeft:10}} />
            <Text style={{color: '#9F9F9F', fontFamily: 'Poppins-SemiBold', fontSize: 12, marginLeft: 5}}>Profile</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.greeting2}>{userData.firstname || ''} 👋</Text>

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
          <TouchableOpacity style={styles.supportbutton} onPress={() => navigation.navigate('viewfeedbackAdmin')}>
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
    paddingLeft: 15,
    paddingRight:15,
  },
  greeting: {
    paddingTop: 35,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#212529',
  
  },
  greeting2: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#212529',
    flex: 1,
    marginBottom:30,
  },
  menuContainer: {
    flexDirection: 'row',
  },

  menuItem: {
    marginLeft: 200,
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
    position: 'absolute',
    bottom: 20,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AdminHome;
