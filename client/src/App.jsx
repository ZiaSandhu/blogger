import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import Login from './pages/Login'
// import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Navbar from './components/Navbar';
import BlogDetail from './components/BlogDetail'
import CreateBlog from './components/CreateBlog';
import Footer from './components/Footer';
import UserBlog from './pages/UserBlog';
import ErrorPage from './components/ErrorPage';
import GoToTopButton from './components/GoToTopButton';
import GoToBottom from './components/GoToBottom';
function App() {

  // useEffect(() => {
  //   const handleScroll = () => {
  //     // Determine whether to show the "Go to Top" button
  //     if (window.scrollY > 100) { // Adjust the threshold as needed
  //       // setShowGoToTopButton(true);
  //     } else {
  //       // setShowGoToTopButton(false);
  //     }
  //   };

  //   // Attach the event listener when the component mounts
  //   window.addEventListener('scroll', handleScroll);

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);


  return (
    <div className="box-border min-h-screen bg-gray-100 shadow-inner ">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/blog/:id" element={<BlogDetail />} />
          {/* <Route path="/blog/user/:id" element={<UserBlog />} /> */}
          <Route path="/writeblog" element={<CreateBlog />} />
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
