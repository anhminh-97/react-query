import dayjs from "dayjs";
import { CommentOutlined } from "@ant-design/icons";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { Link } from "react-router-dom";
import { highlightText } from "../helpers";
import avatarDefault from "assets/images/dummy-user.png";
// import { useSelector } from "react-redux";
// import { getInfoUser } from "features/auth/authSlice";

dayjs.extend(relativeTime);

const PostItem = ({ post, className, isHighlight, query, commentPost }) => {
  let href = `/posts/${post?.PID}`;
  // const userInfo = useSelector(getInfoUser);
  // const isOwner = Number(post?.USERID) === Number(userInfo?.USERID);
  // if (isOwner) {
  //   href += "/edit";
  // }

  const renderFullname = () => {
    if (isHighlight && query) {
      return highlightText(post?.fullname, query);
    }
    return post?.fullname;
  };

  const renderContent = () => {
    if (isHighlight && query) {
      return highlightText(post?.post_content, query);
    }
    return post?.post_content;
  };

  if (!post) return null;

  return (
    <>
      {post.PID && (
        <div className={`ass1-section__item ${className && className}`}>
          <div className="ass1-section">
            <div className="ass1-section__head">
              <Link
                className="ass1-section__avatar ass1-avatar"
                to={`/users/${post.USERID}`}
              >
                <img
                  src={
                    post.profilepicture?.includes("/")
                      ? post.profilepicture
                      : avatarDefault
                  }
                  alt={post.fullname}
                  width={38}
                  height={38}
                />
              </Link>
              <div>
                <Link
                  to={`/users/${post.USERID}`}
                  className="ass1-section__name"
                  dangerouslySetInnerHTML={{ __html: renderFullname() }}
                />
                <span className="ass1-section__passed">
                  {dayjs(post.time_added).locale("vi").fromNow()}
                </span>
              </div>
            </div>
            <div className="ass1-section__content">
              <p dangerouslySetInnerHTML={{ __html: renderContent() }} />
              <div className="ass1-section__image">
                <Link to={href}>
                  <img
                    src={post.url_image}
                    alt={post.url_image}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Link>
              </div>
            </div>
            <div className="ass1-section__footer">
              <Link
                className="ass1-section__btn-comment ass1-btn-icon"
                to={href}
              >
                <CommentOutlined />
                <span>{commentPost || 0}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostItem;
