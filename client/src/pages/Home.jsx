import React, { useEffect, useState } from "react";
import { getAllBlogsApiCall } from "../api";

import { Loader, NoRecord, Blog } from '../components'

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getAllBlogsApiCall();
        setData(apiData.data.blogs);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="mx-auto max-w-5xl mt-10 px-2 sm:px-6 lg:px-8">
        Something Went wrong. Plz try again.
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-5xl mt-10 px-2 sm:px-6 lg:px-8">
      {loading && <Loader />}
      {!loading &&
        data &&
        data.map((blog, index) => <Blog blog={blog} key={index} />)}
      {!loading && !data && <NoRecord />}
    </div>
  );
};

export default Home;
