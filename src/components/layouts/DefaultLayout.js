import { getUserById } from "api/userAPI";
import Footer from "components/layouts/footer/Footer";
import Header from "components/layouts/header/Header";
import LoadingComponent from "components/LoadingComponent";
import { updateUser, updateToken } from "features/auth/authSlice";
import { parseJwt } from "helpers";
import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

const Home = React.lazy(() => import("pages/home/Home"));
const PostCategories = React.lazy(() => import("pages/posts/categories/PostCategories"));
const PostDetail = React.lazy(() => import("pages/posts/PostDetail"));
const PostCreate = React.lazy(() => import("pages/posts/PostCreate"));
// const PostEdit = React.lazy(() => import("pages/posts/PostEdit"));
const UserDetail = React.lazy(() => import("pages/users/UserDetail"));
const Profile = React.lazy(() => import("pages/users/Profile"));
const Password = React.lazy(() => import("pages/users/Password"));
const Search = React.lazy(() => import("pages/Search"));

const DefaultLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage?.token && JSON.parse(localStorage.token)) {
      const userToken = parseJwt(
        localStorage?.token && JSON.parse(localStorage.token)
      );
      getUserById(userToken?.id).then((res) => dispatch(updateUser(res?.user)));
      dispatch(
        updateToken(localStorage?.token && JSON.parse(localStorage.token))
      );
    }
  }, [dispatch]);
  
  return (
    <div>
      <Header />
      <Suspense fallback={<LoadingComponent />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts/add" component={PostCreate} />
          <Route exact path="/posts/:id" component={PostDetail} />
          <Route exact path="/users/password" component={Password} />
          <Route exact path="/users/profile" component={Profile} />
          <Route exact path="/users/:id" component={UserDetail} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/categories/:id" component={PostCategories} />
          {/* <Route exact path="/posts/:id/edit" component={PostEdit} /> */}
        </Switch>
      </Suspense>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
