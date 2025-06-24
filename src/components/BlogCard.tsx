import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { BlogCardProps } from "../utils/types";


const BlogCard = ({ post}:BlogCardProps) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  const contentArray = post.content.split(" ");
  const readingTime = Math.ceil(contentArray.length / 200);

  return (
    <>
      <li className="col-span-1 flex flex-col  group justify-start cursor-pointer outline-none border-0  ">
        <Link to={`/post/${post.slug}`}>
            <div className="img-container h-[200px] w-full overflow-hidden rounded-lg ">
              <img
                src={post.imageUrl}
                className=" h-full  w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                alt={post.title}
                defaultValue={"https://placehold.co/600x400"}
              />
            </div>
        </Link>
          <div className="content flex justify-between flex-col h-full mt-5 w-full ">
            <div className="">
              <div className="flex">
                <Link to={`/posts/${post.category}`}>
                  <span className="bg-primary/10 text-black  text-xs font-medium me-2 capitalize px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-primary border border-primary">
                    {post.category}
                  </span>
                </Link>

             
              </div>
              <h2 className="text-xl mt-2 font-semibold  dark:text-zinc-200 ">
              {post.title}
            </h2>
            <p className="summary  text-gray-600 font-light  tracking-wide text-sm dark:text-gray-400 py-2">
              {post.summary.slice(0, 200) + "..."}
            </p>

            </div>

           
              <div className="inline-flex items-center gap-2 dark:text-gray-300 capitalize ">
               <Link className="text-sm inline-flex items-center" to={`/author/${post.creator.username}/profile`}>
                <img src={post.creator.avatar} alt={post.creator.username} className="size-6 rounded-full object-cover" />
                <span className="text-xs ms-2 text-black  dark:text-white">{post.creator.username || "Unknown"}</span>
               </Link>

                <span className="text-sm w-full text-right">{readingTime} min. read</span>
                
              </div>
          

          </div>

      </li>
    </>
  );
};

export default BlogCard;
