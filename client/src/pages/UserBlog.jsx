import React, { useEffect, useState } from "react";
import UserProfileCard from "../components/UserCard";
import Blog from "../components/Blog";
import { useParams } from "react-router-dom";
import {getBlogByUserApiCall} from '../api/index'
import NoRecord from "../components/NoRecord";
import Loader from "../components/Loader";

const UserBlog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let userId = useParams().id


  useEffect(()=>{
    const fetchData = async () => {
      try {
        const apiData = await getBlogByUserApiCall(userId);
        setData(apiData.data.blogs);
        setLoading(false);
      } catch (error) {
        setError(error.data.message);
        setLoading(false);
      }
    };
    fetchData();
  },[])
  
  if (error) {
    return (
      <div className="mx-auto max-w-5xl mt-10 h-[60vh] px-2 sm:px-6 lg:px-8">
        {error}
      </div> 
    );
  }

  return (
    <>
      <UserProfileCard userData = {data.length>0 &&  data[0].user} postCount = {data.length} />
      <div className="mx-auto max-w-5xl mt-10 px-2 sm:px-6 lg:px-8">
      {loading && <Loader />}
      {!loading &&
        data &&
        data.map((blog, index) => <Blog blog={blog} key={index} />)}
      {!loading && !data && <NoRecord />}
      </div>
    </>
  );
};

export default UserBlog;
