import { Button, Row } from "antd";
import { getPosts } from "api/postAPI";
import React from "react";
import { useInfiniteQuery } from "react-query";
import PostItem from "./PostItem";

const PostListItem = () => {
  const {
    data: listPosts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["listPosts"],
    ({ pageParam = 1 }) => getPosts(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (allPages?.length < 5) {
          return allPages?.length + 1;
        } else {
          return undefined;
        }
      },
    }
  );

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
            loading={isFetchingNextPage}
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
