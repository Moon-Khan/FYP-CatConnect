// // NotificationsScreen.js
// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';

// // const NotificationCard = ({ notification }) => (
// //     <View style={styles.notificationCard}>
// //         <View style={styles.iconContainer}>
// //             {/* Add your notification icon here, you can use any suitable icon library */}
// //             <Text style={styles.icon}>🔔</Text>
// //         </View>
// //         <View style={styles.notificationContent}>
// //             <Text style={styles.notificationMessage}>{notification.message}</Text>
// //             {/* Add any other relevant information from the notification */}
// //         </View>
// //     </View>
// // );

// const NotificationCard = ({ notification }) => (
//     <View style={styles.notificationCard}>
//         <Text>{notification.message}</Text>
//         {/* Add any other relevant information from the notification */}
//     </View>
// );

// const NotificationsScreen = ({ route }) => {
//     const { notifications, markAsRead } = route.params || { notifications: [], markAsRead: () => { } };

//     const user = auth().currentUser;

//     const [notificationsData, setNotificationsData] = useState([]);
//     const userId = user.uid;

//     const markNotificationAsRead = async (notificationId) => {
//         try {
//             await firestore().collection('Notifications').doc(notificationId)
//                 .update({
//                     status: 'read',
//                 });
//         } catch (error) {
//             console.error('Error marking notification as read:', error);
//         }
//     };

//     useEffect(() => {
//         if (notifications && notifications.length > 0) {
//             notifications.forEach((notification) => {
//                 markNotificationAsRead(notification.id);
//             });

//             // Call the parent function to update the notification status in HomeScreen
//             markAsRead();
//         }
//     }, [notifications]);

//     useEffect(() => {
//         const fetchNotifications = async () => {
//             try {
//                 const notificationsSnapshot = await firestore()
//                     .collection('Notifications')
//                     .where('userId', '==', userId)
//                     .get();

//                 const notificationsData = notificationsSnapshot.docs.map((doc) => ({
//                     id: doc.id,
//                     ...doc.data(),
//                 }));

//                 setNotificationsData(notificationsData);
//             } catch (error) {
//                 console.error('Error fetching notifications:', error);
//             }
//         };

//         fetchNotifications();
//     }, [userId]);

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Notifications</Text>
//             {notificationsData.length > 0 ? (
//                 <FlatList
//                     data={notificationsData}
//                     keyExtractor={(item) => item.id}
//                     renderItem={({ item }) => <NotificationCard notification={item} />}
//                 />
//             ) : (
//                 <Text>No notifications</Text>
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
//     title: {
//         fontSize: 34,
//         fontWeight: 'bold',
//         padding: 30,
//         marginBottom: 20,
//         marginBottom: 20,
//         fontFamily: 'Poppins-SemiBold',
//         color: '#47C1FF',
//     },
//     notificationCard: {
//         padding: 10,
//         marginVertical: 5,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//     },
//     iconContainer: {
//         marginRight: 5,
//     },
//     icon: {
//         fontSize: 25,
//     },
//     notificationContent: {
//         flex: 1,
//     },
//     notificationMessage: {
//         fontSize: 16,
//     },
// });

// export default NotificationsScreen;



//.src/Screens/NotificationsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { updateNotificationFromFirestore } from '../../Services/firebase';
import { fetchUserNofiticationFromFirestore } from '../../Services/firebase';

const NotificationCard = ({ notification }) => (
    <View style={styles.notificationCard}>
        <Text>{notification.message}</Text>
        {/* Add any other relevant information from the notification */}
    </View>
);

const NotificationsScreen = ({ route }) => {
    const { notifications, markAsRead } = route.params || { notifications: [], markAsRead: () => { } };

    const user = auth().currentUser;

    const [notificationsData, setNotificationsData] = useState([]);
    const userId = user.uid;

    const markNotificationAsRead = async (notificationId) => {
        try {

            await updateNotificationFromFirestore(notificationId, 'read');

        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    useEffect(() => {
        if (notifications && notifications.length > 0) {
            notifications.forEach((notification) => {
                markNotificationAsRead(notification.id);
            });

            markAsRead();
        }
    }, [notifications]);
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const notificationsSnapshot = await fetchUserNofiticationFromFirestore(userId);

                const notificationsData = notificationsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setNotificationsData(notificationsData);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [userId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notifications</Text>
            {notificationsData.length > 0 ? (
                <FlatList
                    data={notificationsData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <NotificationCard notification={item} />}
                />
            ) : (
                <Text>No notifications</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        padding: 30,
        marginBottom: 20,
        marginBottom: 20,
        fontFamily: 'Poppins-SemiBold',
        color: '#47C1FF',
    },
    notificationCard: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

export default NotificationsScreen;