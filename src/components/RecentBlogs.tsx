import { useEffect, useState} from "react";
import { FallingLines } from "react-loader-spinner";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import BlogCard from "./BlogCard";
import { PostType } from "../utils/types";

const RecentBlogs = () => {
  const [fetchedData, setFetchedData] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    async function fetcher() {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/posts`);
        
        if (response.status === 200) {
          setFetchedData(response.data.posts);
          setIsLoading(false);
        }
      } catch (error:any) {
        toast.error(error.message);
        setIsLoading(false);
      }
      
    }
    fetcher();

  }, []);

 

  return (
    <>
    <Toaster/>
    {isLoading ? (
          <div className="flex justify-center items-center">
            <FallingLines height="50" color="#00ADB5" visible />
          </div>
        ):(
          <section className="bg-white dark:bg-dark ">
          {fetchedData && (
            <div className="w-full  pb-5">
              <ul className="grid lg:grid-cols-3 gap-5">
                {fetchedData.map((post) => (
                  <BlogCard key={post._id} post={post}  isAuth={false} />
                ))}
              </ul>
            
            </div>
          )}
        </section>
        )}
     
    </>
  );
};

export default RecentBlogs;
