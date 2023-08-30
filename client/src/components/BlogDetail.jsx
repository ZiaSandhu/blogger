import React from 'react'
import {NavLink} from 'react-router-dom'
import {HandThumbUpIcon, HandThumbDownIcon} from '@heroicons/react/24/outline'
import Comment from './Comment'
import thumbnail from '../assets/thumbnail1.png'
import HTMLReactParser from 'html-react-parser'
const blog = {
  thumbnail,
  readTime: 5,
  tag: "Javascript",
  title:
    "Javascript Dates – How to Use the DayJS Library to work with Date and Time in JS",
  user: {
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: 'Zia'
  },
  date: '2023-01-23',
  content: ""
};




const BlogDetail = () => {
  return (
    <div className="mx-auto max-w-4xl mt-10 bg-gray-50 p-5 ">
      <div className="h-auto p-6 ">
        <h1 className="text-4xl font-bold"> {blog.title} </h1>
        <p className="text-gray-400 my-7">
          Published on {blog.date}, Updated on {blog.date}
        </p>
        <p className="text-lg text-gray-700 bg-gray-300 py-1 px-2 inline rounded-lg ">
          {blog.tag}
        </p>
        <div className="flex items-center justify-between my-8">
          <div className="flex items-center">
            <NavLink to="/blog/user/1">
              <img
                src={blog.user.avatar}
                alt="User Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
            </NavLink>
            <NavLink to="/blog/user/1" className="text-gray-600">
              {blog.user.name}
            </NavLink>
          </div>
          <p className="text-gray-400">{blog.readTime} min read</p>
        </div>
        <img src={thumbnail} alt="" className="w-full aspect-h-9 mb-10" />
        {/* content */}
        <div>
          {HTMLReactParser('')}
        </div>
      </div>

      <hr className="my-10" />

      <div className="flex justify-center items-center px-6 py-6">
        <div>
          <h3 className="text-lg mr-5 text-gray-700 mb-3">
            Was this article helpful?
          </h3>
          <div className="flex item-center justify-center">
            <button className="text-gray-500 h-14 w-14 p-3 hover:text-green-500 transition-colors duration-300 border border-gray-300 rounded-full hover:bg-green-100">
              <HandThumbUpIcon />
            </button>

            <button className="text-gray-500 h-14 w-14 p-3 hover:text-red-500 transition-colors duration-300 border border-gray-300 rounded-full hover:bg-red-100 ml-2">
              <HandThumbDownIcon />
            </button>
          </div>
        </div>
      </div>

      {/* <hr className="my-10" /> */}
      <div className="my-10 flex items-center gap-x-4">
        <div className="h-px flex-auto bg-gray-300" />
        <h4 className="flex-none text-2xl font-semibold leading-6 text-blue-500">
          Comments
        </h4>
        <div className="h-px flex-auto bg-gray-300" />
      </div>
      <div className='flex flex-col gap-4'>
      <Comment />
      <Comment />
      </div>
    </div>
  );
}

export default BlogDetail