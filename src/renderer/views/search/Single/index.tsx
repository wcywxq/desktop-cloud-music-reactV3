import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
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
const renderHitContent = (str: string, keywords: string): JSX.Element => {
  let arr = str.split(keywords);
  let len = arr.length;
  if (!len) return <React.Fragment>{str}</React.Fragment>;
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

const Single: React.FC<SearchRouteType> = ({ state, loading }) => {
  const location = useLocation();
  const history = useHistory();
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
      render: (scope: string) => (
        <Text ellipsis title={scope} active="#333">
          {renderHitContent(scope, keywords)}
        </Text>
      )
    },
    {
      title: "歌手",
      dataIndex: "ar",
      width: "15%",
      render: (scope: AuthorStruct[]) => (
        <Text ellipsis title={scope.map(author => author.name).join(" / ")} active="#333">
          {scope.map((author, index) => (
            <React.Fragment key={author.id}>
              <Text color="#777" active="#333" onClick={() => history.push(`/detail/singer/${author.id}`)}>{renderHitContent(author.name, keywords)}</Text>
              {index !== scope.length - 1 && " / "}
            </React.Fragment>
          ))}
        </Text>
      )
    },
    {
      title: "专辑",
      dataIndex: "al",
      width: "25%",
      render: (scope: AlbumStruct) => (
        <Link to={`/detail/album/${scope.id}`}>
          <Text ellipsis title={scope.name} active="#333">
            {renderHitContent(scope.name, keywords)}
          </Text>
        </Link>
      )
    },
    {
      title: "时长",
      dataIndex: "dt",
      width: "10%",
      render: (scope: Date) => <Text color="#9b9b9b">{dayjs(scope).format("mm:ss")}</Text>
    }
  ];

  return <Table<SongsStruct> size="small" rowKey={record => record.id} loading={loading} columns={columns} dataSource={state?.songs} />;
};

export default Single;
