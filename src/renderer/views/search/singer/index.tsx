import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { List, Skeleton, Row, Col, Space, Avatar } from "antd";
import { Link } from "react-router-dom";
import { SearchRouteType } from "@/typings";
import { Text } from "@/components/text";

const Singer: React.FC<SearchRouteType> = ({ state, loading, pageNum, pageSize, handleCurrentChange, handleSizeChange }) => {
  return (
    <List
      size="small"
      itemLayout="horizontal"
      loading={loading}
      dataSource={state?.artists}
      pagination={{
        position: "bottom",
        size: "small",
        hideOnSinglePage: true,
        total: state?.artistCount,
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
            <Link key={item.id} to={`/detail/singer/${item.id}`} style={{ width: "100%" }}>
              <Row align="middle" justify="space-between">
                <Col>
                  <Space>
                    <Avatar shape="square" size={64} src={item.img1v1Url} />
                    <Text>{item.name}</Text>
                  </Space>
                </Col>
                <Col>{item.accountId && <Avatar size={20} style={{ backgroundColor: "#ff4d4f" }} icon={<UserOutlined />} />}</Col>
              </Row>
            </Link>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default Singer;
