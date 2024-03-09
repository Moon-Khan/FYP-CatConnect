import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import { fetchCatProfilesForUser } from '../../Services/firebase';
import { useNavigation } from '@react-navigation/native';

const UserDetailScreen = ({ route }) => {
    const { userData } = route.params;
    const [userDetails, setUserDetails] = useState({});
    const [catProfiles, setCatProfiles] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setUserDetails(userData);

                const catProfilesData = await fetchCatProfilesForUser(userData.id);
                const profiles = catProfilesData.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log('catProfiles:', userData.id);
                console.log('catProfiles:', userData.firstname);
                console.log('catProfiles:', profiles);

                setCatProfiles(profiles);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchDetails();
    }, [userData]);

    const navigateToCatDetail = (catProfile) => {
        navigation.navigate('UserCatDetails', {catProfile});

    };

    const CatProfileCard = ({ catProfile }) => (
        <View style={styles.card} onPress={() => navigateToCatDetail(catProfile)}>
            <View style={styles.imageContainer}>
                {catProfile.mediaUpload?.mediaList?.[0] ? (
                    <Image
                        style={styles.thumbnailImage}
                        source={{ uri: catProfile.mediaUpload.mediaList[0] }}
                    />
                ) : (
                    <Text>No cat profile picture available</Text>
                )}
            </View>
            <Text style={styles.breedName}>{catProfile.basicInfo.breed}</Text>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Edit Profile</Text>
            </View>
            <Text style={styles.details}>UserDetails</Text>
            <TextInput
                style={styles.input}
                placeholder="Firstname"
                value={userDetails.firstname}
                onChangeText={text => setUserDetails(prevState => ({ ...prevState, firstname: text }))}
            />
            <TextInput
                style={styles.input}
                placeholder="Lastname"
                value={userDetails.lastname}
                onChangeText={text => setUserDetails(prevState => ({ ...prevState, lastname: text }))}
            />
            <TextInput
                style={styles.input}
                placeholder="City"
                value={userDetails.city}
                onChangeText={text => setUserDetails(prevState => ({ ...prevState, city: text }))}
            />
            <TextInput
                style={styles.input}
                placeholder="Contact"
                value={userDetails.contact}
                onChangeText={text => setUserDetails(prevState => ({ ...prevState, contact: text }))}
            />
            <TextInput
                style={styles.input}
                placeholder="Gender"
                value={userDetails.gender}
                onChangeText={text => setUserDetails(prevState => ({ ...prevState, gender: text }))}
            />
            <Text style={styles.details}>CatDetails</Text>

            <View style={styles.catCardContainer}>
                {catProfiles.map(catProfile => (
                    <CatProfileCard key={catProfile.id} catProfile={catProfile} />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
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
    details: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'Poppins-SemiBold',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    card: {
        width: '45%', // Adjust the width as per your requirement
        margin: 5, // Adjust the margin as per your requirement
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imageContainer: {
        height: 150, // Adjust the height as per your requirement
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
    },
    thumbnailImage: {
        flex: 1,
        width: '100%',
    },
    breedName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },
    catCardContainer: {
        flexDirection: 'row', // Arrange the cards horizontally
        flexWrap: 'wrap', // Allow wrapping if the space is not enough
        justifyContent: 'space-between', // Distribute space evenly between cards
        padding: 5,
    },
});

export default UserDetailScreen;
