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

// // ./src/Services/firebase.js
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';

// const fetchUserDataFromFirestore = async (userId) => {
//   try {
//     const userDoc = await firestore().collection('users').doc(userId).get();
//     if (userDoc.exists) {
//       return userDoc;
//     } else {
//       console.log('User document does not exist in Firestore(firebase.js).');
//     }
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//   }
// };

// const fetchDoctorDataFromFirestore = async (userId) => {
//   try {
//     const userDoc = await firestore().collection('doctors').doc(userId).get();
//     if (userDoc.exists) {
//       return userDoc;
//     } else {
//       console.log('doctor document does not exist in Firestore(firebase.js).');
//     }
//   } catch (error) {
//     console.error('Error fetching doctor data:', error);
//   }
// };

// const fetchAllDoctorDataFromFirestore = async () => {
//   try {
//     const userDoc = await firestore().collection('doctors').get();
//     if (userDoc) {
//       return userDoc;
//     } else {
//       console.log('doctor document does not exist in Firestore(firebase.js).');
//     }
//   } catch (error) {
//     console.error('Error fetching doctor data:', error);
//   }
// };

// const fetchAppointmentsCondFromFirestore = async (doctorId) => {
//   try {

//     const userDoc = await firestore().collection('appointments').where('doctorId', '==', doctorId).where('status', '==', 'pending').get();
//     if (userDoc) {
//       return userDoc;
//     } else {
//       console.log('doctor appointmet cond does not exist in Firestore(firebase.js).');
//     }
//   } catch (error) {
//     console.error('Error fetching doctor appointment cond data:', error);
//   }

// }


// const fetchAppointmentsFromFirestore = async (appointmentId) => {
//   try {

//     const userDoc = await firestore().collection('appointments').doc(appointmentId).get();
//     if (userDoc) {
//       return userDoc;
//     } else {
//       console.log('doctor appointmet does not exist in Firestore(firebase.js).');
//     }
//   } catch (error) {
//     console.error('Error fetching doctor appointment data:', error);
//   }

// }


// const fetchCatProfilesFromFirestore = async () => {
//   try {
//     const usersSnapshot = await firestore().collection('users').get();
//     const promises = [];

//     usersSnapshot.forEach((userDoc) => {
//       const catProfilesSnapshot = userDoc.ref.collection('CatProfiles').get();
//       promises.push(catProfilesSnapshot);
//     });

//     const catProfilesSnapshots = await Promise.all(promises);

//     const allCatProfilesData = catProfilesSnapshots
//       .map((catProfileSnapshot) => {
//         return catProfileSnapshot.docs.map((catProfileDoc) => catProfileDoc.data());
//       })
//       .flat();

//     return allCatProfilesData;
//   } catch (error) {
//     console.error('Error fetching all cat profiles:', error);
//     throw error;
//   }
// };


// const fetchUserNofiticationFromFirestore = async (userId) => {
//   try {
//     const userDoc = await firestore().collection('notifications').where('userId', '==', userId).get();
//     if (userDoc) {
//       return userDoc;
//     } else {
//       console.log('user notification does not exist in Firestore(firebase.js).');
//     }
//   } catch (error) {
//     console.error('Error fetching user notification data:', error);
//   }
// }

// const addAppointmentsDataToFirestore = async (data) => {
//   try {
//     await firestore().collection('appointments').add(data);

//     console.log('appointemnts Data added to Firestore:', data);
//   } catch (error) {
//     console.error('Error adding appointment data to Firestore:', error);
//     throw error;
//   }
// }

// const addDataToFirestore = async (data) => {
//   try {
//     const user = auth().currentUser;
//     await firestore().collection('users').doc(user.uid).collection('CatProfiles').add(data);

//     console.log('Data added to Firestore:', data);
//   } catch (error) {
//     console.error('Error adding data to Firestore:', error);
//     throw error;
//   }
// };


// const addUserDataFromFirestore = async (userId, emailId, firstname, password, fcmtoken, lastname, contact, city, gender) => {
//   try {
//     const userDocRef = firestore().collection('users').doc(userId);

//     const userData = {
//       email: emailId,
//       firstname: firstname,
//       lastname: lastname,
//       password: password,
//       fcmtoken: fcmtoken,
//       contact: contact,
//       city: city,
//       gender: gender,
//     };

//     await userDocRef.set(userData);

//     console.log('User Data added to Firestore:', userData);
//   } catch (error) {
//     console.error('Error adding user data:', error);
//     throw
//   };


//   const updateUserDataInFirestore = async (userId, emailId, firstname, password, fcmtoken, lastname, contact, city, gender) => {
//     try {
//       const userDocRef = firestore().collection('users').doc(userId);

//       const userData = {
//         firstname: firstname,
//         lastname: lastname,
//         password: password,
//         contact: contact,
//         city: city,
//         gender: gender,
//       };

//       await userDocRef.update(userData);

//       console.log('User Data updated in Firestore:', userData);
//     } catch (error) {
//       console.error('Error updating user data:', error);
//       throw error;
//     }
//   };

//   const addDoctorToFirestore = async (doctorId, email, username, password, specialization, selectedDay, selectedStartTime, selectedEndTime, contactInfo, city, address) => {
//     try {
//       const userDocRef = firestore().collection('doctors').doc(doctorId);

//       const doctorData = {
//         email: email,
//         username: username,
//         password: password,
//         specialization: specialization,
//         selectedDay: selectedDay,
//         availability: {
//           day: selectedDay,
//           timeRange: `${selectedStartTime} - ${selectedEndTime}`,
//         },
//         contactInfo: contactInfo,
//         city: city,
//         address: address,
//       };

//       await userDocRef.set(doctorData);

//       console.log('Doctor Data added to Firestore:', userData);
//     } catch (error) {
//       console.error('Error adding user data:', error);
//       throw
//     };
//   };


//   const addNotificationToFirestore = async (userId_, message_, status_) => {
//     await firestore().collection('notifications').add({
//       userId: userId_,
//       message: message_,
//       status: status_,
//     });
//   }

//   const updateNotificationFromFirestore = async (notificationId, status_) => {
//     await firestore().collection('notifications').doc(notificationId).update({
//       status: status_,
//     });
//   }

//   const userNotifications = async (userid, status_) => {
//     try {
//       const NotificationsSnapshot = await firestore().collection('notifications').where('userId', '==', userid).where('status', '==', status_).get();
//       if (NotificationsSnapshot) {
//         return NotificationsSnapshot;
//       } else {
//         console.log('user notification does not exist in Firestore(firebase.js).');
//       }
//     }
//     catch (error) {
//       console.error('Error fetching user notification data on home screen:', error);
//     }

//   }
//   const updateAppointmentsFromFirestore = async (appointmentId, status_) => {
//     try {

//       await firestore().collection('appointments').doc(appointmentId).update({
//         status: status_,
//       });
//     } catch (error) {
//       console.error('Error fetching doctor appointment data:', error);
//     }

//   }


//   export { addDataToFirestore, fetchCatProfilesFromFirestore, fetchUserDataFromFirestore, fetchAllDoctorDataFromFirestore, fetchAppointmentsFromFirestore, fetchAppointmentsCondFromFirestore, fetchUserNofiticationFromFirestore, addDoctorToFirestore, addUserDataFromFirestore, fetchDoctorDataFromFirestore, userNotifications, addNotificationToFirestore, addAppointmentsDataToFirestore, updateUserDataInFirestore, updateAppointmentsFromFirestore, updateNotificationFromFirestore };


// ./src/Services/firebase.js
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const fetchUserDataFromFirestore = async (userId) => {
  try {
    const userDoc = await firestore().collection('users').doc(userId).get();
    console.log('userDoc firebase:', userDoc.data());
    if (userDoc.exists) {
      return userDoc;
    } else {
      console.log('User document does not exist in Firestore(firebase.js).');
      return null; // Return null if document doesn't exist
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

const fetchDoctorDataFromFirestore = async (userId) => {
  try {
    const doctorDoc = await firestore().collection('doctors').doc(userId).get();
    console.log('doctorDoc firebase:', doctorDoc.data());
    if (doctorDoc.exists) {
      return doctorDoc;
    } else {
      console.log('Doctor document does not exist in Firestore(firebase.js).');
      return null; // Return null if document doesn't exist
    }
  } catch (error) {
    console.error('Error fetching doctor data:', error);
    throw error;
  }
};
const fetchAllDoctorDataFromFirestore = async () => {
  try {
    const doctorDocs = await firestore().collection('doctors').get();
    if (doctorDocs) {
      return doctorDocs;
    } else {
      console.log('Doctor documents do not exist in Firestore(firebase.js).');
    }
  } catch (error) {
    console.error('Error fetching doctor data:', error);
  }
};

const fetchAllUserDataFromFirestore = async () => {
  try {
    const userDocs = await firestore().collection('users').get();
    const userData = userDocs.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return [];
  }
};



const fetchBookedAppointmentsFromFirestore = async (selectedDay, doctorId) => {
  try {

    console.log('selectedDay-->',selectedDay)
    console.log('doctorId-->',doctorId)

    const appointmentsSnapshot = await firestore().collection('appointments')
      .where('doctorId', '==', doctorId)
      .where('day', '==', selectedDay)
      .get();

    console.log('appointmentsSnapshot fetchBookedAppointmentsFromFirestore ----->', appointmentsSnapshot)

    const bookedAppointments = appointmentsSnapshot.docs.map(doc => doc.data());
    return bookedAppointments;
  } catch (error) {
    console.error('Error fetching booked appointments:', error);
    throw error;
  }
};

const fetchAppointmentsCondFromFirestore = async (doctorId) => {
  try {
    const appointmentDocs = await firestore().collection('appointments').where('doctorId', '==', doctorId).where('status', '==', 'pending').get();
    if (appointmentDocs) {
      return appointmentDocs;
    } else {
      console.log('Doctor appointment condition does not exist in Firestore(firebase.js).');
    }
  } catch (error) {
    console.error('Error fetching doctor appointment condition data:', error);
  }
};

const fetchAppointmentsFromFirestore = async (appointmentId) => {
  try {
    const appointmentDoc = await firestore().collection('appointments').doc(appointmentId).get();
    if (appointmentDoc.exists) {
      return appointmentDoc;
    } else {
      console.log('Doctor appointment does not exist in Firestore(firebase.js).');
    }
  } catch (error) {
    console.error('Error fetching doctor appointment data:', error);
  }
};

// const fetchApproveCatProfilesForHomeScreen = async () => {
//   try {
//     const usersSnapshot = await firestore().collection('users').get();
//     const promises = [];

//     usersSnapshot.forEach((userDoc) => {
//       const catProfilesSnapshot = userDoc.ref.collection('CatProfiles').where('status', '==', 'approved').get();
//       promises.push(catProfilesSnapshot);
//     });

//     const catProfilesSnapshots = await Promise.all(promises);

//     const allCatProfilesData = catProfilesSnapshots
//       .map((catProfileSnapshot) => {
//         return catProfileSnapshot.docs.map((catProfileDoc) => catProfileDoc.data());
//       })
//       .flat();

//     console.log('Approved catProfilesData from firebase:', allCatProfilesData);

//     return allCatProfilesData;
//   } catch (error) {
//     console.error('Error fetching approved cat profiles:', error);
//     throw error;
//   }
// };




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

    console.log('allCatProfilesData from firebase:', allCatProfilesData);

    return allCatProfilesData;
  } catch (error) {
    console.error('Error fetching all cat profiles:', error);
    throw error;
  }
};

// const createAnnouncement = async (announcementData) => {
//   try {
//     // Assuming you have a collection named 'announcements' in your Firestore database
//     await firestore().collection('announcements').add(announcementData);
//     console.log('Announcement created successfully');
//   } catch (error) {
//     console.error('Error creating announcement:', error);
//     throw error; // Propagate the error to handle it in the calling component
//   }
// };
const createAnnouncementAndNotifyUsers = async (announcementData) => {
  try {
    const announcementRef = await firestore().collection('announcements').add(announcementData.message); // Accessing recipients array from message property
    console.log('Announcement created successfully');

    const announcementMessage = announcementData.message.text; // Accessing text property from message object
    const recipients = announcementData.message.recipients || []; // Ensure recipients array is defined

    // Fetch user IDs
    const usersSnapshot = await firestore().collection('users').get();
    const userIds = usersSnapshot.docs.map(doc => doc.id);
    console.log('userid-->', userIds);

    // Fetch doctor IDs
    const doctorsSnapshot = await firestore().collection('doctors').get();
    const doctorIds = doctorsSnapshot.docs.map(doc => doc.id);
    console.log('doctorsID-->', doctorIds);

    // Filter recipients based on whether they are users or doctors
    const userRecipients = recipients.filter(id => userIds.includes(id));
    console.log('userRecipients-->', userRecipients);
    const doctorRecipients = recipients.filter(id => doctorIds.includes(id));
    console.log('doctorRecipients-->', doctorRecipients);

    // Send notifications to users
    const userNotificationPromises = userRecipients.map(async (userId) => {
      await addNotificationToFirestore(userId, announcementMessage, 'unread');
      console.log('announcement notification sent to user')
    });
    await Promise.all(userNotificationPromises);

    // Send notifications to doctors
    const doctorNotificationPromises = doctorRecipients.map(async (doctorId) => {
      await addNotificationForDoctorToFirestore(doctorId, announcementMessage, 'unread');
      console.log('announcement notification sent to doctor')
    });
    await Promise.all(doctorNotificationPromises);

  } catch (error) {
    console.error('Error creating announcement and notifying users:', error);
    throw error;
  }
};

const fetchAllAnnouncementsForAdmin = async () => {
  try {
    const announcementsSnapshot = await firestore().collection('announcements').get();
    const announcementsData = announcementsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return announcementsData;
  } catch (error) {
    console.error('Error fetching announcements:', error);
    throw error;
  }
};


const fetchUserNofiticationFromFirestore = async (userId) => {
  try {
    const notificationDocs = await firestore().collection('notifications').where('userId', '==', userId).get();
    if (notificationDocs) {
      return notificationDocs;
    } else {
      console.log('user notification does not exist in Firestore(firebase.js).');
    }
  } catch (error) {
    console.error('Error fetching user notification data:', error);
  }
}

// const fetchCatProfilesForUser = async (userId) => {
//   try {
//     const catProfilesSnapshot = await firestore()
//       .collection('users')
//       .doc(userId)
//       .collection('CatProfiles')
//       .get();

//     const catProfilesData = catProfilesSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));

//     else {
//   console.log('error for fetching user cat profies');
// }
//     // const catProfilesData = catProfilesSnapshot.docs.map(doc => doc.data());
//     // return catProfilesData;
//   } catch (error) {
//   console.error('Error fetching cat profiles for user:', error);
//   throw error;
// }
// };
// const fetchApproveCatProfile = async () => {
//   try {
//     const approveCatProfileDocs = await firestore().collection('approveCatProfiles').get();

//     if (approveCatProfileDocs) {
//       // Filter documents based on the status not equal to "pending"
//       const filteredDocs = approveCatProfileDocs.docs.filter(doc => doc.data().status !== "pending");

//       console.log('Filtered firebase cats:', filteredDocs);

//       return filteredDocs;
//     } else {
//       console.log('Approve cat profile does not exist in Firestore(firebase.js).');
//       return []; // Return an empty array if no documents found
//     }
//   } catch (error) {
//     console.error('Error fetching approve cat profile data:', error);
//     throw error;
//   }
// }


const fetchCatProfilesForUser = async (userId) => {
  try {
    const catProfilesSnapshot = await firestore()
      .collection('users')
      .doc(userId)
      .collection('CatProfiles')
      .get();

    // const catProfilesData = catProfilesSnapshot.docs.map(doc => ({
    //   id: doc.id,
    //   ...doc.data()
    // }));

    console.log('cat profiels firestore(curernt user)--->', catProfilesSnapshot)
    return catProfilesSnapshot;
  } catch (error) {
    console.error('Error fetching cat profiles for user:', error);
    throw error;
  }
};

const fetchCatProfilesForUserrecomend = async (userId) => {
  try {
    const catProfilesSnapshot = await firestore()
      .collection('users')
      .doc(userId)
      .collection('CatProfiles')
      .get();

    const catProfilesData = catProfilesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log('cat profiels firestore(curernt user)--->', catProfilesData)
    return catProfilesData;
  } catch (error) {
    console.error('Error fetching cat profiles for user:', error);
    throw error;
  }
};


const fetchApproveCatProfile = async () => {
  try {
    const approveCatProfileDocs = await firestore().collection('approveCatProfiles').get();

    if (approveCatProfileDocs) {
      // Filter documents based on the status not equal to "pending"
      const filteredDocs = approveCatProfileDocs.docs.filter(doc => doc.data().status !== "pending");

      console.log('Filtered firebase cats:', filteredDocs);

      return filteredDocs;
    } else {
      console.log('Approve cat profile does not exist in Firestore(firebase.js).');
      return []; // Return an empty array if no documents found
    }
  } catch (error) {
    console.error('Error fetching approve cat profile data:', error);
    throw error;
  }
}
const fetchApproveDocotorProfile = async () => {
  try {
    const approveCatProfileDocs = await firestore().collection('approveDoctorProfile').get();

    if (approveCatProfileDocs) {
      // Filter documents based on the status not equal to "pending"
      const filteredDocs = approveCatProfileDocs.docs.filter(doc => doc.data().status !== "pending");

      console.log('Filtered firebase cats:', filteredDocs);

      return filteredDocs;
    } else {
      console.log('Approve cat profile does not exist in Firestore(firebase.js).');
      return []; // Return an empty array if no documents found
    }
  } catch (error) {
    console.error('Error fetching approve cat profile data:', error);
    throw error;
  }
}


const fetchforAdminApproveCatProfile = async () => {
  try {
    const approveCatProfileDocs = await firestore().collection('approveCatProfiles').get();

    if (approveCatProfileDocs) {
      // Filter documents based on the status not equal to "pending"
      const filteredDocs = approveCatProfileDocs.docs.filter(doc => doc.data().status == "pending");

      console.log('Filtered firebase cats:', filteredDocs);

      return filteredDocs;
    } else {
      console.log('Approve cat profile does not exist in Firestore(firebase.js).');
      return []; // Return an empty array if no documents found
    }
  } catch (error) {
    console.error('Error fetching approve cat profile data:', error);
    throw error;
  }
}

const fetchforAdminApproveDoctorProfile = async () => {
  try {
    const approveDoctorProfileDocs = await firestore().collection('approveDoctorProfile').get();

    if (approveDoctorProfileDocs) {
      // Filter documents based on the status not equal to "pending"
      const filteredDocs = approveDoctorProfileDocs.docs.filter(doc => doc.data().status == "pending");

      console.log('Filtered firebase doctor:', filteredDocs);

      return filteredDocs;
    } else {
      console.log('Approve cat profile does not exist in Firestore(firebase.js).');
      return []; // Return an empty array if no documents found
    }
  } catch (error) {
    console.error('Error fetching approve cat profile data:', error);
    throw error;
  }
};

const updateApproveDoctorProfile = async (doctorProfileId, status) => {
  // Update doctor profile status in Firebase
  try {
    console.log('doctorid firebase', doctorProfileId)
    // Retrieve the specific document with the provided ID
    const doctorProfileRef = firestore().collection('approveDoctorProfile').doc(doctorProfileId);
    const doctorProfileDoc = await doctorProfileRef.get();

    // Check if the document exists
    if (!doctorProfileDoc.exists) {
      throw new Error(' dcotror Document does not exist');
    }

    // Update the status field of the document
    await doctorProfileRef.update({
      status: status
    });

    console.log('doctor profile status updated successfully');
  } catch (error) {
    console.error('Error updating docotr profile status (firebase):', error);
    throw error;
  }
};

const approveDoctorProfile = async (data) => {
  try {
    await firestore().collection('approveDoctorProfile').add(data);
    console.log('Doctor profile request sent successfully!');
  } catch (error) {
    console.error('Error requesting doctor profile:', error);
    throw error;
  }
};

const approveCatProfile = async (data) => {
  try {
    await firestore().collection('approveCatProfiles').add(data);
    console.log('Cat profile request sent successfully!');
  } catch (error) {
    console.error('Error requesting cat profile:', error);
    throw error;
  }
};

const updateApproveCatProfile = async (catProfileId, status) => {
  try {
    console.log('catid', catProfileId)
    // Retrieve the specific document with the provided ID
    const catProfileRef = firestore().collection('approveCatProfiles').doc(catProfileId);
    const catProfileDoc = await catProfileRef.get();

    // Check if the document exists
    if (!catProfileDoc.exists) {
      throw new Error('Document does not exist');
    }

    // Update the status field of the document
    await catProfileRef.update({
      status: status
    });

    console.log('Cat profile status updated successfully');
  } catch (error) {
    console.error('Error updating cat profile status (firebase):', error);
    throw error;
  }
};



const addAppointmentsDataToFirestore = async (data) => {
  try {
    await firestore().collection('appointments').add(data);
    console.log('Appointments data added to Firestore:', data);
  } catch (error) {
    console.error('Error adding appointment data to Firestore:', error);
    throw error;
  }
};

const addCatProfileToFirestore = async (userId, data) => {
  try {
    // const user = auth().currentUser;
    await firestore().collection('users').doc(userId).collection('CatProfiles').add(data);
    console.log('Data added to Firestore:', data);
  } catch (error) {
    console.error('Error adding data to Firestore:', error);
    throw error;
  }
};

const addUserDataToFirestore = async (userId, emailId, firstname, password, fcmtoken, lastname, contact, city, gender, chkadmin) => {
  try {
    const userDocRef = firestore().collection('users').doc(userId);
    const userData = {
      email: emailId,
      firstname: firstname,
      lastname: lastname,
      password: password,
      fcmtoken: fcmtoken,
      contact: contact,
      city: city,
      gender: gender,
      chkadmin: chkadmin,
    };

    await userDocRef.set(userData);
    console.log('User Data added to Firestore:', userData);
  } catch (error) {
    console.error('Error adding user data:', error);
    throw error;
  }
};

const addDoctorToFirestore = async (doctorId, email, username, password, specialization, qualification, experience, availability, contactNumber, city) => {
  try {
    const doctorDocRef = firestore().collection('doctors').doc(doctorId);
    const doctorData = {
      email: email,
      username: username,
      password: password,
      specialization: specialization,
      qualification: qualification,
      experience: experience,
      availability: availability,
      contactNumber: contactNumber,
      city: city,
    };
    await doctorDocRef.set(doctorData);
    console.log('Doctor Data added to Firestore:', doctorData);
  } catch (error) {
    console.error('Error adding doctor data:', error);
    throw error;
  }
};

const addNotificationToFirestore = async (userId_, message_, status_) => {
  try {
    await firestore().collection('notifications').add({
      userId: userId_,
      message: message_,
      status: status_,
    });

    console.log('notification added')
  } catch (error) {
    console.error('Error adding notification data:', error);
    throw error;
  }
};


const addNotificationForDoctorToFirestore = async (userId_, message_, status_) => {
  try {
    await firestore().collection('notificationsDcoctors').add({
      userId: userId_,
      message: message_,
      status: status_,
    });

    console.log('notification added')
  } catch (error) {
    console.error('Error adding notification data:', error);
    throw error;
  }
};


const updateUserDataInFirestore = async (userId, emailId, firstname, password, fcmtoken, lastname, contact, city, gender) => {
  try {
    const userDocRef = firestore().collection('users').doc(userId);
    const userData = {
      firstname: firstname,
      lastname: lastname,
      password: password,
      contact: contact,
      city: city,
      gender: gender,
    };
    await userDocRef.update(userData);
    console.log('User Data updated in Firestore:', userData);
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

const updateDoctorDataInFirestore = async (doctorId, doctorData) => {
  try {
    const doctorDocRef = firestore().collection('doctors').doc(doctorId);
    await doctorDocRef.update(doctorData);
  } catch (error) {
    throw error;
  }
};

const updateNotificationFromFirestore = async (notificationId, status_) => {
  try {
    await firestore().collection('notifications').doc(notificationId).update({
      status: status_,
    });
  } catch (error) {
    console.error('Error updating notification data:', error);
    throw error;
  }
};

const userNotifications = async (userId, status_) => {
  try {
    const notificationsSnapshot = await firestore().collection('notifications').where('userId', '==', userId).where('status', '==', status_).get();
    if (notificationsSnapshot) {
      return notificationsSnapshot;
    } else {
      console.log('User notifications do not exist in Firestore(firebase.js).');
    }
  } catch (error) {
    console.error('Error fetching user notifications:', error);
  }
};

const updateAppointmentsFromFirestore = async (appointmentId, status_) => {
  try {
    await firestore().collection('appointments').doc(appointmentId).update({
      status: status_,
    });
  } catch (error) {
    console.error('Error updating doctor appointment data:', error);
    throw error;
  }
};
const updateCatProfile = async (userid, catId, updatedCatProfile) => {
  try {
    console.log('firebase catid:', userid);
    console.log('firebase catid:', catId);
    console.log('firebase catdata:', updatedCatProfile);
    const alreadypresentdata = await firestore().collection('users').doc(userid).collection('CatProfiles').doc(catId).get();
    console.log('firebase already present:', alreadypresentdata);
    if (alreadypresentdata.exists) {
      console.log('data already present');
      await firestore().collection('users').doc(userid).collection('CatProfiles').doc(catId).update(updatedCatProfile);

      console.log('Cat profile updated successfully!');
    }
    else {
      console.log('data not present');
    }
  } catch (error) {
    console.error('Error updating cat profile firebase:', error);
    throw error; // Throw the error for handling it in the calling code
  }
};


const deleteCatProfile = async (catProfileId, userid) => {
  try {
    await firestore()
      .collection('users')
      .doc(userid)
      .collection('CatProfiles')
      .doc(catProfileId)
      .delete();
    console.log('Cat profile deleted successfully');
  } catch (error) {
    console.error('Error deleting cat profile:', error);
    throw error;
  }
};

const deleteUserProfile = async (userId) => {
  try {
    await firestore()
      .collection('users')
      .doc(userId)
      .delete();
    console.log('User profile deleted successfully');
  } catch (error) {
    console.error('Error deleting user profile:', error);
    throw error;
  }
};


export {
  addCatProfileToFirestore,
  fetchCatProfilesFromFirestore,
  fetchUserDataFromFirestore,
  fetchAllDoctorDataFromFirestore,
  fetchAppointmentsFromFirestore,
  fetchBookedAppointmentsFromFirestore,
  fetchAppointmentsCondFromFirestore,
  fetchUserNofiticationFromFirestore,
  fetchAllUserDataFromFirestore,
  fetchCatProfilesForUserrecomend,
  fetchCatProfilesForUser,
  fetchApproveCatProfile,
  fetchAllAnnouncementsForAdmin,
  fetchApproveDocotorProfile,
  approveDoctorProfile,
  fetchforAdminApproveCatProfile,
  fetchforAdminApproveDoctorProfile,
  approveCatProfile,
  addDoctorToFirestore,
  addUserDataToFirestore,
  addNotificationForDoctorToFirestore,
  fetchDoctorDataFromFirestore,
  userNotifications,
  addNotificationToFirestore,
  addAppointmentsDataToFirestore,
  updateApproveCatProfile,
  updateApproveDoctorProfile,
  updateDoctorDataInFirestore,
  updateUserDataInFirestore,
  updateAppointmentsFromFirestore,
  updateNotificationFromFirestore,
  updateCatProfile,
  // createAnnouncement,
  createAnnouncementAndNotifyUsers,
  deleteCatProfile,
  deleteUserProfile
  // deleteCatProfile
};
