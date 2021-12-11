import { getUserById } from "api/userAPI";
import { message } from "antd";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import UserDetailInfo from "./components/UserDetailInfo";
import UserDetailPosts from "./components/UserDetailPosts";
import { getPostsByUserId } from "api/postAPI";

const UserDetail = () => {
  const { id } = useParams();
  const { data: userDetailInfo } = useQuery(
    ["userDetailInfo", id],
    () => getUserById(id),
    {
      refetchOnWindowFocus: false,
      onError: () => message.error("Lấy dữ liệu thất bại!"),
      onSuccess: (res) => {
        if (res?.error) {
          message.error(res?.error);
        }
      },
      select: (value) => {
        const formatData = value?.user;
        return formatData;
      },
    }
  );
  const { data: userDetailPosts } = useQuery(
    ["userDetailPosts", id],
    () => getPostsByUserId(id),
    {
      refetchOnWindowFocus: false,
      select: (value) => {
        const formatData = value?.posts;
        return formatData;
      },
    }
  );
  return (
    <div className="container">
      <UserDetailInfo
        postCount={userDetailPosts?.length}
        userDetailInfo={userDetailInfo}
      />
      <UserDetailPosts
        userDetailInfo={userDetailInfo}
        userDetailPosts={userDetailPosts}
      />
    </div>
  );
};

export default UserDetail;
