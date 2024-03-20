// import * as React from "react";
// import { Image, StyleSheet, Text, View, ScrollView , TouchableOpacity} from "react-native";
// import { useNavigation } from '@react-navigation/native';

// const CatScreen = ({ route }) => {
//   const navigation = useNavigation();

//   const { catProfile } = route.params;
//   const basicInfo = catProfile.basicInfo || {};
//   const personalityAndAvailability = catProfile.personalityAndAvailability || {};
//   const physicalHealth = catProfile.physicalHealth || {};
//   const pics = catProfile.mediaUpload?.mediaList || [];

//   return (
//     <View style={styles.maincontainer}>

//       <View >
//         <Image
//           style={styles.notificationIcon}
//           resizeMode="cover"
//           source={require("../../../assets/Catassets/notification.png")}
//         />
//       </View>

//       <View>
//         <Text style={[styles.catConnect]}>
//           Cat Connect
//         </Text>
//       </View>

//       {pics.length > 0 ? (
//         <Image
//           style={styles.rectangleBackground}
//           source={{ uri: pics[0] }}
//         />
//       ) : (
//         <Text>No cat profile picture available</Text>
//       )}

//       <View style={styles.catInfoContainer}>
//         <Text style={styles.mamoonKhan}>{basicInfo.catName}</Text>
//         <Text style={styles.persianCoated}>{basicInfo.breed}</Text>
//         <Text style={styles.vaccination} >{physicalHealth.vaccinationStatus}</Text>
//       </View>

//       <View style={styles.container}>

//         <View style={styles.ageSexStatusContainer}>
//           <View style={styles.ageSexStatusItem}>
//             <Text style={styles.age}>Age</Text>
//             <Text style={styles.months}>{basicInfo.age}</Text>
//           </View>
//           <View style={styles.ageSexStatusItem}>
//             <Text style={styles.age}>Sex</Text>
//             <Text style={styles.months}>{basicInfo.gender}</Text>
//           </View>
//           <View style={styles.ageSexStatusItem}>
//             <Text style={styles.age}>Status</Text>
//             <Text style={styles.months}>{personalityAndAvailability.availabilityStatus}</Text>
//           </View>
//         </View>
//         <View style={styles.aboutMamuContainer}>
//           <Text style={styles.aboutMamu}>About {basicInfo.catName} </Text>
//           <Text style={styles.provideTheCatContainer}>
//             <Text style={styles.provideTheCat}>
//               {personalityAndAvailability.description}
//             </Text>
//           </Text>
//         </View>
//       </View>

//       {/* <View style={styles.contactMeWrapper} onpress>
//         <Text style={styles.contactMe}>Contact me</Text>
//       </View> */}
//       <TouchableOpacity style={styles.contactMeWrapper} onPress={() => navigation.navigate('ChatUsers')}>
//         <Text style={styles.contactMe}>Contact me</Text>
//       </TouchableOpacity>
//     </View>


//   );

// };

// const styles = StyleSheet.create({

//   maincontainer: {
//     height: '100%',
//     backgroundColor: '#fff',
//     padding: 20,

//   },
//   container: {
//     height: '28%', // Adjust based on your design
//   },

//   catConnect: {
//     fontSize: 24,
//     fontFamily: 'Poppins-SemiBold',
//     color: '#47c1ff',
//     marginTop: 5,
//     position: 'absolute'
//   },

//   notificationIcon: {
//     width: 30,
//     height: 30,
//     position: "absolute",
//     right: 0,
//   },
//   rectangleBackground: {
//     alignSelf: "center",
//     width: "100%",
//     height: "35%",
//     position: "absolute",
//     borderRadius: 20,
//     marginTop: 70,
//   },
//   catInfoContainer: {
//     marginTop: '100%', // Adjust based on your design
//   },
//   mamoonKhan: {
//     fontSize: 20,
//     fontFamily: 'Poppins-SemiBold',
//     color: '#7e7e7e',
//     marginBottom: 5,
//   },
//   persianCoated: {
//     fontSize: 16,
//     fontFamily: 'Poppins-Medium',
//     color: '#7e7e7e',
//   },
//   vaccination: {
//     fontSize: 16,
//     fontFamily: 'Popins-Medium',
//     color: '#7e7e7e',
//     position: 'absolute',
//     right: 0,
//     top: '60%', // Adjust based on your design
//   },

//   ageSexStatusContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: '4%', // Adjust based on your design
//   },
//   ageSexStatusItem: {
//     alignItems: "center",
//     marginHorizontal: 15,
//     backgroundColor: '#F5F5F5',
//     // borderColor: '#7e7e7e',
//     // borderWidth: 1,
//     borderRadius: 10,
//     padding: 5,
//     width: '28%'
//   },
//   age: {
//     fontSize: 16,
//     fontFamily: 'Poppins-SemiBold',
//     color: '#212529',
//   },
//   months: {
//     fontSize: 16,
//     fontFamily: 'Poppns-Medium',
//     color: '#212529',
//   },
//   aboutMamuContainer: {
//     marginTop: '6%', // Adjust based on your design
//     alignSelf: "flex-start",
//   },
//   aboutMamu: {
//     fontSize: 16,
//     fontFamily: 'Poppins-SemiBold',
//     color: '#212529',
//   },
//   provideTheCatContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   provideTheCat: {
//     flex: 1,
//     fontSize: 16,
//     fontFamily: 'Poppins-Regular',
//     color: '#7e7e7e',
//   },

//   contactMeWrapper: {
//     backgroundColor: '#47c1ff',
//     padding: 15,
//     borderRadius: 24, // Adjust based on your design
//     alignItems: 'center',
//     position: 'relative',
//     // top: '5%', // Adjust based on your design
//     left: '25%',
//     width: '55%',
//   },
//   contactMe: {
//     fontSize: 16,
//     fontFamily: 'Poppins-SemiBold',
//     color: '#fff',
//   },
//   androidLarge3Item: {
//     width: 30,
//     height: 30,
//     position: "absolute",
//     bottom: 20,
//     right: 20,
//   },

// });

// export default CatScreen;













// // CatScreen.js

// import React from "react";
// import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import { useNavigation } from '@react-navigation/native';

// const CatScreen = ({ route }) => {
//   const navigation = useNavigation();

//   const { catProfile } = route.params;
//   const basicInfo = catProfile.basicInfo || {};
//   const personalityAndAvailability = catProfile.personalityAndAvailability || {};
//   const physicalHealth = catProfile.physicalHealth || {};
//   const pics = catProfile.mediaUpload?.mediaList || [];

//   const handleContactMe = () => {
//     navigation.navigate('ChatUsers', { catProfileId: catProfile.id });
//   };

//   const handleGoBack = () => {
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.maincontainer}>
//       <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
//         <Image
//           source={require("../../../assets/Catassets/back.png")}
//           style={styles.backImage}
//         />
//       </TouchableOpacity>

//       <View>
//         <Text style={[styles.catConnect]}>
//           Cat Connect
//         </Text>
//       </View>

//       {pics.length > 0 ? (
//         <Image
//           style={styles.rectangleBackground}
//           source={{ uri: pics[0] }}
//         />
//       ) : (
//         <Text>No cat profile picture available</Text>
//       )}

//       <View style={styles.catInfoContainer}>
//         <Text style={styles.mamoonKhan}>{basicInfo.catName}</Text>
//         <Text style={styles.persianCoated}>{basicInfo.breed}</Text>
//         <Text style={styles.vaccination} >{physicalHealth.vaccinationStatus}</Text>
//       </View>

//       <View style={styles.container}>
//         <View style={styles.ageSexStatusContainer}>
//           <View style={styles.ageSexStatusItem}>
//             <Text style={styles.age}>Age</Text>
//             <Text style={styles.months}>{basicInfo.age}</Text>
//           </View>
//           <View style={styles.ageSexStatusItem}>
//             <Text style={styles.age}>Sex</Text>
//             <Text style={styles.months}>{basicInfo.gender}</Text>
//           </View>
//           <View style={styles.ageSexStatusItem}>
//             <Text style={styles.age}>Status</Text>
//             <Text style={styles.months}>{personalityAndAvailability.availabilityStatus}</Text>
//           </View>
//         </View>
//         <View style={styles.aboutMamuContainer}>
//           <Text style={styles.aboutMamu}>About {basicInfo.catName} </Text>
//           <Text style={styles.provideTheCatContainer}>
//             <Text style={styles.provideTheCat}>
//               {personalityAndAvailability.description}
//             </Text>
//           </Text>
//         </View>
//       </View>

//       <TouchableOpacity style={styles.contactMeWrapper} onPress={handleContactMe}>
//         <Text style={styles.contactMe}>Contact me</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   maincontainer: {
//     height: '100%',
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   container: {
//     height: '28%', // Adjust based on your design
//   },
//   catConnect: {
//     fontSize: 24,
//     fontFamily: 'Poppins-SemiBold',
//     color: '#47c1ff',
//     marginTop: 5,
//     position: 'absolute'
//   },
//   notificationIcon: {
//     width: 30,
//     height: 30,
//     position: "absolute",
//     right: 0,
//   },
//   rectangleBackground: {
//     alignSelf: "center",
//     width: "100%",
//     height: "35%",
//     position: "absolute",
//     borderRadius: 20,
//     marginTop: 70,
//   },
//   catInfoContainer: {
//     marginTop: '100%', // Adjust based on your design
//   },
//   mamoonKhan: {
//     fontSize: 20,
//     fontFamily: 'Poppins-SemiBold',
//     color: '#7e7e7e',
//     marginBottom: 5,
//   },
//   persianCoated: {
//     fontSize: 16,
//     fontFamily: 'Poppins-Medium',
//     color: '#7e7e7e',
//   },
//   vaccination: {
//     fontSize: 16,
//     fontFamily: 'Popins-Medium',
//     color: '#7e7e7e',
//     position: 'absolute',
//     right: 0,
//     top: '60%', // Adjust based on your design
//   },
//   ageSexStatusContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: '4%', // Adjust based on your design
//   },
//   ageSexStatusItem: {
//     alignItems: "center",
//     marginHorizontal: 15,
//     backgroundColor: '#F5F5F5',
//     borderRadius: 10,
//     padding: 5,
//     width: '28%'
//   },
//   age: {
//     fontSize: 16,
//     fontFamily: 'Poppins-SemiBold',
//     color: '#212529',
//   },
//   months: {
//     fontSize: 16,
//     fontFamily: 'Poppns-Medium',
//     color: '#212529',
//   },
//   aboutMamuContainer: {
//     marginTop: '6%', // Adjust based on your design
//     alignSelf: "flex-start",
//   },
//   aboutMamu: {
//     fontSize: 16,
//     fontFamily: 'Poppins-SemiBold',
//     color: '#212529',
//   },
//   provideTheCatContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   provideTheCat: {
//     flex: 1,
//     fontSize: 16,
//     fontFamily: 'Poppins-Regular',
//     color: '#7e7e7e',
//   },
//   contactMeWrapper: {
//     backgroundColor: '#47c1ff',
//     padding: 15,
//     borderRadius: 24, // Adjust based on your design
//     alignItems: 'center',
//     position: 'relative',
//     left: '25%',
//     width: '55%',
//   },
//   contactMe: {
//     fontSize: 16,
//     fontFamily: 'Poppins-SemiBold',
//     color: '#fff',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//     zIndex: 1,
//   },
//   backImage: {
//     width: 24,
//     height: 24,
//   },
// });

// export default CatScreen;





 // // Assuming fetchCatProfilesFromFirestore retrieves all cat profiles data
        // // const allCatProfilesData = await fetchCatProfilesFromFirestore();
        // // console.log('allCatProfilesData------------->', allCatProfilesData)
        // console.log('fetchedUsers-------------->', fetchedUsers)
        // const catprofileforuser = await fetchCatProfilesForUser(fetchedUsers.id)


        // console.log('allCatProfilesID------------->', catProfile)

        // const filteredUsers = fetchedUsers.filter(user => {
        //   const matchingCatProfile = catProfile.find(catProfile => catProfile.id === user.catProfile);
        //   return matchingCatProfile && matchingCatProfile.catProfile === catProfile;
        // });


        // console.log('filteredUsers----------------------->', filteredUsers)

// const [users, setUsers] = useState([]);

// useEffect(() => {
//   const fetchUsers = async () => {
//     try {
//       const userSnapshot = await firestore().collection('users').get();
//       const fetchedUsers = userSnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       let foundUserId = null;

//       // Iterate through fetched users to find the user with the cat profile
//       for (const user of fetchedUsers) {
//         const catProfilesSnapshot = await firestore()
//           .collection('users')
//           .doc(user.id)
//           .collection('CatProfiles')
//           .get();

//         // Check if the current user has the cat profile
//         catProfilesSnapshot.forEach(catProfileDoc => {
//           // Get the ID of the cat profile document in Firestore
//           const catProfileId = catProfileDoc.id;



//           // Compare the cat profile ID with the ID of the cat profile being displayed
//           if (catProfileId === catProfile.id) {
//             // If cat profile matches, set the found user ID
//             foundUserId = user.id;
//           }
//         });

//         // console.log('foundUserId----->', foundUserId)

//         // If user with cat profile found, break the loop
//         if (foundUserId) break;
//       }

//       // If a user with the cat profile is found, set the user ID to state
//       if (foundUserId) {
//         setUsers([foundUserId]);
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };
//   fetchUsers();
// }, [catProfile]);

// import firestore from '@react-native-firebase/firestore';
// import { fetchCatProfilesForUser } from '../../Services/firebase';
// CatScreen.js

















// import React, { useState, useEffect } from 'react';
// import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import { useNavigation } from '@react-navigation/native';
// import ChatUsers from '../Chat/ChatUsers'; // Import the ChatUsers component

// const CatScreen = ({ route }) => {
//   const navigation = useNavigation();

//   const { catProfile } = route.params;
//   const basicInfo = catProfile.basicInfo || {};
//   const personalityAndAvailability = catProfile.personalityAndAvailability || {};
//   const physicalHealth = catProfile.physicalHealth || {};
//   const pics = catProfile.mediaUpload?.mediaList || [];

//   const userId = catProfile.user_id; // Assuming userId is catProfile.user_id
//   const handleContactMe = () => {
//     console.log('user_id----------:', userId);
//     navigation.navigate('UserChat', { catProfileId: userId });
//   };

//   return (
//     <View style={styles.maincontainer}>
//       <TouchableOpacity onPress={(event) => handleGoBack(event)} style={styles.backButton}>
//         <Image
//           source={require("../../../assets/Catassets/back.png")}
//           style={styles.backImage}
//         />
//       </TouchableOpacity>
//       <View>
//         <Text style={[styles.catConnect]}>
//           Cat Connect
//         </Text>
//       </View>

//       {pics.length > 0 ? (
//         <Image
//           style={styles.rectangleBackground}
//           source={{ uri: pics[0] }}
//         />
//       ) : (
//         <Text>No cat profile picture available</Text>
//       )}

//       <View style={styles.catInfoContainer}>
//         <Text style={styles.mamoonKhan}>{basicInfo.catName}</Text>
//         <Text style={styles.persianCoated}>{basicInfo.breed}</Text>
//         <Text style={styles.vaccination} >{physicalHealth.vaccinationStatus}</Text>
//       </View>

//       <View style={styles.container}>
//         <View style={styles.ageSexStatusContainer}>
//           <View style={styles.ageSexStatusItem}>
//             <Text style={styles.age}>Age</Text>
//             <Text style={styles.months}>{basicInfo.age}</Text>
//           </View>
//           <View style={styles.ageSexStatusItem}>
//             <Text style={styles.age}>Sex</Text>
//             <Text style={styles.months}>{basicInfo.gender}</Text>
//           </View>
//           <View style={styles.ageSexStatusItem}>
//             <Text style={styles.age}>Status</Text>
//             <Text style={styles.months}>{personalityAndAvailability.availabilityStatus}</Text>
//           </View>
//         </View>
//         <View style={styles.aboutMamuContainer}>
//           <Text style={styles.aboutMamu}>About {basicInfo.catName} </Text>
//           <Text style={styles.provideTheCatContainer}>
//             <Text style={styles.provideTheCat}>
//               {personalityAndAvailability.description}
//             </Text>
//           </Text>
//         </View>
//       </View>


//       <TouchableOpacity style={styles.contactMeWrapper} onPress={handleContactMe}>
//         <Text style={styles.contactMe}>Contact me</Text>
//         <ChatUsers userId={userId} />

//       </TouchableOpacity>
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   maincontainer: {
//     height: '100%',
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   container: {
//     height: '28%', // Adjust based on your design
//   },
//   catConnect: {
//     fontSize: 24,
//     fontFamily: 'Poppins-SemiBold',
//     color: '#47c1ff',
//     marginTop: 5,
//     position: 'absolute'
//   },
//   notificationIcon: {
//     width: 30,
//     height: 30,
//     position: "absolute",
//     right: 0,
//   },
//   rectangleBackground: {
//     alignSelf: "center",
//     width: "100%",
//     height: "35%",
//     position: "absolute",
//     borderRadius: 20,
//     marginTop: 70,
//   },
//   catInfoContainer: {
//     marginTop: '100%', // Adjust based on your design
//   },
//   mamoonKhan: {
//     fontSize: 20,
//     fontFamily: 'Poppins-SemiBold',
//     color: '#7e7e7e',
//     marginBottom: 5,
//   },
//   persianCoated: {
//     fontSize: 16,
//     fontFamily: 'Poppins-Medium',
//     color: '#7e7e7e',
//   },
//   vaccination: {
//     fontSize: 16,
//     fontFamily: 'Popins-Medium',
//     color: '#7e7e7e',
//     position: 'absolute',
//     right: 0,
//     top: '60%', // Adjust based on your design
//   },
//   ageSexStatusContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: '4%', // Adjust based on your design
//   },
//   ageSexStatusItem: {
//     alignItems: "center",
//     marginHorizontal: 15,
//     backgroundColor: '#F5F5F5',
//     borderRadius: 10,
//     padding: 5,
//     width: '28%'
//   },
//   age: {
//     fontSize: 16,
//     fontFamily: 'Poppins-SemiBold',
//     color: '#212529',
//   },
//   months: {
//     fontSize: 16,
//     fontFamily: 'Poppns-Medium',
//     color: '#212529',
//   },
//   aboutMamuContainer: {
//     marginTop: '6%', // Adjust based on your design
//     alignSelf: "flex-start",
//   },
//   aboutMamu: {
//     fontSize: 16,
//     fontFamily: 'Poppins-SemiBold',
//     color: '#212529',
//   },
//   provideTheCatContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   provideTheCat: {
//     flex: 1,
//     fontSize: 16,
//     fontFamily: 'Poppins-Regular',
//     color: '#7e7e7e',
//   },
//   contactMeWrapper: {
//     backgroundColor: '#47c1ff',
//     padding: 15,
//     borderRadius: 24, // Adjust based on your design
//     alignItems: 'center',
//     position: 'relative',
//     left: '25%',
//     width: '55%',
//   },
//   contactMe: {
//     fontSize: 16,
//     fontFamily: 'Poppins-SemiBold',
//     color: '#fff',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//     zIndex: 1,
//   },
//   backImage: {
//     width: 24,
//     height: 24,
//   },
// });

// export default CatScreen;











// import React, { useState, useEffect } from 'react';
// import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import { useNavigation } from '@react-navigation/native';
// import ChatUsers from '../Chat/ChatUsers'; // Import the ChatUsers component

// const CatScreen = ({ route }) => {
//   const navigation = useNavigation();

//   const { catProfile } = route.params;
//   const basicInfo = catProfile.basicInfo || {};
//   const personalityAndAvailability = catProfile.personalityAndAvailability || {};
//   const physicalHealth = catProfile.physicalHealth || {};
//   const pics = catProfile.mediaUpload?.mediaList || [];

//   const userId = catProfile.user_id; // Assuming userId is catProfile.user_id
//   const handleContactMe = () => {
//     console.log('user_id----------:', userId);
//     navigation.navigate('UserChat', { catProfileId: userId });
//   };

//   return (
//     <View style={styles.maincontainer}>
//       <TouchableOpacity onPress={(event) => handleGoBack(event)} style={styles.backButton}>
//         <Image
//           source={require("../../../assets/Catassets/back.png")}
//           style={styles.backImage}
//         />
//       </TouchableOpacity>
//       <View>
//         <Text style={[styles.catConnect]}>
//           Cat Connect
//         </Text>
//       </View>

//       {pics.length > 0 ? (
//         <Image
//           style={styles.rectangleBackground}
//           source={{ uri: pics[0] }}
//         />
//       ) : (
//         <Text>No cat profile picture available</Text>
//       )}

//       <View style={styles.catInfoContainer}>
//         <Text style={styles.mamoonKhan}>{basicInfo.catName}</Text>
//         <Text style={styles.persianCoated}>{basicInfo.breed}</Text>
//         <Text style={styles.vaccination} >{physicalHealth.vaccinationStatus}</Text>
//       </View>

//       <View style={styles.container}>
//         <View style={styles.ageSexStatusContainer}>
//           <View style={styles.ageSexStatusItem}>
//             <Text style={styles.age}>Age</Text>
//             <Text style={styles.months}>{basicInfo.age}</Text>
//           </View>
//           <View style={styles.ageSexStatusItem}>
//             <Text style={styles.age}>Sex</Text>
//             <Text style={styles.months}>{basicInfo.gender}</Text>
//           </View>
//           <View style={styles.ageSexStatusItem}>
//             <Text style={styles.age}>Status</Text>
//             <Text style={styles.months}>{personalityAndAvailability.availabilityStatus}</Text>
//           </View>
//         </View>
//         <View style={styles.aboutMamuContainer}>
//           <Text style={styles.aboutMamu}>About {basicInfo.catName} </Text>
//           <Text style={styles.provideTheCatContainer}>
//             <Text style={styles.provideTheCat}>
//               {personalityAndAvailability.description}
//             </Text>
//           </Text>
//         </View>
//       </View>


//       <TouchableOpacity style={styles.contactMeWrapper} onPress={handleContactMe}>
//         <Text style={styles.contactMe}>Contact me</Text>
//         <ChatUsers userId={userId} />

//       </TouchableOpacity>
//     </View>
//   );
// };



// const styles = StyleSheet.create({
//   maincontainer: {
//     height: '100%',
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   container: {
//     height: '28%', // Adjust based on your design
//   },
//   catConnect: {
//     fontSize: 24,
//     fontFamily: 'Poppins-SemiBold',
//     color: '#47c1ff',
//     marginTop: 5,
//     position: 'absolute'
//   },
//   notificationIcon: {
//     width: 30,
//     height: 30,
//     position: "absolute",
//     right: 0,
//   },
//   rectangleBackground: {
//     alignSelf: "center",
//     width: "100%",
//     height: "35%",
//     position: "absolute",
//     borderRadius: 20,
//     marginTop: 70,
//   },
//   catInfoContainer: {
//     marginTop: '100%', // Adjust based on your design
//   },
//   mamoonKhan: {
//     fontSize: 20,
//     fontFamily: 'Poppins-SemiBold',
//     color: '#7e7e7e',
//     marginBottom: 5,
//   },
//   persianCoated: {
//     fontSize: 16,
//     fontFamily: 'Poppins-Medium',
//     color: '#7e7e7e',
//   },
//   vaccination: {
//     fontSize: 16,
//     fontFamily: 'Popins-Medium',
//     color: '#7e7e7e',
//     position: 'absolute',
//     right: 0,
//     top: '60%', // Adjust based on your design
//   },
//   ageSexStatusContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: '4%', // Adjust based on your design
//   },
//   ageSexStatusItem: {
//     alignItems: "center",
//     marginHorizontal: 15,
//     backgroundColor: '#F5F5F5',
//     borderRadius: 10,
//     padding: 5,
//     width: '28%'
//   },
//   age: {
//     fontSize: 16,
//     fontFamily: 'Poppins-SemiBold',
//     color: '#212529',
//   },
//   months: {
//     fontSize: 16,
//     fontFamily: 'Poppns-Medium',
//     color: '#212529',
//   },
//   aboutMamuContainer: {
//     marginTop: '6%', // Adjust based on your design
//     alignSelf: "flex-start",
//   },
//   aboutMamu: {
//     fontSize: 16,
//     fontFamily: 'Poppins-SemiBold',
//     color: '#212529',
//   },
//   provideTheCatContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   provideTheCat: {
//     flex: 1,
//     fontSize: 16,
//     fontFamily: 'Poppins-Regular',
//     color: '#7e7e7e',
//   },
//   contactMeWrapper: {
//     backgroundColor: '#47c1ff',
//     padding: 15,
//     borderRadius: 24, // Adjust based on your design
//     alignItems: 'center',
//     position: 'relative',
//     left: '25%',
//     width: '55%',
//   },
//   contactMe: {
//     fontSize: 16,
//     fontFamily: 'Poppins-SemiBold',
//     color: '#fff',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//     zIndex: 1,
//   },
//   backImage: {
//     width: 24,
//     height: 24,
//   },
// });

// export default CatScreen;




import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from "react-native"; // Add Keyboard import
import { useNavigation } from '@react-navigation/native';
import ChatUsers from '../Chat/ChatUsers'; // Import the ChatUsers component
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; // Import firestore

const CatScreen = ({ route }) => {
  const navigation = useNavigation();

  const { catProfile } = route.params;
  const basicInfo = catProfile.basicInfo || {};
  const personalityAndAvailability = catProfile.personalityAndAvailability || {};
  const physicalHealth = catProfile.physicalHealth || {};
  const pics = catProfile.mediaUpload?.mediaList || [];

  const userId = catProfile.user_id; // Assuming userId is catProfile.user_id
  const currentUser = auth().currentUser; // Get the current user

  const [comment, setComment] = useState(''); // State to store the comment
  const [comments, setComments] = useState([]); // State to store comments
  const [keyboardOpen, setKeyboardOpen] = useState(false); // State to track keyboard open/close

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardOpen(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardOpen(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Function to load comments from Firestore
  const loadComments = async () => {
    const commentsRef = firestore().collection('comments').where('catProfileId', '==', catProfile.id);
    const snapshot = await commentsRef.get();
    const commentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setComments(commentsData);
  };

  useEffect(() => {
    loadComments();
  }, []); // Load comments when component mounts

  const handleContactMe = () => {
    console.log('user_id----------:', userId);
    navigation.navigate('UserChat', { catProfileId: userId });
  };

  const handleAddComment = async () => {
    if (comment.trim() === '') {
      alert('Please enter a comment');
      return;
    }

    await firestore().collection('comments').add({
      comment: comment,
      catProfileId: catProfile.id, // Store the cat profile ID
      userId: currentUser.uid, // Store the current user's ID
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    setComment(''); // Clear the comment input
    // Reload comments after adding a new comment
    loadComments();
  };
  return (
    <KeyboardAvoidingView
      style={styles.maincontainer}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <TouchableOpacity onPress={(event) => handleGoBack(event)} style={styles.backButton}>
        <Image source={require("../../../assets/Catassets/back.png")} style={styles.backImage} />
      </TouchableOpacity>
      <View>
        <Text style={styles.catConnect}>Cat Connect</Text>
      </View>

      {pics.length > 0 ? (
        <Image
          style={styles.rectangleBackground}
          source={{ uri: pics[0] }}
        />
      ) : (
        <Text>No cat profile picture available</Text>
      )}

      <View style={styles.catInfoContainer}>
        <Text style={styles.mamoonKhan}>{basicInfo.catName}</Text>
        <Text style={styles.persianCoated}>{basicInfo.breed}</Text>
        <Text style={styles.vaccination}>{physicalHealth.vaccinationStatus}</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.ageSexStatusContainer}>
          <View style={styles.ageSexStatusItem}>
            <Text style={styles.age}>Age</Text>
            <Text style={styles.months}>{basicInfo.age}</Text>
          </View>
          <View style={styles.ageSexStatusItem}>
            <Text style={styles.age}>Sex</Text>
            <Text style={styles.months}>{basicInfo.gender}</Text>
          </View>
          <View style={styles.ageSexStatusItem}>
            <Text style={styles.age}>Status</Text>
            <Text style={styles.months}>{personalityAndAvailability.availabilityStatus}</Text>
          </View>
        </View>
        <View style={styles.aboutMamuContainer}>
          <Text style={styles.aboutMamu}>About {basicInfo.catName} </Text>
          <Text style={styles.provideTheCatContainer}>
            <Text style={styles.provideTheCat}>
              {personalityAndAvailability.description}
            </Text>
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.contactMeWrapper} onPress={handleContactMe}>
        <Text style={styles.contactMe}>Contact me</Text>
        <ChatUsers userId={userId} />
      </TouchableOpacity>

      <ScrollView style={styles.commentContainer}>
        {comments.map(comment => (
          <View key={comment.id} style={styles.commentItem}>
            <Text>{comment.comment}</Text>
            <Text>By: {comment.userId}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Fixed container for comment input and button */}
      <View style={styles.fixedCommentContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment"
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.addCommentButton} onPress={handleAddComment}>
          <Text style={styles.addCommentButtonText}>Add Comment</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  container: {
    flex: 1,
  },
  catConnect: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#47c1ff',
    marginTop: 5,
    position: 'absolute'
  },
  notificationIcon: {
    width: 30,
    height: 30,
    position: "absolute",
    right: 0,
  },
  rectangleBackground: {
    alignSelf: "center",
    width: "100%",
    height: "35%",
    position: "absolute",
    borderRadius: 20,
    marginTop: 70,
  },
  catInfoContainer: {
    marginTop: '100%', // Adjust based on your design
  },
  mamoonKhan: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#7e7e7e',
    marginBottom: 5,
  },
  persianCoated: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#7e7e7e',
  },
  vaccination: {
    fontSize: 16,
    fontFamily: 'Popins-Medium',
    color: '#7e7e7e',
    position: 'absolute',
    right: 0,
    top: '60%', // Adjust based on your design
  },
  ageSexStatusContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: '4%', // Adjust based on your design
  },
  ageSexStatusItem: {
    alignItems: "center",
    marginHorizontal: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 5,
    width: '28%'
  },
  age: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#212529',
  },
  months: {
    fontSize: 16,
    fontFamily: 'Poppns-Medium',
    color: '#212529',
  },
  aboutMamuContainer: {
    marginTop: '6%', // Adjust based on your design
    alignSelf: "flex-start",
  },
  aboutMamu: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#212529',
  },
  provideTheCatContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  provideTheCat: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#7e7e7e',
  },
  contactMeWrapper: {
    backgroundColor: '#47c1ff',
    padding: 10,
    borderRadius: 5, // Adjust based on your design
    alignItems: 'center',
    width: '60%', // Adjusted to take less width
    alignSelf: 'flex-end', // Center the button alignSelf: 'flex-end',
    marginTop: 10, // Adjusted to add margin top
  },
  contactMe: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backImage: {
    width: 24,
    height: 24,
  },
  commentContainer: {
    flex: 1,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  commentItem: {
    marginBottom: 10,
  },
  commentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },
  addCommentButton: {
    backgroundColor: '#47c1ff',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  addCommentButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  fixedCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default CatScreen;
