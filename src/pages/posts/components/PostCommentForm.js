import { Button, Form, Input, message } from "antd";
import { postComment } from "api/postAPI";
import React from "react";
import { useMutation, useQueryClient } from "react-query";

const PostCommentForm = ({ postid }) => {
  const [form] = Form.useForm();
  
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (values) => {
      return postComment({ postid, ...values });
    },
    {
      onError: () => message.error("Gửi bình luận thất bại!"),
      onSuccess: (res) => {
        if (res.error) {
          message.error(res.error);
        } else {
          queryClient.invalidateQueries("listComments");
          form.setFieldsValue({ comment: "" });
        }
      },
    }
  );

  const onFinish = (values) => mutate(values);

  return (
    <div className="ass1-add-comment">
      <Form onFinish={onFinish} form={form}>
        <Form.Item className="mb-0" name="comment">
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
            size="large"
            placeholder="Thêm một bình luận"
            showCount
            maxLength={180}
          />
        </Form.Item>
        <div className="mt-4 text-end">
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Gửi
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PostCommentForm;
