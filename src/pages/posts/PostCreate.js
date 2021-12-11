import { Col, Row, message, Modal } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import PostDetailForm from "./components/PostDetailForm";
import PostDetailSidebar from "./components/PostDetailSidebar";
import { createNewPost } from "api/postAPI";
import { useHistory } from "react-router-dom";

const initState = {
  url_image: "",
  post_content: "",
  category: [],
  obj_image: {
    file: null,
    base64: "",
  },
};

const PostCreate = () => {
  const history = useHistory();
  const [postData, setPostData] = useState(initState);

  const onChangeDetailForm = (key, value) => {
    setPostData({ ...postData, [key]: value });
  };
  const { mutate, isLoading } = useMutation(
    (values) => {
      return createNewPost(values);
    },
    {
      onError: () => message.error("Tạo bài viết thất bại!"),
      onSuccess: (res) => {
        if (res.error) {
          message.error(res.error);
        } else {
          Modal.success({
            icon: <CheckCircleOutlined />,
            content: "Tạo bài viết thành công",
            okText: "Xem chi tiết",
            onOk() {
              history.push(`/posts/${res?.data?.post?.PID}`);
            },
          });
        }
      },
    }
  );

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
          />
        </Col>
        <Col lg={8}>
          <PostDetailSidebar
            handleSubmitPost={handleSubmitPost}
            category={postData.category}
            onChangeDetailForm={onChangeDetailForm}
            isLoading={isLoading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default PostCreate;
