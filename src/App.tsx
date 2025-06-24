import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import ReactQueryProvider from "./app/ReactQueryProvider";
import ReduxProvider from "./app/ReduxProvider";
import ForgotPassword from "./routes/Auth/ForgotPassword";
const Root = lazy(() => import("./routes/Root"));
const Login = lazy(() => import("./routes/Auth/Login"));
const PriavteRoute = lazy(() => import("./routes/Auth/PriavteRoute"));
const Signup = lazy(() => import("./routes/Auth/Signup"));
const Blogs = lazy(() => import("./routes/Blogs"));
const EditSinglePost = lazy(() => import("./routes/EditSinglePost"));
const ErrorElement = lazy(() => import("./routes/Error"));
const Home = lazy(() => import("./routes/Home"));
const NewPost = lazy(() => import("./routes/NewPost"));
const PostByCategory = lazy(() => import("./routes/PostByCategory"));

const SinglePost = lazy(() => import("./routes/SinglePost"));
const UserProfile = lazy(() => import("./routes/UserProfile"));

const App = () => {
  return (
    <ReactQueryProvider>
      <ReduxProvider>
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<Root />} >
              {/* public routes */}

              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="post/:slug" element={<SinglePost />} />
              <Route
                path="author/:username/profile"
                element={<UserProfile />}
              />
              <Route path="posts/:category" element={<PostByCategory />} />

              {/* protected routes  */}

              <Route element={<PriavteRoute />}>
                <Route path="add-post" element={<NewPost />} />
                <Route path="post/edit/:postId" element={<EditSinglePost />} />
              </Route>

              <Route path="*" element={<ErrorElement/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ReduxProvider>
    </ReactQueryProvider>
  );
};

export default App;
