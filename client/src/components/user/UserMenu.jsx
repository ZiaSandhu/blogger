import React, {useState, Fragment} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "../utils/Auth";
// import {  BellIcon } from "@heroicons/react/24/outline";
import {NavLink} from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react';
const User = () => {
const {user, isAuthenticated} = useAuth0()
return (
  <>
    {isAuthenticated && (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-900">
            <img
              className="h-8 w-8 rounded-full"
              src={user?.picture}
              alt="user"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="absolute right-0 z-10 mt-2 px-4 py-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <NavLink
                to="/userprofile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                User Profile
              </NavLink>
              {/* <NavLink to="/writeblog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
              Write blogs
              </NavLink> */}
              <NavLink
                to="/inbox"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                My Inbox
              </NavLink>
              <LogoutButton />
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    )}
  </>
);
}

export default User

