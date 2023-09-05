import React, { useEffect, useState } from "react";
import UserProfileCard from "../components/UserCard";
import Blog from "../components/Blog";
// import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useLocation } from "react-router-dom";
import {getBlogByUserApiCall} from '../api/index'
import NoRecord from "../components/NoRecord";
import Loader from "../components/Loader";
const UserBlog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let userId = useParams().id
  const location = useLocation()

  console.log(location.userProps)

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
            <Loader />
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
      <UserProfileCard userData = {data.length>0 &&  data[0].user} postCount = {data.length} />
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
