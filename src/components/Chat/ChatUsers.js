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
        <TouchableOpacity onPress={() => handleUserPress(item)}>
            <View style={styles.userItem}>
                <Image source={require('../../../assets/Catassets/uicon.png')} style={styles.userIcon} />
                <Text style={styles.username}>{item.firstname}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={renderUserItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5'
    },
    flatListContent: {
        paddingHorizontal: 16,
    },
    userItem: {
        borderColor: '#E0E0E0',
        backgroundColor: '#EDEFF1',
        borderWidth: 1,
        borderRadius: 16,
        elevation: 2,
        padding: 16,
        marginBottom: 12,
    },
    latestMessage: {
        fontSize: 14,
        color: '#7E7E7E',
    },
});

export default ChatUsers;
