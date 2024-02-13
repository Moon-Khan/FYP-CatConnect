// ./src/Screens/splash.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const Splashscreen = () => {


  const [isBtnPressed, setIsBtnPressed] = useState(false);
  const navigation = useNavigation();

  const onPressIn = () => {
    setIsBtnPressed(true);
  };

  const onPressOut = () => {
    setIsBtnPressed(false);
  };

  const handleUserSelection = (role) => {
    navigation.navigate('Signup');
  };
  const handleDoctorSelection = (role) => {
    navigation.navigate('DoctorSignupScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.piccontainers}>

        <View style={styles.greencircle1}>

        </View>
        <View style={styles.orangecircle2}>

        </View>
        <View style={styles.bluecircle3}>


        </View>
        <View style={styles.redcircle6}>


        </View>
      </View>

      <Animatable.Text
        animation="fadeIn"
        duration={1200}
        style={styles.title}>
        Select Your Role
      </Animatable.Text>


      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={[styles.button, isBtnPressed && styles.buttonPressed]}
          onPress={handleUserSelection}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          underlayColor="#47C1FF"
          color='#fff'

        >
          <Text style={[styles.buttonText, isBtnPressed && { color: '#fff' }]}>USER</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.button, isBtnPressed && styles.buttonPressed]}
          onPress={handleDoctorSelection}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          underlayColor="#47C1FF"
          color='#fff'
        >
          <Text style={[styles.buttonText, isBtnPressed && { color: '#fff' }]}>DOCTOR</Text>
        </TouchableHighlight>
      </View>
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
    height: '50%',
    backgroundColor: '#000'
  },
  greencircle1: {
    backgroundColor: '#30cb79',
    borderRadius: 100,
    padding: 100,
    position: 'absolute',
    left: '40%',
    top: '20%',
  },
  orangecircle2: {
    backgroundColor: '#f58a2c',
    borderRadius: 100,
    padding: 80,
    position: 'absolute',
    right: '30%',
    top: '-30%',
  },
  bluecircle3: {
    backgroundColor: '#47C1FF',
    borderRadius: 100,
    padding: 26,
    position: 'absolute',
    left: '15%',
    top: '-5%',
  },

  redcircle6: {
    borderRadius: 100,
    padding: 45,
    position: 'absolute',
    right: '15%',
    top: '40%',
    backgroundColor: '#f7645e',
  },

  title: {
    fontSize: 40,
    color: '#212529',
    marginTop: 0,
    fontFamily: 'Poppins-ExtraBold',
    paddingTop: 0,
    paddingBottom: 0,

  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
  },

  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 25,
    flex: 1,
    marginHorizontal: 10,
    borderColor: '#47C1FF',
    borderWidth: 2,
    ...Platform.select({
      android: {
        elevation: 1,
      },
    }),
  },
  buttonPressed: {
    ...Platform.select({
      android: {
        elevation: 2, 
      },
    }),
  },
  buttonText: {
    fontSize: 20,
    color: '#47C1FF',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',

  },
});

export default Splashscreen;
