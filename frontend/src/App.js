import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
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
import UsersTable from "./pages/admin/UsersTable";
import PostsTable from "./pages/admin/PostsTable";
import CategoriesTable from "./pages/admin/CategoriesTable";
import CommentsTable from "./pages/admin/CommentsTable";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import NotFound from "./pages/not-found/NotFound";
import { ToastContainer} from "react-toastify";
import { useSelector } from "react-redux";
import VerifyEmail from "./pages/verify-email/verifyEmail";
import {Toaster} from "react-hot-toast";

function App() {

  const { user } = useSelector(state => state.auth);

  return (
    <BrowserRouter>
      <Header />

      <ToastContainer theme="light" position="top-center" autoClose={2000} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        
        <Route path="/users/:userId/verify/:token" element={!user ? <VerifyEmail /> : <Navigate to="/" />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />

        <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="/" />} />

        <Route path="/posts" element={<PostPage />} />
        <Route path="/posts/create-post" element={user ? <CreatePost /> : <Navigate to="/login" />} />
        <Route path="/posts/details/:id" element={<PostDetails />} />
        <Route path="/posts/categories/:category" element={<Category />} />

        <Route path="/admin-dashboard" element={user?.isAdmin ? <AdminDashBoard /> : <Navigate to="/" />} />
        <Route path="/admin-dashboard/users-table" element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />} />
        <Route path="/admin-dashboard/posts-table" element={user?.isAdmin ? <PostsTable /> : <Navigate to="/" />} />
        <Route path="/admin-dashboard/categories-table" element={user?.isAdmin ? <CategoriesTable /> : <Navigate to="/" />} />
        <Route path="/admin-dashboard/comments-table" element={user?.isAdmin ? <CommentsTable /> : <Navigate to="/" />} />

        <Route path="*" element={<NotFound />} /> {/* اذا كل الراوتس اللي فوق ما اشتغلوا بشتغل هاض ولازم تكون اخر راوت*/}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
