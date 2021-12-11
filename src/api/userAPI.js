import axiosClient from "./axiosClient";

const getToken = () => {
  return (localStorage?.token && JSON.parse(localStorage.token)) || undefined;
};

export const getUserById = (userId) => {
  return axiosClient.get(`member/member.php?userid=${userId}`);
};

export const changePassword = (data) => {
  return axiosClient.post(`member/password.php`, data, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

export const updateProfile = (profileData) => {
  const data = new FormData();
  data.append("fullname", profileData.fullname);
  data.append("description", profileData.description);
  data.append("gender", profileData.gender);
  if (profileData.avatar) {
    data.append("avatar", profileData.avatar);
  }
  return axiosClient.post(`member/update.php`, data, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};
