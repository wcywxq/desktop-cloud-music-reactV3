import React from "react";
import { List, Avatar, Spin } from "antd";
import { Text } from "@/components/text";
import type { CommentsDataType } from "@/typings";

interface IProps {
  dataSource: CommentsDataType[];
  renderItem: (item: CommentsDataType) => React.ReactNode;
  style?: React.CSSProperties;
}

const Reply: React.FC<IProps> = props => {
  const { dataSource, renderItem, style } = props;

  if (dataSource.length) {
    return (
      <List
        size="small"
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={item => {
          const { user } = item;
          return (
            <List.Item style={{ ...style }}>
              <List.Item.Meta
                style={{ marginBottom: 0 }}
                avatar={<Avatar src={user.avatarUrl} />}
                title={
                  <Text strong color="#cc8c4b">
                    {user.nickname}
                  </Text>
                }
                description={renderItem(item)}
              />
            </List.Item>
          );
        }}
      />
    );
  }

  return <></>;
};

export default Reply;
