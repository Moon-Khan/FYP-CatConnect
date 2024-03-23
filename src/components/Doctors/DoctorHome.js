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





//---------------------------------------------------------------------------

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { fetchDoctorDataFromFirestore } from '../../Services/firebase';

const DoctorHome = () => {
    const [doctorProfile, setDoctorProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = auth().currentUser;
    const navigation = useNavigation();

    const handleDoctorDetail = () => {
        navigation.navigate('DoctorAppointment', { doctorId: user.uid });
    };

    const handleDoctorChat = () => {
        navigation.navigate('DoctorChatUsers', { doctorId: user.uid });
    };

    useEffect(() => {
        const fetchDoctorProfile = async () => {
            try {
                if (user) {
                    const doctorSnapshot = await fetchDoctorDataFromFirestore(user.uid)

                    if (doctorSnapshot.exists) {
                        const doctorData = doctorSnapshot.data();
                        setDoctorProfile(doctorData);
                    } else {
                        console.log('Doctor data not found');
                    }
                } else {
                    console.log('Invalid navigation, doctorId not provided.');
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching doctor profile:', error);
                setLoading(false);
            }
        };

        fetchDoctorProfile();
    }, [user]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2A2A72" />
            </View>
        );
    }

    if (!doctorProfile) {
        return <Text>Doctor profile data not available.</Text>;
    }

    return (
        <View style={styles.container}>
            <Image style={styles.doctorImage} source={require("../../../assets/Catassets/doctorPortrait.png")} />

            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{doctorProfile.username}</Text>
                <View style={styles.detailContainer}>
                    <Text style={styles.label}></Text>
                    <Text style={styles.specialvalue}>Specialization: {doctorProfile.specialization}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.label}></Text>
                    <Text style={styles.specialvalue}>Contact Info: {doctorProfile.contactNumber}</Text>
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.label}></Text>
                    <Text style={styles.specialvalue}>City: {doctorProfile.city}</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleDoctorDetail}>
                    <Text style={styles.buttonText}>View Appointments</Text>
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
        backgroundColor: '#fff',
    },
    doctorImage: {
        width: '70%',
        height: '60%',
        borderRadius: 26,
        marginTop: 10,
        marginBottom: 16,
        marginLeft: 50,
    },
    specialvalue: {
        position: 'absolute',
        color: '#fff',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
    },
    detailsContainer: {
        marginTop: -50,
        backgroundColor: '#47C1FF',
        height: '60%',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: '#47C1FF',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        marginBottom: 5,
        marginTop: 15,
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Poppins-ExtraBold',
    },
    detailContainer: {
        flexDirection: 'row',
        marginBottom: 8,
        justifyContent: 'center',
    },
    label: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        marginRight: 8,
        color: '#fff',
    },
    button: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 26,
        marginTop: 15,
        width: '70%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#47C1FF',
        fontFamily: 'Poppins-SemiBold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DoctorHome;





















//---------------------------------------------------------------------------------------------------

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     icon: {
//         width: 30,
//         height: 30,
//         position: 'absolute',
//         top: 10,
//         left: 10,
//     },
//     header: {
//         height: 190,
//         width: '100%',
//         flexDirection: 'row',
//         backgroundColor: '#47C1FF',  // Set a background color that contrasts with the icon and name
//         elevation: 10,  // Increase the elevation to make it appear above the other components
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     title: {
//         fontSize: 35,
//         fontWeight: 'bold',
//         marginBottom: 16,
//         marginTop: 25,
//         textAlign: 'center',
//         color: 'white',
//     },
//     profileContainer: {
//         alignItems: 'center',
//         padding: 20,
//     },
//     profileImageContainer: {
//         marginBottom: 20,
//         alignItems: 'center',
//     },
//     profileName: {
//         fontSize: 24,
//         fontWeight: '700',
//         marginTop: 10,
//         color: '#47C1FF',
//     },
//     profileSection: {
//         marginBottom: 20,
//         width: '100%',
//     },
//     sectionTitle: {
//         fontSize: 18,
//         fontWeight: '700',
//         marginBottom: 10,
//     },
//     sectionContent: {
//         fontSize: 16,
//         textAlign: 'center',
//         color: '#666',
//     },
//     button: {
//         backgroundColor: '#47C1FF',
//         padding: 5,
//         borderRadius: 15,
//         marginTop: 15,
//         width: '100%',
//     },
//     buttonText: {
//         fontSize: 18,
//         color: '#ffff',
//         textAlign: 'center',
//         fontFamily: 'Poppins-Medium',
//         fontWeight: 'bold',
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });

// export default DoctorHome;
