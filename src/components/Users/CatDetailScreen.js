import * as React from "react";
import { Image, StyleSheet, Text, View, ScrollView , TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';

const CatScreen = ({ route }) => {
  const navigation = useNavigation();

  const { catProfile } = route.params;
  const basicInfo = catProfile.basicInfo || {};
  const personalityAndAvailability = catProfile.personalityAndAvailability || {};
  const physicalHealth = catProfile.physicalHealth || {};
  const pics = catProfile.mediaUpload?.mediaList || [];

  return (
    <View style={styles.maincontainer}>

      <View >
        <Image
          style={styles.notificationIcon}
          resizeMode="cover"
          source={require("../../../assets/Catassets/notification.png")}
        />
      </View>

      <View>
        <Text style={[styles.catConnect]}>
          Cat Connect
        </Text>
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

      {/* <View style={styles.contactMeWrapper} onpress>
        <Text style={styles.contactMe}>Contact me</Text>
      </View> */}
      <TouchableOpacity style={styles.contactMeWrapper} onPress={() => navigation.navigate('chatScreen')}>
        <Text style={styles.contactMe}>Contact me</Text>
      </TouchableOpacity>
    </View>


  );

};

const styles = StyleSheet.create({

  maincontainer: {
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,

  },
  container: {
    height: '28%', // Adjust based on your design
  },

  catConnect: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#47c1ff',
    marginTop: 5,
    position: 'absolute'
  },

  notificationIcon: {
    width: 30,
    height: 30,
    position: "absolute",
    right: 0,
  },
  rectangleBackground: {
    alignSelf: "center",
    width: "100%",
    height: "35%",
    position: "absolute",
    borderRadius: 20,
    marginTop: 70,
  },
  catInfoContainer: {
    marginTop: '100%', // Adjust based on your design
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
    marginTop: '4%', // Adjust based on your design
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
    marginTop: '6%', // Adjust based on your design
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
