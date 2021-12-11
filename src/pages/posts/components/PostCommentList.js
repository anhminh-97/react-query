import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DislikeOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import LoadingComponent from "components/LoadingComponent";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);

const PostCommentList = ({ listComments, isLoading }) => {
  return (
    <div className="ass1-comments">
      <div className="ass1-comments__head">
        <div className="ass1-comments__title">
          {listComments?.length} Bình luận
        </div>
        <div className="ass1-comments__options">
          <span>Sắp xếp theo:</span>
          <ArrowUpOutlined />
          <ArrowDownOutlined />
        </div>
      </div>
      {/*comment*/}
      {isLoading ? (
        <LoadingComponent />
      ) : (
        listComments?.map((comment) => (
          <div className="ass1-comments__section" key={comment.CID}>
            <Link
              to={`/users/${comment.USERID}`}
              className="ass1-comments__avatar ass1-avatar"
            >
              <img
                src={comment.profilepicture || "/images/avatar-02.png"}
                alt="avatar"
                width={38}
                height={38}
              />
            </Link>
            <div className="ass1-comments__content">
              <Link
                to={`/users/${comment.USERID}`}
                className="ass1-comments__name"
              >
                {comment.fullname}
              </Link>
              <span className="ass1-comments__passed">
                {dayjs(comment.time_added).locale("vi").fromNow()}
              </span>
              <p>{comment.comment}</p>
              <div className="ass1-comments__info">
                <Space>
                  <LikeOutlined />
                  <span>901</span>
                  <DislikeOutlined />
                  <span>36</span>
                </Space>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostCommentList;
