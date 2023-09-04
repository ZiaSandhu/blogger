import React, { useState } from 'react';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { FaceSmileIcon } from '@heroicons/react/24/outline';
import { useAuth0 } from "@auth0/auth0-react";

import { addReplyApiCall } from '../api';

const ReplyForm = ({mainComment, parentComment,fetchData}) => {
  const [content, setComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false );
  const {user,isAuthenticated, getAccessTokenSilently} = useAuth0()
  const addEmoji = (e) => {
    console.log(e.unified)
    // let array =n []
    const sym = e.unified.split('-')
    let codeArray = []
    sym.forEach(el => codeArray.push('0x'+el))
    const emoji = String.fromCodePoint(...codeArray)
    console.log(codeArray)
    setComment(content + emoji)

  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (content.trim() === "") return;
    // Reset the form

    let reply = {
      content,
      user,
      mainComment,
      parentComment
    }
    try {
      let token = await getAccessTokenSilently()
       await addReplyApiCall(reply, token)
       await fetchData();
    } catch (error) {
    }
    setComment("");
   };

  return (
    <div className="">
      {isAuthenticated ? <form onSubmit={handleSubmit} className="flex gap-3 items-end">
        <div className="relative flex items-end p-2 w-full bg-gray-200 rounded-md">
          <textarea
            className="w-full resize-none outline-none border-none bg-transparent focus:border-none focus:outline-none focus:ring-0"
            placeholder="Write a comment..."
            value={content}
            cols={30}
            rows={1}
            onChange={(e) => setComment(e.target.value)}
          />
          <span
            className="h-6 w-6 cursor-pointer"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <FaceSmileIcon />
          </span>
          {showEmojiPicker && (
            <div className="absolute top-[90%] right-0">
              <Picker
                data={data}
                onEmojiSelect={addEmoji}
                maxFrequentRows={0}
                // onClickOutside={() => setShowEmojiPicker(!showEmojiPicker)}
              />
            </div>
          )}
        </div>
        <button
          className="w-1-4 bg-blue-500 px-5 py-3 mr-2 h-[50%] rounded-md "
          type="submit"
        >
          Reply
        </button>
      </form> : 
      <p className='text-left font-normal text-gray-700' >Loign to Comment</p>
      }
    </div>
  );
};

export default ReplyForm;
