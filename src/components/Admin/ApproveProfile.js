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
        return (
            <TouchableOpacity style={styles.card} onPress={() => onDetails(catProfile.id)}>
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
                <TouchableOpacity onPress={() => onApprove(catProfile.id)}>
                    <Text style={styles.button}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onReject(catProfile.id)}>
                    <Text style={styles.button}>Reject</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    const DoctorProfileCard = ({ doctorProfile, onDetails, onApprove, onReject }) => {
        return (
            <TouchableOpacity style={styles.card} onPress={() => onDetails(doctorProfile.id)}>
                <View style={styles.infoContainer}>
                    <Text style={styles.doctorName}>{doctorProfile.username}</Text>
                    <Text style={styles.doctorSpecialty}>{doctorProfile.specialization}</Text>
                    <Text style={styles.doctorAvailable}>{doctorProfile.availability.day}</Text>
                    <Text style={styles.doctorTime}>{doctorProfile.availability.timeRange}</Text>
                </View>
                <TouchableOpacity onPress={() => onApprove(doctorProfile.id)}>
                    <Text style={styles.button}>Approve</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onReject(doctorProfile.id)}>
                    <Text style={styles.button}>Reject</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    const handleDetails = (profileId) => {
        navigation.navigate('showDetailsScreen');
    };

    const handleApproveCatProfile = async (catProfileId) => {
        try {
            await updateApproveCatProfile(catProfileId, 'approved');
            // Update UI accordingly
        } catch (error) {
            console.error('Error approving cat profile:', error);
        }
    };

    const handleRejectCatProfile = async (catProfileId) => {
        try {
            await updateApproveCatProfile(catProfileId, 'rejected');
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
                <Text style={styles.headerText}>Profiles</Text>
            </View>

            <View style={styles.cardContainer}>
                {catProfiles.map((catProfile) => (
                    <CatProfileCard
                        key={catProfile.id}
                        catProfile={catProfile}
                        onDetails={handleDetails}
                        onApprove={handleApproveCatProfile}
                        onReject={handleRejectCatProfile}
                    />
                ))}
            </View>

            <View style={styles.cardContainer}>
                {doctorProfiles.map((doctorProfile) => (
                    <DoctorProfileCard
                        key={doctorProfile.id}
                        doctorProfile={doctorProfile}
                        onDetails={handleDetails}
                        onApprove={handleApproveDoctorProfile}
                        onReject={handleRejectDoctorProfile}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        padding: 10,
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
    breedName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 10,
        fontFamily: 'Poppins-SemiBold',
    },
    infoContainer: {
        marginBottom: 10,
    },
    button: {
        padding: 5,
        backgroundColor: '#47C1FF',
        color: '#fff',
        textAlign: 'center',
        borderRadius: 5,
        marginTop: 5,
    },
});

export default ApproveProfile;
