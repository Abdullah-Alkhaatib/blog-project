import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import AdminDashBoard from "./pages/admin/AdminDashBoard";
import CreatePost from "./pages/create-post/CreatePost";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Regiser";
import PostPage from "./pages/posts-page/PostPage";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/posts/create-post" element={<CreatePost />} />
        <Route path="/admin-dashboard" element={<AdminDashBoard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
