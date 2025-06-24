import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router";
import postImage from '../../assets/work-4997565_1280.webp';
import { isRejected, setLoginData, startSignIn } from "../../features/userSlice";
import { loginUser, register } from "../../service/auth";
import { AppDispatch, RootState } from "../../store";


const Login = () => {
  const navigate = useNavigate();
  const dispatch:AppDispatch = useDispatch();
  const [password,setPassword] = useState('')
  const [identifier,setIdentifier] = useState('')
  const [isLogin,setIsLogin] = useState(true)
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')

  const {isLoading} = useSelector((state:RootState)=>state.user);


  const clearFields = () => {
    setIdentifier('');
    setPassword('');
    setUsername('');
    setEmail('');
  };

  const handleLogin = async (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    dispatch(startSignIn());

    try {
      const response = await loginUser(identifier.trim(), password); 
      if (response.status === 200) {
        const userData = {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          user: response.data.existingUser,
        };
        dispatch(setLoginData(userData));
        return navigate('/') ;
        }
      }
      catch (error:AxiosError | any) {
      dispatch(isRejected());
      if (axios.isAxiosError(error)) {
        return toast.error(error.response?.data.error);
      }
      console.log(error);
    }
    
  }

  const handleSignUp = async (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if (!username || !email || !password) {
      return toast.error("All fields are required");
    }
    dispatch(startSignIn())
    try {
      const response = await register(username.trim(), email.trim(), password);
       
      if (response.status === 201) {
        dispatch(isRejected());
        clearFields()
        setIsLogin(true)
        toast.success(response.data.user+" "+response.data.message);
        }
      }catch (error:AxiosError | any) {
      dispatch(isRejected());
      if (axios.isAxiosError(error)) {
        return toast.error(error.response?.data.error);
      }
      console.log(error);
      
    }
   
  }
  
  
  
  
  return (
    <div className="flex h-full w-full justify-between gap-20 items-center">
        <div className=" flex-1 p-10">
          <>
          {isLogin && (  
            <div>
          <h3 className="text-xl font-medium dark:text-gray-200">Welcome back</h3>
          <div >
          <form onSubmit={handleLogin}>
          <div className="relative mt-3">
              <input
                type="text"
                id="floating_outlined_email"
                name="email_or_username"
                value={identifier} 
                onChange={e => setIdentifier(e.target.value)}
                autoComplete="username email"                
                required
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                placeholder=" "
              />
              <label
                htmlFor="email_or_username"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                username or email
              </label>
            </div>
          <div className="relative mt-5">
              <input
                type="password"
                id="floating_outlined"
                autoComplete="password"
                name="password"
                value={password} onChange={e => setPassword(e.target.value)}
                required
                
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary dark:focus:bg-transparent peer"
                placeholder=" "
              />
              
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                password
              </label>

              <span className="text-sm mt-2 block text-right dark:text-gray-200">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline dark:text-blue-500">Forgot password?</Link>
              </span>
            </div>
            
            <button
              type="submit" disabled={isLoading}
              className="w-full p-2 disabled:bg-blue-300 mt-3    bg-primary hover:bg-blue-600 text-white rounded shadow"
            >
              {isLoading ? (<span className="inline-flex items-center w-full justify-center">
                <svg
                    aria-hidden="true"
                    className="size-5 text-gray-200 animate-spin fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <div className="ms-2">Logging you in</div>
              </span>) : 'Login'}
            </button> 
        </form>
          </div>
          </div>
         )}

         {!isLogin && (<div >
          <h3 className="text-xl font-medium dark:text-gray-200">Create an account</h3>
          <div className="">
          <form onSubmit={handleSignUp}>
          <div className="relative mt-3">
              <input
                type="email"
                id="floating_outlined_email"
                autoComplete="email"
                name="email"
                value={email} onChange={e => setEmail(e.target.value)}
                required
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                email
              </label>
            </div>
          <div className="relative mt-3">
              <input
                type="text"
                id="username" autoComplete="username"
                name="username" value={username} onChange={e => setUsername(e.target.value)}
                required
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                placeholder=" "
              />
              <label
                htmlFor="username"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                username
              </label>
            </div>

          <div className="relative mt-3">
              <input
                type="password"
                id="floating_outlined"
                name="password_so"
                value={password} onChange={e => setPassword(e.target.value)}
                required
                
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary dark:focus:bg-transparent peer"
                placeholder=" "
              />
              
              <label
                htmlFor="password_so"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-dark px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                password
              </label>
            </div>
            

            <button
              type="submit" disabled={isLoading}
              className="w-full p-2 disabled:bg-blue-300 mt-3    bg-primary hover:bg-blue-600 text-white rounded shadow"
            >
              {isLoading ? (<span className="inline-flex items-center w-full justify-center">
                <svg
                    aria-hidden="true"
                    className="size-5 text-gray-200 animate-spin fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <div className="ms-2">Creating</div>
              </span>) : 'Create an account'}
            </button> 
           
        </form>
          </div>
         </div>) }

{/* 
        <hr className="w-1/2 mx-auto h-px my-5 bg-gray-200 border-0 dark:bg-gray-700"/>
       

         <Oauth/> */}


         <span className="text-sm mt-3 block dark:text-gray-200">
          {!isLogin ? 'already have an account' :'dont have an account'}
            <button onClick={()=>setIsLogin(prev => !prev)} type="button" className="font-medium ms-1 text-primary">{isLogin ? 'create one' : 'login'}</button> 
          </span>
         </>
        </div>
     

      <div className="image-container w-1/2 hidden lg:block  ">
        <img src={postImage} alt="image" className="h-full w-full object-cover object-center" />
      </div>
      
    </div>
  );
};

export default Login;


