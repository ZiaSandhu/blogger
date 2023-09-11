import React, { useEffect, useState, Fragment } from "react";
import { getAllBlogsApiCall, getCategoriesApiCall } from "../api";
import {  FunnelIcon } from '@heroicons/react/20/solid'

import { Loader, NoRecord, Blog, DesktopFilter, MobileFilter, SearchBar } from '../components'

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [filterData, setFilterData] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
useEffect(() => {
  if (selectedCategory !== "All Categories") {
    let filterBlog = data.filter((blog) => {
      return (
        blog.category === selectedCategory ||
        blog.subCategory === selectedCategory
      );
    });
    setFilterData(filterBlog);
  }
  else{
    setFilterData(data)
  }
}, [selectedCategory]);

useEffect(() => {
  if (searchQuery.trim() !== "") {
    
    let filterBlog = data.filter((blog) => {
      const lowercaseTitle = blog.title.toLowerCase();
    // const lowercaseContent = blog.
    // content;
    const lowercaseTags = blog.tag.toLowerCase();

    return (
      lowercaseTitle.includes(searchQuery) ||
      // lowercaseContent.includes(searchQuery) ||
      lowercaseTags.includes(searchQuery)
    );
    });
    setFilterData(filterBlog);
  }
  else{
    setFilterData(data)
  }
}, [searchQuery]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getAllBlogsApiCall();
        const response = await getCategoriesApiCall();
        setCategories(response.data.categories)
        setData(apiData.data.blogs);
        setFilterData(apiData.data.blogs)
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
    <div>
      {loading && <Loader />}

      {!loading && (
        <div className="bg-white">
          <div>
            {/* Mobile filter dialog */}
            <MobileFilter
              categories={categories}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
              mobileFiltersOpen={mobileFiltersOpen}
              setMobileFiltersOpen={setMobileFiltersOpen}
            />

            <main className="mx-auto max-w-7xl pt-10 px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-5xl">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              </div>
              <div className="flex items-baseline justify-between border-b border-gray-200 pt-10">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Blogs
                </h1>

                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pb-24"
              >
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}
                  <div className="col-span-1 mt-6 static">
                    <DesktopFilter
                      categories={categories}
                      setSelectedCategory={setSelectedCategory}
                      selectedCategory={selectedCategory}
                    />
                  </div>

                  <div className="col-span-3">
                    {filterData.length > 0 &&
                      filterData.map((blog, index) => (
                        <Blog blog={blog} key={index} />
                      ))}
                    {!loading && filterData.length <= 0 && (
                      <div className="pt-10">
                        <NoRecord />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
