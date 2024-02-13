import { createSlice } from '@reduxjs/toolkit';

const physicalHealthSlice = createSlice({
  name: 'physicalHealth',
  initialState: {
    color: '',
    pattern: '',
    eyeColor: '',
    coatLength: '',
    vaccinationStatus: '',
    medicalCertificate: '',
  },
  reducers: {
    addPhysicalHealth: (state, action) => {
      const { color, pattern, eyeColor, coatLength, vaccinationStatus, medicalCertificate } = action.payload;
      state.color = color || state.color;
      state.pattern = pattern || state.pattern;
      state.eyeColor = eyeColor || state.eyeColor;
      state.coatLength = coatLength || state.coatLength;
      state.vaccinationStatus = vaccinationStatus || state.vaccinationStatus;
      state.medicalCertificate = medicalCertificate || state.medicalCertificate;
    },
  },
});

export const { addPhysicalHealth } = physicalHealthSlice.actions;
export default physicalHealthSlice.reducer;
