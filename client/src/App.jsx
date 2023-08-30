import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar';
import BlogDetail from './components/BlogDetail'
import CreateBlog from './components/CreateBlog';
import Footer from './components/Footer';
import UserBlog from './pages/UserBlog';
function App() {
  const clientId = import.meta.env.REACT_APP_CLIENTID
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="box-border min-h-screen bg-gray-100 shadow-inner ">
        <BrowserRouter>
          <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/blog/user/:id" element={<UserBlog />} />
              <Route path="/writeblog" element={<CreateBlog />} />
            </Routes>
            <Footer />
        </BrowserRouter>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App
