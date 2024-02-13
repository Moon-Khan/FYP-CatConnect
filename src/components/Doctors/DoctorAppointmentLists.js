
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import { fetchAppointmentsFromFirestore } from '../../Services/firebase';
import { updateAppointmentsFromFirestore } from '../../Services/firebase';
import { fetchUserDataFromFirestore } from '../../Services/firebase';
import { fetchAppointmentsCondFromFirestore } from '../../Services/firebase';
import {addNotificationToFirestore} from '../../Services/firebase';

const AppointmentCard = ({ appointment, onAccept, onReject }) => (
  <View style={styles.appointmentCard}>
    <Text style={styles.userName}>User: {appointment.userName}</Text>
    <Text style={styles.status}>Status: {appointment.status}</Text>
    <TouchableOpacity style={styles.actionButton} onPress={() => onAccept(appointment.id)}>
      <Text style={styles.actionButtonText}>Accept ✅</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.actionButton} onPress={() => onReject(appointment.id)}>
      <Text style={styles.actionButtonText}>Reject ❌</Text>
    </TouchableOpacity>
  </View>
);

const DoctorAppointmentsList = ({ route }) => {
  const [appointments, setAppointments] = useState([]);
  const navigation = useNavigation();

  const { doctorId } = route.params;


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentsSnapshot = await fetchAppointmentsCondFromFirestore(doctorId);
       
        const appointmentsData = appointmentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const handleAccept = async (appointmentId) => {
    try {

      await updateAppointmentsFromFirestore(appointmentId, 'Accepted')

      // Fetch user's FCM token from Firestore
      const appointmentSnapshot = await fetchAppointmentsFromFirestore(appointmentId);
      const userId = appointmentSnapshot.data().userId;

      const userSnapshot = await fetchUserDataFromFirestore(userId);
      const userToken = userSnapshot.data().fcmToken;

      await addNotificationToFirestore(userId, 'Appointment Accepted', 'unread');


      // Send a push notification to the user
      await sendPushNotification(userToken, 'Appointment Accepted', 'Your appointment has been accepted.');
      navigation.navigate('DoctorHomeScreen')

    } catch (error) {
      console.error('Error accepting appointment:', error);
    }
  };

  const handleReject = async (appointmentId) => {
    try {
      await updateAppointmentsFromFirestore(appointmentId, 'Rejected')

      // Fetch user's FCM token from Firestore
      const appointmentSnapshot = await fetchAppointmentsFromFirestore(appointmentId);
      const userId = appointmentSnapshot.data().userId;

      const userSnapshot = await fetchUserDataFromFirestore(userId);
      const userToken = userSnapshot.data().fcmToken;
      await addNotificationToFirestore(userId, 'Appointment Rejected', 'unread');

      // Send a push notification to the user
      await sendPushNotification(userToken, 'Appointment Rejected', 'Your appointment has been rejected.');
      navigation.navigate('DoctorHomeScreen')
    } catch (error) {
      console.error('Error rejecting appointment:', error);
    }
  };

  const sendPushNotification = async (userToken, title, message) => {
    try {
      await messaging().sendMessage({
        data: {
          title,
          body: message,
        },
        token: userToken,
      });
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {appointments.length > 0 ? (
          // Render appointments if there are any
          appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))
        ) : (
          // Render a message when there are no appointments
          <Text style={styles.noAppointmentsText}>No appointments available today.</Text>
        )}
      </View>
    </ScrollView>

  );

};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  appointmentCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: 'white',
    elevation: 2,
  },
  userName: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Poppins-SemiBold'
  },
  status: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 12,
  },
  actionButton: {
    backgroundColor: '#47C1FF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,

  },
  actionButtonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default DoctorAppointmentsList;



// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import { useNavigation } from '@react-navigation/native';
// import messaging from '@react-native-firebase/messaging';


// const AppointmentCard = ({ appointment, onAccept, onReject, onCardPress }) => (
//   <TouchableOpacity
//     style={styles.appointmentCard}
//     onPress={() => onCardPress(appointment.userId)}
//   >
//     <Text style={styles.userName}>User: {appointment.userName}</Text>
//     <Text style={styles.status}>Status: {appointment.status}</Text>
//     <TouchableOpacity style={styles.actionButton} onPress={() => onAccept(appointment.id)}>
//       <Text style={styles.actionButtonText}>Accept ✅</Text>
//     </TouchableOpacity>
//     <TouchableOpacity style={styles.actionButton} onPress={() => onReject(appointment.id)}>
//       <Text style={styles.actionButtonText}>Reject ❌</Text>
//     </TouchableOpacity>
//   </TouchableOpacity>
// );

// const DoctorAppointmentsList = ({ route }) => {
//   const [appointments, setAppointments] = useState([]);
//   const [catProfile, setCatProfile] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const navigation = useNavigation();

//   const { doctorId } = route.params;

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const appointmentsSnapshot = await firestore()
//           .collection('Appointments')
//           .where('doctorId', '==', doctorId)
//           .where('status', '==', 'pending')
//           .get();

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
//       await firestore().collection('Appointments').doc(appointmentId).update({
//         status: 'Accepted',
//       });

//       const appointmentSnapshot = await firestore().collection('Appointments').doc(appointmentId).get();
//       const userId = appointmentSnapshot.data().userId;

//       const userSnapshot = await firestore().collection('users').doc(userId).get();
//       const userToken = userSnapshot.data().fcmToken;

//       await firestore().collection('Notifications').add({
//         userId: userId,
//         message: 'Your appointment has been accepted.',
//         status: 'unread',
//       });

//       await sendPushNotification(userToken, 'Appointment Accepted', 'Your appointment has been accepted.');
//       navigation.navigate('DoctorHomeScreen');
//     } catch (error) {
//       console.error('Error accepting appointment:', error);
//     }
//   };

//   const handleReject = async (appointmentId) => {
//     try {
//       await firestore().collection('Appointments').doc(appointmentId).update({
//         status: 'Rejected',
//       });

//       const appointmentSnapshot = await firestore().collection('Appointments').doc(appointmentId).get();
//       const userId = appointmentSnapshot.data().userId;
//       console.log('userid reject=',userId);

//       const userSnapshot = await firestore().collection('users').doc(userId).get();
//       const userToken = userSnapshot.data().fcmToken;

//       await firestore().collection('Notifications').add({
//         userId: userId,
//         message: 'Your appointment has been rejected.',
//         status: 'unread',
//       });

//       await sendPushNotification(userToken, 'Appointment Rejected', 'Your appointment has been rejected.');
//       navigation.navigate('DoctorHomeScreen');
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
//   const handleCardPress = async (appointmentId) => {
//     try {

//       const appointmentSnapshot = await firestore().collection('Appointments').doc(appointmentId).get();
//       const userId = appointmentSnapshot.data().userId;
//       console.log('userid handlecard=',userId);

//       const catProfileSnapshot = await firestore()
//         .collection('users')
//         .doc(userId)
//         .collection('catProfiles')
//         .doc('uDXhK6izup4bw4KaFpYp') // Assuming the catProfile has the document id '1'
//         .get();

//       setCatProfile(catProfileSnapshot.data());
//       setModalVisible(true);
//     } catch (error) {
//       console.error('Error fetching cat profile:', error);
//     }
//   };
//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <View style={styles.container}>
//         {appointments.length > 0 ? (
//           appointments.map((appointment) => (
//             <AppointmentCard
//               key={appointment.id}
//               appointment={appointment}
//               onAccept={handleAccept}
//               onReject={handleReject}
//               onCardPress={handleCardPress}
//             />
//           ))
//         ) : (
//           <Text style={styles.noAppointmentsText}>No appointments available today.</Text>
//         )}
//       </View>

//       <Modal animationType="slide" transparent={true} visible={modalVisible}>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             {catProfile && (
//               <>
//                 <Text style={styles.modalText}>Cat Name: {catProfile[1]?.basicInfo?.catName}</Text>
//                 <Text style={styles.modalText}>Breed: {catProfile?.basicInfo?.breed}</Text>
//                 <Text style={styles.modalText}>Age: {catProfile?.basicInfo?.age}</Text>
//                 <Text style={styles.modalText}>Gender: {catProfile?.basicInfo?.gender}</Text>
//               </>
//             )}
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => {
//                 setModalVisible(false);
//                 setCatProfile(null);
//               }}
//             >
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );

// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   appointmentCard: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//     backgroundColor: 'white',
//     elevation: 2,
//   },
//   userName: {
//     fontSize: 16,
//     marginBottom: 8,
//     fontFamily: 'Poppins-SemiBold',
//   },
//   status: {
//     fontSize: 16,
//     fontFamily: 'Poppins-SemiBold',
//     marginBottom: 12,
//   },
//   actionButton: {
//     backgroundColor: '#47C1FF',
//     padding: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   actionButtonText: {
//     fontSize: 16,
//     color: 'white',
//     fontFamily: 'Poppins-SemiBold',
//   },
//   noAppointmentsText: {
//     fontSize: 16,
//     fontFamily: 'Poppins-SemiBold',
//     textAlign: 'center',
//     marginTop: 16,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 16,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     width: '100%',
//     maxHeight: '70%',
//   },
//   modalText: {
//     fontSize: 16,
//     marginBottom: 8,
//     fontFamily: 'Poppins-SemiBold',
//   },
//   closeButton: {
//     backgroundColor: '#47C1FF',
//     padding: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   closeButtonText: {
//     fontSize: 16,
//     color: 'white',
//     fontFamily: 'Poppins-SemiBold',
//   },
// });

// export default DoctorAppointmentsList;
