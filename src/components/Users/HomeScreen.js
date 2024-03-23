








// // ./src/Screen/HomeScreen.js
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Share,
// } from 'react-native';

// import { createStackNavigator } from '@react-navigation/stack';
// import { useNavigation } from '@react-navigation/native';
// import HomeIcon from 'react-native-vector-icons/Feather';
// import DoctorIcon from 'react-native-vector-icons/FontAwesome';
// import ChatIcon from 'react-native-vector-icons/Ionicons';
// import ProfileIcon from 'react-native-vector-icons/Feather';
// import SearchIcon from 'react-native-vector-icons/MaterialIcons';
// import auth from '@react-native-firebase/auth';
// import { fetchApproveCatProfile, fetchUserDataFromFirestore, userNotifications } from '../../Services/firebase';
// import { updateNotificationFromFirestore } from '../../Services/firebase';

// const Stack = createStackNavigator();

// const HomeScreen = ({ navigation }) => {
//   const [searchText, setSearchText] = useState('');
//   const [catProfiles, setCatProfiles] = useState([]);
//   const [userData, setUserData] = useState({});
//   const [filteredCatProfiles, setFilteredCatProfiles] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
//   const [haReadNotifications, setHasReadNotifications] = useState(false);


//   const user = auth().currentUser;



//   useEffect(() => {
//     const checkAuthentication = async () => {
//       try {
//         // Fetch user data
//         const userDoc = await fetchUserDataFromFirestore(user.uid);

//         if (userDoc.exists) {
//           setUserData(userDoc.data());
//         } else {
//           console.log('User document does not exist in Firestore(home screen).');
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     checkAuthentication();
//   }, [user, navigation]);

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       try {
//         const profiles = await fetchApproveCatProfile();
//         if (profiles && profiles.length > 0) { // Check if profiles is defined and not empty
//           const profilesData = profiles.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }));


//           console.log('catProfiles--<:', profilesData);

//           setCatProfiles(profilesData);
//         }
//       } catch (error) {
//         console.error('Error fetching cat profiles:', error);
//       }
//     };

//     fetchProfiles();
//   }, []);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {

//         const unreadNotificationsSnapshot = await userNotifications(user.uid, 'unread');

//         const readNotificationsSnapshot = await userNotifications(user.uid, 'read');


//         const unreadNotificationsData = unreadNotificationsSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         const readNotificationsData = readNotificationsSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         setNotifications(unreadNotificationsData);
//         setHasUnreadNotifications(unreadNotificationsData.length > 0);
//         setHasReadNotifications(readNotificationsData.length > 0);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       }
//     };

//     fetchNotifications();
//   }, [user.uid]);
//   const handleNotificationPress = async () => {
//     try {
//       // Mark all unread notifications as read
//       await markAllAsRead();

//       // Navigate to NotificationsScreen
//       navigation.navigate('NotificationsScreen', { notifications: [], markAsRead: markAllAsRead });
//     } catch (error) {
//       console.error('Error handling notification press:', error);
//     }
//   };

//   const markAllAsRead = async () => {
//     try {
//       // Mark all unread notifications as read
//       await Promise.all(
//         notifications.map(async (notification) => {
//           await updateNotificationFromFirestore(notification.id, 'read')
//           // await firestore().collection('Notifications').doc(notification.id).update({
//           //   status: 'read',
//           // });
//         })
//       );

//       // Update state to reflect that all notifications have been read
//       setNotifications([]);
//       setHasUnreadNotifications(false);
//       setHasReadNotifications(false);
//     } catch (error) {
//       console.error('Error marking all notifications as read:', error);
//     }
//   };

//   const handleSearch = (text) => {
//     setSearchText(text);

//     const filteredProfiles = catProfiles.filter((catProfile) => {
//       const catName = catProfile['1'].basicInfo.catName.toLowerCase();
//       return catName.includes(text.toLowerCase());
//     });

//     setFilteredCatProfiles(filteredProfiles);
//   };

//   const handleCatProfilePress = async (catProfile) => {
//     try {

//       // Fetch the user ID associated with the cat profile
//       //const userId = await fetchUserDataFromFirestore(user.uid);
//       console.log('catProfile homes----->', catProfile)
//       navigation.navigate('CatScreen', { catProfile });
//     } catch (error) {
//       console.error('Error navigating to CatScreen:', error);
//     }
//   };

//   const handleShareCatProfile = (catProfile) => {
//     // Implement share functionality here
//     console.log("Sharing cat profile:", catProfile);
//     (async () => {
//       try {
//         const result = await Share.share({
//           message: `Check out this cat profile: ${catProfile.basicInfo.catName}`,
//           url: catProfile.mediaUpload.mediaList[0], // Assuming first image is the shareable content
//         });

//         if (result.action === Share.sharedAction) {
//           if (result.activityType) {
//             console.log(`Shared via ${result.activityType}`);
//           } else {
//             console.log('Shared');
//           }
//         } else if (result.action === Share.dismissedAction) {
//           console.log('Dismissed');
//         }
//       } catch (error) {
//         console.error('Error sharing:', error.message);
//       }
//     })();
//   };

//   const renderRecommendedItems = () => {
//     const category1 = 'New';
//     const category2 = 'Recommended';
//     const category3 = 'Persian';
//     const category4 = 'Colico';
//     const category5 = 'Himalayan';
//     const category6 = 'Black Contrast';

//     const handleCategoryPress = (category) => {
//       // Handle the onPress event for the categories if needed
//       console.log(`Category ${category} pressed`);
//       // Navigate to CatProfileRecommendationScreen
//       navigation.navigate('CatProfileRecommendationScreen');
//     };


//     return (
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.recommendedScrollContainer}
//       >
//         {/* First set of recommended items with blue background */}
//         <TouchableOpacity
//           style={styles.recommendedItem}
//           onPress={() => handleCategoryPress(category1)}
//         >
//           <Text style={{ ...styles.recommendedText, color: 'white' }}>{category1}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.recommendedItem2}
//           onPress={() => handleCategoryPress(category2)}
//         >
//           <Text style={{ ...styles.recommendedText, color: '#7E7E7E' }}>{category2}</Text>
//         </TouchableOpacity>

//         {/* Second set of recommended items with white background */}
//         <TouchableOpacity
//           style={styles.recommendedItem2}
//           onPress={() => handleCategoryPress(category3)}
//         >
//           <Text style={{ ...styles.recommendedText, color: '#7E7E7E' }}>{category3}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.recommendedItem2}
//           onPress={() => handleCategoryPress(category4)}
//         >
//           <Text style={{ ...styles.recommendedText, color: '#7E7E7E' }}>{category4}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.recommendedItem2}
//           onPress={() => handleCategoryPress(category5)}
//         >
//           <Text style={{ ...styles.recommendedText, color: '#7E7E7E' }}>{category5}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.recommendedItem2}
//           onPress={() => handleCategoryPress(category6)}
//         >
//           <Text style={{ ...styles.recommendedText, color: '#7E7E7E' }}>{category6}</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     );
//   };


//   const renderPetCard = (catProfile) => {
//     // console.log(catProfile);
//     if (!catProfile) {
//       console.log('no cat profile')
//       return (
//         <View key="noData" style={styles.petCard}>
//           <Text>No cat profile data available</Text>
//         </View>
//       );
//     }

//     const basicInfo = catProfile.basicInfo || {};
//     const personalityAndAvailability = catProfile.personalityAndAvailability || {};
//     const pics = catProfile.mediaUpload?.mediaList || [];

//     return (
//       <TouchableOpacity
//         key={basicInfo.catName}
//         style={styles.petCard}
//         onPress={() => handleCatProfilePress(catProfile)}
//       >
//         <View style={styles.imageContainer}>
//           {pics.length > 0 &&
//             pics[0] ? (
//             <Image
//               style={styles.thumbnailImage}
//               source={{ uri: pics[0] }}
//             />
//           ) : (
//             <Text>No cat profile picture available</Text>
//           )}
//         </View>
//         <View style={styles.cardContent}>
//           <Text style={styles.petName}>{basicInfo.catName}</Text>
//           <Text style={styles.breed}>{basicInfo.breed}</Text>
//           <Text style={styles.available}>{personalityAndAvailability.availabilityStatus}</Text>
//           <Image
//             style={styles.hearticon}
//             resizeMode="cover"
//             source={require("../../../assets/Catassets/hearts.png")}
//           />
//         </View>
//         <TouchableOpacity onPress={() => handleShareCatProfile(catProfile)}>
//           <Image
//             style={styles.shareIcon}
//             resizeMode="cover"
//             source={require("../../../assets/Catassets/share.png")}
//           />
//         </TouchableOpacity>
//       </TouchableOpacity>
//     );
//   };


//   return (
//     <View style={styles.container}>
//       <View style={styles.content}>
//       </View>
//       <View style={styles.header1}>
//         <Text style={styles.greeting}>Hello {userData.firstname || ''} 👋</Text>
//         {/* <Image
//           style={styles.handicon}
//           resizeMode="cover"
//           source={require("../../assets/Catassets/hand.png")}
//         /> */}
//       </View>
//       <View style={styles.header}>
//         <Text style={styles.greeting}>Select Best Breed For Your Cat </Text>
//       </View>
//       <View style={styles.searchContainer}>
//         <View style={styles.searchInputContainer}>
//           <SearchIcon name="search" size={25} style={{ marginLeft: 10 }} color="#9F9F9F" />
//           <TextInput
//             placeholder="Search..."
//             placeholderTextColor="#9F9F9F"
//             onChangeText={handleSearch}
//             value={searchText}
//             style={styles.searchInput}
//           />
//           <Image
//             style={styles.filtericon}
//             resizeMode="cover"
//             source={require("../../../assets/Catassets/filter.png")}
//           />
//         </View>
//         <View style={styles.recommendedContainer}>{renderRecommendedItems()}</View>
//       </View>


//       <TouchableOpacity style={styles.notifibutton} onPress={handleNotificationPress}>
//         <Image
//           style={styles.NotificationIcon}
//           resizeMode="cover"
//           source={require("../../../assets/Catassets/notification.png")}
//         />
//         {hasUnreadNotifications && <View style={styles.unreadDot} />}
//         {haReadNotifications && <View style={styles.readDot} />}
//       </TouchableOpacity>

//       <ScrollView>
//         {searchText.trim() !== ''
//           ? filteredCatProfiles.map((catProfile) => renderPetCard(catProfile))
//           : catProfiles.map((catProfile) => renderPetCard(catProfile))}
//       </ScrollView>
//       <View style={styles.bottomMenu}>
//         <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
//           <HomeIcon name="home" size={24} color="#47C1FF" />
//           <Text style={{ ...styles.menuText, color: '#47C1FF' }}>Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SelectDoctor')}>
//           <DoctorIcon name="stethoscope" size={24} color="#9F9F9F" />
//           <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Doctor</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ChatUsers')}>
//           <ChatIcon name="chatbox-ellipses-outline" size={24} color="#9F9F9F" />
//           <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Chat</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProfileScreen')}>
//           <ProfileIcon name="user" size={24} color="#9F9F9F" />
//           <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Profile</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   header1: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   greeting: {
//     fontSize: 20,
//     fontFamily: 'Poppins-SemiBold',
//     color: '#212529',
//     flex: 1,
//     flexDirection: 'row',
//   },
//   handicon: {
//     flex: 1,
//     flexDirection: 'row',
//     width: 30,
//     height: 30,
//     position: "absolute",
//     left: 125,
//   },
//   filtericon: {
//     width: 25,
//     height: 25,
//     position: "absolute",
//     right: 10,
//     margin: 10,
//     borderRadius: 10,
//     borderWidth: 1,
//   },
//   NotificationIcon: {
//     width: 30,
//     height: 30,
//     position: "absolute",
//     right: 10,
//     top: 5,
//   },
//   hearticon: {
//     width: 110,
//     height: 15,
//     position: "absolute",
//     top: 79,
//   },
//   subText: {
//     fontSize: 20,
//     fontFamily: 'Poppins-SemiBold',
//     color: '#212529',
//   },
//   recommendedContainer: {
//     marginTop: 16,
//   },
//   recommendedScrollContainer: {
//     paddingRight: 16,
//   },
//   recommendedItem: {
//     backgroundColor: 'white',
//     paddingTop: 10,
//     paddingLeft: 17,
//     paddingRight: 17,
//     marginRight: 10,
//     borderRadius: 20,
//     backgroundColor: '#47C1FF',
//   },
//   recommendedItem2: {
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 15,
//     marginRight: 10,
//     borderRadius: 20,
//   },
//   recommendedText: {
//     fontFamily: 'Poppins-SemiBold',
//     fontSize: 13,
//   },
//   notifibutton: {
//     paddingTop: 5,
//     paddingBottom: 5,
//     paddingLeft: 14,
//     paddingRight: 14,
//     borderRadius: 20,
//     marginTop: 10,
//     alignItems: 'center',
//     position: 'absolute',
//     top: 10,
//     right: 10,
//   },
//   unreadDot: {
//     position: 'absolute',
//     top: 5,
//     right: 25,
//     backgroundColor: '#47C1FF',
//     width: 12,
//     height: 10,
//     borderRadius: 5,
//   },
//   readDot: {
//     position: 'absolute',
//     top: 5,
//     right: 25,
//     width: 12,
//     height: 10,
//     borderRadius: 5,
//   },
//   searchInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderColor: '#fff',
//     backgroundColor: '#fff',
//     width: '100%',
//     borderWidth: 1,
//     borderRadius: 25,
//     height: 50,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 10,
//     fontFamily: 'Poppins-Regular',
//     color: '#212529',
//   },
//   searchContainer: {
//     marginTop: 16,
//   },
//   imageContainer: {
//     marginRight: 15,
//   },
//   thumbnailImage: {
//     width: 90,
//     height: 100,
//     borderRadius: 5,
//   },
//   petCardContainer: {
//     marginTop: 16,
//   },
//   petCard: {
//     display: 'flex',
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     padding: 15,
//     paddingLeft: 20,
//     borderRadius: 8,
//     margin: 12,
//     marginLeft: 0,
//     marginBottom: 2,
//     width: '100%',
//   },
//   petName: {
//     fontSize: 16,
//     marginBottom: 1,
//     color: '#212529',
//     fontFamily: 'Poppins-SemiBold',
//   },
//   breed: {
//     fontSize: 14,
//     color: '#7E7E7E',
//     marginBottom: 1,
//     fontFamily: 'Poppins-Medium',
//   },
//   available: {
//     fontSize: 14,
//     color: '#7E7E7E',
//     marginBottom: 1,
//     fontFamily: 'Poppins-SemiBold',
//   },
//   bottomMenu: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//     paddingVertical: 0, // Adjust as needed
//   },
//   // Add other styles as needed
//   menuItem: {
//     alignItems: 'center',
//   },
//   menuText: {
//     marginTop: 5, // Adjust as needed
//   },
//   shareIcon: {
//     width: 30,
//     height: 30,
//     marginLeft: 140,
//   },
// });

// export default HomeScreen;






// ./src/Screen/HomeScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Share,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import auth from '@react-native-firebase/auth';
import { fetchApproveCatProfile, fetchUserDataFromFirestore, userNotifications } from '../../Services/firebase';
import { updateNotificationFromFirestore } from '../../Services/firebase';
import CatProfileRecommendationScreen from '../Recommendation/CatProfileRecommendationScreen';
import Advertisement from './advetisement';


const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [catProfiles, setCatProfiles] = useState([]);
  const [userData, setUserData] = useState({});
  const [filteredCatProfiles, setFilteredCatProfiles] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [haReadNotifications, setHasReadNotifications] = useState(false);

  const user = auth().currentUser;

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Fetch user data
        const userDoc = await fetchUserDataFromFirestore(user.uid);

        if (userDoc.exists) {
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

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const profiles = await fetchApproveCatProfile();
        if (profiles && profiles.length > 0) { // Check if profiles is defined and not empty
          const profilesData = profiles.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));


          console.log('catProfiles--<:', profilesData);

          setCatProfiles(profilesData);
        }
      } catch (error) {
        console.error('Error fetching cat profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {

        const unreadNotificationsSnapshot = await userNotifications(user.uid, 'unread');
        const readNotificationsSnapshot = await userNotifications(user.uid, 'read');
        const unreadNotificationsData = unreadNotificationsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const readNotificationsData = readNotificationsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNotifications(unreadNotificationsData);
        setHasUnreadNotifications(unreadNotificationsData.length > 0);
        setHasReadNotifications(readNotificationsData.length > 0);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [user.uid]);
  const handleNotificationPress = async () => {
    try {
      // Mark all unread notifications as read
      await markAllAsRead();

      // Navigate to NotificationsScreen
      navigation.navigate('NotificationsScreen', { notifications: [], markAsRead: markAllAsRead });
    } catch (error) {
      console.error('Error handling notification press:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      // Mark all unread notifications as read
      await Promise.all(
        notifications.map(async (notification) => {
          await updateNotificationFromFirestore(notification.id, 'read')

        })
      );
      // Update state to reflect that all notifications have been read
      setNotifications([]);
      setHasUnreadNotifications(false);
      setHasReadNotifications(false);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);

    const filteredProfiles = catProfiles.filter((catProfile) => {
      const catName = catProfile['1'].basicInfo.catName.toLowerCase();
      return catName.includes(text.toLowerCase());
    });

    setFilteredCatProfiles(filteredProfiles);
  };

  const handleCatProfilePress = async (catProfile) => {
    try {

      console.log('catProfile homes----->', catProfile)
      navigation.navigate('CatScreen', { catProfile });
    } catch (error) {
      console.error('Error navigating to CatScreen:', error);
    }
  };

  const handleShareCatProfile = (catProfile) => {
    // Implement share functionality here
    console.log("Sharing cat profile:", catProfile);
    (async () => {
      try {
        const result = await Share.share({
          message: `Check out this cat profile: ${catProfile.basicInfo.catName}`,
          url: catProfile.mediaUpload.mediaList[0], // Assuming first image is the shareable content
        });

        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            console.log(`Shared via ${result.activityType}`);
          } else {
            console.log('Shared');
          }
        } else if (result.action === Share.dismissedAction) {
          console.log('Dismissed');
        }
      } catch (error) {
        console.error('Error sharing:', error.message);
      }
    })();
  };

  const renderPetCard = (catProfile) => {
    // console.log(catProfile);
    if (!catProfile) {
      console.log('no cat profile')
      return (
        <View key="noData" >
          <Text>No cat profile data available</Text>
        </View>
      );
    }

    const basicInfo = catProfile.basicInfo || {};
    const personalityAndAvailability = catProfile.personalityAndAvailability || {};
    const pics = catProfile.mediaUpload?.mediaList || [];

    return (
      <View style={styles.petCardContainer}>

        <TouchableOpacity
          key={basicInfo.catName}
          style={styles.petCard}
          onPress={() => handleCatProfilePress(catProfile)}>

          <View style={styles.imageContainer}>
            {pics.length > 0 &&
              pics[0] ? (
              <Image
                style={styles.thumbnailImage}
                source={{ uri: pics[0] }}
              />
            ) : (
              <Text>No cat profile picture available</Text>
            )}
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.breedName}>{basicInfo.breed}</Text>
            <Text style={styles.available}>{personalityAndAvailability.availabilityStatus}</Text>
            <Text style={styles.catName}>{basicInfo.catName}</Text>
            <TouchableOpacity onPress={() => handleShareCatProfile(catProfile)}>
              <Image
                style={styles.shareIcon}
                resizeMode="cover"
                source={require("../../../assets/Catassets/share.png")}
              />
            </TouchableOpacity>
          </View>

        </TouchableOpacity>
      </View>

    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={[{ key: 'content' }]}
        renderItem={() => (
          <View style={styles.container}>
            <View style={styles.header1}>
              <Text style={styles.greeting}>Hi {userData.firstname || ''} 👋</Text>
            </View>
            <View style={styles.header}>
              <Text style={styles.greeting2}>Find the best breed for your cat </Text>
            </View>
            <View style={styles.searchContainer}>
              <View style={styles.searchInputContainer}>
                <Image
                  style={styles.searchIcon}
                  resizeMode="cover"
                  source={require("../../../assets/Catassets/search.png")}
                />
                <TextInput
                  placeholder="Search..."
                  placeholderTextColor="#9F9F9F"
                  onChangeText={handleSearch}
                  value={searchText}
                  style={styles.searchInput}
                />
                <Image
                  style={styles.filtericon}
                  resizeMode="cover"
                  source={require("../../../assets/Catassets/filter.png")}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.notifibutton} onPress={handleNotificationPress}>
              <Image
                style={styles.NotificationIcon}
                resizeMode="cover"
                source={require("../../../assets/Catassets/alarm.png")}
              />
              {hasUnreadNotifications && <View style={styles.unreadDot} />}
              {haReadNotifications && <View style={styles.readDot} />}
            </TouchableOpacity>

            <Advertisement />

            <Text style={styles.feedText}>Feed</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={searchText.trim() !== '' ? filteredCatProfiles : catProfiles}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => renderPetCard(item)}
            />

            {hasUnreadNotifications && <View style={styles.unreadDot} />}
            {haReadNotifications && <View style={styles.readDot} />}
          </TouchableOpacity>

          <Advertisement />

          <Text style={styles.feedText}>Feed</Text>
          <FlatList
            data={[{ key: 'horizontalList' }]}
            renderItem={() => (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={searchText.trim() !== '' ? filteredCatProfiles : catProfiles}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => renderPetCard(item)}
              />
            )}
            keyExtractor={(item) => item.key}
          />
          
          <Text style={styles.feedText}>Recommended</Text>
          <CatProfileRecommendationScreen />
          
        </View>
      </ScrollView>

      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
          <Image source={require('../../../assets/Catassets/home-2.png')} style={{ width: 24, height: 24 }} />
          <Text style={{ ...styles.menuText, color: '#47C1FF' }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SelectDoctor')}>
          <Image source={require('../../../assets/Catassets/maki_doctor.png')} style={{ width: 24, height: 27 }} />
          <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Doctor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ChatUsers')}>
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
    backgroundColor: 'white'
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

  filtericon: {
    width: 25,
    height: 25,
    position: "absolute",
    right: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  NotificationIcon: {
    width: 30,
    height: 40,
    position: "absolute",
    right: 5,
  },
  searchIcon: {
    marginLeft: 10,
    width: 25,
    height: 25,
  },

  notifibutton: {
    paddingBottom: 5,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  unreadDot: {
    position: 'absolute',
    top: 5,
    right: 25,
    backgroundColor: '#47C1FF',
    width: 12,
    height: 10,
    borderRadius: 5,
  },
  readDot: {
    position: 'absolute',
    top: 5,
    right: 25,
    width: 12,
    height: 10,
    borderRadius: 5,
  },

  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#fff',
    backgroundColor: '#F5F5F5',
    width: '100%',
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Poppins-Regular',
    color: '#212529',
  },
  searchContainer: {
    marginTop: 16,
  },
  RecommendText: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#212529',
  },

  feedText: {
    marginTop: 20,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#212529',
    marginBottom: 10,
  },
  shareIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    bottom: '10%',
    right: '10%',
    marginBottom: 25,

  },
  cardContent: {
    flexDirection: 'column',
    marginLeft: 10,

  },
  petCardContainer: {
    width: 135,
    marginRight: 10,
  },
  petCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingBottom: 10,
  },

  imageContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  thumbnailImage: {
    width: '100%',
    height: 100,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },

  catName: {
    flexDirection: 'row', // Arrange items horizontally
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
    fontFamily: 'Poppins-SemiBold',
    color: '#7E7E7E',
    paddingHorizontal: 10,
    marginTop: -15,

  },
  breedName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 5,
    fontFamily: 'Poppins-SemiBold',
    backgroundColor: '#212529',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    width: '55%',
  },
  available: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 5,
    fontFamily: 'Poppins-SemiBold',
    color: '#212529',
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

export default HomeScreen;