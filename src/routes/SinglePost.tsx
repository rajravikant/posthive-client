import { ArrowLeftIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { useQueryClient } from "@tanstack/react-query";
import parse from "html-react-parser";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import Loader from "../app/Loader";
import Comment from "../components/Comment";
import {
  useAddComment,
  useDeleteCommentMutation,
  useEditComment,
  usePostbySlug,
} from "../service/usePosts";
import { RootState } from "../store";
import { CommentType } from "../types/post";

const SinglePost = () => {
  const { slug } = useParams();
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = usePostbySlug(slug as string);


  const queryClient = useQueryClient();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [comments, setComments] = useState<CommentType[]>(post?.comments || []);
  const [comment, setComment] = useState("");
  let isAuth = false;
  const isLoggedIn = currentUser ? true : false;
  if (isLoggedIn)
    isAuth = currentUser?._id === post?.creator._id ? true : false;

  const add = useAddComment();
  const edit = useEditComment();
  const deleteComment = useDeleteCommentMutation();

  const onCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    add.mutate(
      { comment : comment, postId: post?._id as string },
      {
        onSuccess: (data) => {
          setComments((prev) => [...prev, data]);
          queryClient.invalidateQueries({ queryKey: ["blog", slug] });
          setComment("");
          toast.success("Comment added successfully");
        },
        onError: (error) => {
          toast.error(`Error adding comment ${error}`);
        },
      },
    );
  
  };

  const onDeleteComment = async (id: string) => {
    deleteComment.mutate(id,{
      onSuccess: () => {
        setComments((prev) => prev.filter((comment) => comment._id !== id));
        queryClient.invalidateQueries({ queryKey: ["blog", slug] });
        toast.success("Comment deleted successfully");
      }
    });
  };

  const onEditComment = async (id: string, text: string) => {
    edit.mutate(
      { comment: text, commentId: id},
      {
        onSuccess: (data) => {
          setComments((prev)=>
            prev.map((comment) =>
              comment._id === id ? { ...comment, text: data.text } : comment,
            ),
          );
          queryClient.invalidateQueries({ queryKey: ["blog", slug] });
          toast.success("Comment updated successfully");
        },
        onError: (error) => {
          toast.error(`Error updating comment ${error}`);
        },
      }
    );
  };

  if (isLoading) return <Loader/>
  

  if (isError) {
    return (
      <section className="bg-white dark:bg-dark">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-rose-600 dark:text-rose-500">{error.name}</h1>
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Post unavailable</p>
                
                <Link to="/" className="inline-flex text-white bg-rose-600 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-rose-900 my-4">Back to Homepage</Link>
            </div>   
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto px-5 py-5 lg:max-w-6xl">
      {post && (
        <>
          <Link
            to="/"
            className="mx-auto flex w-fit items-center justify-center gap-2 divide-x divide-gray-500/30 rounded-full border-0 p-1 text-xl text-primary hover:ring hover:ring-primary/50 dark:bg-darkL dark:hover:ring-transparent"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <h1 className="px-2">All Blogs</h1>
          </Link>

          <article>
            <header className="text-center lg:mb-6">
              <h1 className="mb-2 w-full text-3xl font-medium text-gray-900 dark:text-white lg:text-4xl">
                {post.title}
              </h1>
              <address>
                <div className="text-[#393E46] dark:text-white">
                  <div className="flex justify-center gap-1">
                    <div>
                      <span>Published by </span>
                      <Link
                        to={`/author/${post.creator.username}/profile`}
                        className="font-bold text-black dark:text-white"
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
                          className="uppercase text-blue-400 hover:text-blue-500"
                          to={`/post/edit/${post._id}`}
                        >
                          <PencilSquareIcon className="h-6 w-6" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </address>

              <Link
                to={`/posts/${post.category}`}
                className="mx-auto my-2 block w-fit cursor-pointer rounded-full border border-gray-200 px-2 py-1.5 text-xs capitalize text-dark transition duration-100 hover:bg-primary/10 dark:text-gray-300"
              >
                {post.category}
              </Link>
            </header>

            <figure className="mt-5">
              <div className="image-container max-h-[500px] overflow-hidden rounded-md">
                <img
                  src={post.imageUrl}
                  alt="blog-article"
                  className="h-full w-full object-cover"
                />
              </div>
            </figure>

            <div className="dark:prose-invert prose prose-sm lg:prose-base mx-auto mt-5">
              {parse(post.content)}
            </div>
          </article>

          <section className="py-8 antialiased lg:py-16">
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white lg:text-2xl">
                  Comments ({comments.length || 0})
                </h2>
                {!currentUser && (
                  <Link to="/login" className="btn-primary">
                    Login to comment
                  </Link>
                )}
              </div>
              {currentUser && (
                <form className="mb-6" onSubmit={onCommentSubmit}>
                  <div className="mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
                    <label htmlFor="comment" className="sr-only">
                      Your comment
                    </label>
                    <textarea
                      id="comment"
                      rows={3}
                      className="w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                      placeholder="Write a comment..."
                      required
                      onChange={(e) => setComment(e.target.value)}
                      value={comment}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={comment.length <= 0}
                    className="inline-flex items-center rounded-lg bg-primary px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-500 focus:ring-4 focus:ring-primary/50 disabled:bg-gray-600 dark:focus:ring-primary"
                  >
                    {isLoading ? "Posting..." : "Post Comment"}
                  </button>
                </form>
              )}

              {comments?.length! <= 0 && (
                <p className="text-gray-500 dark:text-gray-400">
                  No comments yet..
                </p>
              )}
              <div className="comments-article divide-y dark:divide-gray-600">
                {comments?.map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    onDelete={onDeleteComment}
                    onEdit={onEditComment}
                    currentUserID={currentUser?._id || null}
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
