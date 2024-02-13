// ./src/Screens/splash.js

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';


const Splashscreen = () => {


    const navigation = useNavigation();

    const handleLogin = () => {

        navigation.navigate('RoleSelection');
    };

    return (
        <View style={styles.container}>
            <View style={styles.piccontainers}>

                <View style={styles.yellowcircle1}>

                </View>
                <View style={styles.orangecircle2}>

                </View>
                <View style={styles.bluecircle3}>

                </View>
                <Image
                    style={styles.catcircle1}
                    resizeMode="cover"
                    source={require('../../assets/Catassets/catcircle.png')}
                />
                <Image
                    style={styles.doctorcircle2}
                    resizeMode="cover"
                    source={require('../../assets/Catassets/doctor.png')}
                />
                <Image
                    style={styles.catcircle3}
                    resizeMode="contain"
                    source={require('../../assets/Catassets/pinkcat.png')}
                />
                <View style={styles.redcircle6}>

                </View>
            </View>


            <Animatable.Text
                animation="fadeInDown"
                duration={1200}
                style={styles.title}>
                Cat Connect

            </Animatable.Text>
            <Animatable.Text
                animation="fadeInUp"
                duration={1200}
                delay={500}
                style={styles.subtitle}>
                Discover, Connect, Consult—All Things Cats in One Place!
            </Animatable.Text>
          
            <Animatable.View
                animation="fadeIn"
                duration={1500}
                delay={2000}  // Delay of 2000 milliseconds (2 seconds)
                style={styles.buttonContainer}
            >
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </Animatable.View>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    piccontainers: {
        backgroundColor: '#fff',
        height: '50%',
    },
    yellowcircle1: {
        backgroundColor: '#cee016',
        borderRadius: 100,
        padding: 100,
        position: 'absolute',
        left: '25%',
        top: '-40%',
    },
    orangecircle2: {
        backgroundColor: '#f58a2c',
        borderRadius: 100,
        padding: 26,
        position: 'absolute',
        right: '48%',
        top: '40%',
    },
    bluecircle3: {
        backgroundColor: '#47C1FF',
        borderRadius: 100,
        padding: 16,
        position: 'absolute',
        right: '15%',
        top: '95%',
    },
    catcircle1: {
        position: 'absolute',
        right: '10%',
        top: '-10%',

    },
    doctorcircle2: {
        position: 'absolute',
        left: '2%',
        top: '45%',

    },
    catcircle3: {
        position: 'absolute',
        top: '70%',
        right: '25%',
    },
    redcircle6: {
        borderRadius: 100,
        padding: 12,
        position: 'absolute',
        left: '35%',
        top: '35%',
        backgroundColor: '#f7645e',
    },

    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 40,
        color: '#212529',
        marginTop: 30,
        fontFamily: 'Poppins-ExtraBold',
        paddingTop: 0,
        paddingBottom: 0,

    },
    subtitle: {
        fontSize: 18,
        color: '#7E7E7E',
        textAlign: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        fontFamily: 'Poppins-SemiBold',
    },

    buttonContainer: {
        alignItems: 'center',
    },

    button: {
        backgroundColor: '#47C1FF', // Using the same color as SignUp button
        padding: 10,
        paddingLeft:20,
        paddingRight:20,
        borderRadius: 12,
        marginTop: 25,
        width: '50%',
    },
    buttonText: {
        fontSize: 22,
        color: '#ffff',
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
    },
});

export default Splashscreen;
