// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import { useNavigation } from '@react-navigation/native';
// import { fetchDoctorDataFromFirestore } from '../../Services/firebase';

// const DoctorHome = () => {
//     const [doctorProfile, setDoctorProfile] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const user = auth().currentUser;
//     const navigation = useNavigation();

//     const handleDoctorDetail = () => {
//         navigation.navigate('DoctorAppointment', { doctorId: user.uid });
//     };

//     useEffect(() => {
//         const fetchDoctorProfile = async () => {
//             try {
//                 if (user) {

//                     const doctorSnapshot = await fetchDoctorDataFromFirestore(user.uid)

//                     if (doctorSnapshot.exists) {
//                         const doctorData = doctorSnapshot.data();
//                         setDoctorProfile(doctorData);
//                     } else {
//                         console.log('Doctor data not found');
//                     }
//                 } else {
//                     console.log('Invalid navigation, doctorId not provided.');
//                 }

//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching doctor profile:', error);
//                 setLoading(false);
//             }
//         };

//         fetchDoctorProfile();
//     }, [user]);

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#2A2A72" />
//             </View>
//         );
//     }

//     if (!doctorProfile) {
//         return <Text>Doctor profile data not available.</Text>;
//     }

//     return (
//         // <ScrollView >
//         <View style={styles.container}>
//             <Image style={styles.doctorImage} source={require("../../../assets/Catassets/doctorPortrait.png")} />

//             <View style={styles.detailsContainer}>
//                 <Text style={styles.title}>{doctorProfile.username}</Text>
//                 <View style={styles.detailContainer}>
//                     <Text style={styles.label}></Text>
//                     <Text style={styles.specialvalue}>Specialization: {doctorProfile.specialization}</Text>
//                 </View>
//                 <View style={styles.detailContainer}>
//                     <Text style={styles.label}></Text>
//                     <Text style={styles.specialvalue}>Contact Info: {doctorProfile.contactNumber}</Text>
//                 </View>
//                 <View style={styles.detailContainer}>
//                     <Text style={styles.label}></Text>
//                     <Text style={styles.specialvalue}>City: {doctorProfile.city}</Text>
//                 </View>

//                 <TouchableOpacity style={styles.button} onPress={handleDoctorDetail}>
//                     <Text style={styles.buttonText}>View Appointments</Text>
//                 </TouchableOpacity>
//             </View>

//         </View>

//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     doctorImage: {
//         width: '70%', // Adjust the width as needed
//         height: '60%',   // Adjust the height as needed
//         borderRadius: 26, // Adjust the borderRadius as needed
//         marginTop: 10,
//         marginBottom: 16,
//         marginLeft: 50,
//     },

//     specialvalue: {
//         position: 'absolute',
//         color: '#fff',
//         fontFamily: 'Poppins-SemiBold',
//         fontSize: 18,
//     },
//     detailsContainer: {
//         marginTop: -50,
//         backgroundColor: '#47C1FF',
//         height: '60%',
//         borderTopRightRadius: 50,
//         borderTopLeftRadius: 50,
//         width: '100%',
//         borderWidth: 1,
//         borderColor: '#47C1FF',
//         paddingHorizontal: 20,
//     },
//     title: {
//         fontSize: 28,
//         marginBottom: 5,
//         marginTop: 15,
//         textAlign: 'center',
//         color: '#fff',
//         fontFamily: 'Poppins-ExtraBold',
//     },
//     detailContainer: {
//         flexDirection: 'row',
//         marginBottom: 8,
//         justifyContent: 'center',
//     },
//     label: {
//         fontFamily: 'Poppins-SemiBold',
//         fontSize: 16,
//         marginRight: 8,
//         color: '#fff',
//     },
//     button: {
//         backgroundColor: '#fff',
//         padding: 10,
//         borderRadius: 26,
//         marginTop: 15,
//         width: '70%',
//         alignItems: 'center',
//         alignSelf: 'center',
//     },
//     buttonText: {
//         fontSize: 18,
//         color: '#47C1FF',
//         fontFamily: 'Poppins-SemiBold',
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });

// export default DoctorHome;


// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         backgroundColor: '#fff',
// //     },
// //     icon: {
// //         width: 30,
// //         height: 30,
// //         position: 'absolute',
// //         top: 10,
// //         left: 10,
// //     },
// //     header: {
// //         height: 190,
// //         width: '100%',
// //         flexDirection: 'row',
// //         backgroundColor: '#47C1FF',  // Set a background color that contrasts with the icon and name
// //         elevation: 10,  // Increase the elevation to make it appear above the other components
// //         alignItems: 'center',
// //         justifyContent: 'center',
// //     },
// //     title: {
// //         fontSize: 35,
// //         fontWeight: 'bold',
// //         marginBottom: 16,
// //         marginTop: 25,
// //         textAlign: 'center',
// //         color: 'white',
// //     },
// //     profileContainer: {
// //         alignItems: 'center',
// //         padding: 20,
// //     },
// //     profileImageContainer: {
// //         marginBottom: 20,
// //         alignItems: 'center',
// //     },
// //     profileName: {
// //         fontSize: 24,
// //         fontWeight: '700',
// //         marginTop: 10,
// //         color: '#47C1FF',
// //     },
// //     profileSection: {
// //         marginBottom: 20,
// //         width: '100%',
// //     },
// //     sectionTitle: {
// //         fontSize: 18,
// //         fontWeight: '700',
// //         marginBottom: 10,
// //     },
// //     sectionContent: {
// //         fontSize: 16,
// //         textAlign: 'center',
// //         color: '#666',
// //     },
// //     button: {
// //         backgroundColor: '#47C1FF',
// //         padding: 5,
// //         borderRadius: 15,
// //         marginTop: 15,
// //         width: '100%',
// //     },
// //     buttonText: {
// //         fontSize: 18,
// //         color: '#ffff',
// //         textAlign: 'center',
// //         fontFamily: 'Poppins-Medium',
// //         fontWeight: 'bold',
// //     },
// //     loadingContainer: {
// //         flex: 1,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //     },
// // });

// // export default DoctorHome;



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
