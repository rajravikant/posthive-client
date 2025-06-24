import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router";
import Footer from "../components/Navigation/Footer";
import Header from "../components/Navigation/Header";

import moment from "moment";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../app/store";
import { logoutAction } from "../features/userSlice";
import { getNewRefreshToken } from "../service/auth";


const Root = () => {
  const { accessToken, currentUser, refreshToken } = useAppSelector(
    (state) => state.user,
  );
  const dispatch = useAppDispatch();
  const isLoggedIn = !!(accessToken && currentUser && refreshToken);

  const checkToken = async () => {
    if (accessToken && currentUser && refreshToken) {
      const decodedAccessToken = jwtDecode<{ exp: number }>(accessToken);
      const decodedRefreshToken = jwtDecode<{ exp: number }>(refreshToken);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

      if (decodedRefreshToken.exp < currentTime) {
        alert("Your session has expired. Please login again.");
        return <Navigate to="/login" replace />;
      }

      if (decodedAccessToken.exp < currentTime) {
        // If access token is expired, refresh it
        const refreshed = await getNewRefreshToken();
        if (!refreshed) {
          // If refresh token is not valid, redirect to login
          console.log("Your session has expired. Signig you out!");
          dispatch(logoutAction());
        }
      }

      // If both tokens are valid, show remaining time/day in a toast


      toast.success(`Access token valid for ${moment(decodedAccessToken.exp*1000).fromNow()}`);
    }
  };

  useEffect(()=>{
    if (isLoggedIn) {
      checkToken();
    }
  },[])

  return (
    <>
      <Header />
      
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "5px",
          },
        }}
      />
      <main className="min-h-screen bg-white font-pop transition-all dark:bg-dark lg:h-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;
