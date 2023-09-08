import React, { useState, useEffect } from 'react';
import { FaArrowDown } from 'react-icons/fa'; // You can use an arrow-up icon from a library like react-icons

function GoToTopButton() {
  const [showButton, setShowButton] = useState(false);

  function isAtBottom() {
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );

    // Get the height of the viewport
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    // Check if the user is at the bottom
    const isAtBottom = window.scrollY + viewportHeight >= documentHeight;

    // Check if the document is taller than the viewport and the user is not at the bottom
    if (documentHeight > viewportHeight && !isAtBottom) {
      return true
    }
    else{
      return false
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (isAtBottom()) {
        setShowButton(true);
      }
      else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll,{passive: true});

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
      timingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 0.2)'
    });
  };

  return (
    <button
      className={`fixed bottom-5 right-5 p-3 bg-gray-200 text-gray-900 rounded-full transition-opacity duration-300 ${
        showButton ? 'inline' : 'hidden'
      }`}
      onClick={scrollToBottom}
    >
      <FaArrowDown className="w-5 h-5" />
    </button>
  );
}

export default GoToTopButton;
