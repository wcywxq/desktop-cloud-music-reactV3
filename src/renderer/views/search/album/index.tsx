import React from "react";
import { SearchRouteType } from "@/typings";
import { List, Skeleton, Row, Col, Space, Avatar } from "antd";
import { Link, useLocation } from "react-router-dom";
import qs from "query-string";
import { Text } from "@/components/text";
import SubTitle from "@/components/SubTitle";
import { useHitKeywords } from "@/hooks";

const Album: React.FC<SearchRouteType> = ({ state, loading, pageNum, pageSize, handleCurrentChange, handleSizeChange }) => {
  const location = useLocation();
  const { keywords } = qs.parse(location.search) as { keywords: string };
  const { renderHitKeywords } = useHitKeywords();

  return (
    <List
      size="small"
      itemLayout="horizontal"
      loading={loading}
      dataSource={state?.albums}
      pagination={{
        position: "bottom",
        size: "small",
        hideOnSinglePage: true,
        total: state?.albumCount,
        pageSizeOptions: ["20"],
        showSizeChanger: false,
        current: pageNum,
        pageSize,
        onChange: handleCurrentChange,
        onShowSizeChange: handleSizeChange
      }}
      renderItem={item => (
        <List.Item>
          <Skeleton avatar title={false} loading={loading} active>
            <Link key={item.id} to={`/detail/album/${item.id}`} style={{ width: "100%" }}>
              <Row align="middle">
                <Col span={14}>
                  <Space>
                    <Avatar shape="square" size={64} src={item.picUrl} />
                    <Text color="#777" active="#333">
                      {renderHitKeywords(item.name, keywords)}
                    </Text>
                    <SubTitle data={item.alias} />
                  </Space>
                </Col>
                <Col span={10}>
                  <Text color="#777" active="#333">
                    {renderHitKeywords(item.artist.name, keywords)}
                  </Text>
                  <SubTitle data={item.artist.alias} />
                </Col>
              </Row>
            </Link>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default Album;
