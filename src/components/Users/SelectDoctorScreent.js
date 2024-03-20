import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import { fetchUserDataFromFirestore } from '../../Services/firebase';
import { fetchApproveDocotorProfile } from '../../Services/firebase';
const DoctorCard = ({ doctor, onPress }) => {
  console.log('doctor------------->', doctor);

  if (!doctor || !doctor._data || !doctor._data.availability) {
    return null; // Return null if the doctor data or availability is not available
  }

  const { name, specialization, experience, availability } = doctor._data;

  // Filter out the available days with time slots
  const availableDays = Object.keys(availability).filter(day => availability[day].length > 0);

  return (
    <TouchableOpacity style={styles.doctorCard} onPress={onPress}>
      <View style={styles.doctorIconContainer}>
        <Image
          style={styles.thumbnailImage}
          resizeMode="cover"
          source={require("../../../assets/Catassets/doctoruser2.png")}
        />
      </View>
      <View style={styles.doctorInfoContainer}>
        <Text style={styles.doctorName}>Dr. {name}</Text>

        <Text style={styles.doctorDetail}>{specialization} | {experience} yrs. of experience</Text>

        <Text style={styles.doctorAvailable}>Available Days:  {availableDays.map((day, index) => (
          <Text key={index}>{day}</Text>
        ))}</Text>
  
      </View>
    </TouchableOpacity>
  );
};


const AppointmentHomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});


  const user = auth().currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await fetchUserDataFromFirestore(user.uid);
        if (userDoc.exists) {
          setUserData(userDoc.data());
        } else {
          console.log('User document does not exist in Firestore.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {

        const doctorsSnapshot = await fetchApproveDocotorProfile();

        console.log('doctorsData-->', doctorsSnapshot)
        // console.log('doctorsData availabiluty-->' ,doctorsSnapshot._data.availability)

        setDoctors(doctorsSnapshot);
        setFilteredDoctors(doctorsSnapshot);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = doctors.filter((doctor) =>
      doctor.username.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDoctors(filtered);
  };

  const renderDoctorItem = ({ item }) => (
    <DoctorCard
      doctor={item}
      onPress={() => navigation.navigate('DoctorDetailScreen', { doctorData: item })}
    // onPress={() => console.log('item--->', item)}

    />
  );

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>

      <View style={styles.header1}>
        <Text style={styles.greeting}>Hi {userData.firstname || ''} 👋</Text>

      </View>
      <View style={styles.header}>
        <Text style={styles.greeting2}>Let's find your doctor </Text>
      </View>
      <View style={styles.searchInputContainer}>
        <Image
          style={styles.searchIcon}
          resizeMode="cover"
          source={require("../../../assets/Catassets/search.png")}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Doctors"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={doctors}
        renderItem={renderDoctorItem}
        keyExtractor={(item) => item?.id || ''}
      />

      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
          <Image source={require('../../../assets/Catassets/home-1.png')} style={{ width: 24, height: 24 }} />

          <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SelectDoctor')}>
          <Image source={require('../../../assets/Catassets/maki_doctor2.png')} style={{ width: 24, height: 27 }} />

          <Text style={{ ...styles.menuText, color: '#47C1FF' }}>Doctor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('chatScreen')}>
          <Image source={require('../../../assets/Catassets/chat.png')} style={{ width: 24, height: 24 }} />

          <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProfileScreen')}>
          <Image source={require('../../../assets/Catassets/profilehome.png')} style={{ width: 24, height: 27 }} />

          <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F5F5F5'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  greeting: {
    paddingTop: 15,
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#212529',
    flex: 1,
    flexDirection: 'row',
  },
  greeting2: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#212529',
    flex: 1,
    flexDirection: 'row',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#fff',
    backgroundColor: '#fff',
    width: '100%',
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    marginBottom: 16,
    marginTop: 16,
  },
  searchIcon: {
    marginLeft: 10,
    width: 25,
    height: 25,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Poppins-Regular',
    color: '#212529',
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#fff',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 16,
    elevation: 2,
    marginBottom: 12,
    height: 110,
  },
  doctorIconContainer: {
    position: 'absolute',
    top: 20,
    marginLeft: 20,
    backgroundColor: '#CAEDFF',
    borderRadius: 100,
    padding: 10,

  },
  thumbnailImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  doctorInfoContainer: {
    position: 'absolute',
    top: '10%',
    marginLeft: 100,
    flex: 1,
  },
  doctorName: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#7E7E7E',
  },
  doctorDetail: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#7E7E7E',
  },
  doctorAvailable: {
    fontSize: 14,
    color: '#7E7E7E',
    fontFamily: 'Poppins-SemiBold',
  },
  bottomMenu: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    marginTop: 1,
  },
});

export default AppointmentHomeScreen;
