import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'; // Import firestore from Firebase SDK

const CatScreen = ({ route }) => {
    const navigation = useNavigation();
    const { catProfileId } = route.params || {}; // Extract the catProfileId from route params
    const [catProfile, setCatProfile] = useState(null); // State to store cat profile data

    useEffect(() => {
        const fetchCatProfile = async () => {
            try {

                console.log('-----------------catProfileId in admin------------', catProfileId)
                const catProfileDoc = await firestore()
                    .collection('approveCatProfiles')
                    .doc(catProfileId)
                    .get();

                if (catProfileDoc.exists) {
                    const catProfileData = catProfileDoc.data();
                    console.log('-----------------catProfileData in admin------------', catProfileDoc)
                    setCatProfile(catProfileData);
                } else {
                    console.log('Cat profile not found');
                }
            } catch (error) {
                console.error('Error fetching cat profile:', error);
            }
        };

        fetchCatProfile(); // Fetch cat profile data when component mounts
    }, [catProfileId]); // Trigger effect whenever catProfileId changes

    // Render loading state while fetching cat profile data
    if (!catProfile) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    // Destructure cat profile data
    const { basicInfo, personalityAndAvailability, physicalHealth, mediaUpload } = catProfile;
    const pics = mediaUpload?.mediaList || [];

    return (
        <View style={styles.maincontainer}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Approve Profiles</Text>
            </View>


            {pics.length > 0 ? (
                <Image
                    style={styles.rectangleBackground}
                    source={{ uri: pics[0] }}
                />
            ) : (
                <Text>No cat profile picture available</Text>
            )}

            <View style={styles.catInfoContainer}>
                <Text style={styles.mamoonKhan}>{basicInfo.catName}</Text>
                <Text style={styles.persianCoated}>{basicInfo.breed}</Text>
                <Text style={styles.vaccination} >{physicalHealth.vaccinationStatus}</Text>
            </View>

            <View style={styles.container}>

                <View style={styles.ageSexStatusContainer}>
                    <View style={styles.ageSexStatusItem}>
                        <Text style={styles.age}>Age</Text>
                        <Text style={styles.months}>{basicInfo.age}</Text>
                    </View>
                    <View style={styles.ageSexStatusItem}>
                        <Text style={styles.age}>Sex</Text>
                        <Text style={styles.months}>{basicInfo.gender}</Text>
                    </View>
                    <View style={styles.ageSexStatusItem}>
                        <Text style={styles.age}>Status</Text>
                        <Text style={styles.months}>{personalityAndAvailability.availabilityStatus}</Text>
                    </View>
                </View>
                <View style={styles.aboutMamuContainer}>
                    <Text style={styles.aboutMamu}>About {basicInfo.catName} </Text>
                    <Text style={styles.provideTheCatContainer}>
                        <Text style={styles.provideTheCat}>
                            {personalityAndAvailability.description}
                        </Text>
                    </Text>
                </View>
            </View>

        </View>


    );

};

const styles = StyleSheet.create({

    maincontainer: {
        backgroundColor: '#fff',

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
    container: {
        margin: 20,
    },


    rectangleBackground: {
        alignSelf: "center",
        width: "90%",
        height: "35%",
        position: "absolute",
        borderRadius: 20,
        margin: 20,
        marginTop: 150,
    },
    catInfoContainer: {
        marginTop: '65%', // Adjust based on your design
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 5,
    },
    mamoonKhan: {
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
        color: '#7e7e7e',
        marginBottom: 5,
    },
    persianCoated: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: '#7e7e7e',
    },
    vaccination: {
        fontSize: 16,
        fontFamily: 'Popins-Medium',
        color: '#7e7e7e',
        position: 'absolute',
        right: 0,
        top: '60%', // Adjust based on your design
    },

    ageSexStatusContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    ageSexStatusItem: {
        alignItems: "center",
        marginHorizontal: 15,
        backgroundColor: '#F5F5F5',
        // borderColor: '#7e7e7e',
        // borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        width: '28%'
    },
    age: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#212529',
    },
    months: {
        fontSize: 16,
        fontFamily: 'Poppns-Medium',
        color: '#212529',
    },
    aboutMamuContainer: {
        // marginTop: '6%', ///Adjust based on your design
        alignSelf: "flex-start",
    },
    aboutMamu: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#212529',
    },
    provideTheCatContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    provideTheCat: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#7e7e7e',
    },

    contactMeWrapper: {
        backgroundColor: '#47c1ff',
        padding: 15,
        borderRadius: 24, // Adjust based on your design
        alignItems: 'center',
        position: 'relative',
        // top: '5%', // Adjust based on your design
        left: '25%',
        width: '55%',
    },
    contactMe: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#fff',
    },
    androidLarge3Item: {
        width: 30,
        height: 30,
        position: "absolute",
        bottom: 20,
        right: 20,
    },

});

export default CatScreen;