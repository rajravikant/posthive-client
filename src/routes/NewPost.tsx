import { UploadCloudIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useState, } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { usePostMutation } from "../service/usePosts";
import { RootState } from "../store";
import { categories, formats, modules } from "../utils/constants";


type Data = {
  title: string;
  summary: string;
  category: string;
  content: string;
  image?: File | null;
}

const initialData: Data = {
  title: "",
  summary: "",
  category: "",
  content: "",
  image: null,
};

const NewPost = () => {
  const { currentUser } = useSelector((state:RootState) => state.user);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState<Data>(initialData);
  const mutation = usePostMutation()
   

  const onChangeHandler = (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const onSubmitHandler = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title || !formData.summary || !formData.category || !formData.content || !formData.image) {
      toast.error("Please fill all the fields");
      return;
    }

    const formDataToSend = new FormData()
    formDataToSend.append("title", formData.title);
    formDataToSend.append("summary", formData.summary);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("image", formData.image);

    mutation.mutate(formDataToSend,{
      onSuccess : () => {
        toast.success("Post created successfully");
        navigate(`/author/${currentUser?.username}/profile`);
      },
      onError: (error:any) => {
        toast.error(error.response?.data?.error || "Something went wrong");
      }
    });
    
  };
  return (
    <section className="dark:bg-dark lg:max-w-6xl mx-auto px-5">
      <form className="w-full py-10" onSubmit={onSubmitHandler}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 p-5 rounded-md border dark:border-gray-700 ">
          <div className="sm:col-span-full">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50  "
            >
              Post title
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="title"
                value={formData.title} onChange={onChangeHandler}
                name="title"
                className="inputs"
                required
              />
            </div>
          </div>
          <div className="sm:col-span-6">
            <label
              htmlFor="summary"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
            >
              Summary
            </label>
            <div className="mt-2">
              <textarea
               
                id="summary"
                value={formData.summary} onChange={onChangeHandler}
                name="summary"
                className="inputs"
                required
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="category"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
            >
              Category
            </label>
            <div className="mt-2 ">
              <select
                name="category" 
                value={formData.category} onChange={onChangeHandler}
                className="inputs"
              >
                {categories.map((category, index) => (
                  <option key={index} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="tags"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
            >
              Tags
            </label>
            <div className="mt-2">
              <input
                type="tags"
                name="tags"
                className="inputs"
                
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium leading-6  text-gray-900  dark:text-gray-50"
            >
              Feautured Image
            </label>
           
            <div className="flex items-center justify-center w-full mt-2">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloudIcon size={32} className="text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  name="imageUrl"
                  className="hidden"
                  onChange={(e) => {
                    // @ts-ignore
                    setFormData({ ...formData, image: e.target.files[0] });
                    // @ts-ignore
                    setImagePreview(URL.createObjectURL(e.target.files[0]))
                  }
                  }
                />
              </label>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="tags"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-50"
            >
              Image Preview
            </label>
            <div className="mt-2 w-full ">
              <div className="img-container h-[255px] border rounded-md overflow-hidden  dark:border-gray-700">
                {imagePreview && (
                  <img
                    src={imagePreview || ""}
                    alt="image"
                    className="w-full object-cover h-full"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="sm:col-span-full">
            <label
              htmlFor="content"
              className="block text-sm font-medium leading-6 dark:text-white"
            >
              Content
            </label>

            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e })}
              id="content"
              placeholder="Write something amazing..."
              className="mt-2 dark:text-white  "
              modules={modules}
              formats={formats}
            />
          </div>

          <button
            type="submit"
            className="btn-primary self-center col-span-full"
          >
            {mutation.isPending ? "Loading..." : "Publish"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewPost;

