// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import { useNavigation } from '@react-navigation/native';

// const CatProfileRecommendationScreen = () => {
//     const navigation = useNavigation();
//     const [recommendedCats, setRecommendedCats] = useState([]);
//     const N = 5; // Number of recommended cats

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const userSnapshot = await firestore().collection('users').get();
//                 const users = await Promise.all(userSnapshot.docs.map(async doc => {
//                     const user = doc.data();
//                     // Fetch cat profiles for each user
//                     const catProfilesSnapshot = await doc.ref.collection('CatProfiles').get();
//                     const catProfiles = catProfilesSnapshot.docs.map(catDoc => catDoc.data());
//                     user.catProfiles = catProfiles;
//                     return user;
//                 }));

//                 const currentUserId = 'currentUserId';
//                 const currentUser = users.find(user => user.id === currentUserId);

//                 if (currentUser && currentUser.catProfiles) {
//                     const currentUserCatProfiles = currentUser.catProfiles;
//                     const recommendedCats = recommendCats(currentUserCatProfiles, users);
//                     setRecommendedCats(recommendedCats);
//                 } else {
//                     console.log('Current user or cat profiles not found.');
//                 }
//             } catch (error) {
//                 console.error('Error fetching users and cat profiles:', error);
//             }
//         };
//         fetchData();
//     }, []);

//     // Function to calculate cosine similarity
//     const calculateCosineSimilarity = (vector1, vector2) => {
//         let dotProduct = 0;
//         let norm1 = 0;
//         let norm2 = 0;

//         for (let i = 0; i < vector1.length; i++) {
//             dotProduct += vector1[i] * vector2[i];
//             norm1 += Math.pow(vector1[i], 2);
//             norm2 += Math.pow(vector2[i], 2);
//         }

//         norm1 = Math.sqrt(norm1);
//         norm2 = Math.sqrt(norm2);

//         const similarityScore = dotProduct / (norm1 * norm2);
//         return similarityScore;
//     };

//     // Function to recommend cats based on similarity scores
//     const recommendCats = (currentUserCatProfile, users) => {
//         const similarityScores = [];

//         // Calculate similarity scores between current user's cat profile and other cat profiles
//         users.forEach(user => {
//             if (user.id !== 'currentUserId') {
//                 const similarityScore = calculateCosineSimilarity(currentUserCatProfile, user.catProfile);
//                 similarityScores.push({ userId: user.id, similarityScore });
//             }
//         });

//         // Sort similarity scores in descending order
//         similarityScores.sort((a, b) => b.similarityScore - a.similarityScore);

//         // Get top N recommended cats
//         const recommendedCats = similarityScores.slice(0, N).map(score => {
//             const user = users.find(u => u.id === score.userId);
//             return user.catProfile;
//         });

//         return recommendedCats;
//     };

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={recommendedCats}
//                 renderItem={({ item }) => (
//                     <TouchableOpacity onPress={() => navigation.navigate('CatProfiles', { catId: item.id })}>
//                         <View style={styles.catContainer}>
//                             <Image source={{ uri: item.image }} style={styles.catImage} />
//                             <Text style={styles.catName}>{item.catName}</Text>
//                         </View>
//                     </TouchableOpacity>
//                 )}
//                 keyExtractor={(item) => item.id}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     catContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
//     catImage: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         marginRight: 10,
//     },
//     catName: {
//         fontSize: 18,
//     },
// });

// export default CatProfileRecommendationScreen;







// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import { useNavigation } from '@react-navigation/native';

// const CatProfileRecommendationScreen = () => {
//     const navigation = useNavigation();
//     const [recommendedCats, setRecommendedCats] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 console.log('fetchData called');
//                 const userSnapshot = await firestore().collection('users').get();
//                 const users = await Promise.all(userSnapshot.docs.map(async doc => {
//                     const user = doc.data();
//                     console.log('User:', user); // Log user data
//                     // Fetch cat profiles for each user
//                     const catProfilesSnapshot = await doc.ref.collection('CatProfiles').get();
//                     const catProfiles = catProfilesSnapshot.docs.map(catDoc => catDoc.data());
//                     console.log('Cat Profiles:', catProfiles); // Log cat profiles for debugging
//                     user.catProfiles = catProfiles;
//                     return user;
//                 }));

//                 const currentUserId = 'currentUserId'; // Ensure this matches the current user ID
//                 const currentUser = users.find(user => user.id === currentUserId);

//                 if (currentUser && currentUser.catProfiles && currentUser.catProfiles.length > 0) {
//                     const currentUserCatProfiles = currentUser.catProfiles;
//                     const recommendedCats = recommendCats(currentUserCatProfiles, users);
//                     console.log('Recommended Cats:', recommendedCats); // Log recommended cats for debugging
//                     setRecommendedCats(recommendedCats);
//                 } else {
//                     console.log('Current user or cat profiles not found or empty.');
//                 }
//             } catch (error) {
//                 console.error('Error fetching users and cat profiles:', error);
//             }
//         };
//         fetchData();
//     }, []);
//     // Calculate cosine similarity between two cat profiles
//     const calculateCosineSimilarity = (catProfile1, catProfile2) => {
//         const vector1 = [catProfile1.pedigree, catProfile1.pattern, catProfile1.breed];
//         const vector2 = [catProfile2.pedigree, catProfile2.pattern, catProfile2.breed];

//         let dotProduct = 0;
//         let norm1 = 0;
//         let norm2 = 0;

//         for (let i = 0; i < vector1.length; i++) {
//             dotProduct += vector1[i] * vector2[i];
//             norm1 += Math.pow(vector1[i], 2);
//             norm2 += Math.pow(vector2[i], 2);
//         }

//         norm1 = Math.sqrt(norm1);
//         norm2 = Math.sqrt(norm2);

//         if (norm1 === 0 || norm2 === 0) {
//             return 0; // Avoid division by zero
//         }

//         const similarityScore = dotProduct / (norm1 * norm2);
//         return similarityScore;
//     };
//     const recommendCats = (currentUserCatProfiles, users) => {
//         const similarityScores = [];

//         users.forEach(user => {
//             if (user.id !== 'currentUserId' && user.catProfiles) {
//                 user.catProfiles.forEach(catProfile => {
//                     const similarityScore = calculateCosineSimilarity(currentUserCatProfiles[0], catProfile); // Assuming only one cat profile for the current user
//                     similarityScores.push({ userId: user.id, similarityScore, catProfile });
//                 });
//             }
//         });

//         // Sort similarity scores in descending order
//         similarityScores.sort((a, b) => b.similarityScore - a.similarityScore);

//         return similarityScores;
//     };


//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={recommendedCats}
//                 renderItem={({ item, index }) => (
//                     <TouchableOpacity onPress={() => navigation.navigate('CatProfiles', { catId: item.catProfile.id })}>
//                         <View style={styles.catContainer}>
//                             <Image source={{ uri: item.catProfile.image }} style={styles.catImage} />
//                             <View style={styles.catDetails}>
//                                 <Text style={styles.catName}>{item.catProfile.catName}</Text>
//                                 <Text style={styles.similarity}>
//                                     Similarity Score: {item.similarityScore.toFixed(2)} ({Math.round(item.similarityScore * 100)}%)
//                                 </Text>
//                             </View>
//                         </View>
//                     </TouchableOpacity>
//                 )}
//                 keyExtractor={(item, index) => index.toString()} // Use index as the key
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     catContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
//     catImage: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         marginRight: 10,
//     },
//     catDetails: {
//         flex: 1,
//         flexDirection: 'column',
//     },
//     catName: {
//         fontSize: 18,
//     },
//     similarity: {
//         fontSize: 14,
//         color: '#888',
//     },
// });

// export default CatProfileRecommendationScreen;










// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { fetchCatProfilesForUser } from '../../Services/firebase';
// import auth from '@react-native-firebase/auth';

// const CatProfileRecommendationScreen = () => {
//     const navigation = useNavigation();
//     const [recommendedCats, setRecommendedCats] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const currentUser = auth().currentUser;
//             console.log('Current User:', currentUser);

//             if (currentUser) {
//                 const userId = currentUser.uid;
//                 console.log('User ID:', userId);

//                 const catProfilesSnapshot = await fetchCatProfilesForUser(userId);

//                 if (catProfilesSnapshot && !catProfilesSnapshot.empty) {
//                     const userCatProfiles = catProfilesSnapshot.docs.map(doc => doc.data());
//                     console.log('User Cat Profiles:', userCatProfiles);

//                     if (userCatProfiles && userCatProfiles.length > 0) {
//                         const similarityScores = userCatProfiles.map(catProfile => {
//                             const similarityScore = calculateSimilarity(currentUser, catProfile);
//                             return { userId, similarityScore, catProfile };
//                         });

//                         similarityScores.sort((a, b) => b.similarityScore - a.similarityScore);
//                         console.log('Similarity Scores:', similarityScores);

//                         setRecommendedCats(similarityScores);
//                     } else {
//                         console.log('User has not created any cat profiles.');
//                         Alert.alert('No Cat Profiles', 'Please create cat profiles.');
//                     }
//                 } else {
//                     console.log('User has not created any cat profiles.');
//                     Alert.alert('No Cat Profiles', 'Please create cat profiles.');
//                 }
//             } else {
//                 console.log('No user is currently signed in.');
//                 Alert.alert('No User', 'Please sign in.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             Alert.alert('Error', 'An error occurred while fetching cat profiles.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const calculateSimilarity = (currentUser, catProfile) => {
//         const { basicInfo: currentUserBasicInfo } = catProfile;
//         const { basicInfo, physicalHealth } = catProfile;

//         const vector1 = [currentUserBasicInfo.breed, currentUserBasicInfo.pedigree, currentUserBasicInfo.pattern];
//         const vector2 = [basicInfo.breed, basicInfo.pedigree, physicalHealth.pattern];

//         let dotProduct = 0;
//         let norm1 = 0;
//         let norm2 = 0;

//         for (let i = 0; i < vector1.length; i++) {
//             dotProduct += vector1[i] * vector2[i];
//             norm1 += Math.pow(vector1[i], 2);
//             norm2 += Math.pow(vector2[i], 2);
//         }

//         norm1 = Math.sqrt(norm1);
//         norm2 = Math.sqrt(norm2);

//         if (norm1 === 0 || norm2 === 0) {
//             return 0;
//         }

//         const similarityScore = dotProduct / (norm1 * norm2);
//         return similarityScore;
//     };

//     return (
//         <View style={styles.container}>
//             {isLoading ? (
//                 <Text>Loading...</Text>
//             ) : recommendedCats.length > 0 ? (
//                 <FlatList
//                     data={recommendedCats}
//                     renderItem={({ item }) => (
//                         <TouchableOpacity onPress={() => {
//                             console.log('Navigating to CatProfiles with catId:', item.catProfile?.id);
//                             navigation.navigate('CatProfiles', { catId: item.catProfile?.id });
//                         }}>
//                             <View style={styles.catContainer}>
//                                 <Image source={item.catProfile?.image ? { uri: item.catProfile.image } : require('../../../assets/Catassets/uicon.png')} style={styles.catImage} />
//                                 <View style={styles.catDetails}>
//                                     <Text style={styles.catName}>{item.catProfile?.basicInfo?.catName || 'Unknown Cat'}</Text>
//                                     <Text style={styles.similarity}>
//                                         Similarity Score: {item.similarityScore.toFixed(2)} ({Math.round(item.similarityScore * 100)}%)
//                                     </Text>
//                                 </View>
//                             </View>
//                         </TouchableOpacity>
//                     )}
//                     keyExtractor={(item, index) => index.toString()}
//                 />
//             ) : (
//                 <Text>No recommended cats found. Please create cat profiles.</Text>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     catContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
//     catImage: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         marginRight: 10,
//     },
//     catDetails: {
//         flex: 1,
//         flexDirection: 'column',
//     },
//     catName: {
//         fontSize: 18,
//     },
//     similarity: {
//         fontSize: 14,
//         color: '#888',
//     },
// });


// export default CatProfileRecommendationScreen;






















// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { fetchCatProfilesForUser } from '../../Services/firebase';
// import auth from '@react-native-firebase/auth';

// const CatProfileRecommendationScreen = () => {
//     const navigation = useNavigation();
//     const [recommendedCats, setRecommendedCats] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const currentUser = auth().currentUser;
//             console.log('Current User:', currentUser);

//             if (currentUser) {
//                 const userId = currentUser.uid;
//                 console.log('User ID:', userId);

//                 const catProfilesSnapshot = await fetchCatProfilesForUser(userId);

//                 if (catProfilesSnapshot && !catProfilesSnapshot.empty) {
//                     const userCatProfiles = catProfilesSnapshot.docs.map(doc => doc.data());
//                     console.log('User Cat Profiles:', userCatProfiles);

//                     if (userCatProfiles && userCatProfiles.length > 0) {
//                         const similarityScores = userCatProfiles.map(catProfile => {
//                             const similarityScore = calculateSimilarity(currentUser, catProfile);
//                             return { userId, similarityScore, catProfile };
//                         });

//                         similarityScores.sort((a, b) => b.similarityScore - a.similarityScore);
//                         console.log('Similarity Scores:', similarityScores);

//                         setRecommendedCats(similarityScores);
//                     } else {
//                         console.log('User has not created any cat profiles.');
//                         Alert.alert('No Cat Profiles', 'Please create cat profiles.');
//                     }
//                 } else {
//                     console.log('User has not created any cat profiles.');
//                     Alert.alert('No Cat Profiles', 'Please create cat profiles.');
//                 }
//             } else {
//                 console.log('No user is currently signed in.');
//                 Alert.alert('No User', 'Please sign in.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             Alert.alert('Error', 'An error occurred while fetching cat profiles.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const calculateSimilarity = (currentUser, catProfile) => {
//         const { basicInfo: currentUserBasicInfo } = currentUser;
//         const { basicInfo, physicalHealth } = catProfile;
//         console.log('Cat Profile:', catProfile);
//         console.log('Basic Info:', basicInfo);
//         console.log('Physical Health:', physicalHealth);
//         if (!currentUserBasicInfo || !basicInfo || !physicalHealth) {
//             console.log('Incomplete data for similarity calculation.');
//             return 0;
//         }

//         // Convert string values to numbers where necessary
//         const vector1 = [
//             parseFloat(currentUserBasicInfo.breed),
//             parseFloat(currentUserBasicInfo.pedigree),
//             parseFloat(currentUserBasicInfo.pattern)
//         ];
//         const vector2 = [
//             parseFloat(basicInfo.breed),
//             parseFloat(basicInfo.pedigree),
//             parseFloat(physicalHealth.pattern)
//         ];

//         console.log('Vector 1:', vector1);
//         console.log('Vector 2:', vector2);

//         let dotProduct = 0;
//         let norm1 = 0;
//         let norm2 = 0;

//         for (let i = 0; i < vector1.length; i++) {
//             dotProduct += vector1[i] * vector2[i];
//             norm1 += Math.pow(vector1[i], 2);
//             norm2 += Math.pow(vector2[i], 2);
//         }

//         console.log('Dot Product:', dotProduct);
//         console.log('Norm 1:', norm1);
//         console.log('Norm 2:', norm2);

//         norm1 = Math.sqrt(norm1);
//         norm2 = Math.sqrt(norm2);

//         console.log('Square Root of Norm 1:', norm1);
//         console.log('Square Root of Norm 2:', norm2);

//         if (norm1 === 0 || norm2 === 0) {
//             console.log('One of the norms is zero.');
//             return 0;
//         }

//         const similarityScore = dotProduct / (norm1 * norm2);
//         console.log('Similarity Score:', similarityScore);
//         return similarityScore;
//     };


//     return (
//         <View style={styles.container}>
//             {isLoading ? (
//                 <Text>Loading...</Text>
//             ) : recommendedCats.length > 0 ? (
//                 <FlatList
//                     data={recommendedCats}
//                     renderItem={({ item }) => (
//                         <TouchableOpacity onPress={() => {
//                             console.log('Navigating to CatProfiles with catId:', item.catProfile?.id);
//                             navigation.navigate('CatProfiles', { catId: item.catProfile?.id });
//                         }}>
//                             <View style={styles.catContainer}>
//                                 <Image source={item.catProfile?.image ? { uri: item.catProfile.image } : require('../../../assets/Catassets/uicon.png')} style={styles.catImage} />
//                                 <View style={styles.catDetails}>
//                                     <Text style={styles.catName}>{item.catProfile?.basicInfo?.catName || 'Unknown Cat'}</Text>
//                                     <Text style={styles.similarity}>
//                                         Similarity Score: {item.similarityScore.toFixed(2)} ({Math.round(item.similarityScore * 100)}%)
//                                     </Text>
//                                 </View>
//                             </View>
//                         </TouchableOpacity>
//                     )}
//                     keyExtractor={(item, index) => index.toString()}
//                 />
//             ) : (
//                 <Text>No recommended cats found. Please create cat profiles.</Text>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     catContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
//     catImage: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         marginRight: 10,
//     },
//     catDetails: {
//         flex: 1,
//         flexDirection: 'column',
//     },
//     catName: {
//         fontSize: 18,
//     },
//     similarity: {
//         fontSize: 14,
//         color: '#888',
//     },
// });


// // export default CatProfileRecommendationScreen;
// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { fetchCatProfilesForUser, fetchApproveCatProfile } from '../../Services/firebase';
// import auth from '@react-native-firebase/auth';

// const CatProfileRecommendationScreen = () => {
//     const navigation = useNavigation();
//     const [recommendedCats, setRecommendedCats] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         fetchData();
//     }, []);


//     const fetchData = async () => {
//         try {
//             console.log('Fetching cat profiles...');
//             const currentUser = auth().currentUser;

//             if (currentUser) {
//                 const userId = currentUser.uid;
//                 const catProfilesData = await fetchCatProfilesForUser(userId);

//                 if (catProfilesData && catProfilesData.length > 0) {
//                     const allProfiles = await fetchApproveCatProfile();

//                     const similarityScores = calculateSimilarity(catProfilesData[0], allProfiles);

//                     console.log('Similarity scores:', similarityScores);

//                     similarityScores.sort((a, b) => b.similarityScore - a.similarityScore);

//                     setRecommendedCats(similarityScores);
//                 } else {
//                     Alert.alert('No Cat Profiles', 'Please create cat profiles.');
//                 }
//             } else {
//                 Alert.alert('No User', 'Please sign in.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             Alert.alert('Error', 'An error occurred while fetching cat profiles.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const calculateCosineSimilarity = (vectorA, vectorB) => {
//         const dotProduct = vectorA.reduce((acc, val, i) => acc + val * vectorB[i], 0);
//         const magnitudeA = Math.sqrt(vectorA.reduce((acc, val) => acc + val ** 2, 0));
//         const magnitudeB = Math.sqrt(vectorB.reduce((acc, val) => acc + val ** 2, 0));

//         if (magnitudeA === 0 || magnitudeB === 0) {
//             return 0; // To handle division by zero
//         }

//         return dotProduct / (magnitudeA * magnitudeB);
//     };

//     const calculateSimilarity = (catProfile, allProfiles) => {
//         const currentUserProfile = [
//             catProfile.basicInfo.breed,
//             catProfile.physicalHealth.pattern,
//             catProfile.basicInfo.pedigree
//         ];

//         let similarityScores = [];

//         allProfiles.forEach(profile => {
//             const userProfile = [
//                 profile.data().basicInfo.breed,
//                 profile.data().physicalHealth.pattern,
//                 profile.data().basicInfo.pedigree
//             ];

//             const similarityScore = calculateCosineSimilarity(currentUserProfile, userProfile);
//             similarityScores.push({ userId: profile.id, similarityScore });
//         });

//         return similarityScores;
//     };

//     return (
//         <View style={styles.container}>
//             {isLoading ? (
//                 <Text>Loading...</Text>
//             ) : recommendedCats.length > 0 ? (
//                 <FlatList
//                     data={recommendedCats}
//                     renderItem={({ item }) => (
//                         <TouchableOpacity onPress={() => navigation.navigate('CatProfiles', { catId: item.catProfile?.id })}>
//                             <View style={styles.catContainer}>
//                                 <Image source={item.catProfile?.image ? { uri: item.catProfile.image } : require('../../../assets/Catassets/uicon.png')} style={styles.catImage} />
//                                 <View style={styles.catDetails}>
//                                     <Text style={styles.catName}>{item.catProfile?.basicInfo?.catName || 'Unknown Cat'}</Text>
//                                     <Text style={[styles.similarity, { color: item.similarityScore === 0 ? '#FF0000' : '#333' }]}>
//                                         Similarity Score: {item.similarityScore.toFixed(2)} ({Math.round(item.similarityScore * 100)}%)
//                                     </Text>
//                                     <Text style={styles.catInfo}>
//                                         Breed: {item.catProfile?.basicInfo?.breed}
//                                     </Text>
//                                     <Text style={styles.catInfo}>
//                                         Pedigree: {item.catProfile?.basicInfo?.pedigree}
//                                     </Text>
//                                     <Text style={styles.catInfo}>
//                                         Pattern: {item.catProfile?.physicalHealth?.pattern}
//                                     </Text>
//                                 </View>
//                             </View>
//                         </TouchableOpacity>
//                     )}
//                     keyExtractor={(item, index) => index.toString()}
//                 />

//             ) : (
//                 <Text>No recommended cats found. Please create cat profiles.</Text>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F7F7F7',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     catContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderBottomWidth: 1,
//         borderBottomColor: '#E0E0E0',
//         backgroundColor: '#FFFFFF',
//     },
//     catImage: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         marginRight: 10,
//     },
//     catDetails: {
//         flex: 1,
//         flexDirection: 'column',
//     },
//     catName: {
//         fontSize: 18,
//         color: '#333',
//     },
//     similarity: {
//         fontSize: 14,
//     },
//     catInfo: {
//         fontSize: 14,
//         color: '#666',
//     },
// });

// export default CatProfileRecommendationScreen;
















// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { fetchCatProfilesForUser, fetchApproveCatProfile } from '../../Services/firebase';
// import auth from '@react-native-firebase/auth';

// const CatProfileRecommendationScreen = () => {
//     const navigation = useNavigation();
//     const [recommendedCats, setRecommendedCats] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             console.log('Fetching cat profiles...');
//             const currentUser = auth().currentUser;

//             if (currentUser) {
//                 const userId = currentUser.uid;
//                 const catProfilesData = await fetchCatProfilesForUser(userId);

//                 if (catProfilesData && catProfilesData.length > 0) {
//                     const allProfiles = await fetchApproveCatProfile();
//                     const similarityScores = calculateSimilarity(catProfilesData[0], allProfiles);

//                     console.log('Similarity scores:', similarityScores);

//                     similarityScores.sort((a, b) => b.similarityScore - a.similarityScore);

//                     setRecommendedCats(similarityScores);
//                 } else {
//                     Alert.alert('No Cat Profiles', 'Please create cat profiles.');
//                 }
//             } else {
//                 Alert.alert('No User', 'Please sign in.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             Alert.alert('Error', 'An error occurred while fetching cat profiles.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const calculateSimilarity = (catProfile, allProfiles) => {
//         // Encode the current user profile
//         const currentUserProfile = encodeProfile(catProfile);

//         // Create a map to hold the categorical values and their corresponding indices
//         const uniqueValuesMap = createUniqueValuesMap(allProfiles);

//         let similarityScores = [];

//         allProfiles.forEach(profile => {
//             const userProfile = encodeProfile(profile.data(), uniqueValuesMap);

//             const similarityScore = calculateCosineSimilarity(currentUserProfile, userProfile);
//             similarityScores.push({ userId: profile.id, similarityScore });
//         });

//         return similarityScores;
//     };

//     const encodeProfile = (profile, uniqueValuesMap = null) => {
//         const encodedProfile = [];

//         // If uniqueValuesMap is not provided, initialize it
//         if (!uniqueValuesMap) {
//             uniqueValuesMap = {};
//         }

//         // Encode categorical values into numeric values
//         Object.keys(profile.basicInfo).forEach(key => {
//             const value = profile.basicInfo[key].toLowerCase();
//             if (!(value in uniqueValuesMap)) {
//                 uniqueValuesMap[value] = Object.keys(uniqueValuesMap).length;
//             }
//             encodedProfile.push(uniqueValuesMap[value]);
//         });

//         const pattern = profile.physicalHealth.pattern.toLowerCase();
//         if (!(pattern in uniqueValuesMap)) {
//             uniqueValuesMap[pattern] = Object.keys(uniqueValuesMap).length;
//         }
//         encodedProfile.push(uniqueValuesMap[pattern]);

//         return encodedProfile;
//     };

//     const createUniqueValuesMap = allProfiles => {
//         const uniqueValuesMap = {};

//         // Populate uniqueValuesMap with unique values from all profiles
//         allProfiles.forEach(profile => {
//             const data = profile.data();
//             Object.keys(data.basicInfo).forEach(key => {
//                 const value = data.basicInfo[key].toLowerCase();
//                 if (!(value in uniqueValuesMap)) {
//                     uniqueValuesMap[value] = Object.keys(uniqueValuesMap).length;
//                 }
//             });
//             const pattern = data.physicalHealth.pattern.toLowerCase();
//             if (!(pattern in uniqueValuesMap)) {
//                 uniqueValuesMap[pattern] = Object.keys(uniqueValuesMap).length;
//             }
//         });

//         return uniqueValuesMap;
//     };

//     const calculateCosineSimilarity = (vectorA, vectorB) => {
//         const dotProduct = vectorA.reduce((acc, val, i) => acc + val * vectorB[i], 0);

//         const magnitudeA = Math.sqrt(vectorA.reduce((acc, val) => acc + val ** 2, 0));
//         const magnitudeB = Math.sqrt(vectorB.reduce((acc, val) => acc + val ** 2, 0));

//         if (magnitudeA === 0 || magnitudeB === 0) {
//             return 0; // To handle division by zero
//         }

//         const similarity = dotProduct / (magnitudeA * magnitudeB);
//         return similarity;
//     };



//     return (
//         <View style={styles.container}>
//             {isLoading ? (
//                 <Text>Loading...</Text>
//             ) : recommendedCats.length > 0 ? (
//                 <FlatList
//                     data={recommendedCats}
//                     renderItem={({ item }) => (
//                         <TouchableOpacity onPress={() => navigation.navigate('CatProfiles', { catId: item.catProfile?.id })}>
//                             <View style={styles.catContainer}>
//                                 <Image source={item.catProfile?.image ? { uri: item.catProfile.image } : require('../../../assets/Catassets/uicon.png')} style={styles.catImage} />
//                                 <View style={styles.catDetails}>
//                                     <Text style={styles.catName}>{item.catProfile?.basicInfo?.catName || 'Unknown Cat'}</Text>
//                                     <Text style={[styles.similarity, { color: item.similarityScore === 0 ? '#FF0000' : '#333' }]}>
//                                         Similarity Score: {item.similarityScore.toFixed(2)} ({Math.round(item.similarityScore * 100)}%)
//                                     </Text>
//                                     <Text style={styles.catInfo}>
//                                         Breed: {item.catProfile?.basicInfo?.breed}
//                                     </Text>
//                                     <Text style={styles.catInfo}>
//                                         Pedigree: {item.catProfile?.basicInfo?.pedigree}
//                                     </Text>
//                                     <Text style={styles.catInfo}>
//                                         Pattern: {item.catProfile?.physicalHealth?.pattern}
//                                     </Text>
//                                 </View>
//                             </View>
//                         </TouchableOpacity>
//                     )}
//                     keyExtractor={(item, index) => index.toString()}
//                 />

//             ) : (
//                 <Text>No recommended cats found. Please create cat profiles.</Text>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     catContainer: {
//         flexDirection: 'row',
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
//     catImage: {
//         width: 80,
//         height: 80,
//         marginRight: 10,
//         borderRadius: 40,
//     },
//     catDetails: {
//         flex: 1,
//         justifyContent: 'center',
//     },
//     catName: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     similarity: {
//         fontSize: 14,
//         marginBottom: 5,
//     },
//     catInfo: {
//         fontSize: 14,
//         marginBottom: 3,
//     },
// });

// export default CatProfileRecommendationScreen;














// -------------------------------FINAL----------------------------------------------------------







// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { fetchCatProfilesForUser, fetchApproveCatProfile } from '../../Services/firebase';
// import auth from '@react-native-firebase/auth';

// const CatProfileRecommendationScreen = () => {
//     const navigation = useNavigation();
//     const [recommendedCats, setRecommendedCats] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         fetchData();
//     }, []);
//     const fetchData = async () => {
//         try {
//             console.log('Fetching cat profiles...');
//             const currentUser = auth().currentUser;

//             if (currentUser) {
//                 const userId = currentUser.uid;
//                 const catProfilesData = await fetchCatProfilesForUser(userId);

//                 if (catProfilesData && catProfilesData.length > 0) {
//                     const allProfiles = await fetchApproveCatProfile();
//                     if (allProfiles && allProfiles.length > 0) { // Check if profiles is defined and not empty
//                         const allprofilesData = allProfiles.map(doc => ({
//                             id: doc.id,
//                             ...doc.data(),
//                         }));
//                         console.log('all catProfiles--<:', allprofilesData);

//                         const similarityScores = calculateSimilarity(catProfilesData[0], allprofilesData);

//                         console.log('Similarity scores:', similarityScores);

//                         similarityScores.sort((a, b) => b.similarityScore - a.similarityScore);

//                         setRecommendedCats(similarityScores);
//                     } else {
//                         Alert.alert('No Cat Profiles', 'Please create cat profiles.');
//                     }
//                 } else {
//                     Alert.alert('No Cat Profiles', 'Please create cat profiles.');
//                 }
//             } else {
//                 Alert.alert('No User', 'Please sign in.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             Alert.alert('Error', 'An error occurred while fetching cat profiles.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const calculateSimilarity = (catProfile, allProfiles) => {
//         // Encode the current user profile
//         const currentUserProfile = encodeProfile(catProfile);

//         // Create a map to hold the categorical values and their corresponding indices

//         console.log('cal similarty all profie-->', allProfiles)
//         console.log('cal similarty all Catprofie-->', catProfile)

//         const uniqueValuesMap = createUniqueValuesMap(allProfiles);

//         let similarityScores = [];

//         allProfiles.forEach(profile => {
//             const userProfile = encodeProfile(profile, uniqueValuesMap);

//             const similarityScore = calculateCosineSimilarity(currentUserProfile, userProfile);
//             similarityScores.push({ userId: profile.id, similarityScore });
//         });

//         return similarityScores;
//     };

//     const encodeProfile = (profile, uniqueValuesMap = null) => {
//         const encodedProfile = [];

//         // If uniqueValuesMap is not provided, initialize it
//         if (!uniqueValuesMap) {
//             uniqueValuesMap = {};
//         }

//         // Encode categorical values into numeric values
//         const basicInfo = profile.basicInfo;
//         const physicalHealth = profile.physicalHealth;

//         console.log('enncode basicinfo-->', profile.basicInfo)
//         console.log('enncode physicalHealth-->', profile.physicalHealth)


//         const breed = basicInfo.breed.toLowerCase(); // Convert to lowercase
//         const pedigree = basicInfo.pedigree.toLowerCase(); // Convert to lowercase
//         const pattern = physicalHealth.pattern.toLowerCase(); // Convert to lowercase

//         const valuesToEncode = [breed, pedigree, pattern];

//         valuesToEncode.forEach(value => {
//             if (!(value in uniqueValuesMap)) {
//                 uniqueValuesMap[value] = Object.keys(uniqueValuesMap).length;
//             }
//             encodedProfile.push(uniqueValuesMap[value]);
//         });

//         return encodedProfile;
//     };

//     const createUniqueValuesMap = allProfiles => {
//         const uniqueValuesMap = {};

//         // Populate uniqueValuesMap with unique values from all profiles
//         allProfiles.forEach(profile => {
//             const basicInfo = profile.basicInfo;
//             const physicalHealth = profile.physicalHealth;

//             console.log('createUniqueValuesMap basicinfo-->', profile.basicInfo)
//             console.log('createUniqueValuesMap physicalHealth-->', profile.physicalHealth)

//             const breed = basicInfo.breed.toLowerCase(); // Convert to lowercase
//             const pedigree = basicInfo.pedigree.toLowerCase(); // Convert to lowercase
//             const pattern = physicalHealth.pattern.toLowerCase(); // Convert to lowercase

//             const valuesToEncode = [breed, pedigree, pattern];

//             valuesToEncode.forEach(value => {
//                 if (!(value in uniqueValuesMap)) {
//                     uniqueValuesMap[value] = Object.keys(uniqueValuesMap).length;
//                 }
//             });
//         });

//         return uniqueValuesMap;
//     };

//     const calculateCosineSimilarity = (vectorA, vectorB) => {
//         const dotProduct = vectorA.reduce((acc, val, i) => acc + val * vectorB[i], 0);

//         const magnitudeA = Math.sqrt(vectorA.reduce((acc, val) => acc + val ** 2, 0));
//         const magnitudeB = Math.sqrt(vectorB.reduce((acc, val) => acc + val ** 2, 0));

//         if (magnitudeA === 0 || magnitudeB === 0) {
//             return 0; // To handle division by zero
//         }

//         const similarity = dotProduct / (magnitudeA * magnitudeB);
//         return similarity;
//     };



//     return (
//         <View style={styles.container}>
//             {isLoading ? (
//                 <Text>Loading...</Text>
//             ) : recommendedCats.length > 0 ? (
//                 <FlatList
//                     data={recommendedCats}
//                     renderItem={({ item }) => (
//                         <TouchableOpacity onPress={() => navigation.navigate('CatProfiles', { catId: item.catProfile?.id })}>
//                             <View style={styles.catContainer}>
//                                 <Image source={item.catProfile?.image ? { uri: item.catProfile.image } : require('../../../assets/Catassets/uicon.png')} style={styles.catImage} />
//                                 <View style={styles.catDetails}>
//                                     <Text style={styles.catName}>{item.catProfile?.basicInfo?.catName || 'Unknown Cat'}</Text>
//                                     <Text style={[styles.similarity, { color: item.similarityScore === 0 ? '#FF0000' : '#333' }]}>
//                                         Similarity Score: {item.similarityScore.toFixed(2)} ({Math.round(item.similarityScore * 100)}%)
//                                     </Text>
//                                     <Text style={styles.catInfo}>
//                                         Breed: {item.catProfile?.basicInfo?.breed}
//                                     </Text>
//                                     <Text style={styles.catInfo}>
//                                         Pedigree: {item.catProfile?.basicInfo?.pedigree}
//                                     </Text>
//                                     <Text style={styles.catInfo}>
//                                         Pattern: {item.catProfile?.physicalHealth?.pattern}
//                                     </Text>
//                                 </View>
//                             </View>
//                         </TouchableOpacity>
//                     )}
//                     keyExtractor={(item, index) => index.toString()}
//                 />

//             ) : (
//                 <Text>No recommended cats found. Please create cat profiles.</Text>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     catContainer: {
//         flexDirection: 'row',
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
//     catImage: {
//         width: 80,
//         height: 80,
//         marginRight: 10,
//         borderRadius: 40,
//     },
//     catDetails: {
//         flex: 1,
//         justifyContent: 'center',
//     },
//     catName: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     similarity: {
//         fontSize: 14,
//         marginBottom: 5,
//     },
//     catInfo: {
//         fontSize: 14,
//         marginBottom: 3,
//     },
// });

// export default CatProfileRecommendationScreen;



// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { fetchCatProfilesForUser, fetchApproveCatProfile } from '../../Services/firebase';
// import auth from '@react-native-firebase/auth';

// const CatProfileRecommendationScreen = () => {
//     const navigation = useNavigation();
//     const [recommendedCats, setRecommendedCats] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             console.log('Fetching cat profiles...');
//             const currentUser = auth().currentUser;

//             if (currentUser) {
//                 const userId = currentUser.uid;
//                 const catProfilesData = await fetchCatProfilesForUser(userId);

//                 if (catProfilesData && catProfilesData.length > 0) {
//                     const allProfiles = await fetchApproveCatProfile();
//                     if (allProfiles && allProfiles.length > 0) {
//                         const allprofilesData = allProfiles.map(doc => ({
//                             id: doc.id,
//                             ...doc.data(),
//                         }));

//                         const similarityScores = calculateSimilarity(catProfilesData[0], allprofilesData);

//                         console.log('Similarity scores:', similarityScores);

//                         similarityScores.sort((a, b) => b.similarityScore - a.similarityScore);

//                         setRecommendedCats(similarityScores.filter(profile => profile.userId !== userId));
//                     } else {
//                         Alert.alert('No Cat Profiles', 'Please create cat profiles.');
//                     }
//                 } else {
//                     Alert.alert('No Cat Profiles', 'Please create cat profiles.');
//                 }
//             } else {
//                 Alert.alert('No User', 'Please sign in.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             Alert.alert('Error', 'An error occurred while fetching cat profiles.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const calculateSimilarity = (catProfile, allProfiles) => {
//         const currentUserProfile = encodeProfile(catProfile);
//         const uniqueValuesMap = createUniqueValuesMap(allProfiles);

//         let similarityScores = [];

//         allProfiles.forEach(profile => {
//             const userProfile = encodeProfile(profile, uniqueValuesMap);

//             const similarityScore = calculateCosineSimilarity(currentUserProfile, userProfile);
//             similarityScores.push({ userId: profile.id, similarityScore });
//         });

//         return similarityScores;
//     };

//     const encodeProfile = (profile, uniqueValuesMap = null) => {
//         const encodedProfile = [];

//         if (!uniqueValuesMap) {
//             uniqueValuesMap = {};
//         }

//         const basicInfo = profile.basicInfo;
//         const physicalHealth = profile.physicalHealth;

//         const breed = basicInfo.breed.toLowerCase();
//         const pedigree = basicInfo.pedigree.toLowerCase();
//         const pattern = physicalHealth.pattern.toLowerCase();

//         const valuesToEncode = [breed, pedigree, pattern];

//         valuesToEncode.forEach(value => {
//             if (!(value in uniqueValuesMap)) {
//                 uniqueValuesMap[value] = Object.keys(uniqueValuesMap).length;
//             }
//             encodedProfile.push(uniqueValuesMap[value]);
//         });

//         return encodedProfile;
//     };

//     const createUniqueValuesMap = allProfiles => {
//         const uniqueValuesMap = {};

//         allProfiles.forEach(profile => {
//             const basicInfo = profile.basicInfo;
//             const physicalHealth = profile.physicalHealth;

//             const breed = basicInfo.breed.toLowerCase();
//             const pedigree = basicInfo.pedigree.toLowerCase();
//             const pattern = physicalHealth.pattern.toLowerCase();

//             const valuesToEncode = [breed, pedigree, pattern];

//             valuesToEncode.forEach(value => {
//                 if (!(value in uniqueValuesMap)) {
//                     uniqueValuesMap[value] = Object.keys(uniqueValuesMap).length;
//                 }
//             });
//         });

//         return uniqueValuesMap;
//     };

//     const calculateCosineSimilarity = (vectorA, vectorB) => {
//         const dotProduct = vectorA.reduce((acc, val, i) => acc + val * vectorB[i], 0);

//         const magnitudeA = Math.sqrt(vectorA.reduce((acc, val) => acc + val ** 2, 0));
//         const magnitudeB = Math.sqrt(vectorB.reduce((acc, val) => acc + val ** 2, 0));

//         if (magnitudeA === 0 || magnitudeB === 0) {
//             return 0;
//         }

//         const similarity = dotProduct / (magnitudeA * magnitudeB);
//         return similarity;
//     };

//     return (
//         <View style={styles.container}>
//             {isLoading ? (
//                 <Text>Loading...</Text>
//             ) : recommendedCats.length > 0 ? (
//                 <FlatList
//                     data={recommendedCats}
//                     renderItem={({ item }) => (
//                         <TouchableOpacity onPress={() => navigation.navigate('CatProfiles', { catId: item.userId })}>
//                             <View style={styles.catContainer}>
//                                 <Image source={item.catProfile?.image ? { uri: item.catProfile.image } : require('../../../assets/Catassets/uicon.png')} style={styles.catImage} />
//                                 <View style={styles.catDetails}>
//                                     <Text style={styles.catName}>{item.catProfile?.basicInfo?.catName || 'Unknown Cat'}</Text>
//                                     <Text style={[styles.similarity, { color: item.similarityScore === 0 ? '#FF0000' : '#333' }]}>
//                                         Similarity Score: {item.similarityScore.toFixed(2)} ({Math.round(item.similarityScore * 100)}%)
//                                     </Text>
//                                     <Text style={styles.catInfo}>
//                                         Breed: {item.catProfile?.basicInfo?.breed}
//                                     </Text>
//                                     <Text style={styles.catInfo}>
//                                         Pedigree: {item.catProfile?.basicInfo?.pedigree}
//                                     </Text>
//                                     <Text style={styles.catInfo}>
//                                         Pattern: {item.catProfile?.physicalHealth?.pattern}
//                                     </Text>
//                                 </View>
//                             </View>
//                         </TouchableOpacity>
//                     )}
//                     keyExtractor={(item, index) => index.toString()}
//                 />
//             ) : (
//                 <Text>No recommended cats found. Please create cat profiles.</Text>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     catContainer: {
//         flexDirection: 'row',
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
//     catImage: {
//         width: 80,
//         height: 80,
//         marginRight: 10,
//         borderRadius: 40,
//     },
//     catDetails: {
//         flex: 1,
//         justifyContent: 'center',
//     },
//     catName: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     similarity: {
//         fontSize: 14,
//         marginBottom: 5,
//     },
//     catInfo: {
//         fontSize: 14,
//         marginBottom: 3,
//     },
// });

// export default CatProfileRecommendationScreen;



import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    fetchApproveCatProfile,
    fetchCatProfilesForUser,
} from '../../Services/firebase';
import auth from '@react-native-firebase/auth';

const CatProfileRecommendationScreen = () => {
    const navigation = useNavigation();
    const [recommendedCats, setRecommendedCats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            console.log('Fetching cat profiles...');
            const currentUser = auth().currentUser;

            if (currentUser) {
                const userId = currentUser.uid;
                const catProfilesData = await fetchCatProfilesForUser(userId);

                if (catProfilesData && catProfilesData.length > 0) {
                    const allProfiles = await fetchApproveCatProfile();
                    if (allProfiles && allProfiles.length > 0) {
                        const allprofilesData = allProfiles.map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                        }));

                        // Exclude the current user's cat profile from the calculation
                        const filteredAllProfiles = allprofilesData.filter(profile => profile.id !== userId);

                        const similarityScores = catProfilesData.map(catProfile =>
                            calculateSimilarity(catProfile, filteredAllProfiles)
                        );

                        console.log('Similarity scores:', similarityScores);

                        const recommendedCatsData = filteredAllProfiles.map(profile => ({
                            ...profile,
                            similarityScore: calculateMaxSimilarity(profile.id, similarityScores)
                        }));

                        setRecommendedCats(recommendedCatsData);
                    } else {
                        Alert.alert('No Cat Profiles', 'Please create cat profiles.');
                    }
                } else {
                    Alert.alert('No Cat Profiles', 'Please create cat profiles.');
                }
            } else {
                Alert.alert('No User', 'Please sign in.');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'An error occurred while fetching cat profiles.');
        } finally {
            setIsLoading(false);
        }
    };

    const calculateSimilarity = (catProfile, allProfiles) => {
        const currentUserProfile = encodeProfile(catProfile);
        const uniqueValuesMap = createUniqueValuesMap(allProfiles);

        let similarityScores = [];

        allProfiles.forEach(profile => {
            if (!profile || !profile.basicInfo || !profile.physicalHealth) {
                console.log('Invalid cat profile:', profile);
                return;
            }

            const userProfile = encodeProfile(profile, uniqueValuesMap);

            const similarityScore = calculateCosineSimilarity(currentUserProfile, userProfile);
            similarityScores.push({ userId: profile.id, similarityScore });
        });

        return similarityScores;
    };

    const encodeProfile = (profile, uniqueValuesMap = null) => {
        const encodedProfile = [];

        if (!uniqueValuesMap) {
            uniqueValuesMap = {};
        }

        if (!profile || !profile.basicInfo || !profile.physicalHealth) {
            console.log('Invalid cat profile:', profile);
            return [];
        }

        const basicInfo = profile.basicInfo;
        const physicalHealth = profile.physicalHealth;

        const breed = basicInfo.breed.toLowerCase();
        const pedigree = basicInfo.pedigree.toLowerCase();
        const pattern = physicalHealth.pattern.toLowerCase();

        const valuesToEncode = [breed, pedigree, pattern];

        valuesToEncode.forEach(value => {
            if (!(value in uniqueValuesMap)) {
                uniqueValuesMap[value] = Object.keys(uniqueValuesMap).length;
            }
            encodedProfile.push(uniqueValuesMap[value]);
        });

        return encodedProfile;
    };

    const createUniqueValuesMap = allProfiles => {
        const uniqueValuesMap = {};

        allProfiles.forEach(profile => {
            if (!profile || !profile.basicInfo || !profile.physicalHealth) {
                console.log('Invalid cat profile:', profile);
                return;
            }

            const basicInfo = profile.basicInfo;
            const physicalHealth = profile.physicalHealth;

            const breed = basicInfo.breed.toLowerCase();
            const pedigree = basicInfo.pedigree.toLowerCase();
            const pattern = physicalHealth.pattern.toLowerCase();

            const valuesToEncode = [breed, pedigree, pattern];

            valuesToEncode.forEach(value => {
                if (!(value in uniqueValuesMap)) {
                    uniqueValuesMap[value] = Object.keys(uniqueValuesMap).length;
                }
            });
        });

        return uniqueValuesMap;
    };

    const calculateCosineSimilarity = (vectorA, vectorB) => {
        const dotProduct = vectorA.reduce((acc, val, i) => acc + val * vectorB[i], 0);

        const magnitudeA = Math.sqrt(vectorA.reduce((acc, val) => acc + val ** 2, 0));
        const magnitudeB = Math.sqrt(vectorB.reduce((acc, val) => acc + val ** 2, 0));

        if (magnitudeA === 0 || magnitudeB === 0) {
            return 0;
        }

        const similarity = dotProduct / (magnitudeA * magnitudeB);
        return similarity;
    };

    const calculateMaxSimilarity = (profileId, similarityScores) => {
        const profileScores = similarityScores.flatMap(scores => scores.filter(score => score.userId === profileId));
        const maxSimilarity = Math.max(...profileScores.map(score => score.similarityScore));
        return maxSimilarity;
    };

    const handleCatProfilePress = (catProfile) => {
        // Navigate to CatDetailScreen with the cat profile data
        navigation.navigate('CatScreen', { catProfile });
    };

    const renderPetCard = ({ item }) => {
        if (!item || !item.basicInfo || !item.personalityAndAvailability) {
            console.log('Invalid cat profile:', item);
            return (
                <View key="noData" style={styles.petCard}>
                    <Text>No cat profile data available</Text>
                </View>
            );
        }

        const basicInfo = item.basicInfo || {};
        const personalityAndAvailability = item.personalityAndAvailability || {};
        const pics = item.mediaUpload?.mediaList || [];

        const similarityScore = item.similarityScore || 0;
        const similarityPercentage = (similarityScore * 100).toFixed(2); // Convert to percentage

        return (
            <TouchableOpacity
                key={basicInfo.catName}
                style={styles.petCard}
                onPress={() => handleCatProfilePress(item)}
            >
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
                    <Text style={styles.similarity}>Similarity: {similarityPercentage}%</Text>
                    {/* <Image
                        style={styles.shareIcon}
                        resizeMode="cover"
                        source={require("../../../assets/Catassets/share.png")}
                    /> */}
                </View>
            </TouchableOpacity>
        );
    };

    // Sort recommendedCats array based on similarity score
    const sortedRecommendedCats = recommendedCats.slice().sort((a, b) => b.similarityScore - a.similarityScore);

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={sortedRecommendedCats}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderPetCard}
        />
        // <FlatList
        //     horizontal
        //     showsHorizontalScrollIndicator={false}
        //     data={sortedRecommendedCats}
        //     keyExtractor={(item, index) => index.toString()}
        //     renderItem={renderPetCard}                // <View style={{ marginRight: 10 }}>
        // //     {renderPetCard(item)}
        // // </View>
        // // )}
        // />


    );
};

const styles = StyleSheet.create({
    cardContent: {
        flexDirection: 'column',
        marginLeft: 10,
    },
   
    petCard: {
        width: 135,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingBottom: 10,
        fontWeight: 'bold',
        fontFamily: 'Poppins-SemiBold',
        color: '#7E7E7E',

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

    // petCard: {
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
    // },
    // imageContainer: {
    //     marginRight: 15,
    // },
    // thumbnailImage: {
    //     width: 90,
    //     height: 100,
    //     borderRadius: 5,
    // },
    // petName: {
    //     fontSize: 16,
    //     marginBottom: 1,
    //     color: '#212529',
    //     fontFamily: 'Poppins-SemiBold',
    // },
    // breed: {
    //     fontSize: 14,
    //     color: '#7E7E7E',
    //     marginBottom: 1,
    //     fontFamily: 'Poppins-Medium',
    // },
    // available: {
    //     fontSize: 14,
    //     color: '#7E7E7E',
    //     marginBottom: 1,
    //     fontFamily: 'Poppins-SemiBold',
    // },
    similarity: {
        fontSize: 12,
        color: '#555',
        fontFamily: 'Poppins-Regular',
    },
});

export default CatProfileRecommendationScreen;