import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UploadCloudIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate, useParams } from "react-router";
import Loader from "../app/Loader";
import { getPostById } from "../service/blog";
import { useEditPostMutation } from "../service/usePosts";
import { categories, formats, modules } from "../utils/constants";

type Data = {
  title: string;
  summary: string;
  category: string;
  content: string;
  image?: File | null;
};

const EditSinglePost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const queryClient = useQueryClient()
  const {
    data,
    isLoading: postLoader,
    isError,
    error,
  } = useQuery({
    queryKey: ["blog", postId!],
    queryFn: () => getPostById(postId as string),
  });

  const edit = useEditPostMutation();
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState<Data>({} as Data);

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title,
        summary: data.summary,
        category: data.category,
        content: data.content,
        image: null,
      });
      setImagePreview(data.imageUrl || "");
    }
  }, [data]);

  const onChangeHandler = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", formData.title);
    form.append("summary", formData.summary);
    form.append("category", formData.category);
    form.append("content", formData.content);
    if (formData.image) {
      form.append("image", formData.image);
    }

    edit.mutate(
      { postId: postId as string, formData: form },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["blog", data.slug] });
          toast.success("Post updated successfully");
          navigate("/post/" + data.slug);
        },
        onError: (error) => {
          toast.error(`Error updating post: ${error.message}`);
        },
      },
    );
  };

  if (postLoader) {
    return <Loader/>
  }

  if (isError) {
    return (
      <section className="bg-white dark:bg-dark">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-sm text-center">
                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-rose-600 dark:text-rose-500">Error</h1>
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Post unavailable</p>
                
                <Link to="/" className="inline-flex text-white bg-rose-600 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-rose-900 my-4">Back to Homepage</Link>
            </div>   
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto px-5 dark:bg-dark lg:max-w-6xl">
      <form className="w-full py-10" onSubmit={onSubmitHandler}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 rounded-md border p-5 sm:grid-cols-6">
          <div className="sm:col-span-full">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Post title
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={onChangeHandler}
                name="title"
                className="inputs"
                required
              />
            </div>
          </div>
          <div className="sm:col-span-6">
            <label
              htmlFor="summary"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Summary
            </label>
            <div className="mt-2">
              <textarea
                id="summary"
                value={formData.summary}
                onChange={onChangeHandler}
                rows={3}
                name="summary"
                className="inputs"
                required
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="category"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Category
            </label>
            <div className="mt-2">
              <select
                name="category"
                value={formData.category}
                onChange={onChangeHandler}
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
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Tags
            </label>
            <div className="mt-2">
              <input type="tags" name="tags" className="inputs" />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="image"
              className="block text-sm font-medium leading-6 dark:text-white"
            >
              Feautured Image
            </label>

            <div className="mt-2 flex w-full items-center justify-center">
              <label
                htmlFor="dropzone-file"
                className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
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
                  className="hidden"
                  name="image"
                  onChange={(e) => {
                    // @ts-ignore
                    setFormData({ ...formData, image: e.target.files[0] });
                    // @ts-ignore
                    setImagePreview(URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </label>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="tags"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Image Preview
            </label>
            <div className="mt-2 w-full">
              <div className="img-container h-[255px] overflow-hidden rounded-md border">
                {imagePreview && (
                  <img
                    src={imagePreview || ""}
                    alt="image"
                    className="h-full w-full object-cover"
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
              className="mt-2 dark:text-white"
              modules={modules}
              formats={formats}
            />
          </div>

          <button
            type="submit"
            className="btn-primary col-span-full self-center"
          >
            {edit.isPending ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditSinglePost;
