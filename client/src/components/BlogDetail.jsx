import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import Comment from "./Comment";
import HTMLReactParser from "html-react-parser";
// import comments from "./comment.json";
import { getBlogByIdApiCall } from "../api";
import { useParams } from "react-router-dom";


const BlogDetail = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {id} = useParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getBlogByIdApiCall(id);
        setData(apiData.data.blog);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  },[]);

    if (loading) {
        return <div className="mx-auto max-w-5xl mt-10 px-2 sm:px-6 lg:px-8 text-center h-[60vh]">Loading...</div>;
    }

    if (error) {
      return (
        <div className="mx-auto max-w-5xl mt-10 px-2 sm:px-6 lg:px-8">
          Something Went wrong. Plz try again.
        </div>
      );
    }

  return (
    <>
      {data && <div className="mx-auto max-w-4xl mt-10 bg-white p-5 ">
        <div className="h-auto p-6 ">
          <h1 className="text-4xl font-bold"> {data.title} </h1>
          <p className="text-gray-400 my-7">
            Published on {data.publishedAt.split('T')[0]}
          </p>
          <p className="text-lg text-gray-700 bg-gray-300 py-1 px-2 inline rounded-lg ">
            {data.tag}
          </p>
          <div className="flex items-center justify-between my-8">
            <div className="flex items-center">
              <NavLink to="/blog/user/1">
                <img
                  src={data.user.picture}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full mr-2"
                  loading="lazy"
                />
              </NavLink>
              <NavLink to="/blog/user/1" className="text-gray-600">
                {data.user.nickname}
              </NavLink>
            </div>
            <p className="text-gray-400">{data.readTime} min read</p>
          </div>
          <img src={data.thumbnail} alt="" className="w-full aspect-h-9 mb-10" />
          {/* content */}
          <div className="bg-transparent">{HTMLReactParser(data.content)}</div>
        </div>

        <hr className="my-10" />

        <div className="flex justify-center items-center px-6 py-6">
          <div>
            <h3 className="text-lg mr-5 text-gray-700 mb-3">
              Was this article helpful?
            </h3>
            <div className="flex item-center justify-center">
              <button className="text-gray-500 h-14 w-14 p-3 hover:text-green-500 transition-colors duration-300 border border-gray-300 rounded-full hover:bg-green-100">
                <HandThumbUpIcon />
              </button>

              <button className="text-gray-500 h-14 w-14 p-3 hover:text-red-500 transition-colors duration-300 border border-gray-300 rounded-full hover:bg-red-100 ml-2">
                <HandThumbDownIcon />
              </button>
            </div>
          </div>
        </div>

        {/* <hr className="my-10" /> */}
        <div className="my-10 flex items-center gap-x-4">
          <div className="h-px flex-auto bg-gray-300" />
          <h4 className="flex-none text-2xl font-semibold leading-6 text-blue-500">
            Comments
          </h4>
          <div className="h-px flex-auto bg-gray-300" />
        </div>
        <div>
          <Comment blogId = {data._id} />
        </div>
      </div>}
    </>
  );
};

export default BlogDetail;
