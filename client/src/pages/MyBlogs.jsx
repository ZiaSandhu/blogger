import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getBlogByUserApiCall, deleteBlogApiCall } from "../api/index";
import { PencilIcon,TrashIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";


import {UserCard, Blog, NoRecord, Loader, DeleteModal} from "../components"


const UserBlog = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [blogId, setBlogId] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getBlogByUserApiCall(user.sub);
        setData(apiData.data.blogs);
        setLoading(false);
      } catch (error) {
        setError(error.data.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = async (blog) => {
    navigate(`/editblog`, { state: { blog } });
  };

  const handleDelete = async (blogId) => {
    try {
      let token = await getAccessTokenSilently();
      await deleteBlogApiCall(blogId, token);
      setData(data.filter((blog) => blog._id !== blogId));
    } catch (error) {
      setError(error.data.message)
    }
    setBlogId(null)
    setShowDeleteModel(false)
  };

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-5xl mt-10 h-[60vh] px-2 sm:px-6 lg:px-8">
        {error}
      </div> 
    );
  }

  return (
    <>
      {isAuthenticated && (
        <>
          <UserCard userData={user} postCount={data.length} />
          <div className="mx-auto relative max-w-5xl mt-16 px-2 sm:px-6 lg:px-8">
            {data?.length > 0 ? (
              data.map((blog, index) => (
                <div key={index} className=" mt-16 relative">
                  <Blog blog={blog} key={index} />
                  <div className="absolute flex mt-2 right-0 mr-0">
                    {/* <button
                      onClick={() => handleEdit(blog)}
                      className="px-3 py-1 flex gap-2 items-center justify-between bg-blue-500 hover:bg-blue-600 text-white rounded-md mr-2"
                    >
                      <PencilIcon className="h-4 w-4" /> Edit
                    </button> */}
                    <button
                      onClick={() => {
                        setBlogId(blog._id),
                        setShowDeleteModel(true)
                      }}
                      className="px-3 py-1 flex gap-2 items-center justify-between bg-red-500 hover:bg-red-600 text-white rounded-md"
                    >
                      <TrashIcon className="h-4 w-4" /> Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <NoRecord />
            )}
          </div>
          {showDeleteModel && (
            <DeleteModal
              open={showDeleteModel}
              setOpen={setShowDeleteModel}
              onDeleteHandle={handleDelete}
              blogId={blogId}
              setBlogId={blogId}
            />
          )}
        </>
      )}
    </>
  );
};

export default UserBlog;
