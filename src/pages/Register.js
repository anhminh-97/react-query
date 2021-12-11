import { ROUTER } from "constants/index";
import { Button, Form, Input, message } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useNotAuthen } from "hooks/useAuthen";
import { useMutation } from "react-query";
import { postRegister } from "api/authAPI";

const Register = () => {
  useNotAuthen();
  const history = useHistory();
  const { isLoading, mutateAsync } = useMutation((values) => {
    return postRegister(values);
  });
  const onFinish = async (values) => {
    try {
      const data = await mutateAsync(values);
      if (data?.error) {
        message.error(data?.error);
      } else {
        localStorage.setItem("token", JSON.stringify(data?.token));
        history.push(ROUTER.Home);
      }
    } catch (error) {
      message.error("Đăng nhập thất bại!");
    }
  };

  return (
    <div className="ass1-login">
      <div className="ass1-login__logo">
        <Link className="ass1-logo text-center" to={ROUTER.Home}>
          Meme App
        </Link>
      </div>
      <div className="ass1-login__content">
        <h3 className="text-center mb-4">Đăng ký tài khoản</h3>
        <Form onFinish={onFinish}>
          <Form.Item
            name="fullname"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input placeholder="Tên hiển thị *" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Sai định dạng email!" },
            ]}
          >
            <Input placeholder="Email *" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập nhập mật khẩu!" },
              { min: 6, message: "Tối thiểu 6 kí tự" },
            ]}
          >
            <Input.Password placeholder="Mật khẩu *" />
          </Form.Item>
          <Form.Item
            name="repassword"
            dependencies={["password"]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu chưa đúng!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu *" />
          </Form.Item>
          <Form.Item>
            <Button
              block
              size="large"
              htmlType="submit"
              type="primary"
              loading={isLoading}
            >
              Đăng ký
            </Button>
          </Form.Item>
          <p className="text-center">
            Đã có tài khoản? <Link to={ROUTER.Login}> Đăng nhập</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Register;
