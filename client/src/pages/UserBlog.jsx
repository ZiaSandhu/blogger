import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {getBlogByUserApiCall, getCategoriesApiCall} from '../api/index'

import {Blog, NoRecord, Loader, UserCard, FilterButton} from '../components'
// import {FilterButton} from "../components";


const UserBlog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [categories, setCategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [filterData, setFilterData] = useState([]);

  let userId = useParams().id;

  // useEffect(() => {
  //   if (selectedCategory !== "All Categories") {
  //     let filterBlog = data.filter((blog) => {
  //       return (
  //         blog.category === selectedCategory ||
  //         blog.subCategory === selectedCategory
  //       );
  //     });
  //     setFilterData(filterBlog);
  //   } else {
  //     setFilterData(data);
  //   }
  // }, [selectedCategory]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getBlogByUserApiCall(userId);
        const response = await getCategoriesApiCall();
        setCategories(response.data.categories);
        setData(apiData.data.blogs);
        setFilterData(apiData.data.blogs);
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
      <div className="mx-auto max-w-5xl mt-10 h-[60vh] px-2 sm:px-6 lg:px-8">
        {error}
      </div>
    );
  }

  return (
    <>
      <UserCard
        userData={data.length > 0 && data[0].user}
        postCount={data.length}
      />
      <div className="mx-auto max-w-6xl mt-10 px-2 sm:px-6 lg:px-8">
        {loading && <Loader />}
        {!loading && data.length > 0 && (
          <div className="relative">
            {/* <div className="flex flex-row-reverse">
              <FilterButton
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div> */}
            {filterData.map((blog, index) => (
              <Blog blog={blog} key={index} />
            ))}
          </div>
        )}
        {!loading && filterData.length <= 0 && <NoRecord />}
      </div>
    </>
  );
};

export default UserBlog;
