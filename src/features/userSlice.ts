import { createSlice} from "@reduxjs/toolkit";
import { User } from "../utils/types";



const initialState:User = {
  currentUser: null,
  token: null  ,
  isLoading: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
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
      state.token = null;
      state.isLoading = false;
    },
  },
});

export const { setLoginData, logoutAction, startSignIn, isRejected } =
  userSlice.actions;

export default userSlice.reducer;
