import moment from "moment";
import { FormEvent, useState } from "react";
import { CommentType } from "../utils/types";

interface CommentProps {
  comment: CommentType;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  currentUserID: string | null;
}

const Comment = ({ comment, onDelete, onEdit,currentUserID}:CommentProps) => {
  const date = moment(comment.updatedAt).fromNow();
  const [dropdownActive, setDropdownActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [commentText, setComment] = useState(comment.text);
  let isAuth = false;
  if (currentUserID) {
    isAuth = currentUserID === comment.creator?._id ? true : false;
  }


  const onEditHandler = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEdit(comment._id, commentText);
    setIsEditing(false);
  }
  return (
    <div className="text-base  relative  ">
      <header className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
            <img
              className="mr-2 w-6 h-6 rounded-full"
              src={comment.creator.avatar}
              alt={comment._id}
            />
            {comment.creator.username}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{date}</p>
        </div>
        <button
          onClick={() => setDropdownActive(!dropdownActive)}
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
          <span className="sr-only">Comment settings</span>
        </button>

        {dropdownActive && isAuth && (
          <div className=" absolute right-0 top-10 z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
            <div className="py-1 text-sm text-gray-700 dark:text-gray-200">
              <button
                onClick={() => {
                  setIsEditing(prev => !prev);
                  setDropdownActive(false);
                }}
                className="block w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(comment._id)}
                className="block w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </header>
     
      {isEditing ?  (
        <form className="inline-flex w-full justify-between gap-2 items-center" onSubmit={onEditHandler}>
          <input type="text"
            name="comment"
            className="inputs w-full"
            value={commentText}
            onChange={(e) => setComment(e.target.value)}
          ></input>
          <button
            type="submit"
            className="py-2 px-4 text-sm font-medium text-center text-white bg-primary rounded-md focus:ring-4 focus:ring-primary/50 dark:focus:ring-primary hover:bg-blue-500"
          >
            Update
          </button>
        </form>
      ) : ( <p className="text-gray-500 dark:text-gray-400">{comment.text}</p>)}
      <div className="flex items-center mt-4 space-x-4">
        <button
          type="button"
          className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
        >
          <svg
            className="mr-1.5 w-3.5 h-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
            />
          </svg>
          Like
        </button>
      </div>
    </div>
  );
};

export default Comment;
