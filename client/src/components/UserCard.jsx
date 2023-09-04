import React from 'react';
// import { useAuth0 } from "@auth0/auth0-react";





function UserProfileCard({userData, postCount}) {

  return (
    <div className="w-full bg-gray-300 shadow">
      <div className="bg-gray-300 max-w-md  p-6 mx-auto">
        <img
          src={userData.picture}
          alt="userData"
          className="h-24 w-24 rounded-full mx-auto mb-3"
        />
        <h2 className="text-xl font-semibold text-center">{userData.name}</h2>
        <p className="text-gray-600 text-center mb-4">{userData.bio ? userData.bio : "404 Bio Not Found"}</p>
        <div className="text-center flex justify-center items-center gap-3">
          {/* <p className="text-gray-700">{userData.country}</p> */}
          {/* <span className='h-2 w-2 mt-2 bg-gray-600 rounded-full'></span> */}
          <p className="text-gray-700">{postCount} posts</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;
