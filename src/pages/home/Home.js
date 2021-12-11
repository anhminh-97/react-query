import { Col, Row } from "antd";
import React from "react";
import PostListItem from "../../components/PostListItem";
import HomeSidebar from "./../../components/HomeSidebar";

const Home = () => {
  return (
    <div className="container">
      <Row gutter={30}>
        <Col lg={16}>
          <PostListItem />
        </Col>
        <Col lg={8}>
          <HomeSidebar />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
