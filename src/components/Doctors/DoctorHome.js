

import React, { useEffect, useState } from 'react';
import { View, Text,TextInput,FlatList, ActivityIndicator, TouchableOpacity,StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';




import React, { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import HomeIcon from 'react-native-vector-icons/Feather';
import DoctorIcon from 'react-native-vector-icons/FontAwesome';
import ChatIcon from 'react-native-vector-icons/Ionicons';
import ProfileIcon from 'react-native-vector-icons/Feather';
import { fetchUserDataFromFirestore } from '../../Services/firebase';
import { fetchAllDoctorDataFromFirestore, fetchApproveDocotorProfile } from '../../Services/firebase';

const DoctorCard = ({ doctor, onPress }) => (
    <TouchableOpacity style={styles.doctorCard} onPress={onPress}>
        <View style={styles.doctorIconContainer}>
            <Image
                style={styles.thumbnailImage}
                resizeMode="cover"
                source={require("../../../assets/Catassets/doctoruser2.png")}
            />
        </View>
        <View style={styles.doctorInfoContainer}>
            <Text style={styles.doctorName}>{doctor._data.name}</Text>
            <Text style={styles.doctorSpecialty}>{doctor._data.specialization}</Text>
        </View>
    </TouchableOpacity>
);

const AppointmentHomeScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [loading, setLoading] = useState(true);


    const user = auth().currentUser;


    const navigation = useNavigation();

    const handleDoctorChat = () => {
        navigation.navigate('DoctorChatUsers', { doctorId: user.uid });
    };

    useEffect(() => {
        const fetchDoctors = async () => {
            try {

                const doctorsSnapshot = await fetchApproveDocotorProfile();
                console.log('doctorsSnapshot data', doctorsSnapshot);

                if (doctorsSnapshot && doctorsSnapshot.length > 0) {
                    // const doctorsData = doctorsSnapshot.map(doc => ({
                    //     id: doc.id,
                    //     ...doc.data()._data, // Accessing the data object within the doc
                    // }));

                    console.log('doctors data', doctorsSnapshot);

                    setDoctors(doctorsSnapshot);
                    setFilteredDoctors(doctorsSnapshot);
                    setLoading(false);
                } else {
                    setLoading(false);
                    console.log('No doctors found in Firestore.');
                }
            } catch (error) {
                console.error('Error fetching doctors data:', error);
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
            doctor={item} // Change 'doctors' to 'doctor'
            onPress={() => navigation.navigate('DoctorDetailScreen', { doctorData: item })}
            
        />

    );

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
      
        <View style={styles.container}>

            <View style={styles.header1}>

            </View>
            <View style={styles.header}>
                <Text style={styles.greeting}>Hello Doctors! </Text>
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
                data={filteredDoctors}
                renderItem={renderDoctorItem}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.bottomMenu}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
                    <HomeIcon name="home" size={24} color="#9F9F9F" />
                    <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SelectDoctor')}>
                    <DoctorIcon name="stethoscope" size={24} color="#47C1FF" />
                    <Text style={{ ...styles.menuText, color: '#47C1FF' }}>Doctor</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('chatScreen')}>
                    <ChatIcon name="chatbox-ellipses-outline" size={24} color="#9F9F9F" />
                    <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProfileScreen')}>
                    <ProfileIcon name="user" size={24} color="#9F9F9F" />
                    <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleDoctorChat}>
                    <Text style={styles.buttonText}>Doctor Chat</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
        fontSize: 20,

        fontFamily: 'Poppins-SemiBold',
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
        padding: 16,
        marginBottom: 12,
        height: 100,
    },
    doctorIconContainer: {
        marginRight: 16,
        backgroundColor: '#CAEDFF',
        padding: 10,
        borderRadius: 100,

    },
    thumbnailImage: {
        width: 30,
        height: 30,
        borderRadius: 5,
    },
    doctorInfoContainer: {
        flex: 1,
    },
    doctorName: {
        fontSize: 16,
        // position: 'absolute',
        fontFamily: 'Poppins-SemiBold',
        color: '#7E7E7E',
    },
    doctorSpecialty: {
        fontSize: 16,
        position: 'absolute',
        fontFamily: 'Poppins-SemiBold',
        // top: '2%',
        left: '40%',
        color: '#7E7E7E',
    },
    doctorAvailable: {
        // position: 'absolute',
        top: '6%',
        left: '-2%',
        fontSize: 14,
        color: '#7E7E7E',
        fontFamily: 'Poppins-SemiBold',

    },
    doctorTime: {
        position: 'absolute',
        top: '50%',
        fontFamily: 'Poppins-SemiBold',
        left: '40%',
        fontSize: 14,
        color: '#7E7E7E',
    },
    bottomMenu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        marginTop: 10,
    },

    menuItem: {
        alignItems: 'center',

    },
});


export default AppointmentHomeScreen;
