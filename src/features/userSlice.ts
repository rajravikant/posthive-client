import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Creator, User } from "../utils/types";



const initialState:User = {
  currentUser: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      state.currentUser = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken; 
      state.isLoading = false;
    },
    startSignIn: (state) => {
      state.isLoading = true;
    },
    isRejected: (state) => {
      state.isLoading = false;
    },
    logoutAction: (state) => {
      state.currentUser = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoading = false;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    updateUserInfo: (state, action:PayloadAction<Creator>) => {
      if (state.currentUser) {
        state.currentUser = action.payload; 
      }
    }
  },
});
        

export const { setLoginData, logoutAction, startSignIn, isRejected,setAccessToken, setRefreshToken ,updateUserInfo} =
  userSlice.actions;


export default userSlice.reducer;
