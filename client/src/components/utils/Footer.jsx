import React from 'react'
import logo from '../../assets/blogger_logo.png'
const Footer = () => {
    const currentYear = new Date().getFullYear()
  return (
    <footer className=" mt-10 text-sm text-center bg-transparent mx-auto text-gray-500 py-10 bottom-0 left-0 right-0">
        <img className="w-30 h-14 mx-auto" src={logo} alt="" />
        <p>&copy; {currentYear} Blogger. All rights reserved.</p>
    </footer>
  );
}

export default Footer