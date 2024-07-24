import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/Root";
import Home from "./routes/Home";
import Blogs from "./routes/Blogs";
import Login from "./routes/Auth/Login";
import Signup from "./routes/Auth/Signup";
import NewPost from "./routes/NewPost";
import EditSinglePost, {
  loader as postInfoLoader,
} from "./routes/EditSinglePost";
import PostByCategory, {
  loader as postByCategoryLoader,
} from "./routes/PostByCategory";
import SinglePost, { loader as singlePostLoder } from "./routes/SinglePost";
import UserProfile, { loader as userProfileLoader } from "./routes/UserProfile";
import PriavteRoute from "./routes/Auth/PriavteRoute";
import Error from "./routes/Error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<Error/>}>
      {/* public routes */}
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="blogs" element={<Blogs />} />
      <Route
        path="post/:slug"
        element={<SinglePost />}
        loader={singlePostLoder}
      />
      <Route
        path="author/:username/profile"
        element={<UserProfile />}
        loader={userProfileLoader}
      />
      <Route
        path="posts/:category"
        element={<PostByCategory />}
        loader={postByCategoryLoader}
      />

      {/* protected routes  */}

      <Route element={<PriavteRoute />}>
        <Route path="add-post" element={<NewPost />} />
        <Route
          path="post/edit/:postId"
          element={<EditSinglePost />}
          loader={postInfoLoader}
        />
      </Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
