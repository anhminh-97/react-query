import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTER } from "constants/index";
import Masonry from "react-masonry-component";
import PostItem from "components/PostItem";

const UserDetailPost = ({ userDetailPosts }) => {
  const token = useSelector((state) => state.auth);
  return (
    <>
      {!token ? (
        <p className="text-center my-5">
          <Link to={ROUTER.Login}>Đăng nhập</Link> để xem bài viết.
        </p>
      ) : (
        <Masonry className="ass1-section__wrap row ass1-section__isotope-init">
          {userDetailPosts?.length ? (
            userDetailPosts.map((post) => (
              <PostItem key={post.PID} post={post} className="col-lg-6" />
            ))
          ) : (
            <span className="text-center my-5">
              Bạn chưa có bài viết nào. Hãy thêm bài viết{" "}
              <Link to={ROUTER.Create}>tại đây</Link>
            </span>
          )}
        </Masonry>
      )}
    </>
  );
};

export default UserDetailPost;
