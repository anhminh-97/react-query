import React from "react";
import { Link } from "react-router-dom";
import { PlusOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import { useHistory } from "react-router-dom";

import { ROUTER } from "constants/index";
import HeaderSearch from "./HeaderSearch";
import HeaderMenu from "./HeaderMenu";
import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getInfoUser, logout } from "features/auth/authSlice";
import avatarDefault from "assets/images/dummy-user.png";

const Header = () => {
  const history = useHistory();
  const userInfo = useSelector(getInfoUser);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  // Function
  const handleLogout = () => {
    Modal.confirm({
      title: "Bạn có muốn đăng xuất không ?",
      onOk() {
        dispatch(logout());
        history.push(ROUTER.Login);
      },
    });
  };

  return (
    <header
      className="position-sticky w-100"
      style={{ top: 0, left: 0, zIndex: 99 }}
    >
      <div className="ass1-header">
        <div className="container">
          <Link to={ROUTER.Home}>
            <h2 style={{ color: "#3482e2" }}>Meme App</h2>
          </Link>
          <HeaderMenu />
          <HeaderSearch />
          <Space size="large">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              disabled={!token}
              onClick={() => history.push(ROUTER.Create)}
            >
              Tạo bài viết
            </Button>

            {userInfo ? (
              <div className={classes["wrapper-user"]}>
                <Link
                  className={classes["user-header"]}
                  to={`/users/${userInfo.USERID}`}
                >
                  <span className={classes.avatar}>
                    <img
                      src={userInfo.profilepicture || avatarDefault}
                      alt="avatar"
                      width={35}
                      height={35}
                    />
                  </span>
                  <span className={classes.email}>{userInfo.email}</span>
                </Link>
                <div onClick={handleLogout} className={classes.logout}>
                  <Space>
                    <LogoutOutlined /> Logout
                  </Space>
                </div>
              </div>
            ) : (
              <Space>
                <Button
                  type="primary"
                  ghost
                  onClick={() => history.push(ROUTER.Register)}
                >
                  Đăng ký
                </Button>
                <Button
                  type="primary"
                  onClick={() => history.push(ROUTER.Login)}
                >
                  Đăng nhập
                </Button>
              </Space>
            )}
          </Space>
        </div>
      </div>
    </header>
  );
};

export default Header;
