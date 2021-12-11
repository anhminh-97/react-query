import React from "react";
import { Col, Row } from "antd";
import HomeSidebar from "components/HomeSidebar";
import PostDetailContent from "./components/PostDetailContent";

const PostDetail = () => {
  return (
    <div className="container">
      <Row gutter={30}>
        <Col lg={16}>
          <PostDetailContent />
        </Col>
        <Col lg={8}>
          <HomeSidebar />
        </Col>
      </Row>
    </div>
  );
};

export default PostDetail;
