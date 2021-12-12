import { Button, Row } from "antd";
import { getPosts } from "api/postAPI";
import React from "react";
import { useInfiniteQuery } from "react-query";
import PostItem from "./PostItem";

const PostListItem = () => {
  const filter = {
    pagesize: 3,
    currPage: 1,
  };

  const {
    data: listPosts,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(["listPosts"], () => getPosts(filter), {
    getNextPageParam: (lastPage, pages) => {
      if (pages?.length < 5) {
        return pages?.length + 1;
      } else {
        return undefined;
      }
    },
  });

  return (
    <div className="ass1-section__list">
      {listPosts?.pages?.map((page) =>
        page?.posts?.map((post) => <PostItem key={post.PID} post={post} />)
      )}
      <Row justify="center">
        {hasNextPage ? (
          <Button
            type="primary"
            onClick={fetchNextPage}
            loading={isLoading || isFetching || isFetchingNextPage}
          >
            Xem thêm
          </Button>
        ) : (
          <p>Không còn bài viết nào.</p>
        )}
      </Row>
    </div>
  );
};

export default PostListItem;
