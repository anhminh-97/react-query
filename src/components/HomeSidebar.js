import { message, Spin } from "antd";
import { getCommentByPostId } from "api/postAPI";
import { getInfoUser } from "features/auth/authSlice";
import useUserPosts from "hooks/useUserPosts";
import React from "react";
import { useQueries } from "react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTER } from "../constants";
import PostItem from "./PostItem";

const HomeSidebar = () => {
  const userInfo = useSelector(getInfoUser);
  const onError = (err) => {
    message.error("Lấy dữ liệu thất bại!");
  };
  const onSuccess = (res) => {
    if (res?.error) {
      message.error(res.error);
    }
  };
  const { data: userPosts, isLoading } = useUserPosts(onError, onSuccess);

  const postCommentList = useQueries(
    (userPosts || [])?.map((post) => {
      return {
        enabled: !!userPosts?.length,
        queryKey: ["postCommentList", post.PID],
        queryFn: () => getCommentByPostId(post.PID),
        onError: () => {
          message.error("Lấy dữ liệu thất bại!");
        },
      };
    })
  );

  return (
    <aside className="ass1-aside">
      <div className="ass1-content-head__t">
        <div>Bài viết gần đây của bạn.</div>
      </div>
      <>
        {isLoading ? (
          <div className="loading-component text-center">
            <Spin size="large" tip="Loading..." />
          </div>
        ) : userInfo?.USERID ? (
          userPosts?.length ? (
            userPosts.map((post, index) => (
              <PostItem
                key={post.PID}
                post={post}
                commentPost={postCommentList[index]?.data?.comments?.length}
              />
            ))
          ) : (
            <span>
              Bạn chưa có bài viết nào. Hãy thêm bài viết{" "}
              <Link to={ROUTER.Create}>tại đây</Link>
            </span>
          )
        ) : (
          <div>
            Vui lòng <Link to={ROUTER.Login}> Đăng Nhập</Link> để xem nội dung
            này.
          </div>
        )}
      </>
    </aside>
  );
};

export default HomeSidebar;
