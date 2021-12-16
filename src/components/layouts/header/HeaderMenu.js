import { getCategories } from "api/postAPI";
import LoadingComponent from "components/LoadingComponent";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { message } from "antd";

const HeaderMenu = () => {
  // const { data: categories, isLoading } = useQuery(
  //   "categories",
  //   () => getCategories(),
  //   {
  //     refetchOnWindowFocus: false,
  //     onError: () => message.error("Lấy dữ liệu thất bại!"),
  //     onSuccess: (res) => {
  //       if (res.error) {
  //         message.error(res.error);
  //       }
  //     },
  //     select: (value) => {
  //       const categories = value?.categories;
  //       return categories;
  //     },
  //   }
  // );

  const { data: categories, isLoading } = useQuery({
    queryKey: "categories",
    queryFn: () => getCategories(),
    refetchOnWindowFocus: false,
    onError: () => message.error("Lấy dữ liệu thất bại!"),
    onSuccess: (res) => {
      if (res.error) {
        message.error(res.error);
      }
    },
    select: (value) => {
      const categories = value?.categories;
      return categories;
    },
  });

  return (
    <nav>
      <ul className="ass1-header__menu">
        <li>
          <Link to="#">Danh mục</Link>
          <div className="ass1-header__nav">
            <div className="container">
              {isLoading ? (
                <LoadingComponent />
              ) : (
                <ul>
                  {categories?.map((category) => (
                    <li key={category.id}>
                      <Link to={`/categories/${category.id}`}>
                        {category.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="ass1-header__menu-transition" />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderMenu;
