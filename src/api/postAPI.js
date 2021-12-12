import axiosClient from "./axiosClient";

const getToken = () => {
  return (localStorage?.token && JSON.parse(localStorage.token)) || undefined;
};

export const getPosts = (params) => {
  return axiosClient.get(
    `post/getListPagination.php?pagesize=3&currPage=${params}`
  );
};

export const getCommentByPostId = (postid) => {
  return axiosClient.get(`comment/comments.php?postid=${postid}`);
};

export const getCategories = (params) => {
  return axiosClient.get("categories/index.php", {
    params,
  });
};

export const getPostByPostId = ({ queryKey }) => {
  const postid = queryKey[1];
  return axiosClient.get(`post/post.php?postid=${postid}`);
};

export const getPostsByUserId = (userid, params) => {
  return axiosClient.get(`post/getListPostUserID.php?userid=${userid}`, {
    params,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

export const postComment = (data) => {
  return axiosClient.post("comment/add_new.php", data, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

export const createNewPost = ({
  post_content,
  url_image,
  category,
  obj_image,
}) => {
  const data = new FormData();
  data.append("post_content", post_content);
  data.append("url_image", url_image);
  data.append("category", category?.toString());
  if (obj_image.file) {
    data.append("obj_image", obj_image.file);
  }
  return axiosClient.post("post/addNew.php", data, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

export const editPost = ({ post_content, url_image, category, obj_image }) => {
  const data = new FormData();
  data.append("post_content", post_content);
  data.append("url_image", url_image);
  data.append("category", category?.toString());
  if (obj_image.file) {
    data.append("obj_image", obj_image.file);
  }
  return axiosClient.post("post/edit.php", data, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

export const getPostSearch = (query) => {
  return axiosClient.get(`/post/search.php?query=${encodeURI(query)}`);
};
