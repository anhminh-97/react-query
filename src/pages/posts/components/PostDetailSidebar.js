import { Button, Checkbox, Space, Row, Col } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  GooglePlusOutlined,
} from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import LoadingComponent from "components/LoadingComponent";

const PostDetailSidebar = ({
  category,
  onChangeDetailForm,
  handleSubmitPost,
  isLoading,
  editMode,
}) => {
  const { data: categories } = useQuery("categories");

  const onChangeCategories = (values) => {
    onChangeDetailForm("category", values);
  };
  return (
    <aside className="ass1-aside ass1-aside__edit-post">
      <div className="ass1-aside__edit-post-head">
        <p style={{ width: "100%", marginBottom: "10px" }}>Chọn danh mục</p>
        {editMode && category.length === 0 ? (
          <LoadingComponent />
        ) : (
          <Checkbox.Group
            style={{ width: "100%" }}
            onChange={onChangeCategories}
            defaultValue={category}
          >
            <Row>
              <Col span={24}>
                {categories?.categories?.map((item) => {
                  return (
                    <Checkbox
                      value={item.id}
                      key={item.id}
                      style={{ width: "50%", margin: 0 }}
                    >
                      {item.text}
                    </Checkbox>
                  );
                })}
              </Col>
            </Row>
          </Checkbox.Group>
        )}
      </div>
      <Button
        loading={isLoading}
        size="large"
        type="primary"
        block
        onClick={handleSubmitPost}
        className="mt-3"
      >
        Đăng bài
      </Button>
      <div className="ass1-aside__get-code">
        <p>Share Link</p>
      </div>
      <div className="ass1-aside__social">
        <Space>
          <Link to="/">
            <FacebookOutlined />
          </Link>
          <Link to="/">
            <TwitterOutlined />
          </Link>
          <Link to="/">
            <GooglePlusOutlined />
          </Link>
        </Space>
      </div>
    </aside>
  );
};

export default PostDetailSidebar;
