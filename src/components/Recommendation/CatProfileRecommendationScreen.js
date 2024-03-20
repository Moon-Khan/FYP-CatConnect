
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    fetchApproveCatProfile,
    fetchCatProfilesForUser,
} from '../../Services/firebase';
import auth from '@react-native-firebase/auth';

const CatProfileRecommendationScreen = () => {
    const navigation = useNavigation();
    const [recommendedCats, setRecommendedCats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            console.log('Fetching cat profiles...');
            const currentUser = auth().currentUser;

            if (currentUser) {
                const userId = currentUser.uid;
                const catProfilesData = await fetchCatProfilesForUser(userId);

                if (catProfilesData && catProfilesData.length > 0) {
                    const allProfiles = await fetchApproveCatProfile();
                    if (allProfiles && allProfiles.length > 0) {
                        const allprofilesData = allProfiles.map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                        }));

                        // Exclude the current user's cat profile from the calculation
                        const filteredAllProfiles = allprofilesData.filter(profile => profile.id !== userId);

                        const similarityScores = catProfilesData.map(catProfile =>
                            calculateSimilarity(catProfile, filteredAllProfiles)
                        );

                        console.log('Similarity scores:', similarityScores);

                        const recommendedCatsData = filteredAllProfiles.map(profile => ({
                            ...profile,
                            similarityScore: calculateMaxSimilarity(profile.id, similarityScores)
                        }));

                        setRecommendedCats(recommendedCatsData);
                    } else {
                        Alert.alert('No Cat Profiles', 'Please create cat profiles.');
                    }
                } else {
                    Alert.alert('No Cat Profiles', 'Please create cat profiles.');
                }
            } else {
                Alert.alert('No User', 'Please sign in.');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'An error occurred while fetching cat profiles.');
        } finally {
            setIsLoading(false);
        }
    };

    const calculateSimilarity = (catProfile, allProfiles) => {
        const currentUserProfile = encodeProfile(catProfile);
        const uniqueValuesMap = createUniqueValuesMap(allProfiles);

        let similarityScores = [];

        allProfiles.forEach(profile => {
            if (!profile || !profile.basicInfo || !profile.physicalHealth) {
                console.log('Invalid cat profile:', profile);
                return;
            }

            const userProfile = encodeProfile(profile, uniqueValuesMap);

            const similarityScore = calculateCosineSimilarity(currentUserProfile, userProfile);
            similarityScores.push({ userId: profile.id, similarityScore });
        });

        return similarityScores;
    };

    const encodeProfile = (profile, uniqueValuesMap = null) => {
        const encodedProfile = [];

        if (!uniqueValuesMap) {
            uniqueValuesMap = {};
        }

        if (!profile || !profile.basicInfo || !profile.physicalHealth) {
            console.log('Invalid cat profile:', profile);
            return [];
        }

        const basicInfo = profile.basicInfo;
        const physicalHealth = profile.physicalHealth;

        const breed = basicInfo.breed.toLowerCase();
        const pedigree = basicInfo.pedigree.toLowerCase();
        const pattern = physicalHealth.pattern.toLowerCase();

        const valuesToEncode = [breed, pedigree, pattern];

        valuesToEncode.forEach(value => {
            if (!(value in uniqueValuesMap)) {
                uniqueValuesMap[value] = Object.keys(uniqueValuesMap).length;
            }
            encodedProfile.push(uniqueValuesMap[value]);
        });

        return encodedProfile;
    };

    const createUniqueValuesMap = allProfiles => {
        const uniqueValuesMap = {};

        allProfiles.forEach(profile => {
            if (!profile || !profile.basicInfo || !profile.physicalHealth) {
                console.log('Invalid cat profile:', profile);
                return;
            }

            const basicInfo = profile.basicInfo;
            const physicalHealth = profile.physicalHealth;

            const breed = basicInfo.breed.toLowerCase();
            const pedigree = basicInfo.pedigree.toLowerCase();
            const pattern = physicalHealth.pattern.toLowerCase();

            const valuesToEncode = [breed, pedigree, pattern];

            valuesToEncode.forEach(value => {
                if (!(value in uniqueValuesMap)) {
                    uniqueValuesMap[value] = Object.keys(uniqueValuesMap).length;
                }
            });
        });

        return uniqueValuesMap;
    };

    const calculateCosineSimilarity = (vectorA, vectorB) => {
        const dotProduct = vectorA.reduce((acc, val, i) => acc + val * vectorB[i], 0);

        const magnitudeA = Math.sqrt(vectorA.reduce((acc, val) => acc + val ** 2, 0));
        const magnitudeB = Math.sqrt(vectorB.reduce((acc, val) => acc + val ** 2, 0));

        if (magnitudeA === 0 || magnitudeB === 0) {
            return 0;
        }

        const similarity = dotProduct / (magnitudeA * magnitudeB);
        return similarity;
    };

    const calculateMaxSimilarity = (profileId, similarityScores) => {
        const profileScores = similarityScores.flatMap(scores => scores.filter(score => score.userId === profileId));
        const maxSimilarity = Math.max(...profileScores.map(score => score.similarityScore));
        return maxSimilarity;
    };

    const handleCatProfilePress = (catProfile) => {
        // Navigate to CatDetailScreen with the cat profile data
        navigation.navigate('CatScreen', { catProfile });
    };

    const renderPetCard = ({ item }) => {
        if (!item || !item.basicInfo || !item.personalityAndAvailability) {
            console.log('Invalid cat profile:', item);
            return (
                <View key="noData" style={styles.petCard}>
                    <Text>No cat profile data available</Text>
                </View>
            );
        }

        const basicInfo = item.basicInfo || {};
        const personalityAndAvailability = item.personalityAndAvailability || {};
        const pics = item.mediaUpload?.mediaList || [];

        const similarityScore = item.similarityScore || 0;
        const similarityPercentage = (similarityScore * 100).toFixed(2); // Convert to percentage

        return (
            <TouchableOpacity
                key={basicInfo.catName}
                style={styles.petCard}
                onPress={() => handleCatProfilePress(item)}
            >
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
                    <Text style={styles.petName}>{basicInfo.catName}</Text>
                    <Text style={styles.breed}>{basicInfo.breed}</Text>
                    <Text style={styles.available}>{personalityAndAvailability.availabilityStatus}</Text>
                    <Text style={styles.similarity}>Similarity: {similarityPercentage}%</Text>
                    <Image
                        style={styles.hearticon}
                        resizeMode="cover"
                        source={require("../../../assets/Catassets/hearts.png")}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    // Sort recommendedCats array based on similarity score
    const sortedRecommendedCats = recommendedCats.slice().sort((a, b) => b.similarityScore - a.similarityScore);

    return (
        <FlatList
            data={sortedRecommendedCats}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderPetCard}
        />
    );
};

const styles = StyleSheet.create({
    petCard: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        paddingLeft: 20,
        borderRadius: 8,
        margin: 12,
        marginLeft: 0,
        marginBottom: 2,
        width: '100%',
    },
    imageContainer: {
        marginRight: 15,
    },
    thumbnailImage: {
        width: 90,
        height: 100,
        borderRadius: 5,
    },
    petName: {
        fontSize: 16,
        marginBottom: 1,
        color: '#212529',
        fontFamily: 'Poppins-SemiBold',
    },
    breed: {
        fontSize: 14,
        color: '#7E7E7E',
        marginBottom: 1,
        fontFamily: 'Poppins-Medium',
    },
    available: {
        fontSize: 14,
        color: '#7E7E7E',
        marginBottom: 1,
        fontFamily: 'Poppins-SemiBold',
    },
    similarity: {
        fontSize: 14,
        color: '#555',
        fontFamily: 'Poppins-Regular',
    },
});

export default CatProfileRecommendationScreen;