import React from 'react'
import {NavLink} from 'react-router-dom'

import thumbnail from '../assets/thumbnail1.png'

const Blog = ({blog={}}) => {
  // todo implement correct links now dummy
  return (
    <div className="bg-white p-2 h-auto mt-8 rounded shadow lg:flex sm:block items-center">
      {/* Image on the right */}
      <div className="lg:w-1/3 sm:w-full">
        <NavLink to={`/blog/${blog._id}`}>
          <img
            src={blog.thumbnail}
            alt="Image"
            className="w-full h-auto rounded"
          />
        </NavLink>
      </div>

      {/* Content on the left */}
      <div className="lg:w-2/3 sm:f-full p-4">
        {/* Header content */}
        <div className="mb-16">
          <div className="flex justify-between items-center">
            {/* todo click on tag to display blog of that tags */}
            <NavLink to="/tag/1" className="text-blue-500 font-semibold">
              #{blog.tag}
            </NavLink>
            <p className="text-gray-400">{blog.readTime} min read </p>
          </div>
          <NavLink to={`/blog/${blog._id}`} className="text-2xl font-bold mt-2 hover:underline">
            {blog.title}
          </NavLink>
        </div>

        {/* Footer content */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <NavLink to="/blog/user/1">
              <img
                src={blog.user.picture}
                alt="User Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
            </NavLink>
            <NavLink to="/blog/user/1" className="text-gray-600">
              {blog.user.nickname}
            </NavLink>
          </div>
          <p className="text-gray-400">{blog.publishedAt.split('T')[0]} </p>
        </div>
      </div>
    </div>
  );
}

export default Blog