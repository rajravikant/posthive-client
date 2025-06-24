
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router";
import { PostType } from "../utils/types";
interface UserFeedProps {
  posts : PostType[] 
  isAuth: boolean;
  onDelete: (id: string) => void;
}

const formatDate = (str: string) => {
  return new Date(str).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const UserPostsTable = ({posts,isAuth,onDelete}:UserFeedProps) => {

  return (
    <div className="relative overflow-x-auto rounded-md ">
      <table className="w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {['Post', 'Category', 'Created at', 'Updated at'].map((heading, index) => (
            <th scope="col" className="lg:px-6 lg:py-3 p-2 " key={index}>
              {heading}
            </th>
          ))}

        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (

          <tr key={post._id} className=" odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

            <th
              scope="row"
              className="lg:px-4 lg:py-4 p-2 font-medium text-gray-900  dark:text-white">
              <Link to={`/post/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </th>
            <td className="lg:px-4 lg:py-4 p-2 capitalize">{post.category}</td>
            <td className="lg:px-4 lg:py-4 p-2">{formatDate(post.createdAt)}</td>
            <td className="lg:px-4 lg:py-4 p-2">{formatDate(post.updatedAt)}</td>
            {isAuth && (
              <td className="lg:px-4 lg:py-4 p-2">
                <div className="actions inline-flex w-full gap-2">
                  <Link
                    className="text-blue-400 uppercase hover:text-blue-500"
                    to={`/post/edit/${post._id}`}>
                    <PencilSquareIcon className="size-6" />
                  </Link>
                  <button type="button" onClick={()=>onDelete(post._id)} className="text-red-400 uppercase hover:text-red-500">
                    <TrashIcon className="size-6" />
                  </button>

                </div>

              </td>
            )}

          </tr>

        ))}
      </tbody>
    </table>
    </div>
    
 
   
  );
};

export default UserPostsTable
