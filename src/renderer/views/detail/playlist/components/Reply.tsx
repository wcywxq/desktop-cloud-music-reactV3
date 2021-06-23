import React from "react";
import { List, Avatar } from "antd";
import styled from "styled-components";
import { Text } from "@/components/core";
import type { CommentsType } from "../typeing";

type IProps = {
  dataSource: CommentsType[];
  renderItem: (item: CommentsType) => React.ReactNode;
  style?: React.CSSProperties;
};

const Reply: React.FC<IProps> = props => {
  const { dataSource, renderItem, style } = props;

  if (dataSource.length) {
    return (
      <List
        size="small"
        itemLayout="vertical"
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
