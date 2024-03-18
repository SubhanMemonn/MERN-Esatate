import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUpSuccess: (state, action) => {
      state.currentUser = action.payload;

    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;

    },

    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;

    },

    deleteUserSuccess: (state) => {
      state.currentUser = null;

    },

    signOutSuccess: (state) => {
      state.currentUser = null;

    },

  },
});

export const {
  signUpSuccess,
  signInSuccess,
  updateUserSuccess,
  deleteUserSuccess,
  signOutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
