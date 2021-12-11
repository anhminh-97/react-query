import axiosClient from "./axiosClient";

const postLogin = (data) => {
  return axiosClient.post("member/login.php", data);
};

const postRegister = (data) => {
  return axiosClient.post("member/register.php", data);
};

export { postLogin, postRegister };
