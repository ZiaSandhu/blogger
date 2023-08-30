import React from 'react';
import { NavLink } from 'react-router-dom';
import { TiSocialLinkedin, TiSocialTwitter } from "react-icons/ti";
const user = {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    name: 'John Doe',
    bio: "I'm a teacher and developer with freeCodeCamp.org. I run the freeCodeCamp.org YouTube channel.",
    country: 'United States',
    totalPosts: 25,
    socialLinks: {
      twitter: 'https://twitter.com/johndoe',
      linkedin: 'https://instagram.com/johndoe'
    },
  };
  
function UserProfileCard() {
  return (
    <div className="w-full bg-gray-300 shadow">
      <div className="bg-gray-300 max-w-md  p-6 mx-auto">
        <img
          src={user.image}
          alt="User"
          className="h-24 w-24 rounded-full mx-auto mb-3"
        />
        <h2 className="text-xl font-semibold text-center">{user.name}</h2>
        <p className="text-gray-600 text-center mb-4">{user.bio}</p>
        <div className="text-center flex justify-center items-center gap-3">
          <p className="text-gray-700">{user.country}</p>
          <p className="text-gray-700">{user.totalPosts} posts</p>
          {/* <div className="mt-4 flex justify-center items-center gap-4 h-full"> */}
          <NavLink to={user.socialLinks.linkedin} className="">
            <TiSocialLinkedin className="h-4 w-4" />
          </NavLink>
          <NavLink to={user.socialLinks.twitter} className="">
            <TiSocialTwitter className="h-4 w-4" />
          </NavLink>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;
