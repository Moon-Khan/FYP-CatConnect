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
                    if (doctorId || userId && data.basicInfo && data.basicInfo.catName) {
                        name = data.basicInfo.catName;
                    } else if (!doctorId && data.firstname) {
                        name = data.firstname;
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
                <TouchableOpacity onPress={handleVideoCall} style={styles.videoCallButton}>
                    {/* <Text style={styles.videoCallButtonText}>Start Video Call</Text> */}
                    <Image
                        source={require('../../../assets/Catassets/Videocamera.png')}
                        style={styles.videocamera}
                    />
                </TouchableOpacity>
            </View>

      
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
        // backgroundColor: '#47c1ff',
        backgroundColor: '#FBFBFB',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    // chatHeader: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     backgroundColor: '#47c1ff',
    //     paddingVertical: 10,
    //     paddingHorizontal: 20,
    // },
    // chatHeaderText: {
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     color: '#ffffff',
    //     marginLeft: 10,
    // },
    // videoCallButton: {
    //     backgroundColor: '#47c1ff',
    //     padding: 10,
    //     borderRadius: 10,
    //     marginVertical: 10,
    //     marginHorizontal: 20,
    //     alignItems: 'center',
    // },
    chatHeaderText: {
        fontSize: 20,
        fontFamily: 'Poppins-Medium',
        color: '#212529',
        marginLeft: 50,
    },

    videocamera: {
        width: 34,
        height: 24,
        marginLeft: 90,

    },

});

export default DoctorChat;