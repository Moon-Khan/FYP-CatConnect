// // .src/redux/reducers/rootReducer.js
import { combineReducers } from 'redux';
import catBasicInfoReducer from '../Slices/CatProfile/catBasicInfoSlice';
import physicalHealthReducer from '../Slices/CatProfile/PhysicalHealthSlice';
import personalityAndAvailabilityReducer from '../Slices/CatProfile/PersonalityandAvailabilitySlice';
import mediaUploadReducer from '../Slices/CatProfile/MeduaUploadSlice';
import authReducer from '../Slices/Auth/AuthSlice';

const rootReducer = combineReducers({
  BasicInfo: catBasicInfoReducer,
  physicalHealth: physicalHealthReducer,
  personalityAndAvailability: personalityAndAvailabilityReducer,
  mediaUpload: mediaUploadReducer,
  auth: authReducer,
});

export default rootReducer;
