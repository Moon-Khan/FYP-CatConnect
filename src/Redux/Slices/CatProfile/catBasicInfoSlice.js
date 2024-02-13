
// // ./src/Redux/CatBasicInfoSlice.js

import { createSlice } from '@reduxjs/toolkit';

const catBasicInfoSlice = createSlice({
  name: 'BasicInfo',
  initialState: {
    catName: '',
    breed: '',
    pedigree: '',
    gender: '',
    age: '',
  },
  reducers: {
    addDataAsync: (state, action) => {
      const { catName, breed, pedigree, gender, age } = action.payload;
      state.catName = catName || state.catName;
      state.breed = breed || state.breed;
      state.pedigree = pedigree || state.pedigree;
      state.gender = gender || state.gender;
      state.age = age || state.age;
    },
  },
});

export const { addDataAsync } = catBasicInfoSlice.actions;
export default catBasicInfoSlice.reducer;
