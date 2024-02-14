import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const UserChat = ({ route }) => {
    const navigation = useNavigation();
    const { user } = route.params;
    const currentUser = auth().currentUser;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const conversationId = generateConversationId(currentUser.uid, user.id);

        const unsubscribeListener = firestore()
            .collection('conversations')
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

        return () => unsubscribeListener();
    }, [user]);

    const onSend = async (newMessages = []) => {
        const conversationId = generateConversationId(currentUser.uid, user.id);
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

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Image
                    source={require('../../../assets/Catassets/back.png')}
                    style={styles.backImage}
                />
            </TouchableOpacity>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: currentUser.uid,
                    name: currentUser.displayName,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
});

export default UserChat;
