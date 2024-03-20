// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation from @react-navigation/native
// import { fetchAllUserDataFromFirestore, fetchAllDoctorDataFromFirestore } from '../../Services/firebase';

// const MonitorUsers = () => {
//     const navigation = useNavigation(); // Use useNavigation hook here

//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const fetchedUsers = await fetchAllUserDataFromFirestore();
//                 const fetchedDoctors = await fetchAllDoctorDataFromFirestore();
//                 setUsers(fetchedUsers);
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };
//         fetchUsers();
//     }, []);

//     const UserCard = ({ user, onPress }) => (
//         console.log('user cty:', user.city),
//         <TouchableOpacity style={styles.userCard} onPress={onPress}>
//             <View style={styles.userIconContainer}>
//                 <Image
//                     style={styles.thumbnailImage}
//                     resizeMode="cover"
//                     source={require("../../../assets/Catassets/doctoruser2.png")}
//                 />
//             </View>
//             <View style={styles.userInfoContainer}>
//                 <Text style={styles.userName}>{user.firstname}</Text>
//                 <View style={styles.detailsContainer}>
//                     <Text style={styles.details}>details</Text>
//                 </View>
//                 <Text style={styles.city}>{user.city}</Text>
//                 <Text style={styles.gender}>{user.gender}</Text>
//             </View>
//         </TouchableOpacity>

//     );

//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <Text style={styles.headerText}>Profile</Text>
//             </View>
//             <Text style={styles.userCount}>Active Users:{users.length}</Text>

//             <FlatList
//                 data={users}
//                 renderItem={({ item }) => (
//                     <UserCard
//                         user={item}
//                         onPress={() => navigation.navigate('UserDetailScreen', { userData: item })}
//                     />
//                 )}
//                 keyExtractor={(item) => item.id}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     header: {
//         backgroundColor: '#ffff',
//         borderBottomLeftRadius: 30,
//         borderBottomRightRadius: 30,
//         paddingHorizontal: 20,
//         paddingVertical: 40,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 5,
//         },
//         shadowOpacity: 1,
//         shadowRadius: 20,
//         elevation: 30,
//         marginBottom: 40,
//     },
//     headerText: {
//         fontSize: 20,
//         color: '#47C1FF',
//         textAlign: 'center',
//         fontFamily: 'Poppins-SemiBold',
//     },
//     userCount: {
//         fontSize: 16,
//         color: '#333',
//         fontFamily: 'Poppins-SemiBold',
//         fontWeight: 'bold',
//         textAlign: 'right',
//         marginBottom: 10,
//     },
//     userCard: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderColor: '#fff',
//         backgroundColor: '#fff',
//         borderWidth: 1,
//         borderRadius: 16,
//         elevation: 2,
//         padding: 16,
//         marginBottom: 12,
//         height: 100,
//     },
//     userIconContainer: {
//         marginRight: 16,
//         backgroundColor: '#CAEDFF',
//         padding: 10,
//         borderRadius: 100,
//     },
//     thumbnailImage: {
//         width: 40,
//         height: 40,
//         borderRadius: 5,
//     },
//     userInfoContainer: {
//         flex: 1, // Fill remaining space in the row
//     },
//     detailsContainer: {
//         flexDirection: 'row',
//         justifyContent: 'flex-end',
//         marginBottom: -15,
//     },
//     details: {
//         fontSize: 16,
//         color: '#47C1FF',
//         fontFamily: 'Poppins-SemiBold',
//         fontWeight: 'bold',
//     },
//     userName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         fontFamily: 'Poppins-ExtraBoldItalic',
//     },
//     city: {
//         fontSize: 14,
//         fontFamily: 'Poppins-SemiBold',
//     },
//     gender: {
//         fontSize: 14,
//         fontFamily: 'Poppins-SemiBold',
//     },

//     // Add styles for other user information here
// });

// export default MonitorUsers;


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Modal, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchAllUserDataFromFirestore, fetchAllDoctorDataFromFirestore } from '../../Services/firebase';

const MonitorUsers = () => {
    const navigation = useNavigation();

    const [users, setUsers] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [showUsers, setShowUsers] = useState(true); // State variable to toggle between users and doctors
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedUsers = await fetchAllUserDataFromFirestore();
                const fetchedDoctors = await fetchAllDoctorDataFromFirestore();
                const fetchedDoctorsData = fetchedDoctors.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setUsers(fetchedUsers);
                setDoctors(fetchedDoctorsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const UserCard = ({ user, onPress }) => (
        <TouchableOpacity style={styles.userCard} onPress={onPress}>
            <View style={styles.userIconContainer}>
                <Image
                    style={styles.thumbnailImage}
                    resizeMode="cover"
                    source={require("../../../assets/Catassets/doctoruser2.png")}
                />
            </View>
            <View style={styles.userInfoContainer}>
                <Text style={styles.userName}>{user.firstname}</Text>
                <View style={styles.detailsContainer}>
                    <Text style={styles.details}>details</Text>
                </View>
                <Text style={styles.city}>{user.city}</Text>
                <Text style={styles.gender}>{user.gender}</Text>
            </View>
        </TouchableOpacity>
    );

    const DoctorCard = ({ doctor, onPress }) => (
        <TouchableOpacity style={styles.userCard} onPress={onPress}>
            <View style={styles.userIconContainer}>
                <Image
                    style={styles.thumbnailImage}
                    resizeMode="cover"
                    source={require("../../../assets/Catassets/doctoruser2.png")}
                />
            </View>
            <View style={styles.userInfoContainer}>
                <Text style={styles.userName}>{doctor.username}</Text>
                <View style={styles.detailsContainer}>
                    <Text style={styles.details}>details</Text>
                </View>
                <Text style={styles.city}>{doctor.city}</Text>
                <Text style={styles.gender}>{doctor.specialization}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Profile</Text>
            </View>
            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={[styles.filterButton]}
                    onPress={() => setFilterModalVisible(true)}
                >
                    <Image source={require("../../../assets/Catassets/filter_admin.png")} style={styles.filterImage} />
                    <Text style={styles.filterButtonText}>Filter</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.userCount}>Active {showUsers ? 'Users' : 'Doctors'}: {showUsers ? users.length : doctors.length}</Text>
            <FlatList
                data={showUsers ? users : doctors}
                renderItem={({ item }) => (
                    showUsers ?
                        <UserCard
                            user={item}
                            onPress={() => navigation.navigate('UserDetailScreen', { userData: item })}
                        />
                        :
                        <DoctorCard
                            doctor={item}
                            onPress={() => navigation.navigate('DoctorDetailScreen', { doctorData: item })}
                        />
                )}
                keyExtractor={(item) => item.id}
            />
            <Modal
                visible={filterModalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setFilterModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setFilterModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity
                                style={styles.modalItem}
                                onPress={() => {
                                    setShowUsers(true);
                                    setFilterModalVisible(false);
                                }}
                            >
                                <Text style={styles.modalItemText}>Users</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalItem}
                                onPress={() => {
                                    setShowUsers(false);
                                    setFilterModalVisible(false);
                                }}
                            >
                                <Text style={styles.modalItemText}>Doctors</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    headerText: {
        fontSize: 20,
        color: '#47C1FF',
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
    },
    userCount: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'Poppins-SemiBold',
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 10,
        marginRight: 20,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    filterButton: {
        flexDirection: 'row', // Arrange contents horizontally
        alignItems: 'center', // Align items vertically in the center
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        marginHorizontal: 5,
        backgroundColor: '#fff',
    },
    filterButtonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        color: '#47C1FF',
        marginLeft: 5,
    },
    filterImage: {
        width: 15,
        height: 18,
        transform: [{ rotate: '90deg' }], // Rotate the image by 90 degrees
        // marginLeft: 5, // Adjust as needed for proper spacing
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
        height: 100,
    },
    userIconContainer: {
        marginRight: 16,
        backgroundColor: '#CAEDFF',
        padding: 10,
        borderRadius: 100,
    },
    thumbnailImage: {
        width: 40,
        height: 40,
        borderRadius: 5,
    },
    userInfoContainer: {
        flex: 1,
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: -15,
    },
    details: {
        fontSize: 16,
        color: '#47C1FF',
        fontFamily: 'Poppins-SemiBold',
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Poppins-ExtraBoldItalic',
    },
    city: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
    },
    gender: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    modalItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalItemText: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },
});

export default MonitorUsers;
