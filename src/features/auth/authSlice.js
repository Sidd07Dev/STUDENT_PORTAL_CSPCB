// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user:{},  // User data will be stored here
  isAuthenticated: false,  // To track login status
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;  // Store user data in Redux state
     
      
      state.isAuthenticated = true; // Mark user as authenticated
    },
    clearUser: (state) => {
      state.user = null;  // Clear user data on logout
      state.isAuthenticated = false;
    },
  },
  
  
});




export const { setUser, clearUser } = authSlice.actions;  // Export actions

export default authSlice.reducer;  // Export the reducer to configure the store
