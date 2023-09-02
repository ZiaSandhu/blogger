// GoToTopButton.js
import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // You can use an arrow-up icon from a library like react-icons

function GoToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`fixed bottom-20 right-5 p-3 bg-gray-200 text-gray-900 rounded-full transition-opacity duration-300 ${
        showButton ? 'inline' : 'hidden'
      }`}
      onClick={scrollToTop}
    >
      <FaArrowUp className="w-5 h-5" />
    </button>
  );
}

export default GoToTopButton;
