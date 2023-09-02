import React, { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from 'react-redux';
// import {loginUser, logoutUser} from '../store/userSlice'

export const LoginButton = () => {
  const {loginWithPopup, isAuthenticated, isLoading} = useAuth0()

  return (
    <>
      {!isLoading && !isAuthenticated && (
        <button
          onClick={loginWithPopup}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Login
        </button>
      )}
    </>
  );
}
export const LogoutButton = () => {
  // const dispatch = useDispatch()
  const { logout } = useAuth0();

  return (
    <button
      onClick={logout}
      className="block px-4 w-full text-left py-2 text-sm text-gray-700 hover:bg-gray-200"
    >
      Logout
    </button>
  );
}



