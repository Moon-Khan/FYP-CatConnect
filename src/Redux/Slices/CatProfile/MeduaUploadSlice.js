import { createSlice } from '@reduxjs/toolkit';

const mediaUploadSlice = createSlice({
  name: 'mediaUpload',
  initialState: {
    mediaList: [],
  },
  reducers: {
    addMedia: (state, action) => {
      const { media } = action.payload;
      state.mediaList = [...state.mediaList, media];
    },
  },
});

export const { addMedia } = mediaUploadSlice.actions;
export default mediaUploadSlice.reducer;
