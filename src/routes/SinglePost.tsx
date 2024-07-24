import  {FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLoaderData,LoaderFunction } from "react-router-dom";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { ArrowLeftIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import parse from "html-react-parser";
import Comment from "../components/Comment";
import { PostType } from "../utils/types";
import { RootState } from "../store/store";

const SinglePost = () => {
  const post = useLoaderData() as PostType;  
  const [Post, setPost] = useState(post);
  const [comments, setComments] = useState(Post.comments);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useSelector((state:RootState) => state.user);
  let isAuth = false;
  const isLoggedIn = currentUser ? true : false;
  if (isLoggedIn) {
    isAuth = currentUser?._id === post.creator._id ? true : false;
  }

  const onCommentSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URI}/api/comment/${post._id}`,
        { text: comment },
        {
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        setComments(
          [response.data.comment, ...comments].sort(
            // @ts-ignore
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
        setComment("");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Error while adding comment");
      console.log(error);
      setIsLoading(false);
    }
  };

  const onDeleteComment = async (id:string) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URI}/api/comment/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setComments(comments.filter((comment) => comment._id !== id));
      }
    } catch (error) {
      toast.error("Error while deleting comment");
      console.log(error);
    }
  };

  const onEditComment = async (id:string,text:string) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URI}/api/comment/${id}`,{text,},{
        withCredentials: true,
      });
      if (response.status === 200) {
        setComments(
          comments.map((comment) =>
            comment._id === id ? { ...comment, text } : comment
          )
        );
      }
    } catch (error) {
      toast.error("Error while updating comment");
      console.log(error);
    }
  };

  return (
    <section className="lg:max-w-6xl px-5  mx-auto py-5">
      {post && (
        <>
          <Toaster />
          <Link
            to="/"
            className="flex justify-center divide-x text-xl border-0 hover:ring hover:ring-primary/50 dark:bg-darkL w-fit mx-auto p-1 rounded-full gap-2  items-center divide-gray-500/30 text-primary dark:hover:ring-transparent"
          >
            <ArrowLeftIcon className="h-5 w-5 " />
            <h1 className="px-2">All Blogs</h1>
          </Link>

          <article>
            <header className=" lg:mb-6 text-center">
              <h1 className="lg:text-4xl font-medium mb-2 w-full text-gray-900 text-3xl dark:text-white">
                {post.title}
              </h1>
              <address>
                <div className=" text-[#393E46] dark:text-white">
                  <div className="flex justify-center gap-1 ">
                    <div>
                      <span>Published by </span>
                      <Link
                        to={`/author/${post.creator.username}/profile`}
                        className="text-black font-bold dark:text-white"
                      >
                        {post.creator.username || "Unknown"}
                      </Link>
                      <span> at </span>
                      <time>
                        {new Date(post.createdAt).toLocaleString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <div>
                      {isLoggedIn && isAuth && (
                        <Link
                          className="text-blue-400 uppercase hover:text-blue-500"
                          to={`/post/edit/${post._id}`}
                        >
                          <PencilSquareIcon className="h-6 w-6" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </address>

              <Link to={`/posts/${post.category}`} className="capitalize my-2 block w-fit mx-auto text-dark dark:text-gray-300 border-gray-200 hover:bg-primary/10 transition duration-100 cursor-pointer border rounded-full py-1.5 px-2 text-xs">
                {post.category}
              </Link>
            </header>

            <figure className="mt-5">
              <div className="image-container max-h-[500px] rounded-md overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt="blog-article"
                  className=" object-cover w-full h-full"
                />
              </div>
            </figure>

            <div className="mt-5 dark:prose-invert prose mx-auto prose-sm lg:prose-base  ">
              {parse(post.content)}
            </div>
          </article>

          <section className="py-8 lg:py-16 antialiased">
            <div className="max-w-3xl mx-auto ">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Comments ({comments.length})
                </h2>
                {!currentUser && (
                  <Link to="/login" className="btn-primary">
                    Login to comment
                  </Link>
                )}
              </div>
              {currentUser && (
                <form className="mb-6" onSubmit={onCommentSubmit}>
                  <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <label htmlFor="comment" className="sr-only">
                      Your comment
                    </label>
                    <textarea
                      id="comment"
                      rows={3}
                      className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                      placeholder="Write a comment..."
                      required
                      onChange={(e) => setComment(e.target.value)}
                      value={comment}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={comment.length <= 0}
                    className="inline-flex items-center py-2.5 disabled:bg-gray-600 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary/50 dark:focus:ring-primary hover:bg-blue-500"
                  >
                    {isLoading ? "Posting..." : "Post Comment"}
                  </button>
                </form>
              )}

              {comments.length <= 0 && (
                <p className="text-gray-500 dark:text-gray-400">
                  No comments yet..
                </p>
              )}
              <div className="comments-article  divide-y dark:divide-gray-600">
                {comments.map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    onDelete={onDeleteComment}
                    onEdit={onEditComment}
                    currentUserID={currentUser?._id || null }
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </section>
  );
};

export default SinglePost;

export const loader = (async ({params})=>{
  try {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URI}/api/posts?slug=${params.slug}`
  );
  return response.data.posts[0];
} catch (error:AxiosError | any) {
  if (axios.isAxiosError(error)) {
    return error.response?.data;
  }
  console.error(error);
}
})satisfies LoaderFunction
