import React from 'react'
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
const ChatButton = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/inbox')
  }
  return (

    <button
    type='button'
    onClick={handleClick}
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ml-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      <ChatBubbleLeftIcon className="w-6 h-5 mr-2" />
      Chat
    </button>
  );
}

export default ChatButton