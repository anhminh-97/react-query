import { Button, Input, Space } from "antd";
import { FileGifOutlined, GlobalOutlined } from "@ant-design/icons";
import ImgDefault from "assets/images/no_image_available.jpg";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import LoadingComponent from "components/LoadingComponent";

const PostDetailForm = ({
  url_image,
  post_content,
  obj_image,
  onChangeDetailForm,
  editMode,
}) => {
  const inputFile = useRef(null);
  const handleOnChange = (key) => (e) => {
    const value = e.target.value;
    onChangeDetailForm(key, value);
  };

  const handleSelectFile = () => {
    inputFile.current.click();
  };

  const handleChangeFile = (e) => {
    const fileList = e.target.files;
    if (fileList?.length === 0) return;
    const file = fileList[0];
    if (/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.type)) {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          onChangeDetailForm("obj_image", { file, base64: reader.result });
        },
        false
      );
      reader.readAsDataURL(file);
    } else alert("File không hợp lệ");
  };

  const imageURL = url_image || obj_image.base64 || ImgDefault;

  return (
    <>
      {editMode && !post_content ? (
        <LoadingComponent />
      ) : (
        <div className="ass1-section ass1-section__edit-post">
          <div className="ass1-section__content">
            <Input
              defaultValue={url_image}
              onChange={handleOnChange("url_image")}
              placeholder="https://"
              className="mb-3"
            />
            <Input.TextArea
              defaultValue={post_content}
              onChange={handleOnChange("post_content")}
              placeholder="Mô tả ..."
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
            <div className="ass1-section__image">
              <img
                src={imageURL}
                alt="default"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <input
              type="file"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={handleChangeFile}
            />
            <Space size="large" className="mt-3" align="end">
              <Link target="_blank" to={{ pathname: "https://giphy.com" }}>
                <Button type="primary" icon={<FileGifOutlined />}>
                  Chế ảnh từ meme
                </Button>
              </Link>
              <Button
                onClick={handleSelectFile}
                type="primary"
                icon={<GlobalOutlined />}
              >
                Đăng ảnh từ máy tính
              </Button>
            </Space>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetailForm;
