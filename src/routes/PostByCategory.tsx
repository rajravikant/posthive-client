import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useParams } from "react-router";
import Loader from "../app/Loader";
import BlogCard from "../components/BlogCard";
import { usePostByCategoryQuery } from "../service/usePosts";

const PostByCategory = () => {
  const {pathname} = useLocation();
  const {category} = useParams()
  const {data : posts,isError,isLoading,error} = usePostByCategoryQuery(category as string);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if(isLoading) return <Loader/>
  if(isError){
    toast.error(error?.message || "Something went wrong!");
    return <p className="text-center text-2xl font-bold text-red-500">{error.message}</p>
  }




  return (
    <section className="lg:max-w-6xl mx-auto py-10 px-5 ">
      {posts && posts.length > 0 ? (
        <ul className="w-full grid lg:grid-cols-3 gap-5">
          {posts.map((post, index) => (
            <BlogCard isAuth={false}  post={post} key={index} />
          ))}
        </ul>
      ) : (
        <section className="bg-white dark:bg-dark">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-rose-600 dark:text-rose-500">404</h1>
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">No related post found</p>
                
                <Link to="/" className="inline-flex text-white bg-rose-600 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-rose-900 my-4">Back to Homepage</Link>
            </div>   
        </div>
      </section>
      )}
    </section>
  );
};

export default PostByCategory;


