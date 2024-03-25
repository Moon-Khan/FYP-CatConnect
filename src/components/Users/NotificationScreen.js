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
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { updateNotificationFromFirestore, fetchUserNofiticationFromFirestore } from '../../Services/firebase';


const NotificationsScreen = ({ route, navigation }) => {
    const { notifications } = route.params || { notifications: [] };

    // Retrieve markAsRead from navigation options
    // const markAsRead = navigation.getOption('markAsRead');
    const user = auth().currentUser;

    const [notificationsData, setNotificationsData] = useState([]);
    const userId = user.uid;

    const NotificationCard = ({ notification, index }) => (
        <View style={styles.itemContainer}>
            <View style={styles.notificationBellContainer}>
                <Image
                    source={require("../../../assets/Catassets/bell.png")}
                    style={styles.notificationBell}
                />
            </View>
            <View style={styles.item}>
                <Text style={styles.itemtext}>{notification.message}</Text>
            </View>
        </View>
    );

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
            <View style={styles.header}>

                <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
                    <Image source={require("../../../assets/Catassets/backbtn.png")} style={styles.bactbtn} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Notifications</Text>
            </View>
            {notificationsData.length > 0 ? (
                <FlatList
                    data={notificationsData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <NotificationCard notification={item} />}
                />
            ) : (
                <Text style={styles.noNotifications}>No notifications</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    noNotifications: {
        color: '#212529',
        fontFamily: 'Poppins-Regular',
        fontSize: 30,

        textAlign: 'center',
        marginTop: 200,
    },
    header: {
        backgroundColor: '#ffff',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 30,
        marginBottom: 20,
        flexDirection: 'row',
    },
    headerText: {
        fontSize: 20,
        color: '#47C1FF',
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        flex: 1,
    },

    bactbtn: {
        marginLeft: 10,
        height: 25,
        width: 25,
    },

    itemContainer: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.6,
        shadowRadius: 4,
        elevation: 4,
    },

    notificationBellContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 25,
        backgroundColor: '#47C1FF'

    },
    notificationBell: {
        width: 30,
        height: 30,
    },

    item: {
        flex: 1,
    },
    itemtext: {
        color: '#212529',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        marginLeft: 10,
    }

});

export default NotificationsScreen;