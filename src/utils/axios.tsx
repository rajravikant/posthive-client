import axios from 'axios'
import { getNewRefreshToken } from '../service/auth';
import { getAccessToken, getRefreshToken, setAccessTokenInStore} from '../app/store';

const isDevelopment = import.meta.env.VITE_ENV === 'dev';
const BASE_URL = isDevelopment
  ? import.meta.env.VITE_API_LOCAL_URI
  : import.meta.env.VITE_API_URI;

  
  const axiosPublic = axios.create({
      baseURL: BASE_URL,
  })

const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers:{ 'Content-Type': 'application/json' },
    withCredentials: true,
})


// interceptors
axiosPrivate.interceptors.request.use(
    async (config)=>{
        const accessToken = getAccessToken(); 
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        console.error("Error in request interceptor:", error);
        return Promise.reject(error);
    }
)


// Response interceptor for handling error like jwt expired and refreshing token
axiosPrivate.interceptors.response.use(
    response => response,
    async error=>{
        if (error.response && error.response.status === 403) {
           const refreshToken = getRefreshToken()
            if (!refreshToken) {
                return Promise.reject(error);
            }
            try {
                const newAccessToken = await getNewRefreshToken()
                setAccessTokenInStore(newAccessToken);
                error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosPrivate(error.config)
            }catch(err){
                console.error("Error refreshing token:", err);
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
)


export { axiosPublic, axiosPrivate };


