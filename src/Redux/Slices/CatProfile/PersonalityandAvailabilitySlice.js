import { createSlice } from '@reduxjs/toolkit';

const personalityAndAvailabilitySlice = createSlice({
  name: 'personalityAndAvailability',
  initialState: {
    temperament: '',
    socialCompatibility: '',
    description: '',
    availabilityStatus: '',
  },
  reducers: {
    addPersonalityAndAvailability: (state, action) => {
      const { temperament, socialCompatibility, description, availabilityStatus } = action.payload;
      state.temperament = temperament || state.temperament;
      state.socialCompatibility = socialCompatibility || state.socialCompatibility;
      state.description = description || state.description;
      state.availabilityStatus = availabilityStatus || state.availabilityStatus;
    },
  },
});

export const { addPersonalityAndAvailability } = personalityAndAvailabilitySlice.actions;
export default personalityAndAvailabilitySlice.reducer;
