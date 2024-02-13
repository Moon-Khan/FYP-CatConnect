// // .src/Services/firebaseService.js
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';

// class FirebaseService {
//   static async addCatProfile(catProfileData, collection) {
//     try {

//       // Make sure catProfileData is an object
//       if (typeof catProfileData === 'object' && catProfileData !== null) {

//         const user = auth().currentUser;

//         await firestore().collection('users').doc(user.uid).collection(collection).add(catProfileData);
//         console.log('Cat profile added to Firestore');
//       } else {
//         console.error('Error adding cat profile to Firestore: Invalid data format');
//       }
//     } catch (error) {
//       console.error('Error adding cat profile to Firestore', error);
//     }
//   }



// }

// export default FirebaseService;



// // firebase.js
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// const user = auth().currentUser;
// export const fetchData = async () => {
//   try {
//     const snapshot = await firestore().collection('CatProfiles').get();
//     return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error; // Propagate the error
//   }
// };

// export const addData = async (newData) => {
//   try {
//     const docRef = await firestore().collection('CatProfiles').add(newData);

//     // const docRef = await firestore().collection('users').doc(user.uid).collection('CatProfiles').add(newData);
//     return { id: docRef.id, ...newData };
//   } catch (error) {
//     console.error('Error adding data:', error);
//     throw error;
//   }
// };

// export const updateData = async (id, updatedData) => {
//   try {
//     await firestore().collection('CatProfiles').doc(id).update(updatedData);
//     return { id, ...updatedData };
//   } catch (error) {
//     console.error('Error updating data:', error);
//     throw error;
//   }
// };

// export const deleteData = async (id) => {
//   try {
//     await firestore().collection('CatProfiles').doc(id).delete();
//     return id;
//   } catch (error) {
//     console.error('Error deleting data:', error);
//     throw error;
//   }
// };

// ./src/Services/firebase.js
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const fetchUserDataFromFirestore = async (userId) => {
  try {
    const userDoc = await firestore().collection('users').doc(userId).get();
    if (userDoc.exists) {
      return userDoc;
    } else {
      console.log('User document does not exist in Firestore(firebase.js).');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

const fetchDoctorDataFromFirestore = async (userId) => {
  try {
    const userDoc = await firestore().collection('doctors').doc(userId).get();
    if (userDoc.exists) {
      return userDoc;
    } else {
      console.log('doctor document does not exist in Firestore(firebase.js).');
    }
  } catch (error) {
    console.error('Error fetching doctor data:', error);
  }
};

const fetchAllDoctorDataFromFirestore = async () => {
  try {
    const userDoc = await firestore().collection('doctors').get();
    if (userDoc) {
      return userDoc;
    } else {
      console.log('doctor document does not exist in Firestore(firebase.js).');
    }
  } catch (error) {
    console.error('Error fetching doctor data:', error);
  }
};

const fetchAppointmentsCondFromFirestore = async (doctorId) => {
  try {

    const userDoc = await firestore().collection('appointments').where('doctorId', '==', doctorId).where('status', '==', 'pending').get();
    if (userDoc) {
      return userDoc;
    } else {
      console.log('doctor appointmet cond does not exist in Firestore(firebase.js).');
    }
  } catch (error) {
    console.error('Error fetching doctor appointment cond data:', error);
  }

}


const fetchAppointmentsFromFirestore = async (appointmentId) => {
  try {

    const userDoc = await firestore().collection('appointments').doc(appointmentId).get();
    if (userDoc) {
      return userDoc;
    } else {
      console.log('doctor appointmet does not exist in Firestore(firebase.js).');
    }
  } catch (error) {
    console.error('Error fetching doctor appointment data:', error);
  }

}


const fetchCatProfilesFromFirestore = async () => {
  try {
    const usersSnapshot = await firestore().collection('users').get();
    const promises = [];

    usersSnapshot.forEach((userDoc) => {
      const catProfilesSnapshot = userDoc.ref.collection('CatProfiles').get();
      promises.push(catProfilesSnapshot);
    });

    const catProfilesSnapshots = await Promise.all(promises);

    const allCatProfilesData = catProfilesSnapshots
      .map((catProfileSnapshot) => {
        return catProfileSnapshot.docs.map((catProfileDoc) => catProfileDoc.data());
      })
      .flat();

    return allCatProfilesData;
  } catch (error) {
    console.error('Error fetching all cat profiles:', error);
    throw error;
  }
};
const fetchUserNofiticationFromFirestore = async (userId) => {
  try {
    const userDoc = await firestore().collection('notifications').where('userId', '==', userId).get();
    if (userDoc) {
      return userDoc;
    } else {
      console.log('user notification does not exist in Firestore(firebase.js).');
    }
  } catch (error) {
    console.error('Error fetching user notification data:', error);
  }
}

const addAppointmentsDataToFirestore = async (data) => {
  try {
    await firestore().collection('appointments').add(data);

    console.log('appointemnts Data added to Firestore:', data);
  } catch (error) {
    console.error('Error adding appointment data to Firestore:', error);
    throw error;
  }
}

const addDataToFirestore = async (data) => {
  try {
    const user = auth().currentUser;
    await firestore().collection('users').doc(user.uid).collection('CatProfiles').add(data);

    console.log('Data added to Firestore:', data);
  } catch (error) {
    console.error('Error adding data to Firestore:', error);
    throw error;
  }
};


const addUserDataFromFirestore = async (userId, emailId, username, password, fcmtoken, contact, address, gender) => {
  try {
    const userDocRef = firestore().collection('users').doc(userId);

    const userData = {
      email: emailId,
      username: username,
      password: password,
      fcmtoken: fcmtoken,
      contact: contact,
      address: address,
      gender: gender,
    };

    const userDoc = await userDocRef.get();

    if (userDoc.exists) {
      await userDocRef.update(userData);
    } else {
      await userDocRef.set(userData);
    }

    console.log('User Data added/updated to Firestore:', userData);
  } catch (error) {
    console.error('Error adding/updating user data:', error);
    throw error;
  }
};

const addDoctorToFirestore = async (doctorId, email, username, password, specialization, selectedDay, selectedStartTime, selectedEndTime, contactInfo, city, address) => {
  try {
    const userDocRef = firestore().collection('doctors').doc(doctorId);

    const doctorData = {
      email: email,
      username: username,
      password: password,
      specialization: specialization,
      selectedDay: selectedDay,
      availability: {
        day: selectedDay,
        timeRange: `${selectedStartTime} - ${selectedEndTime}`,
      },
      contactInfo: contactInfo,
      city: city,
      address: address,
    };

    const userDoc = await userDocRef.get();

    if (userDoc.exists) {
      await userDocRef.update(doctorData);
    } else {
      await userDocRef.set(doctorData);
    }

    console.log('doctor Data added/updated to Firestore:', doctorData);
  } catch (error) {
    console.error('Error adding/updating doctor data:', error);
    throw error;
  }
};


const addNotificationToFirestore = async (userId_, message_, status_) => {
  await firestore().collection('notifications').add({
    userId: userId_,
    message: message_,
    status: status_,
  });
}

const updateNotificationFromFirestore = async (notificationId, status_) => {
  await firestore().collection('notifications').doc(notificationId).update({
    status: status_,
  });
}

const userNotifications = async (userid, status_) => {
  try {
    const NotificationsSnapshot = await firestore().collection('notifications').where('userId', '==', userid).where('status', '==', status_).get();
    if (NotificationsSnapshot) {
      return NotificationsSnapshot;
    } else {
      console.log('user notification does not exist in Firestore(firebase.js).');
    }
  }
  catch (error) {
    console.error('Error fetching user notification data on home screen:', error);
  }

}
const updateAppointmentsFromFirestore = async (appointmentId, status_) => {
  try {

    await firestore().collection('appointments').doc(appointmentId).update({
      status: status_,
    });
  } catch (error) {
    console.error('Error fetching doctor appointment data:', error);
  }

}


export { addDataToFirestore, fetchCatProfilesFromFirestore, fetchUserDataFromFirestore, fetchAllDoctorDataFromFirestore, fetchAppointmentsFromFirestore, fetchAppointmentsCondFromFirestore, fetchUserNofiticationFromFirestore, addDoctorToFirestore, addUserDataFromFirestore, fetchDoctorDataFromFirestore,userNotifications, addNotificationToFirestore, addAppointmentsDataToFirestore, updateAppointmentsFromFirestore, updateNotificationFromFirestore };
