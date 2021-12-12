import { Button, Form, Input, message, Modal, Select } from "antd";
import { updateProfile } from "api/userAPI";
import avatarDefault from "assets/images/dummy-user.png";
import LoadingComponent from "components/LoadingComponent";
import { getInfoUser, updateUser } from "features/auth/authSlice";
import React, { useRef, useState } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const inputFile = useRef(null);
  const userInfo = useSelector(getInfoUser);
  const [objFile, setObjFile] = useState({ file: null, base64Url: "" });

  const { mutate, isLoading } = useMutation((values) => updateProfile(values), {
    onError: () => {
      message.error("Cập nhật thất bại!");
    },
    onSuccess: (res) => {
      if (res?.error) {
        message.error(res?.error);
      } else {
        Modal.success({
          title: "Cập nhật thành công! Trở về trang cá nhân?",
          onOk() {
            history.push(`/users/${userInfo?.USERID}`);
          },
        });
        dispatch(updateUser(res?.user));
      }
    },
  });

  const handleSelectFile = () => {
    inputFile.current.click();
  };

  const handleChangeFile = (e) => {
    const fileList = e.target.files;
    if (fileList.length === 0) return;
    const file = fileList[0];
    if (/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.type)) {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          setObjFile({ file, base64Url: reader.result });
        },
        false
      );
      reader.readAsDataURL(file);
    } else alert("File không hợp lệ");
  };

  const onFinish = (value) => {
    mutate({ ...value, avatar: objFile.file });
  };

  const avatarURL =
    objFile.base64Url || userInfo?.profilepicture || avatarDefault;

  return (
    <>
      {!userInfo?.USERID ? (
        <LoadingComponent />
      ) : (
        <div className="ass1-login">
          <div className="ass1-login__content">
            <h3 className="text-center mb-4">Chỉnh sửa thông tin</h3>
            <Form onFinish={onFinish} initialValues={{ ...userInfo }}>
              <div
                className="mb-4 text-center cursor-pointer"
                onClick={handleSelectFile}
              >
                <img src={avatarURL} alt="" width={100} height={100} />
              </div>
              <Form.Item
                name="fullname"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên!",
                  },
                ]}
              >
                <Input placeholder="Tên *" />
              </Form.Item>
              <Form.Item name="gender">
                <Select placeholder="Giới tính">
                  <Select.Option value="">Giới tính</Select.Option>
                  <Select.Option value="nam">Nam</Select.Option>
                  <Select.Option value="nu">Nữ</Select.Option>
                </Select>
              </Form.Item>
              <input
                name="avatar"
                type="file"
                ref={inputFile}
                placeholder="Ảnh đại diện"
                style={{ display: "none" }}
                onChange={handleChangeFile}
              />
              <Form.Item name="description">
                <Input.TextArea
                  placeholder="Mô tả ngắn..."
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={isLoading}
                >
                  Cập nhật
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
