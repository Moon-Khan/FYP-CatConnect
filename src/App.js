
// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './Redux/Stores/store';
import SignupScreen from './components/UserAuth/SignupScreen';
import EmailVerification from './components/Users/UserEmailVerification'
import LoginScreen from './components/UserAuth/LoginScreen';
import DoctorSignupScreen from './components/DoctorAuth/DoctorSignupScreen';
import DoctorLoginScreen from './components/DoctorAuth/DoctorLoginScreen';
import HomeScreen from './components/Users/HomeScreen';
import DoctorHomeScreen from './components/Doctors/DoctorHome';
import SelectDoctor from './components/Users/SelectDoctorScreent';
import CatScreen from './components/Users/CatDetailScreen';
import chatScreen from './components/Users/chatScreen';
import DoctorDetailScreen from './components/Users/DoctorDetailScreen';
import RoleSelectionScreen from './Screens/RoleSelectionScreen';
import CatBasicInfoScreen from './components/CatProfile/CatBasicInfoScreen';
import PhysicalAndHealthInfo from './components/CatProfile/PhysicalAndHealthInfoScreeen';
import PersonalityAndAvailabilityInfo from './components/CatProfile/PersonalityAndAvailabilityInfoScreen'
import CatMediaUploadScreen from './components/CatProfile/MediaUploadScreen';
import Splashscreen from './Screens/Splash';
import ProfileScreen from './components/Users/ProfileScreen';
import DoctorAppointment from './components/Doctors/DoctorAppointmentLists';  
import NotificationsScreen from './components/Users/NotificationScreen';
import DoctorsInfo from './components/Doctors/DoctorsInfo';
import UsersInfo from './components/Users/UserInfo';


const Stack = createStackNavigator();

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splashscreen">

        <Stack.Screen name="Splashscreen" component={Splashscreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="EmailVerification" component={EmailVerification} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DoctorSignupScreen" component={DoctorSignupScreen} />
        <Stack.Screen name="DoctorLoginScreen" component={DoctorLoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DoctorHomeScreen" component={DoctorHomeScreen} />
        <Stack.Screen name="SelectDoctor" component={SelectDoctor} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="CatScreen" component={CatScreen} />
        <Stack.Screen name="chatScreen" component={chatScreen} />
        <Stack.Screen name="DoctorDetailScreen" component={DoctorDetailScreen} />
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        <Stack.Screen name="CatBasicInfo" component={CatBasicInfoScreen} />
        <Stack.Screen name="PhysicalAndHealthInfo" component={PhysicalAndHealthInfo} />
        <Stack.Screen name="PersonalityAndAvailabilityInfo" component={PersonalityAndAvailabilityInfo} />
        <Stack.Screen name="CatMediaUpload" component={CatMediaUploadScreen} />
        <Stack.Screen name="DoctorAppointment" component={DoctorAppointment} />
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
        <Stack.Screen name="DoctorsInfo" component={DoctorsInfo} />
        <Stack.Screen name="UsersInfo" component={UsersInfo} />

      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
