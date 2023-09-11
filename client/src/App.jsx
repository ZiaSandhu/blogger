import { BrowserRouter, Routes, Route } from "react-router-dom";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { Home, UserBlog, TagBlogs, MyBlogs, Chat } from "./pages/Index";
import {
  Navbar,
  BlogDetail,
  CreateBlog,
  Footer,
  ErrorPage,
  GoToTopButton,
  GoToBottom,
  UserProfile,
  EditBlog,
} from "./components";

function App() {
  const ProtectUserProfile = withAuthenticationRequired(UserProfile);
  const ProtectCreateBlog = withAuthenticationRequired(CreateBlog);
  const ProtectEditBlog = withAuthenticationRequired(EditBlog);
  const ProtectedMyBlog = withAuthenticationRequired(MyBlogs);
  const ProtectedInbox = withAuthenticationRequired(Chat);

  return (
    <div className=" relative box-border min-h-screen bg-gray-100 shadow-inner ">
      <BrowserRouter>
        <Navbar />
        <div className="min-h-[60vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/userprofile" element={<ProtectUserProfile />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/blogs/user/:id" element={<UserBlog />} />
            <Route path="/blogs/tag/:tag" element={<TagBlogs />} />
            <Route path="/myblogs" element={<ProtectedMyBlog />} />
            <Route path="/writeblog" element={<ProtectCreateBlog />} />
            {/* <Route path="/editblog" element={<ProtectEditBlog />} /> */}
            <Route path="/inbox" element={<ProtectedInbox />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </div>
        {/* <GoToTopButton /> */}
        {/* <GoToBottom /> */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
