// //UserChat.js

// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import { useNavigation } from '@react-navigation/native';

// const UserChat = ({ route }) => {
//     const navigation = useNavigation();
//     const { catProfileId } = route.params; // Change catProfileId instead of catProfile
//     const currentUser = auth().currentUser;
//     const [messages, setMessages] = useState([]);


//     console.log('catProfileId--->', catProfileId)

//     useEffect(() => {
//         const conversationId = generateConversationId(currentUser.uid, catProfileId);

//         const unsubscribeListener = firestore()
//             .collection('conversations')
//             .doc(conversationId)
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
//     }, [catProfileId]);

//     const onSend = async (newMessages = []) => {
//         const conversationId = generateConversationId(currentUser.uid, catProfile.id);
//         await firestore()
//             .collection('conversations')
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

//     return (
//         <View style={styles.container}>
//             <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
//                 <Image
//                     source={require('../../../assets/Catassets/back.png')}
//                     style={styles.backImage}
//                 />
//             </TouchableOpacity>
//             <GiftedChat
//                 messages={messages}
//                 onSend={messages => onSend(messages)}
//                 user={{
//                     _id: currentUser.uid,
//                     name: currentUser.displayName,
//                 }}
//                 // Set the title of the chat screen to the name of the user
//                 renderChatHeader={() => (
//                     <View style={styles.chatHeader}>
//                         <Text style={styles.chatHeaderText}>{catProfile.basicInfo.catName}</Text>
//                     </View>
//                 )}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     backButton: {
//         position: 'absolute',
//         top: 20,
//         left: 20,
//         zIndex: 1,
//     },
//     backImage: {
//         width: 24,
//         height: 24,
//     },
//     chatHeader: {
//         backgroundColor: '#47c1ff',
//         paddingVertical: 10,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     chatHeaderText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#fff',
//     },
// });

// export default UserChat;









// // //UserChat.js

// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import { useNavigation } from '@react-navigation/native';

// const UserChat = ({ route }) => {
//     const navigation = useNavigation();
//     const { catProfileId } = route.params; // Change catProfileId instead of catProfile
//     const currentUser = auth().currentUser;
//     const [messages, setMessages] = useState([]);

//     console.log('catProfileId----> in chat: ', catProfileId)

//     useEffect(() => {
//         const conversationId = generateConversationId(currentUser.uid, catProfileId);

//         const unsubscribeListener = firestore()
//             .collection('conversations')
//             .doc(conversationId)
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
//     }, [catProfileId]);

//     const onSend = async (newMessages = []) => {
//         const conversationId = generateConversationId(currentUser.uid, catProfileId);
//         await firestore()
//             .collection('conversations')
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

//     return (
//         <View style={styles.container}>
//             <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
//                 <Image
//                     source={require('../../../assets/Catassets/back.png')}
//                     style={styles.backImage}
//                 />
//             </TouchableOpacity>
//             <GiftedChat
//                 messages={messages}
//                 onSend={messages => onSend(messages)}
//                 user={{
//                     _id: currentUser.uid,
//                     name: currentUser.displayName,
//                 }}
//                 renderChatHeader={() => (
//                     <View style={styles.chatHeader}>
//                         <Text style={styles.chatHeaderText}>{catProfile.basicInfo.catName}</Text>
//                     </View>
//                 )}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     backButton: {
//         position: 'absolute',
//         top: 20,
//         left: 20,
//         zIndex: 1,
//     },
//     backImage: {
//         width: 24,
//         height: 24,
//     },
//     chatHeader: {
//         backgroundColor: '#47c1ff',
//         paddingVertical: 10,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     chatHeaderText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#fff',
//     },
// });

// export default UserChat;






//--------------------------------------------------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import { useNavigation } from '@react-navigation/native';

// const UserChat = ({ route }) => {
//     const navigation = useNavigation();
//     const { catProfileId, userId } = route.params; // Now we have both catProfileId and userId

//     const currentUser = auth().currentUser;
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         const conversationId = generateConversationId(currentUser.uid, catProfileId || userId); // Use catProfileId if available, otherwise use userId

//         const unsubscribeListener = firestore()
//             .collection('conversations')
//             .doc(conversationId)
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
//     }, [catProfileId, userId]);

//     const onSend = async (newMessages = []) => {
//         const conversationId = generateConversationId(currentUser.uid, catProfileId || userId); // Use catProfileId if available, otherwise use userId
//         await firestore()
//             .collection('conversations')
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

//     return (
//         <View style={styles.container}>
//             <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
//                 <Image
//                     source={require('../../../assets/Catassets/back.png')}
//                     style={styles.backImage}
//                 />
//             </TouchableOpacity>
//             <GiftedChat
//                 messages={messages}
//                 onSend={messages => onSend(messages)}
//                 user={{
//                     _id: currentUser.uid,
//                     name: currentUser.displayName,
//                 }}
//                 renderChatHeader={() => (
//                     <View style={styles.chatHeader}>
//                         <Text style={styles.chatHeaderText}>{catProfileId ? catProfile.basicInfo.catName : userId}</Text>
//                     </View>
//                 )}
//             />
//         </View>
//     );
// };



// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     backButton: {
//         position: 'absolute',
//         top: 20,
//         left: 20,
//         zIndex: 1,
//     },
//     backImage: {
//         width: 24,
//         height: 24,
//     },
//     chatHeader: {
//         backgroundColor: '#47c1ff',
//         paddingVertical: 10,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     chatHeaderText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#fff',
//     },
// });

// export default UserChat;


import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const UserChat = ({ route }) => {
    const navigation = useNavigation();
    const { catProfileId, userId } = route.params;

    const currentUser = auth().currentUser;
    const [messages, setMessages] = useState([]);
    const [recipientName, setRecipientName] = useState('');

    useEffect(() => {
        const conversationId = generateConversationId(currentUser.uid, catProfileId || userId);

        if (catProfileId) {
            firestore()
                .collection('catProfiles')
                .doc(catProfileId)
                .get()
                .then(documentSnapshot => {
                    if (documentSnapshot.exists) {
                        setRecipientName(documentSnapshot.data().basicInfo.catName);
                    }
                });
        } else {
            firestore()
                .collection('users')
                .doc(userId)
                .get()
                .then(documentSnapshot => {
                    if (documentSnapshot.exists) {
                        setRecipientName(documentSnapshot.data().displayName);
                    }
                });
        }

        const unsubscribeListener = firestore()
            .collection('conversations')
            .doc(conversationId)
            .collection('messages')
            .orderBy('createdAt', 'desc') // Changed the order to descending
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

        return () => unsubscribeListener();
    }, [catProfileId, userId]);

    const onSend = async (newMessages = []) => {
        const conversationId = generateConversationId(currentUser.uid, catProfileId || userId);
        await firestore()
            .collection('conversations')
            .doc(conversationId)
            .collection('messages')
            .add({
                ...newMessages[0],
                createdAt: firestore.FieldValue.serverTimestamp(),
                senderId: currentUser.uid,
                senderName: currentUser.displayName,
            });
    };

    const generateConversationId = (userId1, userId2) => {
        return userId1 < userId2 ? `${userId1}_${userId2}` : `${userId2}_${userId1}`;
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleVideoCall = () => {
        navigation.navigate('VideoCallScreen', { recipientId: catProfileId || userId });
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
                inverted={true} // Added the inverted prop
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

export default UserChat;