// ./src/Components/Users/UserInfo.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { fetchUserDataFromFirestore, updateUserDataInFirestore } from '../../Services/firebase';

const UpdateUserScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [contact, setContact] = useState('');
    const [city, setCity] = useState('');
    const [gender, setGender] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [userDataLoaded, setUserDataLoaded] = useState(false);

    const user = auth().currentUser;

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const userData = await fetchUserDataFromFirestore(user.uid);
            if (userData.exists) {
                const { contact, city, gender, firstname, lastname, password } = userData.data();
                setContact(contact || '');
                setCity(city || '');
                setGender(gender || '');
                setFirstname(firstname || '');
                setLastname(lastname || '');
                setPassword(password || '');
                setUserDataLoaded(true);
            } else {
                console.log('User document does not exist in Firestore.');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleUserUpdate = async () => {
        try {
            if (!contact || !city || !gender || !firstname || !lastname || !password) {
                Alert.alert('Please fill all fields');
                return;
            }

            await updateUserDataInFirestore(user.uid, '', firstname, password, '', lastname, contact, city, gender);

            navigation.navigate('Home');
            console.log('User updated successfully!');
        } catch (error) {
            console.log(error.message);
            Alert.alert('Error', 'Failed to update the account. Please try again.');
        }
    };

    if (!userDataLoaded) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Edit Profile</Text>
            </View>
            <TextInput
                style={[styles.input, styles.inputbox]}
                placeholder="Firstname"
                onChangeText={(text) => setFirstname(text)}
                value={firstname}
            />
            <TextInput
                style={[styles.input, styles.inputbox]}
                placeholder="Lastname"
                onChangeText={(text) => setLastname(text)}
                value={lastname}
            />
            <TextInput
                style={[styles.input, styles.inputbox]}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <TextInput
                style={[styles.input, styles.inputbox]}
                placeholder="City"
                onChangeText={(text) => setCity(text)}
                value={city}
            />
            <TextInput
                style={[styles.input, styles.inputbox]}
                placeholder="Contact"
                onChangeText={(text) => setContact(text)}
                value={contact}
            />
            <TextInput
                style={[styles.input, styles.inputbox]}
                placeholder="Gender"
                onChangeText={(text) => setGender(text)}
                value={gender}
            />
            <TouchableOpacity style={styles.button} onPress={handleUserUpdate}>
                <Text style={styles.buttonText}>Update Profile</Text>
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
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 30,
        marginBottom: 40,
    },
    headerText: {
        fontSize: 20,
        color: '#47C1FF',
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
    },
    input: {
        marginBottom: 16,
        paddingHorizontal: 8,
        paddingLeft: 12,
        alignSelf: 'stretch',
        color: '#7E7E7E',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
    },
    inputbox: {
        borderColor: '#D9D9D9',
        backgroundColor: '#fff',
        borderWidth: 1,
        padding: 10,
        height: 50,
        borderRadius: 8,
        width: '90%',
        alignSelf: 'center',
        minHeight: 1,
        marginTop: 10,
    },
    button: {
        backgroundColor: '#47C1FF',
        padding: 12,
        borderRadius: 25,
        marginTop: 15,
        width: '50%',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#ffff',
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
    },
});

export default UpdateUserScreen;


// // ./src/Components/Users/UserInfo.js

// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { useDispatch } from 'react-redux';
// import auth from '@react-native-firebase/auth';
// import { useNavigation } from '@react-navigation/native';
// import { fetchUserDataFromFirestore, updateUserDataInFirestore } from '../../Services/firebase';
// import { Picker } from '@react-native-picker/picker';

// const UpdateUserScreen = () => {
//     const navigation = useNavigation();
//     const dispatch = useDispatch();
//     const [contact, setContact] = useState('');
//     const [city, setCity] = useState('');
//     const [gender, setGender] = useState('');
//     const [firstname, setFirstname] = useState('');
//     const [lastname, setLastname] = useState('');
//     const [password, setPassword] = useState('');
//     const [country, setCountry] = useState(''); // New state for selected country
//     const [countryCode, setCountryCode] = useState(''); // New state for selected country code
//     const [userDataLoaded, setUserDataLoaded] = useState(false);

//     const user = auth().currentUser;

//     useEffect(() => {
//         fetchUserData();
//     }, []);

//     const fetchUserData = async () => {
//         try {
//             const userData = await fetchUserDataFromFirestore(user.uid);
//             if (userData.exists) {
//                 const { contact, city, gender, firstname, lastname, password } = userData.data();
//                 setContact(contact || '');
//                 setCity(city || '');
//                 setGender(gender || '');
//                 setFirstname(firstname || '');
//                 setLastname(lastname || '');
//                 setPassword(password || '');
//                 setUserDataLoaded(true);
//             } else {
//                 console.log('User document does not exist in Firestore.');
//             }
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//         }
//     };

//     const handleUserUpdate = async () => {
//         try {
//             if (!contact || !city || !gender || !firstname || !lastname || !password) {
//                 Alert.alert('Please fill all fields');
//                 return;
//             }

//             // Validate contact number based on the selected country code here

//             await updateUserDataInFirestore(user.uid, '', firstname, password, '', lastname, contact, city, gender);

//             navigation.navigate('Home');
//             console.log('User updated successfully!');
//         } catch (error) {
//             console.log(error.message);
//             Alert.alert('Error', 'Failed to update the account. Please try again.');
//         }
//     };

//     if (!userDataLoaded) {
//         return (
//             <View style={styles.container}>
//                 <Text>Loading...</Text>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <Text style={styles.headerText}>Edit Profile</Text>
//             </View>
//             <TextInput
//                 style={[styles.input, styles.inputbox]}
//                 placeholder="Firstname"
//                 onChangeText={(text) => setFirstname(text)}
//                 value={firstname}
//             />
//             <TextInput
//                 style={[styles.input, styles.inputbox]}
//                 placeholder="Lastname"
//                 onChangeText={(text) => setLastname(text)}
//                 value={lastname}
//             />
//             <TextInput
//                 style={[styles.input, styles.inputbox]}
//                 placeholder="Password"
//                 onChangeText={(text) => setPassword(text)}
//                 value={password}
//             />
//             <TextInput
//                 style={[styles.input, styles.inputbox]}
//                 placeholder="City"
//                 onChangeText={(text) => setCity(text)}
//                 value={city}
//             />
//             <Picker
//                 selectedValue={country}
//                 style={[styles.input, styles.inputbox]}
//                 onValueChange={(itemValue) => setCountry(itemValue)}
//             >
//                 {/* Populate this Picker with all countries */}
//                 <Picker.Item label="Select Country" value="" />
//                 {/* Add all countries as Picker.Item components here */}
//             </Picker>
//             <TextInput
//                 style={[styles.input, styles.inputbox]}
//                 placeholder="Contact"
//                 onChangeText={(text) => setContact(text)}
//                 value={contact}
//             />
//             <Picker
//                 selectedValue={countryCode}
//                 style={[styles.input, styles.inputbox]}
//                 onValueChange={(itemValue) => setCountryCode(itemValue)}
//             >
//                 {/* Populate this Picker with all country codes */}
//                 <Picker.Item label="Select Country Code" value="" />
//                 {/* Add all country codes as Picker.Item components here */}
//             </Picker>
//             <TextInput
//                 style={[styles.input, styles.inputbox]}
//                 placeholder="Gender"
//                 onChangeText={(text) => setGender(text)}
//                 value={gender}
//             />
//             <TouchableOpacity style={styles.button} onPress={handleUserUpdate}>
//                 <Text style={styles.buttonText}>Update Profile</Text>
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
//         borderBottomLeftRadius: 20,
//         borderBottomRightRadius: 20,
//         paddingHorizontal: 20,
//         paddingVertical: 35,
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
//     input: {
//         marginBottom: 16,
//         paddingHorizontal: 8,
//         paddingLeft: 12,
//         alignSelf: 'stretch',
//         color: '#7E7E7E',
//         fontFamily: 'Poppins-SemiBold',
//         fontSize: 15,
//     },
//     inputbox: {
//         borderColor: '#D9D9D9',
//         backgroundColor: '#fff',
//         borderWidth: 1,
//         padding: 10,
//         height: 50,
//         borderRadius: 8,
//         width: '90%',
//         alignSelf: 'center',
//         minHeight: 1,
//         marginTop: 10,
//     },
//     button: {
//         backgroundColor: '#47C1FF',
//         padding: 12,
//         borderRadius: 25,
//         marginTop: 15,
//         width: '50%',
//         alignSelf: 'center',
//     },
//     buttonText: {
//         fontSize: 18,
//         color: '#ffff',
//         textAlign: 'center',
//         fontFamily: 'Poppins-Medium',
//     },
// });

// export default UpdateUserScreen;
