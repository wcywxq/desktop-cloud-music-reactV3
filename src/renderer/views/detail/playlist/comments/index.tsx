import React, { useEffect, useState } from "react";
import { List, Avatar } from "antd";
import { Text } from "@/components/core";
import { getPlaylistComments } from "../api";
import type { PropsDataType } from "../index";

type User = {
  avatar: string;
  nickname: string;
};

type CommentsStruct = {
  user: User;
  content: string;
};

type CommentsType = {
  comments: CommentsStruct[];
  hotComments: CommentsStruct[];
  total: number;
};

const Comments: React.FC<PropsDataType> = props => {
  const { data } = props;
  const [commentsData, setCommentsData] = useState<CommentsStruct[]>([]);
  const [hotCommentsData, setHotCommentsData] = useState<CommentsStruct[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async (id: string) => {
      const { comments, hotComments, total }: CommentsType = await getPlaylistComments({ id });
      setCommentsData(comments);
      setHotCommentsData(hotComments);
      setTotalCount(total);
    };

    if (data) {
      const { id } = data;
      fetchData(id.toString());
    }
  }, [data]);

  return (
    <>
      <List
        size="small"
        itemLayout="vertical"
        dataSource={commentsData}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.user.avatar} />}
              title={
                <Text strong color="#cc8e4b">
                  {item.user.nickname}
                </Text>
              }
              description={
                <Text active="#333" cursor="auto">
                  {item.content}
                </Text>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default Comments;
