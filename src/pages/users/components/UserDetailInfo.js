import { ROUTER } from "constants/index";
import { getInfoUser } from "features/auth/authSlice";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import verifyIcon from "assets/images/Verified.svg";
import LoadingComponent from "./../../../components/LoadingComponent";
import avatarDefault from "assets/images/dummy-user.png";

const UserDetailInfo = ({ userDetailInfo, postCount }) => {
  const currentUser = useSelector(getInfoUser);

  return (
    <>
      {!userDetailInfo?.USERID ? (
        <LoadingComponent />
      ) : (
        <div className="ass1-head-user">
          <div className="ass1-head-user__content">
            <div className="ass1-head-user__image">
              <img
                src={userDetailInfo?.profilepicture || avatarDefault}
                alt={userDetailInfo?.fullname}
              />
            </div>
            <div className="ass1-head-user__info">
              <div className="ass1-head-user__info-head">
                <div className="ass1-head-user__name">
                  <span>{userDetailInfo.fullname}</span>
                  <i>
                    <img src={verifyIcon} alt="" width={16} height={16} />
                  </i>
                </div>
                <div className="w-100" />
                {userDetailInfo.USERID !== currentUser?.USERID ? (
                  <Link to="#" className="ass1-head-user__btn-follow ass1-btn">
                    Theo dõi
                  </Link>
                ) : (
                  <>
                    <Link
                      to={ROUTER.Password}
                      className="ass1-head-user__btn-follow ass1-btn"
                    >
                      Đổi mật khẩu
                    </Link>
                    <Link
                      to={ROUTER.Profile}
                      className="ass1-head-user__btn-follow ass1-btn"
                    >
                      Profile
                    </Link>
                  </>
                )}
              </div>
              <div className="ass1-head-user__info-statistic">
                <div className="ass1-btn-icon">
                  <i className="icon-Post" />
                  <span>Bài viết: {postCount}</span>
                </div>
                <div className="ass1-btn-icon">
                  <i className="icon-Followers" />
                  <span>Theo dõi: {userDetailInfo.yourviewed}</span>
                </div>
                <div className="ass1-btn-icon">
                  <i className="icon-Following" />
                  <span>Đang theo dõi: {userDetailInfo.youviewed}</span>
                </div>
                {/* <div class="ass1-btn-icon"><i class="icon-Upvote"></i><span>Up Vote: 999999</span></div> */}
              </div>
              <p>{userDetailInfo.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetailInfo;
