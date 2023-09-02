import React, { useEffect } from "react";
import UserProfileCard from "../components/UserCard";
import Blog from "../components/Blog";
const UserBlog = () => {
  
  return (
    <>
      <UserProfileCard />
      <div className="mx-auto max-w-5xl mt-10 px-2 sm:px-6 lg:px-8">
        {Array.from({ length: 5 }).map((_, index) => (
          <Blog key={index} />
        ))}
      </div>
    </>
  );
};

export default UserBlog;
