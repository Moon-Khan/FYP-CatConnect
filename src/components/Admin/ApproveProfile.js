// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { fetchforAdminApproveCatProfile, updateApproveCatProfile } from '../../Services/firebase';


// const CatProfileCard = ({ catProfile, onDetails, onApprove, onReject }) => {
//     console.log('catidapprove', catProfile.id)
//     return (
//         <View style={styles.card}>
//             <View style={styles.imageContainer}>
//                 {catProfile.mediaUpload?.mediaList?.[0] ? (
//                     <Image
//                         style={styles.thumbnailImage}
//                         source={{ uri: catProfile.mediaUpload.mediaList[0] }}
//                     />
//                 ) : (
//                     <Text>No cat profile picture available</Text>
//                 )}

//                 <TouchableOpacity onPress={() => onDetails(catProfile.id)}>
//                     <Text style={styles.delbutton}>Details</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => onApprove(catProfile.id)}>
//                     <Text style={styles.editbutton}>Approve</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => onReject(catProfile.id)}>
//                     <Text style={styles.rejectbutton}>Reject</Text>
//                 </TouchableOpacity>
//             </View>
//             <Text style={styles.breedName}>{catProfile.basicInfo.breed}</Text>
//         </View>
//     );
// };

// const ApproveProfile = () => {
//     const navigation = useNavigation();
//     const [catProfiles, setCatProfiles] = useState([]);


//     useEffect(() => {
//         const fetchProfiles = async () => {
//             try {
//                 const profiles = await fetchforAdminApproveCatProfile();
//                 if (profiles && profiles.length > 0) { // Check if profiles is defined and not empty
//                     const profilesData = profiles.map((doc) => ({
//                         id: doc.id,
//                         ...doc.data(),
//                     }));
//                     console.log('catProfiles--<:', profilesData);
//                     setCatProfiles(profilesData);
//                 }
//             } catch (error) {
//                 console.error('Error fetching cat profiles:', error);
//             }
//         };

//         fetchProfiles();
//     }, []);


//     const handleDetails = (catProfileId) => {
//         navigation.navigate('showDetailsScreen')
//     };

//     const handleApprove = async (catProfileId) => {
//         try {
//             await updateApproveCatProfile(catProfileId, 'approved');
//             // Update UI accordingly
//         } catch (error) {
//             console.error('Error approving cat profile:', error);
//         }
//     };

//     const handleReject = async (catProfileId) => {
//         try {
//             await updateApproveCatProfile(catProfileId, 'rejected');
//             // Update UI accordingly
//         } catch (error) {
//             console.error('Error rejecting cat profile:', error);
//         }
//     };


//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <Text style={styles.headerText}>Profile</Text>
//             </View>

//             <View style={styles.cardContainer}>
//                 {catProfiles.map((catProfile) => (
//                     <CatProfileCard
//                         key={catProfile.id}
//                         catProfile={catProfile}
//                         onDetails={handleDetails}
//                         onApprove={handleApprove}
//                         onReject={handleReject}
//                     />
//                 ))}
//             </View>


//         </View>
//     );
// };
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchforAdminApproveCatProfile, updateApproveCatProfile, fetchforAdminApproveDoctorProfile, updateApproveDoctorProfile } from '../../Services/firebase';

const ApproveProfile = () => {
    const navigation = useNavigation();
    const [catProfiles, setCatProfiles] = useState([]);
    const [doctorProfiles, setDoctorProfiles] = useState([]);
    const [showCatProfiles, setShowCatProfiles] = useState(true);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const catProfilesData = await fetchforAdminApproveCatProfile();
                const doctorProfilesData = await fetchforAdminApproveDoctorProfile();
                setCatProfiles(catProfilesData);
                setDoctorProfiles(doctorProfilesData);
            } catch (error) {
                console.error('Error fetching profiles:', error);
            }
        };

        fetchProfiles();
    }, []);

    const CatProfileCard = ({ catProfile, onDetails, onApprove, onReject }) => {
        console.log('catprofile-->', catProfile._data.basicInfo.breed)
        console.log('catprofile id-->', catProfile.id)

        return (
            <TouchableOpacity style={styles.card} onPress={() => onDetails(catProfile.id)}>
                <View style={styles.imageContainer}>
                    {catProfile._data.mediaUpload?.mediaList?.[0] ? (
                        <Image
                            style={styles.thumbnailImage}
                            source={{ uri: catProfile._data.mediaUpload.mediaList[0] }}
                        />
                    ) : (
                        <Text>No cat profile picture available</Text>
                    )}
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.catDetailsContainer}>
                        <Text style={styles.breedName}>{catProfile._data.basicInfo.breed}</Text>
                        <Text style={styles.catGender}>{catProfile._data.basicInfo.gender}</Text>
                    </View>
                    <Text style={styles.catName}>{catProfile._data.basicInfo.catName}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => onReject(catProfile.id)}>
                        <Text style={styles.rejectbutton}>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onApprove(catProfile.id)}>
                        <Text style={styles.approvebutton}>Approve</Text>
                    </TouchableOpacity>

                </View>
            </TouchableOpacity>
        );
    };

    const DoctorProfileCard = ({ doctorProfile, onDetails, onApprove, onReject }) => {
        console.log('doctorProfile data: ', doctorProfile);
        console.log('doctorProfile name: ', doctorProfile._data.name);

        return (
            <View style={styles.card} >
                <View style={styles.userIconContainer}>
                    <Image
                        style={styles.thumbnailImage}
                        resizeMode="cover"
                        source={require("../../../assets/Catassets/uicon.png")}
                    />
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.catDetailsContainer}>
                        <Text style={styles.doctorSpecialty}>{doctorProfile._data.specialization}</Text>
                        <Text style={styles.doctorName}>{doctorProfile._data.name}</Text>
                    </View>
                    <Text style={styles.catName}>{doctorProfile._data.qualification}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => onReject(doctorProfile.id)}>
                        <Text style={styles.rejectbutton}>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onApprove(doctorProfile.id)}>
                        <Text style={styles.approvebutton}>Approve</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    };

    const handleDetails = (catProfileId) => {
        console.log('catProfileiid in approve screen-------->', catProfileId)
        navigation.navigate('showCatDetailScreen', { catProfileId: catProfileId });
    };

    const handleApproveCatProfile = async (catProfileId) => {
        try {
            await updateApproveCatProfile(catProfileId, 'approved');
            navigation.goBack();
            // Update UI accordingly
        } catch (error) {
            console.error('Error approving cat profile:', error);
        }
    };

    const handleRejectCatProfile = async (catProfileId) => {
        try {
            await updateApproveCatProfile(catProfileId, 'rejected');
            navigation.goBack();

            // Update UI accordingly
        } catch (error) {
            console.error('Error rejecting cat profile:', error);
        }
    };

    const handleApproveDoctorProfile = async (doctorProfileId) => {
        try {
            await updateApproveDoctorProfile(doctorProfileId, 'approved');
            // Update UI accordingly
        } catch (error) {
            console.error('Error approving doctor profile:', error);
        }
    };

    const handleRejectDoctorProfile = async (doctorProfileId) => {
        try {
            await updateApproveDoctorProfile(doctorProfileId, 'rejected');
            // Update UI accordingly
        } catch (error) {
            console.error('Error rejecting doctor profile:', error);
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerText}>Approve Profiles</Text>
            </View>

            <View style={styles.selectbuttonsContainer}>
                <TouchableOpacity
                    style={[styles.button, showCatProfiles ? styles.activeButton : null]}
                    onPress={() => setShowCatProfiles(true)}
                >
                    <Text style={showCatProfiles ? styles.activeButtonText : styles.buttonText}>Cat Profiles</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, !showCatProfiles ? styles.activeButton : null]}
                    onPress={() => setShowCatProfiles(false)}
                >
                    <Text style={!showCatProfiles ? styles.activeButtonText : styles.buttonText}>Doctor Profiles</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.cardContainer}>
                {showCatProfiles ? (
                    catProfiles.map((catProfile) => (
                        <CatProfileCard
                            key={catProfile.id}
                            catProfile={catProfile}
                            onDetails={handleDetails}
                            onApprove={handleApproveCatProfile}
                            onReject={handleRejectCatProfile}
                        />
                    ))
                ) : (
                    doctorProfiles.map((doctorProfile) => (
                        <DoctorProfileCard
                            key={doctorProfile.id}
                            doctorProfile={doctorProfile}
                            onDetails={handleDetails}
                            onApprove={handleApproveDoctorProfile}
                            onReject={handleRejectDoctorProfile}
                        />
                    ))
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    selectbuttonsContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    userIconContainer: {
        borderRadius: 5,
    },
    thumbnailImage: {
        width: 5,
        height: 5,
        borderRadius: 5,
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#47C1FF'
    },
    buttonText: {
        color: '#47C1FF', // Set default text color to blue
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
    activeButton: {
        backgroundColor: '#47C1FF', // Set active button background color
    },
    activeButtonText: {
        color: '#fff', // Set active text color to white
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
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
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    card: {
        width: '48%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 10,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    thumbnailImage: {
        width: '100%',
        height: 130,
        borderRadius: 10,
    },
    infoContainer: {
        flexDirection: 'column', // Arrange items vertically
        marginLeft: 10, // Add some margin to separate from image
    },
    catDetailsContainer: {
        flexDirection: 'row', // Arrange items horizontally
        alignItems: 'center', // Align items vertically in the center
    },
    breedName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 10,
        fontFamily: 'Poppins-SemiBold',
        backgroundColor: '#212529',
        color: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    doctorName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        marginLeft: 40,
        fontFamily: 'Poppins-SemiBold',
        color: '#212529',
    },
    doctorSpecialty: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 10,
        fontFamily: 'Poppins-SemiBold',
        backgroundColor: '#212529',
        color: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    catName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        fontFamily: 'Poppins-SemiBold',
        color: '#7E7E7E',
        paddingHorizontal: 10,
    },
    catGender: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
        marginLeft: 40,
        fontFamily: 'Poppins-SemiBold',
        color: '#212529',
    },

    buttonContainer: {
        flexDirection: 'row', // Arrange items horizontally
        justifyContent: 'space-between', // Space items evenly along the main axis
        marginTop: 10,
        backgroundColor: '#EDEDED',
        padding: 10,
    },
    rejectbutton: {
        padding: 5,
        backgroundColor: 'red',
        color: '#fff',
        textAlign: 'center',
        borderRadius: 5,
        marginTop: 5,
        marginRight: 10,
        padding: 5,
        fontSize: 15,
    },
    approvebutton: {
        padding: 5,
        backgroundColor: '#3EED00',
        color: '#fff',
        textAlign: 'center',
        borderRadius: 5,
        marginTop: 5,
        marginLeft: 10,
        padding: 5,
        fontSize: 15,

    },


});

export default ApproveProfile;
