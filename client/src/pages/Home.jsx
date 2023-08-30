import React from 'react'
import Blog from '../components/Blog'
const Home = () => {
  return (
    <div className="mx-auto max-w-5xl mt-10 px-2 sm:px-6 lg:px-8">
       {Array.from({ length: 5 }).map((_, index) => (
        <Blog key={index} />
      ))}
    </div>
  );
}

export default Home