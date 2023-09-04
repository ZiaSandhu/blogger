import React, { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { testingProtectedRoute } from '../api';
import axios from 'axios';
export const LoginButton = () => {
  const {loginWithRedirect, isAuthenticated, isLoading} = useAuth0()

  return (
    <>
      {!isLoading && !isAuthenticated && (
        <button
          onClick={loginWithRedirect}
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

  const logoutWithRedirect = () =>
    logout({
        logoutParams: {
          returnTo: window.location.origin,
        }
    });

  return (
    <button
      onClick={logoutWithRedirect}
      className="block px-4 w-full text-left py-2 text-sm text-gray-700 hover:bg-gray-200"
    >
      Logout
    </button>
  );
}

export const TestButton = () => {
  const {getAccessTokenSilently} = useAuth0()

  const testing = async () => {
    let response
    try {
      let token = await getAccessTokenSilently()
      console.log("🚀 ~ file: Auth.jsx:43 ~ testing ~ token:", token)
      response = await testingProtectedRoute(token)
    } catch (error) {
      response = error
    }
    console.log("🚀 ~ file: Auth.jsx:40 ~ testing ~ response:", response)
  }

  return (
    <>
      <button
        className="block px-4 w-full text-left py-2 text-sm text-gray-700 hover:bg-gray-200"
        onClick={testing}
      >
        Test Route
      </button>
    </>
  );

}



