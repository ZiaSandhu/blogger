import React from 'react';


function TagCard({tag, postCount}) {

  return (
    <div className="w-full bg-gray-300 shadow">
      <div className="bg-gray-300 max-w-md  p-6 mx-auto">
        <h2 className="text-5xl font-semibold text-center capitalize">{tag}</h2>
        <p className=" text-2xl text-gray-700 text-center mt-4">A collection of {postCount} posts</p>
      </div>
    </div>
  );
}

export default TagCard;
