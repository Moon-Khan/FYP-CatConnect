// // ManageCatProfiles.js
// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
// import { fetchCatProfilesForUser, deleteCatProfile } from '../../Services/firebase';
// import auth from '@react-native-firebase/auth';
// import { useNavigation } from '@react-navigation/native';

// const ManageCatProfiles = () => {
//     const [catProfiles, setCatProfiles] = useState([]);
//     const user = auth().currentUser;
//     const navigation = useNavigation();

//     useEffect(() => {
//         const fetchCatProfiles = async () => {
//             try {
//                 if (user && user.uid) {
//                     const profiles = await fetchCatProfilesForUser(user.uid);
//                     setCatProfiles(profiles);
//                 }
//             } catch (error) {
//                 console.error('Error fetching cat profiles:', error);
//             }
//         };

//         fetchCatProfiles();
//     }, [user]);

//     const handleAddProfile = () => {
//         navigation.navigate('CatBasicInfo');
//     };

//     const handleDelete = async (profileId) => {
//         try {
//             console.log('profileId: ',profileId)
//             await deleteCatProfile(profileId); // Assuming deleteCatProfile accepts profile ID
//             // Update the state to reflect the deleted profile
//             setCatProfiles(catProfiles.filter(profile => profile.id !== profileId));
//         } catch (error) {
//             console.error('Error deleting cat profile:', error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <ScrollView contentContainerStyle={styles.scrollContainer}>
//                 <View style={styles.header}>
//                     <Text style={styles.headerText}>Manage Cat Profile</Text>
//                 </View>
//                 <View style={styles.cardContainer}>
//                     {catProfiles.map((catProfile, index) => (
//                         <View style={styles.card} key={index}>
//                             <View style={styles.imageContainer}>
//                                 {catProfile.mediaUpload?.mediaList?.[0] ? (
//                                     <Image
//                                         style={styles.thumbnailImage}
//                                         source={{ uri: catProfile.mediaUpload.mediaList[0] }}
//                                     />
//                                 ) : (
//                                     <Text>No cat profile picture available</Text>
//                                 )}

//                                 <TouchableOpacity onPress={() => handleDelete(getDoc(catProfile))}>
//                                     <Text style={styles.delbutton}>Delete</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity onPress={() => {/* Implement edit functionality */ }}>
//                                     <Text style={styles.editbutton}>Edit</Text>
//                                 </TouchableOpacity>
//                             </View>
//                             <Text style={styles.breedName}>{catProfile.basicInfo.breed}</Text>
//                         </View>
//                     ))}
//                 </View>
//             </ScrollView>
//             <TouchableOpacity onPress={handleAddProfile} style={styles.addButton}>
//                 <Text style={styles.addButtonText}>Add Cat Profile</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };
// const handleDelete = async (catProfileId) => {
//     console.log('catprofiles:', catProfiles)
//     console.log('catid:', catProfileId)

//     Alert.alert(
//         'Delete Cat Profile',
//         'Are you sure you want to delete this cat profile?',
//         [
//             {
//                 text: 'Cancel',
//                 onPress: () => console.log('Cancel Pressed'),
//                 style: 'cancel',
//             },
//             {    
//                 text: 'Delete',
//                 onPress: async () => {
//                     try {
//                         await deleteCatProfile(user.uid, catProfileId);
//                         // After deleting, update the state to remove the deleted profile
//                         setCatProfiles(catProfiles.filter(profile => profile.id !== catProfileId));
//                     } catch (error) {
//                         console.error('Error deleting cat profile:', error);
//                         Alert.alert('Error', 'Failed to delete cat profile');
//                     }
//                 },
//                 style: 'destructive',
//             },
//         ],
//         { cancelable: false }
//     );
// };

//     const handleDelete = async () => {

//     };


//     return (
//         <View style={styles.container}>
//             <ScrollView contentContainerStyle={styles.scrollContainer}>
//                 <View style={styles.header}>
//                     <Text style={styles.headerText}>Manage Cat Profile</Text>
//                 </View>
//                 <View style={styles.cardContainer}>
//                     {catProfiles.map((catProfile, index) => (
//                         <View style={styles.card} key={index}>
//                             <View style={styles.imageContainer}>
//                                 {catProfile.mediaUpload?.mediaList?.[0] ? (
//                                     <Image
//                                         style={styles.thumbnailImage}
//                                         source={{ uri: catProfile.mediaUpload.mediaList[0] }}
//                                     />
//                                 ) : (
//                                     <Text>No cat profile picture available</Text>
//                                 )}

//                                 <TouchableOpacity onPress={() => handleDelete()}>
//                                     <Text style={styles.delbutton}>Delete</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity onPress={() => {/* Implement edit functionality */ }}>
//                                     <Text style={styles.editbutton}>Edit</Text>
//                                 </TouchableOpacity>
//                             </View>
//                             <Text style={styles.breedName}>{catProfile.basicInfo.breed}</Text>
//                         </View>
//                     ))}
//                 </View>
//             </ScrollView>
//             <TouchableOpacity onPress={handleAddProfile} style={styles.addButton}>
//                 <Text style={styles.addButtonText}>Add Cat Profile</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// // // ManageCatProfiles.js
// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
// import { fetchCatProfilesForUser, deleteCatProfile } from '../../Services/firebase';
// import auth from '@react-native-firebase/auth';
// import { useNavigation } from '@react-navigation/native';

// const CatProfileCard = ({ catProfile, onDelete, onEdit }) => {
//     console.log(catProfile.uid)
//     return (    
//         <View style={styles.card}>
//             <View style={styles.imageContainer}>
//                 {catProfile.mediaUpload?.mediaList?.[0] ? (
//                     <Image
//                         style={styles.thumbnailImage}
//                         source={{ uri: catProfile.mediaUpload.mediaList[0] }}
//                     />
//                 ) : (
//                     <Text>No cat profile picture available</Text>
//                 )}

//                 <TouchableOpacity onPress={() => onDelete(catProfile.id)}>
//                     <Text style={styles.delbutton}>Delete</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => onEdit(catProfile.id)}>
//                     <Text style={styles.editbutton}>Edit</Text>
//                 </TouchableOpacity>
//             </View>
//             <Text style={styles.breedName}>{catProfile.basicInfo.breed}</Text>
//         </View>
//     );
// };

// const ManageCatProfiles = () => {
//     const [catProfiles, setCatProfiles] = useState([]);
//     const user = auth().currentUser;
//     const navigation = useNavigation();

//     useEffect(() => {
//         const fetchCatProfiles = async () => {
//             try {
//                 if (user && user.uid) {
//                     const profiles = await fetchCatProfilesForUser(user.uid);
//                     setCatProfiles(profiles);
//                 }
//             } catch (error) {
//                 console.error('Error fetching cat profiles:', error);
//             }
//         };

//         fetchCatProfiles();
//     }, [user]);

//     const handleAddProfile = () => {
//         navigation.navigate('CatBasicInfo');
//     };

//     const handleDelete = async (profileId) => {
//         try {

//             await deleteCatProfile(profileId, user.uid);
//             // setCatProfiles(catProfiles.filter(profile => profile.id !== profileId));
//         } catch (error) {
//             console.error('Error deleting cat profile:', error);
//         }
//     };

//     const handleEdit = (profileId) => {
//         // Navigate to CatEditProfile with profileId
//         navigation.navigate('CatEditProfile', { profileId });
//     };

//     return (
//         <View style={styles.container}>
//             <ScrollView contentContainerStyle={styles.scrollContainer}>
//                 <View style={styles.header}>
//                     <Text style={styles.headerText}>Manage Cat Profile</Text>
//                 </View>
//                 <View style={styles.cardContainer}>
//                     {catProfiles.map((catProfile, index) => (
//                         <CatProfileCard
//                             key={index}
//                             catProfile={catProfile}
//                             onDelete={handleDelete}
//                             onEdit={handleEdit}
//                         />
//                     ))}
//                 </View>
//             </ScrollView>
//             <TouchableOpacity onPress={handleAddProfile} style={styles.addButton}>
//                 <Text style={styles.addButtonText}>Add Cat Profile</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'white',
//     },
//     scrollContainer: {
//         flexGrow: 1,
//     },
//     header: {
//         backgroundColor: '#ffff',
//         borderBottomLeftRadius: 20,
//         borderBottomRightRadius: 20,
//         paddingHorizontal: 20,
//         paddingVertical: 35,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 5,
//         },
//         shadowOpacity: 1,
//         shadowRadius: 20,
//         elevation: 30,
//         marginBottom: 30,
//     },
//     headerText: {
//         fontSize: 20,
//         color: '#47C1FF',
//         textAlign: 'center',
//         fontFamily: 'Poppins-SemiBold',
//     },
//     cardContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//         paddingHorizontal: 10,
//     },
//     card: {
//         width: '48%',
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 10,
//         marginBottom: 10,
//     },
//     imageContainer: {
//         alignItems: 'center',
//         position: 'relative',
//     },
//     thumbnailImage: {
//         marginTop: 10,
//         width: '100%',
//         height: 130,
//         borderRadius: 10,
//     },
//     breedName: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         textAlign: 'left',
//         marginTop: 10,
//         marginLeft: 10,
//         paddingBottom: 10,
//         fontFamily: 'Poppins-SemiBold',
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '100%',
//         paddingHorizontal: 10,
//         position: 'absolute',
//         bottom: 0,
//     },
//     delbutton: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         color: 'red',
//         paddingHorizontal: 10,

//     },
//     editbutton: {
//         // backgroundColor: 'white',
//         // padding: 5,
//         // borderRadius: 5,
//         // borderWidth: 1,
//         // borderColor: '#47C1FF',
//         // color: '#47C1FF',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         color: '#47C1FF',
//         paddingHorizontal: 10,
//     },
//     addButton: {
//         backgroundColor: '#47C1FF',
//         paddingVertical: 15,
//         width: '50%',
//         alignItems: 'center',
//         justifyContent: 'center',
//         alignSelf: 'center',
//         borderRadius: 10,
//         marginTop: 20,
//         marginBottom: 20,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//     },
//     addButtonText: {
//         color: 'white',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
// });

// export default ManageCatProfiles;


// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
// import { fetchCatProfilesForUser, deleteCatProfile } from '../../Services/firebase';
// import auth from '@react-native-firebase/auth';
// import { useNavigation } from '@react-navigation/native';


// const CatProfileCard = ({ appointment, onAccept, onReject }) => {
//   const { userName, status, timeSlot, day } = appointment;
//   const startTime = new Date(timeSlot.startTime.toDate());
//   const endTime = new Date(timeSlot.endTime.toDate());

//   const formattedStartTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   const formattedEndTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//   return (
//     <View style={styles.appointmentCard}>
//       <Text style={styles.userName}>User: {userName}</Text>
//       <Text style={styles.status}>Status: {status}</Text>
//       <Text style={styles.status}>Day: {day}</Text>
//       <Text style={styles.status}>Time slot: {formattedStartTime} - {formattedEndTime}</Text>

//       <TouchableOpacity style={styles.actionButton} onPress={() => onAccept(appointment.id)}>
//         <Text style={styles.actionButtonText}>Accept ✅</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.actionButton} onPress={() => onReject(appointment.id)}>
//         <Text style={styles.actionButtonText}>Reject ❌</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };


// const DoctorAppointmentsList = ({ route }) => {
//   const [appointments, setAppointments] = useState([]);
//   const navigation = useNavigation();

//   const { doctorId } = route.params;


//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const appointmentsSnapshot = await fetchAppointmentsCondFromFirestore(doctorId);

//         const appointmentsData = appointmentsSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         setAppointments(appointmentsData);
//       } catch (error) {
//         console.error('Error fetching appointments:', error);
//       }
//     };

//     fetchAppointments();
//   }, [doctorId]);

//   const handleAccept = async (appointmentId) => {
//     try {
//       await updateAppointmentsFromFirestore(appointmentId, 'Accepted')

//       const appointmentSnapshot = await fetchAppointmentsFromFirestore(appointmentId);
//       const userId = appointmentSnapshot.data().userId;
//       const userSnapshot = await fetchUserDataFromFirestore(userId);
//       const userToken = userSnapshot.data().fcmToken;

//       const doctorName = doctorId.username;
//       const day = appointmentSnapshot.data().day;
//       const startTime = appointmentSnapshot.data().timeSlot.startTime.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//       const endTime = appointmentSnapshot.data().timeSlot.endTime.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//       const message = `Appointment accepted with ${doctorName} on ${day} at ${startTime} - ${endTime}.`;

//       await addNotificationToFirestore(userId, message, 'unread');

//       await sendPushNotification(userToken, 'Appointment Accepted', message);
//       navigation.navigate('DoctorHomeScreen');
//     } catch (error) {
//       console.error('Error accepting appointment:', error);
//     }
//   };

//   const handleReject = async (appointmentId) => {
//     try {
//       await updateAppointmentsFromFirestore(appointmentId, 'Rejected')

//       // Fetch user's FCM token from Firestore
//       const appointmentSnapshot = await fetchAppointmentsFromFirestore(appointmentId);
//       const userId = appointmentSnapshot.data().userId;

//       const doctorName = appointmentSnapshot.data().doctorName;
//       const day = appointmentSnapshot.data().day;

//       const message = `Appointment rejected with ${doctorName} for this ${day}.`;

//       const userSnapshot = await fetchUserDataFromFirestore(userId);
//       const userToken = userSnapshot.data().fcmToken;
//       await addNotificationToFirestore(userId, message, 'unread');

//       // Send a push notification to the user
//       await sendPushNotification(userToken, 'Appointment Rejected', message);
//       navigation.navigate('DoctorHomeScreen')
//     } catch (error) {
//       console.error('Error rejecting appointment:', error);
//     }
//   };
//   const sendPushNotification = async (userToken, title, message) => {
//     try {
//       await messaging().sendMessage({
//         data: {
//           title,
//           body: message,
//         },
//         token: userToken,
//       });
//     } catch (error) {
//       console.error('Error sending push notification:', error);
//     }
//   };


//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <View style={styles.container}>
//         {appointments.length > 0 ? (
//           // Render appointments if there are any
//           appointments.map((appointment) => (
//             <CatProfileCard
//               key={appointment.id}
//               appointment={appointment}
//               onAccept={handleAccept}
//               onReject={handleReject}
//             />
//           ))
//         ) : (
//           // Render a message when there are no appointments
//           <Text style={styles.noAppointmentsText}>No appointments available today.</Text>
//         )}
//       </View>
//     </ScrollView>

//   );

// };




// ManageCatProfiles.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { fetchCatProfilesForUser, deleteCatProfile } from '../../Services/firebase';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const CatProfileCard = ({ catProfile, onDelete, onEdit }) => {
    console.log(catProfile.id)
    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                {catProfile.mediaUpload?.mediaList?.[0] ? (
                    <Image
                        style={styles.thumbnailImage}
                        source={{ uri: catProfile.mediaUpload.mediaList[0] }}
                    />
                ) : (
                    <Text>No cat profile picture available</Text>
                )}

                <TouchableOpacity onPress={() => onDelete(catProfile.id)}>
                    <Text style={styles.delbutton}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onEdit(catProfile.id)}>
                    <Text style={styles.editbutton}>Edit</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.breedName}>{catProfile.basicInfo.breed}</Text>
        </View>
    );
};

const ManageCatProfiles = () => {
    const [catProfiles, setCatProfiles] = useState([]);
    const user = auth().currentUser;
    const navigation = useNavigation();

    useEffect(() => {
        const fetchCatProfiles = async () => {
            try {
                if (user && user.uid) {
                    const profiles = await fetchCatProfilesForUser(user.uid);
                    if (profiles) {
                        const profilesData = profiles.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        setCatProfiles(profilesData);
                    }
                }
            } catch (error) {
                console.error('Error fetching cat profiles:', error);
            }
        };

        fetchCatProfiles();
    }, [user]);

    const handleAddProfile = () => {
        navigation.navigate('CatBasicInfo');
    };

    const handleDelete = (profileId) => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this cat profile?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await deleteCatProfile(profileId, user.uid);
                            setCatProfiles(catProfiles.filter(profile => profile.id !== profileId));
                        } catch (error) {
                            console.error('Error deleting cat profile:', error);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };
    
    const handleEdit = (profileId) => {
        const catProfile = catProfiles.find(profile => profile.id === profileId);
        console.log('catProfile found:', catProfile);
        navigation.navigate('CatEditProfiles', { catProfile });
    };


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Manage Cat Profile</Text>
                </View>
                <View style={styles.cardContainer}>
                    {catProfiles.map((catProfile) => (
                        <CatProfileCard
                            key={catProfile.id}
                            catProfile={catProfile}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity onPress={handleAddProfile} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add Cat Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContainer: {
        flexGrow: 1,
    },
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
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 30,
        marginBottom: 30,
    },
    headerText: {
        fontSize: 20,
        color: '#47C1FF',
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    card: {
        width: '48%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 10,
    },
    imageContainer: {
        alignItems: 'center',
        position: 'relative',
    },
    thumbnailImage: {
        marginTop: 10,
        width: '100%',
        height: 130,
        borderRadius: 10,
    },
    breedName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 10,
        marginLeft: 10,
        paddingBottom: 10,
        fontFamily: 'Poppins-SemiBold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 0,
    },
    delbutton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: 'red',
        paddingHorizontal: 10,

    },
    editbutton: {
        // backgroundColor: 'white',
        // padding: 5,
        // borderRadius: 5,
        // borderWidth: 1,
        // borderColor: '#47C1FF',
        // color: '#47C1FF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: '#47C1FF',
        paddingHorizontal: 10,
    },
    addButton: {
        backgroundColor: '#47C1FF',
        paddingVertical: 15,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ManageCatProfiles;


// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
// import { fetchCatProfilesForUser, deleteCatProfile } from '../../Services/firebase'; // Assuming your firebase.js file is in the same directory
// import auth from '@react-native-firebase/auth';
// const user = auth().currentUser;

// const CatProfileCard = ({ catProfile, onDelete }) => {
//   const { catName, breed, mediaUpload } = catProfile;
//   console.log('catProfileid: ',catProfile.id)

//   return (
//     <View style={styles.catProfileCard}>
//       <Image source={{ uri: mediaUpload.mediaList[0] }} style={styles.catImage} />
//       <Text style={styles.catName}>{catName}</Text>
//       <Text style={styles.breed}>{breed}</Text>
//       <TouchableOpacity style={styles.editButton}>
//         <Text style={styles.buttonText}>Edit</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(catProfile.id)}>
//         <Text style={styles.buttonText}>Delete</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const ManageCatProfiles = () => {
//   const [catProfiles, setCatProfiles] = useState([]);

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       try {
//         const profiles = await fetchCatProfilesForUser(user.uid);
//         setCatProfiles(profiles);
//       } catch (error) {
//         console.error('Error fetching cat profiles:', error);
//       }
//     };
//     fetchProfiles();
//   }, [user.uid]);

//   const handleDelete = async (catProfileId) => {
//     try {
//       await deleteCatProfile(catProfileId, user.uid);
//       setCatProfiles(catProfiles.filter(profile => profile.id !== catProfileId));
//     } catch (error) {
//       console.error('Error deleting cat profile:', error);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {catProfiles.map(catProfile,index => (
//         <CatProfileCard key={index} catProfile={catProfile} onDelete={handleDelete} />
//       ))}
//     </ScrollView>
//   );
// };

// const styles = {
//   container: {
//     flexGrow: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   catProfileCard: {
//     margin: 10,
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     elevation: 3,
//   },
//   catImage: {
//     width: 200,
//     height: 200,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   catName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   breed: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   editButton: {
//     backgroundColor: '#2196F3',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 5,
//   },
//   deleteButton: {
//     backgroundColor: '#FF6347',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//   },
// };

// export default ManageCatProfiles;
