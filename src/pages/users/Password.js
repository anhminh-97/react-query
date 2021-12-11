import { Button, Form, Input, message, Modal } from "antd";
import { changePassword } from "api/userAPI";
import { getInfoUser } from "features/auth/authSlice";
import React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Password = () => {
  const history = useHistory();
  const userInfo = useSelector(getInfoUser);
  const { mutate, isLoading } = useMutation(
    (values) => changePassword(values),
    {
      onError: () => message.error("Đổi mật khẩu thất bại!"),
      onSuccess: (res) => {
        if (res?.error) {
          message.error(res?.error);
        } else {
          Modal.success({
            title: "Thay đổi mật khẩu thành công! Trở về trang cá nhân?",
            onOk() {
              history.push(`/users/${userInfo?.USERID}`);
            },
          });
        }
      },
    }
  );

  const onFinish = (values) => {
    mutate(values);
  };

  return (
    <div className="ass1-login">
      <div className="ass1-login__content">
        <h3 className="text-center mb-4">Đổi mật khẩu</h3>
        <Form onFinish={onFinish}>
          <Form.Item
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Mật khẩu hiện tại!",
              },
              { min: 6, message: "Tối thiểu 6 kí tự" },
            ]}
          >
            <Input.Password placeholder="Mật khẩu hiện tại *" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu mới!",
              },
              { min: 6, message: "Tối thiểu 6 kí tự" },
            ]}
          >
            <Input.Password placeholder="Mật khẩu mới *" />
          </Form.Item>
          <Form.Item
            name="reNewPassword"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lại mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Mật khẩu nhập vào không đúng!");
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu *" />
          </Form.Item>

          <div className="ass1-login__send justify-content-center">
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={isLoading}
              block
            >
              Gửi
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Password;
