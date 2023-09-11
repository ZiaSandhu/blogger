import React, { useEffect, useState } from 'react';

import SingleComment from './SingleComment';
import CommentForm from './CommentForm';

import {  getCommentsApiCall } from "../../api";

const Comment = ({blogId}) => {
  const [data,setComment] = useState([])
  const fetchData = async () => {
    try {
      const comments = await getCommentsApiCall(blogId)
      setComment(comments.data.comments)
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div className='flex flex-col gap-6'>
      <CommentForm fetchData={fetchData} blogId={blogId} />
      {data.map((comment,index) => (<div
        key={index}
        className="p-5 bg-white  rounded-2xl border-2 border-stone-400 "
      >
        <SingleComment fetchData={fetchData} mainComment={comment._id} comment={comment} />
      </div>)
      )}
    </div>
  );
};

export default Comment;