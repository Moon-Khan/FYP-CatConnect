// SelectRecepientsforAnnouncmenets.js

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import { fetchAllUserDataFromFirestore, fetchAllDoctorDataFromFirestore } from '../../Services/firebase';
// import { ScrollView } from 'react-native-gesture-handler';

const SelectRecepientsforAnnouncmenets = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedDoctors, setSelectedDoctors] = useState([]);
    const [filterType, setFilterType] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectAllRecipients, setSelectAllRecipients] = useState(false);
    const [selectAllUsers, setSelectAllUsers] = useState(false);
    const [selectAllDoctors, setSelectAllDoctors] = useState(false);


    useEffect(() => {
        fetchUsers();
        fetchDoctors();
    }, []);

    const toggleSelectAllRecipients = () => {


        setSelectAllRecipients(!selectAllRecipients);
        if (!selectAllRecipients) {
            setSelectedUsers(users.map(user => user.id));
            setSelectedDoctors(doctors.map(doctor => doctor.id));
        } else {
            setSelectedUsers([]);
            setSelectedDoctors([]);
        }
    };

    const toggleSelectAllUsers = () => {
        setSelectAllUsers(!selectAllUsers);
        setSelectedUsers(selectAllUsers ? [] : users.map(user => user.id));
    };

    const toggleSelectAllDoctors = () => {
        setSelectAllDoctors(!selectAllDoctors);
        setSelectedDoctors(selectAllDoctors ? [] : doctors.map(doctor => doctor.id));
    };

    const fetchUsers = async () => {
        try {
            const usersData = await fetchAllUserDataFromFirestore();
            console.log('userdata file--->:', usersData);

            if (usersData.length > 0) {
                setUsers(usersData);
            } else {
                console.log('No users found in Firestore.');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchDoctors = async () => {
        try {
            const doctorsData = await fetchAllDoctorDataFromFirestore();
            console.log('doctorsData file--->:', doctorsData.docs);

            if (doctorsData.docs.length > 0) {
                const doctorsSnapshot = doctorsData.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setDoctors(doctorsSnapshot);
            } else {
                console.log('No doctors found in Firestore.');
            }
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const handleCreateAnnouncement = () => {
        if (selectedDoctors.length === 0 && selectedUsers.length === 0) {
            alert('Please select at least one user or doctor.');
            return;
        }

        navigation.navigate('AnnouncementScreen', { selectedUsers, selectedDoctors });
    };

    const toggleUserSelection = (userId) => {
        const updatedSelection = selectedUsers.includes(userId)
            ? selectedUsers.filter(id => id !== userId)
            : [...selectedUsers, userId];
        setSelectedUsers(updatedSelection);
    };

    const toggleDoctorSelection = (doctorId) => {
        const updatedSelection = selectedDoctors.includes(doctorId)
            ? selectedDoctors.filter(id => id !== doctorId)
            : [...selectedDoctors, doctorId];
        setSelectedDoctors(updatedSelection);
    };

    const filterUsers = () => {
        return users.filter(user => user.firstname.toLowerCase().includes(searchQuery.toLowerCase()));
    };

    const filterDoctors = () => {
        return doctors.filter(doctor => doctor.name.toLowerCase().includes(searchQuery.toLowerCase()));
    };

    const renderUserCards = () => {
        return filterUsers().map(user => (
            <TouchableOpacity key={user.id} onPress={() => toggleUserSelection(user.id)} style={styles.card}>
                <View style={[styles.checkbox, selectedUsers.includes(user.id) && styles.checkedBox]} />
                <Text style={styles.label}>{user.firstname}</Text>
            </TouchableOpacity>
        ));
    };

    const renderDoctorCards = () => {
        return filterDoctors().map(doctor => (
            <TouchableOpacity key={doctor.id} onPress={() => toggleDoctorSelection(doctor.id)} style={styles.card}>
                <View style={[styles.checkbox, selectedDoctors.includes(doctor.id) && styles.checkedBox]} />
                <Text style={styles.label}>{doctor.name}</Text>
            </TouchableOpacity>
        ));
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Select Recipients</Text>
            </View>

            <View style={styles.filterContainer}>
                <TouchableOpacity onPress={() => setFilterType('all')} style={[styles.filterButton, filterType === 'all' && styles.selectedButton]}>

                    <Text style={[styles.buttonText, filterType === 'all' && styles.selectedButtonText]}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilterType('users')} style={[styles.filterButton, filterType === 'users' && styles.selectedButton]}>

                    <Text style={[styles.buttonText, filterType === 'users' && styles.selectedButtonText]}>Users</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilterType('doctors')} style={[styles.filterButton, filterType === 'doctors' && styles.selectedButton]}>


                    <Text style={[styles.buttonText, filterType === 'doctors' && styles.selectedButtonText]}>Doctors</Text>
                </TouchableOpacity>
            </View>

            {/* <View style={styles.filterContainer}>
                <TouchableOpacity onPress={() => toggleSelectAllRecipients()} style={[styles.filterButton, selectAllRecipients && styles.selectedButton]}>
                    <Text style={[styles.buttonText, selectAllRecipients && styles.selectedButtonText]}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleSelectAllUsers()} style={[styles.filterButton, selectAllUsers && styles.selectedButton]}>
                    <Text style={[styles.buttonText, selectAllUsers && styles.selectedButtonText]}>Users</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleSelectAllDoctors()} style={[styles.filterButton, selectAllDoctors && styles.selectedButton]}>
                    <Text style={[styles.buttonText, selectAllDoctors && styles.selectedButtonText]}>Doctors</Text>
                </TouchableOpacity>
            </View> */}

            <View style={styles.searchInputContainer}>
                <Image
                    style={styles.searchIcon}
                    resizeMode="cover"
                    source={require("../../../assets/Catassets/search.png")}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    onChangeText={(text) => setSearchQuery(text)}
                    value={searchQuery}
                />
            </View>

            <View style={styles.checkboxContainer}>
                {filterType === 'all' && (
                    <>
                        {/* <Text style={styles.userlabel}>All:</Text> */}
                        <TouchableOpacity onPress={() => toggleSelectAllRecipients()}>
                            <Text style={styles.selectAllLabel}>Select All:</Text>

                        </TouchableOpacity>
                        {renderUserCards()}
                        {renderDoctorCards()}

                    </>
                )}

                {filterType === 'users' && (
                    <>
                        <TouchableOpacity onPress={() => toggleSelectAllUsers()}>
                            <Text style={styles.selectAllLabel}>Select All:</Text>

                        </TouchableOpacity>
                        {renderUserCards()}

                    </>
                )}

                {filterType === 'doctors' && (
                    <>
                        <TouchableOpacity onPress={() => toggleSelectAllDoctors()}>
                            <Text style={styles.selectAllLabel}>Select All:</Text>

                        </TouchableOpacity>
                        {renderDoctorCards()}
                    </>
                )}
            </View>

            <TouchableOpacity onPress={handleCreateAnnouncement} style={styles.button}>
                <Text style={styles.announcmentbuttonText}> Write Announcement</Text>
            </TouchableOpacity>
        </ScrollView>
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
    searchIcon: {
        marginLeft: 10,
        width: 25,
        height: 25,
    },
    searchInputContainer: {
        marginLeft: 15,
        marginRight: 30,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#fff',
        backgroundColor: '#fff',
        width: '93%',
        borderWidth: 1,
        borderRadius: 25,
        height: 50,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontFamily: 'Poppins-Regular',
        color: '#212529',
    },

    card: {
        // marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#fff',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 16,
        elevation: 2,
        paddingLeft: 20,
        marginBottom: 12,
        height: 50,
    },
    checkboxContainer: {
        paddingLeft: 10,
        paddingRight: 10,
    },

    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 5,
        marginRight: 10,
        borderColor: 'black',
    },
    checkedBox: {
        backgroundColor: 'blue',
    },
    userlabel: {
        fontSize: 18,
        fontFamily: 'Poppins-Semibold',
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 5,
    },
    selectAllLabel: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 16,
        fontFamily: 'Poppins-Semibold',
        marginLeft: 300,
    },


    label: {
        fontSize: 16,
        fontFamily: 'Poppins-Semibold',
    },
    button: {
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
    buttonText: {
        color: '#47C1FF',
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    filterButton: {
        padding: 10,
        marginRight: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#47C1FF',
    },


    selectedButton: {
        backgroundColor: '#47C1FF',
        color: 'white',
    },
    selectedButtonText: {
        color: 'white'
    },
});

export default SelectRecepientsforAnnouncmenets;
