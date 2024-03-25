// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import { useNavigation } from '@react-navigation/native';
// import { HeaderBackButton } from '@react-navigation/stack';

// const ChatUsers = () => {
//     const navigation = useNavigation();
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const userSnapshot = await firestore().collection('users').get();
//                 const fetchedUsers = userSnapshot.docs.map(doc => ({
//                     id: doc.id,
//                     ...doc.data(),
//                 }));
//                 setUsers(fetchedUsers);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };

//         fetchUsers();
//     }, []);

//     const handleUserPress = (user) => {
//         console.log('user ----> id', user.id);
//         navigation.navigate('UserChat', { user: user.id});
//     };

//     const renderUserItem = ({ item }) => (
//         <TouchableOpacity onPress={() => handleUserPress(item)}>
//             <View style={styles.userItem}>
//                 <Image source={require('../../../assets/Catassets/uicon.png')} style={styles.userIcon} />
//                 <Text style={styles.username}>{item.firstname}</Text>
//             </View>
//         </TouchableOpacity>
//     );

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={users}
//                 renderItem={renderUserItem}
//                 keyExtractor={(item) => item.id}
//                 contentContainerStyle={styles.flatListContent}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#F5F5F5'
//     },
//     flatListContent: {
//         paddingHorizontal: 16,
//     },
//     userItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderColor: '#E0E0E0', // Light gray border color
//         backgroundColor: '#EDEFF1', // Light blue background color
//         borderWidth: 1,
//         borderRadius: 16,
//         elevation: 2,
//         padding: 16,
//         marginBottom: 12,
//     },
//     username: {
//         fontSize: 16,
//         fontFamily: 'Poppins-SemiBold',
//         color: '#7E7E7E',
//         marginLeft: 10, // Add margin to separate username from the icon
//     },
//     userIcon: {
//         width: 24, // Adjust the width as per your design
//         height: 24, // Adjust the height as per your design
//     },
// });

// // Add navigation options to set the header back button
// ChatUsers.navigationOptions = ({ navigation }) => ({
//     headerLeft: () => (
//         <HeaderBackButton
//             onPress={() => navigation.goBack()}
//             tintColor="#000" // Adjust the color of the back button icon
//         />
//     ),
// });

// export default ChatUsers;










// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth'; // Import Firebase auth module

// const ChatUsers = ({ navigation }) => {
//     const [currentUser, setCurrentUser] = useState(null); // State to store current user
//     const [conversations, setConversations] = useState([]);

//     useEffect(() => {
//         // Fetch current user
//         const unsubscribe = auth().onAuthStateChanged(user => {
//             setCurrentUser(user);
//         });

//         return () => unsubscribe();
//     }, []);

//     useEffect(() => {
//         if (!currentUser) {
//             return; // Return if current user is not available yet
//         }

//         const fetchConversations = async () => {
//             try {
//                 const conversationsSnapshot = await firestore()
//                     .collection('conversations')
//                     .where('participants', 'array-contains', currentUser.uid)
//                     .get();

//                 const fetchedConversations = conversationsSnapshot.docs.map(conversationDoc => {
//                     return {
//                         id: conversationDoc.id,
//                         data: conversationDoc.data(), // Include the entire conversation data
//                     };
//                 });

//                 setConversations(fetchedConversations);
//             } catch (error) {
//                 console.error('Error fetching conversations:', error);
//             }
//         };

//         fetchConversations();
//     }, [currentUser]);

//     const handleUserPress = (conversationId) => {
//         navigation.navigate('UserChat', { catProfileId: conversationId }); // Pass conversation ID
//     };

//     const renderUserItem = ({ item }) => (
//         <TouchableOpacity onPress={() => handleUserPress(item.id)}>
//             <View style={styles.userItem}>
//                 <Text style={styles.latestMessage}>{item.data.latestMessage}</Text>
//             </View>
//         </TouchableOpacity>
//     );

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={conversations}
//                 renderItem={renderUserItem}
//                 keyExtractor={(item) => item.id}
//                 contentContainerStyle={styles.flatListContent}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#F5F5F5'
//     },
//     flatListContent: {
//         paddingHorizontal: 16,
//     },
//     userItem: {
//         borderColor: '#E0E0E0',
//         backgroundColor: '#EDEFF1',
//         borderWidth: 1,
//         borderRadius: 16,
//         elevation: 2,
//         padding: 16,
//         marginBottom: 12,
//     },
//     latestMessage: {
//         fontSize: 14,
//         color: '#7E7E7E',
//     },
// });

// export default ChatUsers;




import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';

const ChatUsers = () => {
    const navigation = useNavigation();
    const [users, setUsers] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null); // To store the current user's ID

    useEffect(() => {
        // Fetch the current user's ID from Firebase Authentication
        const currentUser = auth().currentUser;
        if (currentUser) {
            setCurrentUserId(currentUser.uid);
        }
    }, []);

    useEffect(() => {
        if (currentUserId) {
            fetchUsers();
        }
    }, [currentUserId]);

    const fetchUsers = async () => {
        try {
            const userSnapshot = await firestore().collection('users').get();
            const fetchedUsers = userSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Filter out the current user
            const filteredUsers = fetchedUsers.filter(user => user.id !== currentUserId);

            setUsers(filteredUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleUserPress = (user) => {
        console.log('user ----> id', user.id);
        navigation.navigate('UserChat', { userId: user.id });
    };

    const renderUserItem = ({ item }) => (
        <TouchableOpacity style={styles.userCard} onPress={() => handleUserPress(item)}>
            {/* <View style={styles.userItem}>
                <Image source={require("../../../assets/Catassets/doctoruser2.png")} style={styles.userIcon} />
            </View> */}

            <View style={styles.userIconContainer}>
                <Image
                    style={styles.thumbnailImage}
                    resizeMode="cover"
                    source={require("../../../assets/Catassets/doctoruser2.png")}
                />

            </View>
            <Text style={styles.firstname}>{item.firstname}</Text>

        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Chats</Text>
                </View>
                <FlatList
                    data={users}
                    renderItem={renderUserItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.flatListContent}
                />
            </ScrollView>


            <View style={styles.bottomMenu}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
                    <Image source={require('../../../assets/Catassets/home-1.png')} style={{ width: 24, height: 24 }} />

                    <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SelectDoctor')}>
                    <Image source={require('../../../assets/Catassets/maki_doctor.png')} style={{ width: 24, height: 27 }} />

                    <Text style={{ ...styles.menuText, color: '#9F9F9F' }}>Doctor</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ChatUsers')}>
                    <Image source={require('../../../assets/Catassets/chatblue.png')} style={{ width: 24, height: 24 }} />

                    <Text style={{ ...styles.menuText, color: '#47C1FF' }}>Chat</Text>
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
        backgroundColor: 'white',
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
        shadowOpacity: 1, // Increase shadow opacity to make it darker
        shadowRadius: 20, // Increase shadow radius for a more spread out shadow
        elevation: 30,
        marginBottom: 30,
    },

    headerText: {
        fontSize: 20,
        color: '#47C1FF',
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
    },

    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#fff',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 16,
        elevation: 2,
        padding: 16,
        marginBottom: 12,
        height: 80,
    },

    flatListContent: {
        paddingHorizontal: 16,
    },
    userIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
        backgroundColor: '#CAEDFF',
        padding: 10,
        borderRadius: 100,
    },
    thumbnailImage: {
        width: 20,
        height: 20,
        borderRadius: 5,
    },
    firstname: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: '#212529',
    },

    latestMessage: {
        fontSize: 14,
        color: '#7E7E7E',
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

export default ChatUsers;
