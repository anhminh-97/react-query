import { Col, Row, message } from "antd";
import { editPost, getPostByPostId } from "api/postAPI";
import { useAuthen } from "hooks/useAuthen";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import PostDetailForm from "./components/PostDetailForm";
import PostDetailSidebar from "./components/PostDetailSidebar";

const initState = {
  url_image: "",
  post_content: "",
  category: [],
  obj_image: {
    file: null,
    base64: "",
  },
};

const PostEdit = () => {
  useAuthen();
  const { id } = useParams();
  const [postData, setPostData] = useState(initState);

  const queryClient = useQueryClient()
  const { mutate, isLoading } = useMutation(
    (values) => {
      return editPost(values);
    },
    {
      onError: () => message.error("Cập nhật bài viết thất bại!"),
      onSuccess: (res) => {
        if (res.error) {
          message.error(res.error);
        } else {
          message.success("Cập nhật bài viết thành công!");
          queryClient.setQueryData(['todo', id], res?.data?.post)
          setPostData({
            ...postData,
            url_image: res?.data?.post?.url_image,
            obj_image: {
              file: null,
              base64: "",
            },
          });
        }
      },
    }
  );

  useQuery(["post", id], getPostByPostId, {
    refetchOnWindowFocus: false,
    onError: () => message.error("Lấy dữ liệu thất bại!"),
    onSuccess: (res) => {
      const post = res?.data?.post;
      setPostData({
        url_image: post?.url_image,
        post_content: post?.post_content,
        obj_image: post?.obj_image,
        category: res?.data?.categories?.map((category) =>
          Number(category.tag_index)
        ),
      });
    },
  });
  const onChangeDetailForm = (key, value) => {
    if (key === "obj_image") {
      setPostData({
        ...postData,
        [key]: value,
        url_image: "",
      });
    }
    setPostData({ ...postData, [key]: value });
  };
  const handleSubmitPost = () => {
    mutate(postData);
  };
  return (
    <div className="container">
      <Row gutter={30}>
        <Col lg={16}>
          <PostDetailForm
            onChangeDetailForm={onChangeDetailForm}
            url_image={postData.url_image}
            post_content={postData.post_content}
            obj_image={postData.obj_image}
            editMode
          />
        </Col>
        <Col lg={8}>
          <PostDetailSidebar
            handleSubmitPost={handleSubmitPost}
            category={postData.category}
            onChangeDetailForm={onChangeDetailForm}
            isLoading={isLoading}
            editMode
          />
        </Col>
      </Row>
    </div>
  );
};

export default PostEdit;
