import CategoryList from "../components/CategoryList";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import RecentBlogs from "../components/RecentBlogs";

const Home = () => {
  return (
    <section className="pt-10 lg:max-w-6xl mx-auto px-5 ">
      <Toaster/>
      <div className="lg:mb-16 mb-8">
        <h2 className="mb-4 text-3xl lg:text-6xl  text-gray-900 dark:text-white">
          <span className="font-bold">Hey ya,</span> Welcome to PostHive Blogs
        </h2>
        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
          We use an agile approach to test assumptions and connect with the
          needs of your audience early and often.
        </p>
        
        <Link to="/blogs" className="mt-10 block w-fit bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
        All Blogs
        </Link>
      </div>


      <div className="popular">
        <h1 className="mb-4 text-3xl tracking-tight font-normal text-gray-900 dark:text-white">
          Popular Categories
        </h1>
        <CategoryList/>
      </div>

      <div className="recent-posts w-full ">
        <h1 className="mt-5 mb-3 text-3xl tracking-tight font-normal text-gray-900 dark:text-white">Recent Posts</h1>
          <RecentBlogs/>
      </div>
    </section>
  );
};

export default Home;
