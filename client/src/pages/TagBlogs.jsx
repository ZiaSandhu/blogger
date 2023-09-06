import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {getBlogByTagApiCall} from '../api/index'

import {Blog, NoRecord, Loader, TagCard} from '../components'

const UserBlog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let tag = useParams().tag


  useEffect(()=>{

    const fetchData = async () => {
      try {
        const apiData = await getBlogByTagApiCall(tag);
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
    <TagCard tag={tag} postCount={data.length} />
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
