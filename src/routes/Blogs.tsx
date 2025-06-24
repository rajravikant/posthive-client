import { SearchIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import BlogCard from "../components/BlogCard";
import Button from "../components/UI/Button";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { useDebounce } from "../hooks/useDebounce";
import { usePaginatedPostsQuery } from "../service/usePosts";
import { categories } from "../utils/constants";

export default function Blogs() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState<"asc" | "desc">("desc");
  const query = useDebounce(searchTerm, 1000);


  
  const { data,
     isError, 
     isLoading, 
     error, 
     hasNextPage, 
     fetchNextPage, 
     isFetchingNextPage 
    } = usePaginatedPostsQuery(query, category.toLowerCase(), sortBy)




    isError && toast.error(`Error: ${error.message}`)

    const blogs = data?.pages.flatMap(page => page.posts) || [];

    


  return (
    <section className="max-w-7xl mx-auto p-5 min-h-screen ">
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
                onChange={(e) => setSortBy(e.target.value as "asc" | "desc")}
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
               {categories.map((category, index) => (
                  <option key={index} value={category.value}>
                    {category.label}
                  </option>
               ))}
              </select>
            </div>
          </form>

          <form className="relative col-span-full" >
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
          {isLoading ? (
            <div className="flex justify-center items-center">
              <LoadingIndicator/>
            </div>
          ) : (
            <div>
              {blogs && blogs.length > 0 ? (
                <>
                  <ul className="grid lg:grid-cols-3 gap-5">
                    {blogs.map((blog) => <BlogCard key={blog._id}
                      post={blog} isAuth={false} />
                    )}
                  </ul>

                  {hasNextPage ? (
                    <div>
                      <Button onClick={() => fetchNextPage()} >
                        {isFetchingNextPage ? "Loading more..." : "Load More"}
                      </Button>
                    </div>
                  ) : (
                    <div>No more posts to load</div>
                  )}

                </>
              ):(
                <div className="text-center text-2xl font-bold text-gray-500">
                  No posts found for "{searchTerm}" in category "{category || 'All'}"
                </div>
              )}

            </div>


          )}




        </div>


       



      </div>
    </section>
  );
}
