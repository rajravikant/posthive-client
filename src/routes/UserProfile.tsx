import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Loader from "../app/Loader";
import UserPostsTable from "../components/UserPostsTable";
import { setLoginData, updateUserInfo } from "../features/userSlice";
import { deleteAccount, getUserProfile, UpdateUserBody, updateUserProfile } from "../service/auth";
import { useDeletePostMutation } from "../service/usePosts";
import { RootState } from "../store";


type FormData = {
  username: string;
  email: string;
  password: string | null;
  avatar: File | null;
};


const initialState =  {
  username:'',
    email: '',
    password: null,
    avatar: null
};


const UserProfile = () => {
  const {username} = useParams()
  const queryClient = useQueryClient()
  const {data:user,isLoading,isError,error} = useQuery({
    queryKey: ['userProfile', username],
    queryFn: () => getUserProfile(username as string),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<FormData>(initialState);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (currentUser) {
      setIsAuth(currentUser._id === user?._id);
    }
  }, [currentUser, user]);

  
  const avatarRef = useRef<HTMLInputElement | null>(null);

  const updateMutation = useMutation({
    mutationFn : (data: Partial<UpdateUserBody>) =>updateUserProfile(data)
  })

  const deleteMutation = useDeletePostMutation()

  const onChangeHadler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAuth) {
      toast.error("You are not authorized to update this profile");
      return;
    }
   

    updateMutation.mutate({
      username: formData.username ? formData.username : user?.username,
      email: formData.email ? formData.email : user?.email,
      avatar : formData.avatar ? formData.avatar : undefined,
      password: formData.password ? formData.password : undefined,
    },{
      onSuccess: ({updatedUser}) => {
        queryClient.invalidateQueries({ queryKey: ["userProfile", updatedUser.username] });
        dispatch(updateUserInfo(updatedUser));
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.error || "Something went wrong");
      }
    });

  

  };

  const onPostDelete = (postId: string) => {
    confirm("Are you sure you want to delete this post? "+postId) && deletePost(postId);
  }

  const deletePost = async (postId: string) => {
    deleteMutation.mutate(postId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["userProfile",username] });
        toast.success("Post deleted successfully");
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.error || "Something went wrong");
      }
    });
  }

  const onDeleteAccount = () => {
     confirm("Are you sure you want to delete your account?") && deleteAccountHandler();
  }

  const deleteAccountHandler = async () => {
    try {
      await deleteAccount();
      queryClient.invalidateQueries()
      dispatch(setLoginData({ user: null, accessToken: null, refreshToken: null }));
      navigate("/login",{replace : true});
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }

  if (isLoading) return <Loader />;

  if (isError) {

    return (
      <div className="h-screen w-full flex items-center justify-center flex-col gap-2 bg-white dark:bg-dark">
        <h1 className="text-3xl text-red-500 dark:text-red-400">
          {(error as Error).message}
        </h1>
        <button
          onClick={() => navigate("/")}
          className="text-white bg-primary/60 px-3 py-1.5 rounded-md mt-3">
          Go back
        </button>
      </div>
    );
  }




  return (
    <>
       
  
    <section className="w-full flex flex-col p-3 divide-y divide-gray-300 dark:divide-gray-700 ">
      <div className="pb-5">
        <div className="p-3  bg-white dark:bg-dark border dark:border-gray-700 rounded-md ">
          <form onSubmit={handleFormSubmit}>
            <div className="photo-container block relative">
              <img
                className="size-40 object-cover cursor-pointer shadow-md  mx-auto border-4 border-white dark:border-primary  rounded-full "
                src={user?.avatar} onClick={()=>{
                  if (isAuth) avatarRef.current?.click();
                }}

                alt="ico"
              />
              {isAuth && (
                <>
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
                </>)
              }
            </div>

            {isAuth && currentUser && (
              <div className="form-data space-y-3 mt-5 lg:max-w-2xl mx-auto">
                <input type="text" className="inputs" autoComplete="username" name="username" value={formData.username || currentUser.username} placeholder="username" onChange={onChangeHadler} />
                <input type="email" className="inputs" name="email" autoComplete="email" value={formData.email || currentUser.email} placeholder="email" onChange={onChangeHadler} />
                <input type="text" className="inputs" name="password" autoComplete="password" value={formData.password || ""} placeholder="********" onChange={onChangeHadler} />
                <div className="inline-flex justify-between gap-3 w-full">
                <p className="text-xs dark:text-primaryL text-neutral-600">Leave password field empty if you don't want to change</p>
                <p className="text-xs dark:text-primaryL ">Last updated: {moment(currentUser.updatedAt).fromNow()}</p>
                </div>

                <div className="inline-flex justify-between gap-3 w-full">
                  <button type="submit"
                    className="text-sm w-full border py-1.5 hover:bg-primary/30 px-3 border-zinc-200 dark:text-primaryL rounded-md dark:border-zinc-600"

                  >
                    {updateMutation.isPending ? "Loading..." : "Update"}
                  </button>
                  <button type="button" onClick={onDeleteAccount} className="text-sm w-full py-1.5 px-3 dark:text-primaryL text-white rounded-md bg-red-400 hover:bg-red-500">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </form>

          {!isAuth && <div className="user-info text-center mt-5">
            <h3 className="text-3xl dark:text-primaryL text-dark font-medium">{user?.username}</h3>
            <p className="text-sm dark:text-primaryL mt-2 text-neutral-600">{user?.email}</p>
          </div>}
          <div className="divide-y divide-gray-300 dark:divide-gray-700 ">
            <div className="blog-stats w-full gap-5 flex flex-cols justify-evenly mb-5 dark:text-[#EEEEEE]">
              <div className="text-center">
                <p className="text-2xl font-semibold">
                  {user?.posts.length || "0"}
                </p>
                <span className="text-gray-500 ">Blogs</span>
              </div>

              <div className="text-center">
                <p className="text-2xl font-semibold">
                  {user?.posts.length || "0"}
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
          {user && user.posts.length > 0 ? (
          <UserPostsTable posts={user.posts} isAuth={isAuth} onDelete ={onPostDelete}  />
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
