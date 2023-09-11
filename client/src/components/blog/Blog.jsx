import React from 'react'
import {NavLink} from 'react-router-dom'


const Blog = ({blog={}}) => {
  return (
    <div className="bg-white p-2 h-auto mt-8 rounded shadow lg:flex sm:block items-center">
      {/* Image on the right */}
      <div className="lg:w-1/3 sm:w-full">
        <NavLink to={`/blog/${blog._id}`}>
          <img
            src={blog.thumbnail}
            alt="Image"
            className="w-full aspect-video rounded"
            loading="lazy"
          />
        </NavLink>
      </div>

      {/* Content on the left */}
      <div className="lg:w-2/3 sm:f-full p-4">
        {/* Header content */}
        <div className="mb-16">
          <div className="flex justify-between items-center">
            {/* todo click on tag to display blog of that tags */}
            <NavLink
              to={`/blogs/tag/${blog.tag}`}
              className="text-blue-500 font-semibold hover:underline"
            >
              #{blog.tag}
            </NavLink>
            <p className="text-gray-400">{blog.readTime} min read </p>
          </div>
          <NavLink
            to={`/blog/${blog._id}`}
            className="text-2xl font-bold mt-2 hover:underline"
          >
            {blog.title}
          </NavLink>
        </div>

        {/* Footer content */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <NavLink to={`/blogs/user/${blog.user.sub}`}>
              <img
                src={blog.user.picture}
                alt="User Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
            </NavLink>
            <NavLink
              to={`/blogs/user/${blog.user.sub}`}
              className="text-gray-600"
            >
              {blog.user.name}
            </NavLink>
          </div>
          <p className="text-gray-400">{blog.createdAt.split('T')[0]} </p>
        </div>
      </div>
    </div>
  );
}

export default Blog