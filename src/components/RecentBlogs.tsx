import toast from "react-hot-toast";
import BlogCard from "./BlogCard";
import { PostType } from "../utils/types";
import { usePostsQuery } from "../service/usePosts";
import LoadingIndicator from "./UI/LoadingIndicator";

const RecentBlogs = () => {
  const { data, isPending, isError } = usePostsQuery();

  if (isError) {
    toast.error("Failed to fetch posts");
    return <h1>Failed to fetch posts</h1>;
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <section className="bg-white dark:bg-dark">
      {data && (
        <div className="w-full pb-5">
          <ul className="grid gap-5 lg:grid-cols-3">
            {data.map((post: PostType) => (
              <BlogCard key={post._id} post={post} isAuth={false} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default RecentBlogs;
