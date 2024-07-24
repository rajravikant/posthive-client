import { useState, useRef, FormEvent, ChangeEvent} from "react";
import { useDispatch } from "react-redux";
import { setLoginData } from "../features/userSlice";
import axios, { AxiosError } from "axios";
import {

  LoaderFunction,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Creator, PostType } from "../utils/types";
import { RootState } from "../store/store";
import UserPostsTable from "../components/UserPostsTable";


type FormData = {
  username: string;
  email: string;
  password: string | null;
  avatar: File | null;
};



const UserProfile = () => {
  const user = useLoaderData() as Creator | any
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // @ts-ignore
  if (user.error) {

    return (
      <div className="text-center">
        <h1 className="text-3xl text-red-500 dark:text-red-400">
          {user.error}
        </h1>
        <button
          onClick={() => navigate("/")}
          className="text-white bg-primary/60 px-3 py-1.5 rounded-md mt-3">
          Go back
        </button>
      </div>
    );
  }

  const { currentUser, token } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<PostType[]>(user.posts);
  const [formData, setFormData] = useState<FormData>({
    username: user.username,
    email: user.email,
    password: null,
    avatar: null
  });
  let isAuth = false;
  if (currentUser) {
    isAuth = currentUser._id === user._id ? true : false;
  }
  const avatarRef = useRef<HTMLInputElement | any>();


  const onChangeHadler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URI}/api/users/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
      if (response.status === 200) {
        const userData = {
          token: token,
          user: response.data.updatedUser,
        };
        dispatch(setLoginData(userData));
        toast.success("Profile Updated");
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error);
      setIsLoading(false);
    }
  };

  const onPostDelete = (postId: string) => {
    confirm("Are you sure you want to delete this post? "+postId) && deletePost(postId);
  }

  const deletePost = async (postId: string) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URI}/api/posts/${postId}`, {
        withCredentials: true
      });
      if (response.status === 204) {
        const updatedPosts = posts.filter(post => post._id !== postId);
        setPosts(updatedPosts);
        toast.success("Post Deleted");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  }



  const onDeleteAccount = () => {
     confirm("Are you sure you want to delete your account?") && deleteAccountHandler();
  }

  const deleteAccountHandler = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/users/remove`,{},{
        withCredentials: true
      });
      if (response.status === 200) {
        dispatch(setLoginData({ user: null, token: null }));
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  }


  return (
    <>
       
      <Toaster/>
  
    <section className="w-full flex flex-col p-3 divide-y divide-gray-300 dark:divide-gray-700 ">
      <div className="pb-5">
        <div className="p-3  bg-white dark:bg-dark border dark:border-gray-700 rounded-md ">
          <form onSubmit={handleFormSubmit}>
            <div className="photo-container block relative">
              <img
                className="size-40 object-cover cursor-pointer  mx-auto border-4 border-white dark:border-primary  rounded-full "
                src={user.avatar} onClick={()=>{
                  if (isAuth) avatarRef.current.click();
                }}

                alt="ico"
              />
              <input
                hidden
                name="avatar"
                // @ts-ignore
                onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })}
                type="file"
                ref={avatarRef}
                accept="image/png, image/jpeg , image/jpg"
              />

              {formData.avatar && <p className="text-center dark:text-primaryL text-sm">{formData.avatar.name}</p>}

            </div>

            {isAuth && currentUser && (
              <div className="form-data space-y-3 mt-5 lg:max-w-2xl mx-auto">
                <input type="text" className="inputs" autoComplete="username" name="username" value={formData.username} placeholder="username" onChange={onChangeHadler} />
                <input type="email" className="inputs" name="email" autoComplete="email" value={formData.email} placeholder="email" onChange={onChangeHadler} />
                <input type="text" className="inputs" name="password" autoComplete="password" value={formData.password || ""} placeholder="********" onChange={onChangeHadler} />
                <p className="text-xs dark:text-primaryL text-neutral-600">Leave password field empty if you don't want to change</p>
                <div className="inline-flex justify-between gap-3 w-full">
                  <button type="submit"
                    className="text-sm w-full border py-1.5 hover:bg-primary/30 px-3 border-zinc-200 dark:text-primaryL rounded-md dark:border-zinc-600"

                  >
                    {isLoading ? "Loading..." : "Update"}
                  </button>
                  <button type="button" onClick={onDeleteAccount} className="text-sm w-full py-1.5 px-3 dark:text-primaryL text-white rounded-md bg-red-400 hover:bg-red-500">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </form>

          {!isAuth && <div className="user-info text-center mt-5">
            <h3 className="text-3xl dark:text-primaryL text-dark font-medium">{user.username}</h3>
            <p className="text-sm dark:text-primaryL mt-2 text-neutral-600">{user.email}</p>
          </div>}
          <div className="divide-y divide-gray-300 dark:divide-gray-700 ">
            <div className="blog-stats w-full gap-5 flex flex-cols justify-evenly mb-5 dark:text-[#EEEEEE]">
              <div className="text-center">
                <p className="text-2xl font-semibold">
                  {user.posts.length}
                </p>
                <span className="text-gray-500 ">Blogs</span>
              </div>

              <div className="text-center">
                <p className="text-2xl font-semibold">
                  {user.posts.length || "0"}
                </p>
                <span className="text-gray-500 ">Comments</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <h1 className="dark:text-white  text-2xl text-gray-900 ">Blog Posts</h1>
        <div className="posts pt-4 ">
          {posts.length > 0 ? (
          <UserPostsTable posts={posts} isAuth={isAuth} onDelete ={onPostDelete}  />
          ) : (
            <h1 className="text-3xl dark:text-[#EEEEEE]">User has no posts</h1>
          )}
        </div>
      </div>
    </section>

    </>
  );
};

export default UserProfile;

export const loader = (async ({ params }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URI}/api/users/${params.username}`
    );
    return response.data;
  } catch (error: AxiosError | any) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    console.log(error);

  }
}) satisfies LoaderFunction 