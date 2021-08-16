import React from "react";
import { SearchRouteType } from "@/typings";
import { Link, useLocation } from "react-router-dom";
import { useHitKeywords } from "@/hooks";
import qs from "query-string";
import { List, Skeleton, Row, Col, Space, Avatar } from "antd";
import { Text } from "@/components/text";

const Radio: React.FC<SearchRouteType> = ({ state, loading, pageNum, pageSize, handleCurrentChange, handleSizeChange }) => {
  const location = useLocation();
  const { keywords } = qs.parse(location.search) as { keywords: string };
  const { renderHitKeywords } = useHitKeywords();

  return (
    <List
      size="small"
      itemLayout="horizontal"
      loading={loading}
      dataSource={state?.djRadios}
      pagination={{
        position: "bottom",
        size: "small",
        hideOnSinglePage: true,
        total: state?.djRadiosCount,
        pageSizeOptions: ["10"],
        showSizeChanger: false,
        current: pageNum,
        pageSize,
        onChange: handleCurrentChange,
        onShowSizeChange: handleSizeChange
      }}
      renderItem={item => (
        <List.Item>
          <Skeleton avatar title={false} loading={loading} active>
            <Link key={item.id} to={`/detail/singer/${item.id}`} style={{ width: "100%" }}>
              <Row align="middle">
                <Col flex={1}>
                  <Space>
                    <Avatar shape="square" size={64} src={item.picUrl} />
                    <Text color="#777" active="#333">
                      {renderHitKeywords(item.name, keywords)}
                    </Text>
                  </Space>
                </Col>
                <Col span={10}>
                  {item.dj.nickname && (
                    <Text color="#777" active="#333">
                      by {renderHitKeywords(item.dj.nickname, keywords)}
                    </Text>
                  )}
                </Col>
              </Row>
            </Link>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default Radio;
