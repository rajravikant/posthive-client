import { useState, ChangeEvent, FormEvent,} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { UploadCloudIcon } from "lucide-react";
import { RootState } from "../store/store";


type Data = {
  title: string;
  summary: string;
  category: string;
  content: string;
  image?: File | null;
}

const NewPost = () => {
  const { currentUser } = useSelector((state:RootState) => state.user);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const[isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Data>({
    title: "",
    category: "",
    summary: "",
    content : "",
  });

  const onChangeHandler = (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const onSubmitHandler = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
      try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URI}/api/posts/create`,formData,{
          headers: {"Content-Type" : "multipart/form-data" },
        withCredentials:true});
      if (response.status === 201) {
        setIsLoading(false);
        navigate("/author/" + currentUser?.username + "/profile");
      }
    } catch (error:any) {
      toast.error(error.response.data.error);
      setIsLoading(false);
    }
    
  };
  return (
    <section className="dark:bg-dark lg:max-w-6xl mx-auto px-5">
      <Toaster />
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
                  <option key={index} value={category}>
                    {category}
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
            {isLoading ? "Loading..." : "Publish"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewPost;

const modules = {
  toolbar: [
    [{ header: [1, 2,3, false] }],
    
    ["bold", "italic", "underline", "strike", "blockquote"],
    ['code-block'],
    [
      { list: "ordered" },
      { list: "bullet" },
    ],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }],
    ["link", "image"],
    ["clean"],
    
  ],
};

const formats = [
  "header",
  "code-block",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const categories = ["Uncategorized","Tech", "Science", "Health", "Sports", "Entertainment"];
