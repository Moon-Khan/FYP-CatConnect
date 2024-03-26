import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from "react-native";
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { fetchUserDataFromFirestore } from '../../Services/firebase';


const CatScreen = ({ route }) => {
  const navigation = useNavigation();
  const scrollViewRef = useRef();

  const { catProfile } = route.params;
  const basicInfo = catProfile.basicInfo || {};
  const personalityAndAvailability = catProfile.personalityAndAvailability || {};
  const physicalHealth = catProfile.physicalHealth || {};
  const pics = catProfile.mediaUpload?.mediaList || [];

  const userId = catProfile.user_id;
  const currentUser = auth().currentUser;

  const [userData, setUserData] = useState(null);

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardOpen(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardOpen(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const commentsRef = firestore().collection('comments').where('catProfileId', '==', catProfile.id);
        const snapshot = await commentsRef.get();
        const commentsData = snapshot.docs.map(async doc => {
          const commentData = doc.data();
          const userData = await fetchUserDataFromFirestore(commentData.userId);
          return { id: doc.id, comment: commentData.comment, user: userData.data() };
        });
        const resolvedComments = await Promise.all(commentsData);
        setComments(resolvedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
        // Handle error fetching comments
      }
    };
    loadComments();
  }, [catProfile.id]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await fetchUserDataFromFirestore(currentUser.uid);
        if (userDoc.exists) {
          setUserData(userDoc.data());
        } else {
          console.log('User document does not exist in Firestore (home screen).');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [currentUser.uid]);
  const handleContactMe = () => {
    navigation.navigate('UserChat', { catProfileId: userId });
  };

  const handleAddComment = async () => {
    if (comment.trim() === '') {
      alert('Please enter a comment');
      return;
    }

    try {
      await firestore().collection('comments').doc().set({
        comment: comment,
        catProfileId: catProfile.id,
        userId: currentUser.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      setComment('');
      scrollToBottom();
    } catch (error) {
      console.error('Error adding comment:', error);
      // Handle error adding comment
    }
  };

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  return (
    <KeyboardAvoidingView
      style={styles.maincontainer}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
          <Image source={require("../../../assets/Catassets/backbtn.png")} style={styles.bactbtn} />
        </TouchableOpacity>

        <Text style={styles.headerText}>Cat Info</Text>
      </View>


      <ScrollView ref={scrollViewRef} style={{ flex: 1, marginTop: 5, marginLeft: 20, marginRight: 20, marginBottom: keyboardOpen ? 0 : 80 }}>
        {pics.length > 0 ? (
          <Image
            style={{ alignSelf: "center", width: "100%", height: 220, borderRadius: 20, marginTop: 20 }}
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


        <View style={styles.aboutMamuContainer}>
          <Text style={styles.aboutMamu}>About {basicInfo.catName} </Text>
          <Text style={styles.provideTheCatContainer}>
            <Text style={styles.provideTheCat}>
              {personalityAndAvailability.description}
            </Text>
          </Text>
        </View>

        <TouchableOpacity style={{ backgroundColor: '#47C1FF', paddingVertical: 15, borderRadius: 20, marginTop: 20, alignItems: 'center', marginHorizontal: 20 }} onPress={handleContactMe}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Contact me</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 16, marginTop: 15, fontFamily: 'Poppins-SemiBold', color: '#212529' }}>Comment Box </Text>


        <View style={{ flex: 1, marginTop: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginBottom: 20 }}>
          {comments.map(comment => (
            <View key={comment.id} style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={require("../../../assets/Catassets/doctoruser2.png")} style={styles.profileIcon} />
                <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', marginLeft: 5, color: '#212529' }}>
                  {comment.user && comment.user.firstname} {/* Display user's firstname */}
                </Text>
              </View>
              <Text style={{ fontSize: 12, fontFamily: 'Poppins-Medium', marginLeft: 30, color: '#212529' }}>
                {comment.comment} {/* Display comment text */}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#ccc', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <TextInput
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, flex: 1, marginRight: 10 }}
          placeholder="Add a comment"
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={{ backgroundColor: '#47c1ff', padding: 10, borderRadius: 10 }} onPress={handleAddComment}>
          <Text style={{ color: '#fff', fontSize: 16 }}>Add Comment</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );

};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
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

  profileIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  catInfoContainer: {
    marginTop: '65%', // Adjust based on your design
    marginLeft: 30,
    marginRight: 30,
    // marginBottom: 40,

  },


  mamoonKhan: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#7e7e7e',
    marginBottom: 5,
  },
  persianCoated: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#7e7e7e',
  },
  vaccination: {
    fontSize: 14,
    fontFamily: 'Popins-Medium',
    color: '#7e7e7e',
    position: 'absolute',
    right: 0,
    top: '60%', // Adjust based on your design
  },


  catImage: {
    alignSelf: "center",
    width: "80%",
    height: 200,
    borderRadius: 20,
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backImage: {
    width: 24,
    height: 24,
  },
  catInfoContainer: {
    marginTop: 20,
  },
  catName: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#7e7e7e',
    marginBottom: 5,
    textAlign: 'center',
  },
  breed: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#7e7e7e',
    textAlign: 'center',
  },

  aboutMamuContainer: {
    // marginTop: '6%', ///Adjust based on your design
    alignSelf: "flex-start",
  },
  aboutMamu: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
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



  // info: {
  //   fontSize: 16,
  //   fontFamily: 'Poppins-Medium',
  //   color: '#212529',
  // },
  // aboutContainer: {
  //   marginTop: 20,
  //   alignSelf: "center",
  // },
  // about: {
  //   fontSize: 16,
  //   fontFamily: 'Poppins-SemiBold',
  //   color: '#212529',
  //   marginBottom: 5,
  // },
  description: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#7e7e7e',
  },
  button: {
    backgroundColor: '#47C1FF',
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  commentContainer: {
    flex: 1,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  commentItem: {
    marginBottom: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  addCommentButton: {
    backgroundColor: '#47c1ff',
    padding: 10,
    borderRadius: 10,
  },
  addCommentButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  fixedCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default CatScreen;