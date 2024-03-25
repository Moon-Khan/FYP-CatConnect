import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { fetchApproveCatProfile } from '../../Services/firebase'; // Import your function to fetch cat profiles
const SearchFeed = ({ route }) => {
    const { filterOptions } = route.params;
    const [filteredCatProfiles, setFilteredCatProfiles] = useState([]);

    useEffect(() => {
        fetchCatProfiles(); // Fetch cat profiles when component mounts
    }, []);

    const fetchCatProfiles = async () => {
        try {
            const profiles = await fetchApproveCatProfile(); // Fetch cat profiles from Firebase
            if (profiles && profiles.length > 0) {
                const profilesData = profiles.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Apply filters to the fetched profiles
                const filteredProfiles = profilesData.filter((profile) => {
                    // Check if the profile matches each filter option
                    if (filterOptions.breed && profile.basicInfo.breed !== filterOptions.breed) {
                        return false;
                    }
                    if (filterOptions.age && profile.basicInfo.age !== filterOptions.age) {
                        return false;
                    }
                    if (filterOptions.gender && profile.basicInfo.gender !== filterOptions.gender) {
                        return false;
                    }
                    if (filterOptions.temperament && profile.personalityAndAvailability.temperament !== filterOptions.temperament) {
                        return false;
                    }
                    if (filterOptions.catColors && profile.physicalHealth.color !== filterOptions.catColors) {
                        return false;
                    }
                    if (filterOptions.eyeColors && profile.physicalHealth.eyeColor !== filterOptions.eyeColors) {
                        return false;
                    }
                    if (filterOptions.vaccinationStatus && profile.physicalHealth.vaccinationStatus !== filterOptions.vaccinationStatus) {
                        return false;
                    }

                    return true; // If all conditions pass, include the profile in the filtered list
                });

                setFilteredCatProfiles(filteredProfiles); // Set the filtered cat profiles in state
            }
        } catch (error) {
            console.error('Error fetching cat profiles:', error);
        }
    };

    const catProfileCard = (catProfile) => {
        console.log('catProfile--------------> in searchfeed --------->', catProfile)

        const { basicInfo, personalityAndAvailability } = catProfile; // Destructure properties from catProfile
        const pics = catProfile.mediaUpload?.mediaList || [];

        return (
            <View style={styles.petCardContainer}>
                <TouchableOpacity
                    key={basicInfo.catName}
                    style={styles.petCard}
                    onPress={() => onPress(catProfile)}>

                    <View style={styles.imageContainer}>
                        {pics.length > 0 &&
                            pics[0] ? (
                            <Image
                                style={styles.thumbnailImage}
                                source={{ uri: pics[0] }}
                            />
                        ) : (
                            <Text>No cat profile picture available</Text>
                        )}
                    </View>
                    <View style={styles.cardContent}>
                        <Text style={styles.breedName}>{basicInfo.breed}</Text>
                        <Text style={styles.available}>{personalityAndAvailability.availabilityStatus}</Text>
                        <Text style={styles.catName}>{basicInfo.catName}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>

                <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
                    <Image source={require("../../../assets/Catassets/backbtn.png")} style={styles.bactbtn} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Search</Text>
            </View>

            <View style={styles.petCardContainer}>
                {filteredCatProfiles.length > 0 ? (
                    filteredCatProfiles.map((catProfile) => (
                        catProfileCard(catProfile)
                    ))
                ) : (
                    <Text>No cat profiles available for the selected filters</Text>
                )}
            </View>

        </ScrollView>
    );
};


const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white',
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

    cardContent: {
        flexDirection: 'column',
        marginLeft: 10,

    },
    petCardContainer: {
        marginLeft: 20,
        width: 155,
        marginRight: 10,
        height: 200,
    },
    petCard: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingBottom: 10,
        height: 200,

    },

    imageContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    thumbnailImage: {
        width: '100%',
        height: 120,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },

    catName: {
        flexDirection: 'row', // Arrange items horizontally
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'right',
        fontFamily: 'Poppins-SemiBold',
        color: '#7E7E7E',
        paddingHorizontal: 10,
        marginTop: -18,

    },
    breedName: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 5,
        fontFamily: 'Poppins-SemiBold',
        backgroundColor: '#212529',
        color: '#fff',
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 20,
        width: '55%',
    },
    available: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: 5,
        fontFamily: 'Poppins-SemiBold',
        color: '#212529',
    },


    // petCardContainer: {
    //     flex: 1,
    //     paddingHorizontal: 10,
    // },
    // petCard: {
    //     flexDirection: 'row',
    //     backgroundColor: '#FFF',
    //     borderRadius: 10,
    //     padding: 10,
    //     marginBottom: 10,
    // },
    // imageContainer: {
    //     marginRight: 10,
    // },
    // thumbnailImage: {
    //     width: 80,
    //     height: 80,
    //     borderRadius: 5,
    // },
    // cardContent: {
    //     flex: 1,
    //     justifyContent: 'center',
    // },
    // breedName: {
    //     fontSize: 16,
    //     fontWeight: 'bold',
    //     marginBottom: 5,
    // },
    // available: {
    //     fontSize: 14,
    //     color: '#888',
    //     marginBottom: 5,
    // },
    // catName: {
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     marginBottom: 5,
    // },

};

export default SearchFeed;
