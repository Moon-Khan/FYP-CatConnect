import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Advertisement = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        require("../../../assets/Catassets/PetCare.png"),
        require("../../../assets/Catassets/PetCare2.png"), // Add more image paths as needed
        // Add more image paths as needed
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change image every 5 seconds (5000 milliseconds)

        return () => clearInterval(interval); // Clean up the interval on unmount
    }, []);

    return (
        <View style={styles.advertisementCard}>
            <View style={styles.advertisementImageContainer}>
                <Image
                    style={styles.advertisementImage}
                    resizeMode="cover"
                    source={images[currentImageIndex]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    advertisementImageContainer: {
        width: 280,
        height: 130,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    advertisementImage: {
        width: 380,
        height: '110%',
        borderRadius: 20,
    },

    advertisementCard: {
        paddingLeft:50,
        paddingRight:30,

        borderRadius: 8,
        margin: 12,
        marginTop:30,
        marginLeft: 0,
        marginBottom: 2,
        width: '100%',
    },
});

export default Advertisement;
