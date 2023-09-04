import React, {useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "./Auth";
import {  BellIcon } from "@heroicons/react/24/outline";
import {NavLink} from 'react-router-dom'
const User = () => {
const [showUserMenu, setShowUserMenu] = useState(false)
const {user, isAuthenticated} = useAuth0()
return (
  <>
    {/* notification button todo implement functionality in future */}
    {isAuthenticated && (
      <>
        {/* <button
          type="button"
          className="relative rounded-full bg-transparent p-1 text-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </button> */}
        {/* user menu */}
        <div className="relative ml-3">
          <div>
            <div className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <button onClick={() => { setShowUserMenu(prev => !prev);}}>
                <img
                  className="h-8 w-8 rounded-full"
                  src={user?.picture}
                  alt="user"
                />
              </button>
            </div>
          </div>

          {showUserMenu && (
            <div className="absolute right-0 z-10 mt-2 px-4 py-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {/* <NavLink to="/userprofile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                User Profile
              </NavLink> */}
              <LogoutButton />
            </div>
          )}
        </div>
      </>
    )}
  </>
);
}

export default User