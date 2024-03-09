import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const CatProfileRecommendationScreen = () => {
    const navigation = useNavigation();
    const [recommendedCats, setRecommendedCats] = useState([]);
    const N = 5; // Number of recommended cats

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userSnapshot = await firestore().collection('users').get();
                const users = await Promise.all(userSnapshot.docs.map(async doc => {
                    const user = doc.data();
                    // Fetch cat profiles for each user
                    const catProfilesSnapshot = await doc.ref.collection('CatProfiles').get();
                    const catProfiles = catProfilesSnapshot.docs.map(catDoc => catDoc.data());
                    user.catProfiles = catProfiles;
                    return user;
                }));

                const currentUserId = 'currentUserId';
                const currentUser = users.find(user => user.id === currentUserId);

                if (currentUser && currentUser.catProfiles) {
                    const currentUserCatProfiles = currentUser.catProfiles;
                    const recommendedCats = recommendCats(currentUserCatProfiles, users);
                    setRecommendedCats(recommendedCats);
                } else {
                    console.log('Current user or cat profiles not found.');
                }
            } catch (error) {
                console.error('Error fetching users and cat profiles:', error);
            }
        };
        fetchData();
    }, []);

    // Function to calculate cosine similarity
    const calculateCosineSimilarity = (vector1, vector2) => {
        let dotProduct = 0;
        let norm1 = 0;
        let norm2 = 0;

        for (let i = 0; i < vector1.length; i++) {
            dotProduct += vector1[i] * vector2[i];
            norm1 += Math.pow(vector1[i], 2);
            norm2 += Math.pow(vector2[i], 2);
        }

        norm1 = Math.sqrt(norm1);
        norm2 = Math.sqrt(norm2);

        const similarityScore = dotProduct / (norm1 * norm2);
        return similarityScore;
    };

    // Function to recommend cats based on similarity scores
    const recommendCats = (currentUserCatProfile, users) => {
        const similarityScores = [];

        // Calculate similarity scores between current user's cat profile and other cat profiles
        users.forEach(user => {
            if (user.id !== 'currentUserId') {
                const similarityScore = calculateCosineSimilarity(currentUserCatProfile, user.catProfile);
                similarityScores.push({ userId: user.id, similarityScore });
            }
        });

        // Sort similarity scores in descending order
        similarityScores.sort((a, b) => b.similarityScore - a.similarityScore);

        // Get top N recommended cats
        const recommendedCats = similarityScores.slice(0, N).map(score => {
            const user = users.find(u => u.id === score.userId);
            return user.catProfile;
        });

        return recommendedCats;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={recommendedCats}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('CatProfiles', { catId: item.id })}>
                        <View style={styles.catContainer}>
                            <Image source={{ uri: item.image }} style={styles.catImage} />
                            <Text style={styles.catName}>{item.catName}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    catContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    catImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    catName: {
        fontSize: 18,
    },
});

export default CatProfileRecommendationScreen;