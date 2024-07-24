import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { FallingLines } from "react-loader-spinner";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/UI/Pagination";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { SearchIcon } from "lucide-react";
import { PostType } from "../utils/types";

export default function Blogs() {
  const [blogs, setBlogs] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("desc");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const search = urlParams.get("search");
    if (search) {
      setSearchTerm(search);
    }
    fetchBlogs();
  }, [currentPage, category, sortBy]);

  async function fetchBlogs() {

    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URI
        }/api/posts?startIndex=${currentPage}&category=${category}&direction=${sortBy}&searchTerm=${searchTerm}`
      );
      setBlogs(response.data.posts);
      setTotalPages(response.data.totalPosts);
    } catch (error) {
      toast.error("Failed to fetch data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const searchHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm === null || searchTerm === "") {
      return;
    }
    fetchBlogs();
  }
  return (
    <section className="max-w-7xl mx-auto p-5 min-h-screen ">
      <Toaster />
      <div className="h-full w-full">
        <div className="header w-fulf py-3 grid lg:grid-cols-2 gap-5 ">
          {searchTerm && (
            <h2 className="text-3xl font-medium text-gray-900 dark:text-white w-full ">
              Serch result for "{searchTerm}"
            </h2>
          )}
          <form className="fitler flex gap-5 items-center justify-between w-full ">
            <div className="filter__sortby w-full">
              <select
                name="sortby"
                id="sortBy"
                className="inputs "
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="desc">Newest</option>
                <option value="asc">Oldest</option>
              </select>
            </div>
            <div className="filter__category w-full">
              <select
                name="category"
                id="category"
                className="inputs"
                value={category}
                onChange={(e) => {
                  if (e.target.value === "all") {
                    setCategory("");
                    return;
                  }
                  setCategory(e.target.value);
                }}
              >
                <option value="all">All</option>
                <option value="tech">Tech</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="business">Business</option>
                <option value="health">Health</option>
                <option value="entertainment">Entertainment</option>
                <option value="education">Education</option>
                <option value="science">Science</option>
                <option value="web development">Web Development</option>
              </select>
            </div>
          </form>

          <form className="relative col-span-full" onClick={searchHandler} >
            <input type="search" id="search-box" value={searchTerm} onChange={(e) => {
              setSearchTerm(e.target.value)
            }} className="block p-2 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-md border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 " placeholder="Search Blogs,Techs ..." required />
            <button type="submit" className="absolute  top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-primary rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <SearchIcon className="size-4" />
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>

        <div className="blogs w-full py-5">
          {loading ? (
            <div className="flex justify-center items-center">
              <FallingLines visible={true} height="50" color="#00ADB5" />
            </div>
          ) : (
            <div>
              {blogs.length > 0 && (
                <>
                  <ul className="grid lg:grid-cols-3 gap-5">
                    {blogs.map((blog) => <BlogCard key={blog._id}
                      post={blog} isAuth={false} />
                    )}
                  </ul>
                  <Pagination
                    totalPages={totalPages}
                    page={currentPage}
                    setPage={setCurrentPage} />
                </>
              )}

            </div>


          )}




        </div>


        {blogs.length === 0 && !loading && (
          <div className="flex justify-center items-center">
            <h2 className="text-2xl text-gray-900 dark:text-white">
              No posts found
            </h2>
          </div>
        )}



      </div>
    </section>
  );
}
