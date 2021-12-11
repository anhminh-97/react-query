import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { useQuery } from "react-query";

import { ROUTER } from "../constants";
import PostItem from "./PostItem";
import { getInfoUser } from "features/auth/authSlice";
import { getPostsByUserId } from "api/postAPI";

const HomeSidebar = () => {
  const userInfo = useSelector(getInfoUser);
  const { data: userPosts, isLoading } = useQuery(
    ["userPosts", userInfo?.USERID],
    () => getPostsByUserId(userInfo?.USERID),
    {
      enabled: !!userInfo?.USERID,
      refetchOnWindowFocus: false,
      select: (value) => {
        const formatData = value?.posts;
        return formatData;
      },
    }
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
            userPosts.map((post) => <PostItem key={post.PID} post={post} />)
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
