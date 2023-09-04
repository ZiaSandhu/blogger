import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar';
import BlogDetail from './components/BlogDetail'
import CreateBlog from './components/CreateBlog';
import Footer from './components/Footer';
import UserBlog from './pages/UserBlog';
import ErrorPage from './components/ErrorPage';
import GoToTopButton from './components/GoToTopButton';
import GoToBottom from './components/GoToBottom';
import UserProfile from './components/UserProfile';
import Test from './pages/Test'
import { withAuthenticationRequired } from '@auth0/auth0-react';
// import { useEffect } from 'react';
import axios from 'axios';

function App() {

  const ProtectUserProfile = withAuthenticationRequired(UserProfile)
  const ProtectCreateBlog = withAuthenticationRequired(CreateBlog)

  return (
    <div className=" relative box-border min-h-screen bg-gray-100 shadow-inner ">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/userprofile" element={<ProtectUserProfile />} /> */}
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/blogs/user/:id" element={<UserBlog />} />
          <Route path="/writeblog" element={<ProtectCreateBlog />} />
          {/* <Route path="/test" element={<Test />} /> */}
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <GoToTopButton />
        <GoToBottom />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App
