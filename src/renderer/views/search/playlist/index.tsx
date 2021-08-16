import React from "react";
import { Avatar, List, Skeleton, Row, Col, Space } from "antd";
import { Link, useLocation } from "react-router-dom";
import qs from "query-string";
import { SearchRouteType } from "@/typings";
import { Text } from "@/components/text";
import { useHitKeywords } from "@/hooks";

const Playlist: React.FC<SearchRouteType> = ({ state, loading, pageNum, pageSize, handleCurrentChange, handleSizeChange }) => {
  const location = useLocation();
  const { keywords } = qs.parse(location.search) as { keywords: string };
  const { renderHitKeywords } = useHitKeywords();

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
                    <Text color="#777" active="#333">
                      {renderHitKeywords(item.name, keywords)}
                    </Text>
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

export default Playlist;
