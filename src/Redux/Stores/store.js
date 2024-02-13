// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../Reducers/rootReducers';

const store = configureStore({
    reducer: rootReducer,
    // Add middleware or enhancers if needed
});

export default store;
