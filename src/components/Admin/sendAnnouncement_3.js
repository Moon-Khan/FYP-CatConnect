
// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { createAnnouncementAndNotifyUsers, fetchAllUserDataFromFirestore, fetchAllDoctorDataFromFirestore } from '../../Services/firebase';

// const AnnouncementScreen = () => {
//     const [users, setUsers] = useState([]);
//     const [doctors, setDoctors] = useState([]);
//     const [selectedUsers, setSelectedUsers] = useState([]);
//     const [selectedDoctors, setSelectedDoctors] = useState([]);
//     const [announcementText, setAnnouncementText] = useState('');
//     const [filteredType, setFilteredType] = useState('all');

//     useEffect(() => {
//         fetchUsers();
//         fetchDoctors();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const usersData = await fetchAllUserDataFromFirestore();
//             console.log('userdata file--->:', usersData);

//             if (usersData.length > 0) {
//                 setUsers(usersData);
//             } else {
//                 console.log('No users found in Firestore.');
//             }
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     const fetchDoctors = async () => {
//         try {
//             const doctorsData = await fetchAllDoctorDataFromFirestore();
//             console.log('doctorsData file--->:', doctorsData.docs);

//             if (doctorsData.docs.length > 0) {
//                 const doctorsSnapshot = doctorsData.docs.map(doc => ({
//                     id: doc.id,
//                     ...doc.data(),
//                 }));
//                 setDoctors(doctorsSnapshot);
//             } else {
//                 console.log('No doctors found in Firestore.');
//             }
//         } catch (error) {
//             console.error('Error fetching doctors:', error);
//         }
//     };

//     const sendAnnouncement = async () => {
//         if (!announcementText.trim()) {
//             alert('Please enter your announcement text.');
//             return;
//         }

//         if (selectedDoctors.length === 0 && selectedUsers.length === 0) {
//             alert('Please select at least one user or doctor.');
//             return;
//         }

//         const recipients = [];
//         if (filteredType === 'all' || filteredType === 'users') {
// recipients.push(...selectedUsers);
//         }
//         if (filteredType === 'all' || filteredType === 'doctors') {
//             recipients.push(...selectedDoctors);
//         }

//         const announcementData = {
//             text: announcementText,
//             recipients: recipients,
//         };

//         try {
//             await createAnnouncementAndNotifyUsers({ message: announcementData });
//             console.log('Announcement sent successfully');
//         } catch (error) {
//             console.error('Error sending announcement:', error);
//         }
//     };


//     const toggleUserSelection = (userId) => {
//         const updatedSelection = selectedUsers.includes(userId)
//             ? selectedUsers.filter(id => id !== userId)
//             : [...selectedUsers, userId];
//         setSelectedUsers(updatedSelection);
//     };

//     const toggleDoctorSelection = (doctorId) => {
//         const updatedSelection = selectedDoctors.includes(doctorId)
//             ? selectedDoctors.filter(id => id !== doctorId)
//             : [...selectedDoctors, doctorId];
//         setSelectedDoctors(updatedSelection);
//     };

//     const renderUserCheckBoxes = () => {
//         return users.map(user => (
//             <TouchableOpacity key={user.id} onPress={() => toggleUserSelection(user.id)} style={styles.checkboxContainer}>
//                 <View style={[styles.checkbox, selectedUsers.includes(user.id) && styles.checkedBox]} />
//                 <Text style={styles.label}>{user.firstname}</Text>
//             </TouchableOpacity>
//         ));
//     };

//     const renderDoctorCheckBoxes = () => {
//         return doctors.map(doctor => (
//             <TouchableOpacity key={doctor.id} onPress={() => toggleDoctorSelection(doctor.id)} style={styles.checkboxContainer}>
//                 <View style={[styles.checkbox, selectedDoctors.includes(doctor.id) && styles.checkedBox]} />
//                 <Text style={styles.label}>{doctor.name}</Text>
//             </TouchableOpacity>
//         ));
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <Text style={styles.headerText}>Announcement Screen</Text>
//             </View>

//             <TextInput
//                 style={styles.input}
//                 value={announcementText}
//                 onChangeText={text => setAnnouncementText(text)}
//                 placeholder="Write your announcement here"
//                 multiline
//             />
// <View style={styles.filterContainer}>
//     <TouchableOpacity onPress={() => setFilteredType('all')} style={styles.filterButton}>
//         <Text>All</Text>
//     </TouchableOpacity>
//     <TouchableOpacity onPress={() => setFilteredType('users')} style={styles.filterButton}>
//         <Text>Users</Text>
//     </TouchableOpacity>
//     <TouchableOpacity onPress={() => setFilteredType('doctors')} style={styles.filterButton}>
//         <Text>Doctors</Text>
//     </TouchableOpacity>
// </View>
//             <View style={styles.checkboxContainer}>
//                 {filteredType === 'all' && (
//                     <>
//                         <Text>Users:</Text>
//                         {renderUserCheckBoxes()}
//                         <Text>Doctors:</Text>
//                         {renderDoctorCheckBoxes()}
//                     </>
//                 )}
//                 {filteredType === 'users' && renderUserCheckBoxes()}
//                 {filteredType === 'doctors' && renderDoctorCheckBoxes()}
//             </View>
//             <TouchableOpacity onPress={sendAnnouncement} style={styles.sendButton}>
//                 <Text>Send Announcement</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

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
//         marginBottom: 20,
//     },
//     headerText: {
//         fontSize: 20,
//         color: '#47C1FF',
//         textAlign: 'center',
//         fontFamily: 'Poppins-SemiBold',
//     },
//     heading: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: 'gray',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 10,
//         paddingHorizontal: 20,
//         height: 100,
//     },
//     filterContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginBottom: 10,
//     },
//     filterButton: {
//         padding: 10,
//         backgroundColor: 'lightgray',
//         borderRadius: 5,
//     },
//     checkboxContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 5,
//     },
//     checkbox: {
//         width: 20,
//         height: 20,
//         borderWidth: 1,
//         borderRadius: 5,
//         marginRight: 10,
//         borderColor: 'black',
//     },
//     checkedBox: {
//         backgroundColor: 'blue',
//     },
//     label: {
//         fontSize: 16,
//     },
//     sendButton: {
//         backgroundColor: 'skyblue',
//         padding: 10,
//         borderRadius: 5,
//         alignItems: 'center',
//     },
// });

// export default AnnouncementScreen;



// AnnouncementScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createAnnouncementAndNotifyUsers, fetchAllUserDataFromFirestore, fetchAllDoctorDataFromFirestore } from '../../Services/firebase';

const AnnouncementScreen = ({ route, navigation }) => {
    const { selectedUsers, selectedDoctors } = route.params;
    const [announcementText, setAnnouncementText] = useState('');

    const sendAnnouncement = async () => {
        if (!announcementText.trim()) {
            alert('Please enter your announcement text.');
            return;
        }

        const recipients = [];

        recipients.push(...selectedUsers);
        recipients.push(...selectedDoctors);


        // selectedUsers.forEach(user => recipients.push(user.id));
        // selectedDoctors.forEach(doctor => recipients.push(doctor.id));


        console.log('recipients-->', recipients);
        console.log('announcementText -->', announcementText);

        const announcementData = {
            text: announcementText,
            recipients: recipients,
        };

        try {
            await createAnnouncementAndNotifyUsers({ message: announcementData });
            console.log('Announcement sent successfully');
            navigation.goBack(); // Navigate back after sending announcement
        } catch (error) {
            console.error('Error sending announcement:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Announcement Screen</Text>
            </View>

            <TextInput
                style={styles.input}
                value={announcementText}
                onChangeText={text => setAnnouncementText(text)}
                placeholder="Write your announcement here"
                multiline
            />

            <TouchableOpacity onPress={sendAnnouncement} style={styles.sendButton}>
                <Text style={styles.announcmentbuttonText}>Send Announcement</Text>
            </TouchableOpacity>
        </View>
    );
};

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
    input: {
        margin: 15,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        height: 100,
    },
    sendButton: {
        backgroundColor: '#47C1FF',
        padding: 15,
        borderRadius: 25,
        marginTop: 35,
        alignItems: 'center',
        width: '70%',
        alignSelf: 'center',
        marginBottom: 20,
    },
    announcmentbuttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
    },
});

export default AnnouncementScreen;
