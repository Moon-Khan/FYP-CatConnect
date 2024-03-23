// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import { useNavigation, useRoute } from '@react-navigation/native';

// const DoctorChat = () => {

    
//     const navigation = useNavigation();
//     const route = useRoute();
//     const { doctorId,userId } = route.params;
//     const currentUser = auth().currentUser;
//     const [messages, setMessages] = useState([]);
//     const [recipientName, setRecipientName] = useState('');
//     console.log("userid------?", userId);
//     //const [doctorId, setDoctorId] = useState(''); // State to store the doctor's ID

//     useEffect(() => {
//         // Fetch recipient name based on user ID
//         firestore()
//             .collection('users')
//             .doc(currentUser.uid)
//             .get()
//             .then(documentSnapshot => {
//                 if (documentSnapshot.exists) {
//                     setRecipientName(documentSnapshot.data().displayName);
//                 } else {
//                     // User document does not exist
//                     console.log("User document does not exist");
//                 }
//             })
//             .catch(error => {
//                 // Handle error
//                 console.error("Error fetching user data:", error);
//             });

//         // Fetch doctor's ID
//         firestore()
//             .collection('doctors') // Assuming doctors are stored in a collection called 'doctors'
//             .where('userId', '==', currentUser.uid)
//             .get()
//             .then(querySnapshot => {
//                 if (!querySnapshot.empty) {
//                     setDoctorId(querySnapshot.docs[0].id);
//                 }
//             })
//             .catch(error => {
//                 console.error("Error fetching doctor's data:", error);
//             });

//         const unsubscribeListener = firestore()
//             .collection('doctorconversation')
//             .doc(currentUser.uid)
//             .collection('messages')
//             .orderBy('createdAt', 'desc')
//             .onSnapshot(querySnapshot => {
//                 const fetchedMessages = querySnapshot.docs.map(doc => {
//                     const firebaseData = doc.data();
//                     return {
//                         _id: doc.id,
//                         text: firebaseData.text || '',
//                         createdAt: firebaseData.createdAt ? firebaseData.createdAt.toDate() : new Date(),
//                         user: {
//                             _id: firebaseData.senderId,
//                             name: firebaseData.senderName || '',
//                         },
//                     };
//                 });
//                 setMessages(fetchedMessages);
//             });

//         return () => unsubscribeListener();
//     }, [currentUser.uid]);

//     const onSend = async (newMessages = []) => {
//         const conversationId = generateConversationId(currentUser.uid, doctorId || userId);
//         await firestore()
//             .collection('doctorconversation')
//             .doc(conversationId.uid)
//             .collection('messages')
//             .add({
//                 ...newMessages[0],
//                 createdAt: firestore.FieldValue.serverTimestamp(),
//                 senderId: currentUser.uid,
//                 senderName: currentUser.displayName,
//                 userId: currentUser.uid,
//                 doctorId: doctorId, // Save the doctor's ID
               
//             });

            
        
//     };

//     const handleGoBack = () => {
//         navigation.goBack();
//     };

//     const handleVideoCall = () => {
//         // Navigate to video call screen
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.chatHeader}>
//                 <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
//                     <Image
//                         source={require('../../../assets/Catassets/back.png')}
//                         style={styles.backImage}
//                     />
//                 </TouchableOpacity>
//                 <Text style={styles.chatHeaderText}>{recipientName}</Text>
//             </View>
//             <TouchableOpacity onPress={handleVideoCall} style={styles.videoCallButton}>
//                 <Text style={styles.videoCallButtonText}>Start Video Call</Text>
//             </TouchableOpacity>
//             <GiftedChat
//                 messages={messages}
//                 onSend={messages => onSend(messages)}
//                 user={{
//                     _id: currentUser.uid,
//                     name: currentUser.displayName,
//                 }}
//                 textInputStyle={{
//                     fontSize: 16,
//                     color: '#000000',
//                     fontFamily: 'Poppins-Regular',
//                     padding: 10,
//                     borderRadius: 10,
//                     backgroundColor: '#ffffff',
//                 }}
//                 inverted={true} // Added the inverted prop
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#e0dcd8',
//     },
//     backButton: {
//         marginRight: 10,
//     },
//     backImage: {
//         width: 24,
//         height: 24,
//     },
//     chatHeader: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#47c1ff',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//     },
//     chatHeaderText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#ffffff',
//         marginLeft: 10,
//     },
//     videoCallButton: {
//         backgroundColor: '#47c1ff',
//         padding: 10,
//         borderRadius: 10,
//         marginVertical: 10,
//         marginHorizontal: 20,
//         alignItems: 'center',
//     },
//     videoCallButtonText: {
//         color: '#FFFFFF',
//         fontSize: 16,
//     },
// });

// export default DoctorChat;




// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import { useNavigation } from '@react-navigation/native';

// const DoctorChat = ({ route }) => {
//     const navigation = useNavigation();
//     const { doctorId, userId } = route.params;
//     const currentUser = auth().currentUser;
//     const [messages, setMessages] = useState([]);
//     const [recipientName, setRecipientName] = useState('');

//     useEffect(() => {
//         const conversationId = generateConversationId(currentUser.uid, doctorId || userId);

//         if (doctorId) {
//             firestore()
//                 .collection('doctors')
//                 .doc(doctorId)
//                 .get()
//                 .then(documentSnapshot => {
//                     if (documentSnapshot.exists) {
//                         setRecipientName(documentSnapshot.data().basicInfo.catName);
//                     }
//                 });
//         } else { 
//             firestore()
//                 .collection('users')
//                 .doc(userId)
//                 .get()
//                 .then(documentSnapshot => {
//                     if (documentSnapshot.exists) {
//                         setRecipientName(documentSnapshot.data().displayName);
//                     }
//                 });
//         }

//         const unsubscribeListener = firestore()
//             .collection('doctorconversation')
//             .doc(conversationId)
//             .collection('messages')
//             .orderBy('createdAt', 'desc') // Changed the order to descending
//             .onSnapshot(querySnapshot => {
//                 const fetchedMessages = querySnapshot.docs.map(doc => {
//                     const firebaseData = doc.data();
//                     return {
//                         _id: doc.id,
//                         text: firebaseData.text || '',
//                         createdAt: firebaseData.createdAt ? firebaseData.createdAt.toDate() : new Date(),
//                         user: {
//                             _id: firebaseData.senderId,
//                             name: firebaseData.senderName || '',
//                         },
//                     };
//                 });
//                 setMessages(fetchedMessages);
//             });

//         return () => unsubscribeListener();
//     }, [doctorId, userId]);

//     const onSend = async (newMessages = []) => {
//         const conversationId = generateConversationId(currentUser.uid, doctorId || userId);
//         await firestore()
//             .collection('doctorconversation')
//             .doc(conversationId)
//             .collection('messages')
//             .add({
//                 ...newMessages[0],
//                 createdAt: firestore.FieldValue.serverTimestamp(),
//                 senderId: currentUser.uid,
//                 senderName: currentUser.displayName,
//             });
//     };

//     const generateConversationId = (userId1, userId2) => {
//         return userId1 < userId2 ? `${userId1}_${userId2}` : `${userId2}_${userId1}`;
//     };

//     const handleGoBack = () => {
//         navigation.goBack();
//     };

//     const handleVideoCall = () => {
//         navigation.navigate('VideoCallScreen', { recipientId: doctorId || userId });
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.chatHeader}>
//                 <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
//                     <Image
//                         source={require('../../../assets/Catassets/back.png')}
//                         style={styles.backImage}
//                     />
//                 </TouchableOpacity>
//                 <Text style={styles.chatHeaderText}>{recipientName}</Text>
//             </View>
//             <TouchableOpacity onPress={handleVideoCall} style={styles.videoCallButton}>
//                 <Text style={styles.videoCallButtonText}>Start Video Call</Text>
//             </TouchableOpacity>
//             <GiftedChat
//                 messages={messages}
//                 onSend={messages => onSend(messages)}
//                 user={{
//                     _id: currentUser.uid,
//                     name: currentUser.displayName,
//                 }}
//                 renderMessage={(props) => renderMessage(props, currentUser.uid)}
//                 textInputStyle={{
//                     fontSize: 16,
//                     color: '#000000',
//                     fontFamily: 'Poppins-Regular',
//                     padding: 10,
//                     borderRadius: 10,
//                     backgroundColor: '#ffffff',
//                 }}
//                 inverted={true} // Added the inverted prop
//             />
//         </View>
//     );
// };

// const renderMessage = (props, currentUserId) => {
//     const { currentMessage } = props;

//     let messageStyle = {
//         backgroundColor: currentMessage.user._id === currentUserId ? '#DCF8C6' : '#FFFFFF',
//         alignSelf: currentMessage.user._id === currentUserId ? 'flex-end' : 'flex-start',
//         padding: 10,
//         borderRadius: 10,
//         marginVertical: 5,
//         marginHorizontal: 10,
//     };

//     return (
//         <View style={messageStyle}>
//             <Text style={{ color: currentMessage.user._id === currentUserId ? '#000000' : '#000000', fontFamily: 'Poppins-Regular' }}>
//                 {currentMessage.text}
//             </Text>
//             <Text style={{ color: '#9B9B9B', fontFamily: 'Poppins-Regular', alignSelf: 'flex-end', marginTop: 5 }}>
//                 {currentMessage.createdAt.toLocaleTimeString()}
//             </Text>
//         </View>
//     );
// };


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#e0dcd8',
//     },
//     backButton: {
//         marginRight: 10,
//     },
//     backImage: {
//         width: 24,
//         height: 24,
//     },
//     chatHeader: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#47c1ff',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//     },
//     chatHeaderText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#ffffff',
//         marginLeft: 10,
//     },
//     videoCallButton: {
//         backgroundColor: '#47c1ff',
//         padding: 10,
//         borderRadius: 10,
//         marginVertical: 10,
//         marginHorizontal: 20,
//         alignItems: 'center',
//     },
//     videoCallButtonText: {
//         color: '#FFFFFF',
//         fontSize: 16,
//     },
// });

// export default DoctorChat;









import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const DoctorChat = ({ route }) => {
    const navigation = useNavigation();
    const { doctorId, userId } = route.params;
    const currentUser = auth().currentUser;
    const [messages, setMessages] = useState([]);
    const [recipientName, setRecipientName] = useState('');

    useEffect(() => {
        const fetchRecipientName = async () => {
            try {
                let recipientDocRef;
                if (doctorId) {
                    recipientDocRef = firestore().collection('doctors').doc(doctorId);
                } else {
                    recipientDocRef = firestore().collection('users').doc(userId);
                }
                const documentSnapshot = await recipientDocRef.get();
                if (documentSnapshot.exists) {
                    const data = documentSnapshot.data();
                    let name = '';
                    if (doctorId && data.basicInfo && data.basicInfo.catName) {
                        name = data.basicInfo.catName;
                    } else if (!doctorId && data.displayName) {
                        name = data.displayName;
                    }
                    setRecipientName(name);
                }
            } catch (error) {
                console.error('Error fetching recipient name:', error);
            }
        };

        const fetchMessages = () => {
            const conversationId = generateConversationId(currentUser.uid, doctorId || userId);
            const unsubscribeListener = firestore()
                .collection('doctorconversation')
                .doc(conversationId)
                .collection('messages')
                .orderBy('createdAt', 'desc')
                .onSnapshot(querySnapshot => {
                    const fetchedMessages = querySnapshot.docs.map(doc => {
                        const firebaseData = doc.data();
                        return {
                            _id: doc.id,
                            text: firebaseData.text || '',
                            createdAt: firebaseData.createdAt ? firebaseData.createdAt.toDate() : new Date(),
                            user: {
                                _id: firebaseData.senderId,
                                name: firebaseData.senderName || '',
                            },
                        };
                    });
                    setMessages(fetchedMessages);
                });

            return unsubscribeListener;
        };

        const unsubscribeListener = fetchMessages();
        fetchRecipientName();

        return () => unsubscribeListener();
    }, [doctorId, userId]);

    const onSend = async (newMessages = []) => {
        try {
            const conversationId = generateConversationId(currentUser.uid, doctorId || userId);
            await firestore()
                .collection('doctorconversation')
                .doc(conversationId)
                .collection('messages')
                .add({
                    ...newMessages[0],
                    createdAt: firestore.FieldValue.serverTimestamp(),
                    senderId: currentUser.uid,
                    senderName: currentUser.displayName,
                });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const generateConversationId = (userId1, userId2) => {
        return userId1 < userId2 ? `${userId1}_${userId2}` : `${userId2}_${userId1}`;
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleVideoCall = () => {
        navigation.navigate('VideoCallScreen', { recipientId: doctorId || userId });
    };

    return (
        <View style={styles.container}>
            <View style={styles.chatHeader}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <Image
                        source={require('../../../assets/Catassets/back.png')}
                        style={styles.backImage}
                    />
                </TouchableOpacity>
                <Text style={styles.chatHeaderText}>{recipientName}</Text>
            </View>
            <TouchableOpacity onPress={handleVideoCall} style={styles.videoCallButton}>
                <Text style={styles.videoCallButtonText}>Start Video Call</Text>
            </TouchableOpacity>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: currentUser.uid,
                    name: currentUser.displayName,
                }}
                renderMessage={(props) => renderMessage(props, currentUser.uid)}
                textInputStyle={{
                    fontSize: 16,
                    color: '#000000',
                    fontFamily: 'Poppins-Regular',
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: '#ffffff',
                }}
                inverted={true}
            />
        </View>
    );
};

const renderMessage = (props, currentUserId) => {
    const { currentMessage } = props;

    let messageStyle = {
        backgroundColor: currentMessage.user._id === currentUserId ? '#DCF8C6' : '#FFFFFF',
        alignSelf: currentMessage.user._id === currentUserId ? 'flex-end' : 'flex-start',
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
    };

    return (
        <View style={messageStyle}>
            <Text style={{ color: currentMessage.user._id === currentUserId ? '#000000' : '#000000', fontFamily: 'Poppins-Regular' }}>
                {currentMessage.text}
            </Text>
            <Text style={{ color: '#9B9B9B', fontFamily: 'Poppins-Regular', alignSelf: 'flex-end', marginTop: 5 }}>
                {currentMessage.createdAt.toLocaleTimeString()}
            </Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e0dcd8',
    },
    backButton: {
        marginRight: 10,
    },
    backImage: {
        width: 24,
        height: 24,
    },
    chatHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#47c1ff',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    chatHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginLeft: 10,
    },
    videoCallButton: {
        backgroundColor: '#47c1ff',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    videoCallButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default DoctorChat;

