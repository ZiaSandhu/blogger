import { PhotoIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";
import { useState, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useAuth0 } from "@auth0/auth0-react";
import {useNavigate, useLocation} from 'react-router-dom'
import { editBlogApiCall } from "../../api";

export default function EditBlog() {
  const editor = useRef(null);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const navigate = useNavigate();
  const location = useLocation();

  const blog = location.state?.blog;

  const [content, setContent] = useState(blog.content);
  const [error, setError] = useState();
  const [thumbnail, setThumbnail] = useState(blog?.thumbnail);
  const [loading, setLoading] = useState(false);

  const config = {
    uploader: {
      insertImageAsBase64URI: true,
    },
    spellcheck: true,
    minHeight: 300,
    readOnly: false,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: blog.title,
      tag: blog.tag,
      readTime: blog.readTime,
    },
  });
  const submit = async (data) => {
    setError(null);
    if (!isAuthenticated) {
      setError("Login Required");
      return;
    }
    if (!thumbnail || content.trim() === "") {
      setError("Something is wrong. Check Data");
      return;
    }
    const post = {
      ...data,
      thumbnail,
      content,
    };
    let response;
    setLoading(true);
    try {
      let token = await getAccessTokenSilently();
      response = await editBlogApiCall(blog._id, post, token);
      console.log(post);
      if (response.status === 201) {
        console.log("blog updated");
        reset();
        setThumbnail(null);
        setContent(null);
        setLoading(false);
        navigate("/myblogs");
      }
    } catch (error) {
      setError(error.data.message);
      setLoading(false);
    }
  };

  const onDropThumbnail = useCallback((acceptedFiles) => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onloadend = () => {
      setThumbnail(reader.result);
    };
  }, []);
  const thumbnailDropzone = useDropzone({
    onDrop: onDropThumbnail,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
  });

  if (loading) {
    <>{/* loader */}</>;
  }

  return (
    <div className="mx-auto mt-10 max-w-5xl px-2 py-4 bg-white rounded-2xl shadow-sm sm:px-6 lg:px-8">
      <h1 className="text-2xl text-center text-gray-800">Write an Article</h1>
      <form onSubmit={handleSubmit(submit)}>
        <div className="mt-5 flex flex-col gap-x-6 gap-y-8">
          {/* title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <textarea
                type="text"
                id="title"
                {...register("title", {
                  required: "Title required",
                  minLenght: {
                    value: 10,
                    message: "Title is not less than 10 characters",
                  },
                  validate: {
                    noEmptySpace: (value) =>
                      value.trim() !== "" || "Title cannot be empty spaces",
                  },
                })}
                rows={1}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* flex tag and time */}
          <div className="flex justify-between item-center gap-4">
            {/* tags */}
            <div className="w-1/2">
              <label
                htmlFor="tag"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tag
              </label>
              <div className="mt-2">
                <input
                  id="tag"
                  {...register("tag", {
                    required: "Tag is missing",
                    minLength: {
                      value: 4,
                      message: "Tag must be at least 4 characters long",
                    },
                    validate: {
                      noEmptySpace: (value) =>
                        value.trim() !== "" || "Tag cannot be empty spaces",
                    },
                  })}
                  type="text"
                  className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Time to read */}
            <div className="w-1/2">
              <label
                htmlFor="readtime"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Time to read (mins)
              </label>
              <div className="mt-2">
                <input
                  id="readtime"
                  {...register("readTime", {
                    required: "Readtime is missing",
                    min: {
                      value: 1,
                    },
                  })}
                  type="number"
                  className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          {/* thumbnail dropzone */}
          <div className="w-full">
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium leading-6  text-gray-900"
            >
              Thumbnail
            </label>
            <div className="mt-2 flex justify-center rounded-lg h-auto border border-dashed border-gray-900/25 px-6 py-10">
              <div
                className="text-center w-full"
                {...thumbnailDropzone.getRootProps()}
              >
                <input {...thumbnailDropzone.getInputProps()} />
                {!thumbnail ? (
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                ) : (
                  <div className="relative inline-block bg-white">
                    <img
                      className="mx-auto h-24 w-24 text-gray-300 rounded "
                      src={thumbnail}
                      alt=""
                    />
                    {/* todo implement cancel option */}
                    <button
                      className="absolute top-0 right-0 z-20 cursor-default"
                      onClick={() => setThumbnail(null)}
                    >
                      <XMarkIcon className="h-5 w-5 hover:text-red-500" />{" "}
                    </button>
                  </div>
                )}
                <p className=" text-sm relative  rounded-md bg-transparent ">
                  <span className="text-indigo-600 font-semibold cursor-pointer hover:text-indigo-500">
                    Upload a file
                  </span>
                  &nbsp; or drag and drop
                </p>
                <p className="text-xs leading-5 text-gray-600">
                  Allowed file types:{" "}
                  <span className="text-gray-900">PNG, JPG, GIF</span>
                </p>
                <p className="text-xs leading-5 text-gray-600">
                  Other file types will be rejected
                </p>
              </div>
            </div>
          </div>
          {/* text editor */}
          <div className="w-full h-auto">
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setContent(newContent)}
            />
          </div>
        </div>
        {error && <p className="my-2 text-red-500 text-center"> {error} </p>}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => reset()}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
