import { configureStore } from '@reduxjs/toolkit'
import userReducer, { setAccessToken } from '../features/userSlice'
import themeSlice from '../features/themeSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export const store = configureStore({
  reducer: {
    user : userReducer,
    theme: themeSlice.reducer
  },
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const getAccessToken = () => {
  return store.getState().user.accessToken
}

export const getRefreshToken = () => {
  return store.getState().user.refreshToken
}

export const setAccessTokenInStore = (token: string) => {
  store.dispatch(setAccessToken(token));
}