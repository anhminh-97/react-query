import { Button, Form, Input, message } from "antd";
import { useNotAuthen } from "hooks/useAuthen";
import React from "react";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";
import { postLogin } from "../api/authAPI";
import { ROUTER } from "../constants/index";

const Login = () => {
  useNotAuthen();
  const history = useHistory();
  const { mutate, isLoading } = useMutation(
    (values) => {
      return postLogin(values);
    },
    {
      onError: (err) => message.error("Đăng nhập thất bại!"),
      onSuccess: (res) => {
        if (res?.error) {
          message.error(res?.error);
        } else {
          localStorage.setItem("token", JSON.stringify(res?.token));
          history.push(ROUTER.Home);
        }
      },
    }
  );

  const onFinish = (values) => mutate(values);

  return (
    <div className="ass1-login">
      <div className="ass1-login__logo">
        <Link className="ass1-logo text-center" to={ROUTER.Home}>
          Meme App
        </Link>
      </div>
      <div className="ass1-login__content">
        <h3 className="text-center mb-4">Đăng nhập</h3>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Không đúng định dạng email" },
            ]}
          >
            <Input placeholder="Email *" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Tối thiểu 6 kí tự" },
            ]}
          >
            <Input.Password placeholder="Mật khẩu *" />
          </Form.Item>
          <Form.Item>
            <Button
              block
              size="large"
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              Đăng nhập
            </Button>
          </Form.Item>
          <p className="text-center">
            <Link to={ROUTER.Register}>Đăng ký tài khoản</Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
