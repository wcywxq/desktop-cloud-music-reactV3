import React, { memo, useState } from "react";
import { Avatar, List, Skeleton, Row, Col, Space } from "antd";
import { Link } from "react-router-dom";
import { SearchStateType } from "@/typings";
import { Text } from "@/components/text";

interface IProps {
  loading?: boolean;
  children?: React.ReactNode;
  state?: SearchStateType;
}

const Playlist: React.FC<IProps> = props => {
  const { state, loading } = props;

  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);

  const handleCurrentChange = (pageNum: number, pageSize?: number) => {
    setPageNum(pageNum);
    pageSize !== undefined && setPageSize(pageSize);
  };

  const handleSizeChange = (pageNum: number, pageSize: number) => {
    setPageNum(pageNum);
    setPageSize(pageSize);
  };

  return (
    <List
      size="small"
      itemLayout="horizontal"
      loading={loading}
      dataSource={state?.playlists}
      pagination={{
        position: "bottom",
        size: "small",
        hideOnSinglePage: true,
        total: state?.playlistCount,
        pageSizeOptions: ["50"],
        showSizeChanger: false,
        current: pageNum,
        pageSize,
        onChange: handleCurrentChange,
        onShowSizeChange: handleSizeChange
      }}
      renderItem={item => (
        <List.Item>
          <Skeleton avatar title={false} loading={loading} active>
            <Link key={item.id} to={`/detail/playlist/songs?id=${item.id}`} style={{ width: "100%" }}>
              <Row align="middle">
                <Col flex={1}>
                  <Space>
                    <Avatar shape="square" size={64} src={item.coverImgUrl} />
                    <Text>{item.name}</Text>
                  </Space>
                </Col>
                <Col span={3}>
                  <Text color="#9b9b9b">{item.trackCount || 0}首</Text>
                </Col>
                <Col span={4}>
                  <Text color="#9b9b9b" ellipsis title={item.creator.nickname}>
                    by {item.creator.nickname}
                  </Text>
                </Col>
              </Row>
            </Link>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default memo(Playlist, (prevProps, nextProps) => {
  return prevProps.state === nextProps.state && prevProps.loading === nextProps.loading;
});
