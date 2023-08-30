import React, { useState } from 'react';
import {ChevronUpIcon, ChevronDownIcon} from '@heroicons/react/24/outline'
const Comment = () => {
  const [showReplies, setShowReplies] = useState(true);
  const [arrowUp, setArrowUp] = useState(true);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
    setArrowUp(prev => !prev);
  };

  return (
    <div className="p-5 bg-white  rounded-2xl border-2 border-stone-400 ">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-indigo-600">John Doe</p>
            <p className="text-gray-400 ml-2">August 29, 2023</p>
          </div>
          <button className="h-4 w-4" onClick={toggleReplies}>
            {arrowUp ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </button>
        </div>
        <p className="mt-2">
          This is a great article! I learned so much from it. Looking forward to
          more content like this.
        </p>
        <button className="mt-2 text-gray-500 inline-flex items-center">
          View Replies
        </button>
        <span className="mx-4"></span>
        <button className="mt-2 text-gray-500">Reply</button>
      </div>
      <div className=" border-l-4 text-gray-800 pl-4 mt-3 flex flex-col gap-4 ">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-indigo-600">John Doe</p>
              <p className="text-gray-400 ml-2">August 29, 2023</p>
            </div>
            <button className="h-4 w-4" onClick={toggleReplies}>
              {arrowUp ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </button>
          </div>
          <p className="mt-2">
            This is a great article! I learned so much from it. Looking forward
            to more content like this.
          </p>
          <button className="mt-2 text-gray-500 inline-flex items-center">
            View Replies
          </button>
          <span className="mx-4"></span>
          <button className="mt-2 text-gray-500">Reply</button>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <p className="text-indigo-600">John Doe</p>
              <p className="text-gray-400 ml-2">August 29, 2023</p>
            </div>
            <button className="h-4 w-4" onClick={toggleReplies}>
              {arrowUp ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </button>
          </div>
          <p className="mt-2">
            This is a great article! I learned so much from it. Looking forward
            to more content like this.
          </p>
          <button className="mt-2 text-gray-500 inline-flex items-center">
            View Replies
          </button>
          <span className="mx-4"></span>
          <button className="mt-2 text-gray-500">Reply</button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
