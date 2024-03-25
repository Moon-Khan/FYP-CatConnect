// SearchFilter.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, RadioButton } from 'react-native';
import { Checkbox } from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';

const SearchFilter = () => {
    const [filterOptions, setFilterOptions] = useState({
        breed: '',
        age: '',
        gender: '',
        temperament: '',
        catColors: '',
        eyeColors: '',
        vaccinationStatus: ''
    });
    const navigation = useNavigation();

    const handleConfirmFilters = () => {
        navigation.navigate('SearchFeed', { filterOptions });
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>

                <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
                    <Image source={require("../../../assets/Catassets/backbtn.png")} style={styles.bactbtn} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Search</Text>
            </View>

            <View style={styles.filterContainer}>

                <TextInput
                    placeholder="Breed"
                    value={filterOptions.breed}
                    onChangeText={(text) => setFilterOptions({ ...filterOptions, breed: text })}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Age"
                    keyboardType="numeric"
                    value={filterOptions.age}
                    onChangeText={(text) => setFilterOptions({ ...filterOptions, age: text })}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Gender"
                    value={filterOptions.gender}
                    onChangeText={(text) => setFilterOptions({ ...filterOptions, gender: text })}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Temperament"
                    value={filterOptions.temperament}
                    onChangeText={(text) => setFilterOptions({ ...filterOptions, temperament: text })}
                    style={styles.input}
                />
                <TextInput
                    placeholder="CatColors"
                    value={filterOptions.catColors}
                    onChangeText={(text) => setFilterOptions({ ...filterOptions, catColors: text })}
                    style={styles.input}
                />
                <TextInput
                    placeholder="EyeColors"
                    value={filterOptions.eyeColors}
                    onChangeText={(text) => setFilterOptions({ ...filterOptions, eyeColors: text })}
                    style={styles.input}
                />

            </View>


            <TouchableOpacity style={styles.button} onPress={handleConfirmFilters}>
                <Text style={styles.buttonText}>Confirm Filters</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    filterContainer: {
        padding: 10,
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

    inputContainer: {

        marginBottom: 10,
    },

    input: {
        height: 50,
        borderColor: '#D9D9D9',
        color: '#7E7E7E',
        borderWidth: 1,
        borderRadius: 8,
        minHeight: 1,
        marginTop: 6,
        padding: 10,
        fontFamily: 'Poppins-SemiBold',

    },
    button: {
        backgroundColor: '#47C1FF',
        padding: 15,
        borderRadius: 25,
        marginTop: 35,
        alignItems: 'center',
        width: '70%',
        alignSelf: 'center',
        marginBottom: 20,

    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
    },
});

export default SearchFilter;
