import React, { useEffect, useState } from "react";
import UserProfileCard from "../components/UserCard";
import Blog from "../components/Blog";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useLocation } from "react-router-dom";
import {getBlogByUserApiCall} from '../api/index'
import NoRecord from "../components/NoRecord";
import BlogLoader from "../components/BlogLoader";
const UserBlog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let userId = useParams().id
const {user} = useAuth0()
  useEffect(()=>{

    const fetchData = async () => {
      try {
        const apiData = await getBlogByUserApiCall(userId);
        setData(apiData.data.blogs);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    

  },[])


  if (loading) {
    return (
      <>
        {/* <UserProfileCard /> */}

        <div className="mx-auto max-w-2xl mt-20 flex flex-col gap-5  px-2 sm:px-6 lg:px-8 text-center h-auto">
        <BlogLoader />
        <BlogLoader />
      </div>
      </>
    );
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
      <UserProfileCard userData={user} postCount={data.length} />
      <div className="mx-auto max-w-5xl mt-10 px-2 sm:px-6 lg:px-8">
        {data?.length > 0 ? (
          data.map((blog, index) => <Blog blog={blog} key={index} />)
        ) : (
          <NoRecord />
        )}
      </div>
    </>
  );
};

export default UserBlog;
