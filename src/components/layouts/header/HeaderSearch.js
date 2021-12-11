import { Input } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

const HeaderSearch = () => {
  const history = useHistory();

  const onFinish = (values) => {
    history.push(`/search?q=${values}`);
  };

  return (
    <div className="ass1-header__search">
      <Input.Search
        size="large"
        placeholder="Tìm kiếm..."
        onSearch={onFinish}
        style={{ width: 400 }}
      />
    </div>
  );
};

export default HeaderSearch;
