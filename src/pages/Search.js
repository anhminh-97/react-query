import React, { useEffect } from "react";
import Masonry from "react-masonry-component";
import PostItem from "components/PostItem";
import { useLocation, useHistory } from "react-router-dom";
import { ROUTER } from "constants/index";
import queryString from "query-string";
import { useQuery } from "react-query";
import { getPostSearch } from "api/postAPI";
import LoadingComponent from "components/LoadingComponent";

const Search = () => {
  const history = useHistory();
  const { search } = useLocation();
  const SearchStr = queryString.parse(search).q;

  useEffect(() => {
    if (!SearchStr) {
      history.push(ROUTER.Home);
    }
  }, [SearchStr, history]);

  const { data: listPosts, isLoading } = useQuery(
    "listSearchPosts",
    () => getPostSearch(SearchStr),
    {
      refetchOnWindowFocus: false,
      select: (value) => {
        const formatData = value?.posts;
        return formatData;
      },
    }
  );

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className="container">
          <div className="header-search my-5">
            <h3>
              Từ khóa tìm kiếm: <strong>{SearchStr}</strong>
            </h3>
            <p>Tìm kiếm được ({listPosts?.length}) kết quả</p>
          </div>
          <Masonry className="ass1-section__wrap row ass1-section__isotope-init">
            {listPosts?.map((post) => (
              <PostItem
                key={post.PID}
                isHighlight={true}
                query={SearchStr}
                post={post}
                className="col-lg-6"
              />
            ))}
          </Masonry>
        </div>
      )}
    </>
  );
};

export default Search;
