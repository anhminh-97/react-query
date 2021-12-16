import { getCommentByPostId, getPostByPostId } from "api/postAPI";
import { message } from "antd";
import { getUserById } from "api/userAPI";
import PostItem from "components/PostItem";
import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import PostCommentForm from "./PostCommentForm";
import PostCommentList from "./PostCommentList";
import classes from "./PostDetailContent.module.css";

const PostDetailContent = () => {
  const { id } = useParams();
  const { data: postDetail } = useQuery(["post", id], getPostByPostId, {
    refetchOnWindowFocus: false,
    onError: () => message.error("Lấy dữ liệu thất bại!"),
    select: (value) => {
      const formatData = value?.data;
      return formatData;
    },
  });
  const ownerId = postDetail?.post?.USERID;

  const { data: ownerPost } = useQuery(
    ["ownerPost", id],
    () => getUserById(ownerId),
    {
      refetchOnWindowFocus: false,
      enabled: !!ownerId,
      onError: () => message.error("Lấy dữ liệu thất bại!"),
      select: (value) => {
        const formatData = value?.user;
        return formatData;
      },
    }
  );

  // const { data: listComments, isLoading } = useQuery(
  //   ["listComments", id],
  //   () => getCommentByPostId(id),
  //   {
  //     refetchOnWindowFocus: false,
  //     onError: () => message.error("Lấy dữ liệu thất bại!"),
  //     select: (value) => {
  //       const listComments = value?.comments;
  //       return listComments;
  //     },
  //   }
  // );

  const { data: listComments, isLoading } = useQuery({
    queryKey: ["listComments", id],
    queryFn: () => getCommentByPostId(id),
    onError: () => message.error("Lấy dữ liệu thất bại!"),
    select: (value) => {
      const listComments = value?.comments;
      return listComments;
    },
  });

  const newPost = {
    ...postDetail?.post,
    fullname: ownerPost?.fullname,
    profilepicture: ownerPost?.profilepicture,
  };

  return (
    <div className="ass1-section__list">
      <div className={classes["ass1-section__list"]}>
        <PostItem commentPost={listComments?.length} post={newPost} />
        <div className={classes["list-categories"]}>
          <h5>
            <strong>Danh mục: </strong>
          </h5>
          <ul>
            {postDetail?.categories?.map((obj) => {
              return (
                <li key={obj.TAG_ID}>
                  <Link to={`/categories/${obj.tag_index}`}>
                    {obj.tag_value}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <PostCommentForm postid={id} />
      <PostCommentList listComments={listComments} isLoading={isLoading} />
    </div>
  );
};

export default PostDetailContent;
