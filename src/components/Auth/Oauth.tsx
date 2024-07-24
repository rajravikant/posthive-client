import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux'
import { setLoginData } from "../../features/userSlice";
const Oauth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickHandler = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const data = {
        email: result.user.email,
        username: result.user.displayName,
        avatar: result.user.photoURL,
      };

      const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/users/glogin`, data);


      const responseData = {
        token: response.data.accessToken,
        user: response.data.existingUser,
      };

      dispatch(setLoginData(responseData));
      navigate("/");

    } catch (error) {
      console.log(error);
    }
  };
  return (
    
      <button
        type="button"
        onClick={onClickHandler}
        className=" dark:text-white rounded-md border  hover:bg-gray-200/60  items-center justify-center inline-flex w-full p-2"
      >
        
          <svg
            className="h-6 w-6"
            xmlns="https://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              fill="#4285F4"
              d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
            ></path>
            <path
              fill="#34A853"
              d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
            ></path>
            <path
              fill="#FBBC05"
              d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
            ></path>
            <path
              fill="#EA4335"
              d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
            ></path>
            <path fill="none" d="M2 2h44v44H2z"></path>
          </svg>
          <span className="text-sm ms-2">Continue With Google</span>
        
      </button>
   
  );
};

export default Oauth;
