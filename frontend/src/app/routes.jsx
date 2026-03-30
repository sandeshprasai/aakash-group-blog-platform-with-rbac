import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import PostList from "../features/posts/pages/PostList";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/posts" element={<PostList />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
