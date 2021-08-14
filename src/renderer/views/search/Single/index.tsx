import React, { memo } from "react";
import { useLocation } from "react-router-dom";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { HeartOutlined, DownloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import qs from "query-string";
import type { SongsStruct, AuthorStruct, AlbumStruct, SearchRouteType } from "@/typings";
import { Text } from "@/components/text";

/**
 * @description 命中项渲染
 * @param str 
 * @param keywords 
 * @returns 
 */
const renderHitContent = (str: string, keywords: string) => {
  let arr = str.split(keywords);
  let len = arr.length;
  if (!len)
    return (
      <Text ellipsis title={str} active="#333">
        {str}
      </Text>
    );
  return (
    <Text ellipsis title={str} active="#333">
      {arr.map((item, index) => (
        <React.Fragment key={index}>
          {item}
          {index !== len - 1 && (
            <Text key={index} color="#1890ff" active="#1890ff">
              {keywords}
            </Text>
          )}
        </React.Fragment>
      ))}
    </Text>
  );
};

const Single: React.FC<SearchRouteType> = ({ state, loading }) => {
  const location = useLocation();
  const { keywords } = qs.parse(location.search) as { keywords: string };
  const columns: ColumnsType<SongsStruct> = [
    {
      dataIndex: "id",
      width: "10%",
      render: (_, row, index) => (
        <Space size="large">
          <Text color="#9b9b9b">{(index + 1).toString().padStart(2, "0")}</Text>
          <Space>
            <Text color="#9b9b9b">
              <HeartOutlined />
            </Text>
            <Text color="#9b9b9b">
              <DownloadOutlined />
            </Text>
          </Space>
        </Space>
      )
    },
    {
      title: "音乐标题",
      dataIndex: "name",
      width: "40%",
      render: (scope: string) => renderHitContent(scope, keywords)
    },
    {
      title: "歌手",
      dataIndex: "ar",
      width: "15%",
      render: (scope: AuthorStruct[]) => (
        <Text ellipsis title={scope.map(author => author.name).join(" / ")}>
          {scope.map(author => author.name).join(" / ")}
        </Text>
      )
    },
    {
      title: "专辑",
      dataIndex: "al",
      width: "25%",
      render: (scope: AlbumStruct) => (
        <Text ellipsis title={scope.name}>
          {scope.name}
        </Text>
      )
    },
    {
      title: "时长",
      dataIndex: "dt",
      width: "10%",
      render: (scope: Date) => <Text color="#9b9b9b">{dayjs(scope).format("mm:ss")}</Text>
    }
  ];
  console.log(keywords);

  return <Table<SongsStruct> size="small" rowKey={record => record.id} loading={loading} columns={columns} dataSource={state?.songs} />;
};

export default memo(Single, (prevProps, nextProps) => {
  return prevProps.state === nextProps.state && prevProps.loading === nextProps.loading;
});
