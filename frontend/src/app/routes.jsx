import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import PostList from "../features/posts/pages/PostList";
import CreatePost from "../features/posts/pages/createPost";
import MyPosts from "../features/posts/pages/MyPost";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="*" element={<Navigate replace to="/login" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/posts" element={<PostList />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/my-posts" element={<MyPosts />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
