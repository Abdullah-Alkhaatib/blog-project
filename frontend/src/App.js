import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import AdminDashBoard from "./pages/admin/AdminDashBoard";
import CreatePost from "./pages/create-post/CreatePost";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Regiser";
import PostPage from "./pages/posts-page/PostPage";
import Footer from "./components/footer/Footer";
import PostDetails from "./pages/post-details/PostDetails";
import Category from "./pages/category/Category";
import Profile from "./pages/profile/Profile";
// import {toast, ToastContainer} from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Header />
      {/* <ToastContainer theme="light" position="top-right" /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<Profile />} />

        <Route path="/posts" element={<PostPage />} />
        <Route path="/posts/create-post" element={<CreatePost />} />
        <Route path="/posts/details/:id" element={<PostDetails />} />
        <Route path="/posts/categories/:category" element={<Category />} />

        <Route path="/admin-dashboard" element={<AdminDashBoard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
