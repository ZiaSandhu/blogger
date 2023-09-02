import React, {useState} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "./Auth";
import {  BellIcon } from "@heroicons/react/24/outline";

const User = () => {
const [showUserMenu, setShowUserMenu] = useState(false)
const {user, isAuthenticated} = useAuth0()
return (
  <>
    {/* notification button todo implement functionality in future */}
    {isAuthenticated && (
      <>
        <button
          type="button"
          className="relative rounded-full bg-transparent p-1 text-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </button>
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
            <div className="absolute right-0 z-10 mt-2 w-auto origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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