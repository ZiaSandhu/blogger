import React, { useState } from "react";

import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

import ReplyForm from "./ReplyForm";


const SingleComment = ({comment, mainComment,fetchData}) => {
  console.log("🚀 ~ file: SingleComment.jsx:9 ~ SingleComment ~ comment:", comment)
  const [showReplies, setShowReplies] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false)
  const toggleReplies = () => {
    setShowReplies(!showReplies);
    setIsExpand((prev) => !prev);
  };
let trimContent
  if(comment.content.length < 95){
    trimContent = comment.content
  }
  else{
     trimContent = !isExpand
      ? comment.content.substring(0, 95) + " ..."
      : comment.content; 
  }
  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-indigo-600"> {comment.user.name} </p>
            <p className="text-gray-400 ml-2"> {comment.createdAt.split('T')[0]} </p>
          </div>
          <button className="h-4 w-4" onClick={toggleReplies}>
            {isExpand ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>
        </div>
        <p className="mt-2 pr-6">{trimContent}</p>
        <button className={`mt-2 text-gray-500 inline-flex items-center ${ !comment.replies?.length > 0 && 'hidden' }`} onClick={toggleReplies}>
          {showReplies ? 'Hide Replies' : 'Show Replies' }
        <span className="mx-4"></span>
        </button>
        <button className="mt-2 text-gray-500" onClick={()=>setShowReplyForm(prev => !prev)}>Reply</button>
      </div>
        {showReplyForm && <div className="w-full px-5">
          <ReplyForm fetchData={fetchData} mainComment={mainComment} parentComment={comment._id}  rows={1} />
        </div>}
      {comment.replies?.length > 0 && (
        <div className={`border-l-4   text-gray-800 pl-4 mt-3 flex flex-col gap-2 ${ !showReplies && 'hidden' }`}>
          {comment.replies.map((reply,index) => (
            <SingleComment key={index} mainComment={mainComment} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleComment;
