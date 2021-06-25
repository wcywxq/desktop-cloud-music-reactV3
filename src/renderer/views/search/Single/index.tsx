import React, { memo } from "react";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { HeartOutlined, DownloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { SearchStateType, SongsStruct, AuthorStruct, AlbumStruct } from "@/typings";
import { Text } from "@/components/text";

interface IProps {
  loading?: boolean;
  children?: React.ReactNode;
  state?: SearchStateType;
}

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
      <Text ellipsis title={scope}>
        {scope}
      </Text>
    )
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

const Single: React.FC<IProps> = props => {
  const { state, loading } = props;

  console.log(props);

  console.log("渲染~~~");

  return (
    <Table<SongsStruct>
      size="small"
      rowKey={record => record.id}
      loading={loading}
      columns={columns}
      dataSource={state?.songs}
    />
  );
};

export default memo(Single, (prevProps, nextProps) => {
  return prevProps.state === nextProps.state && prevProps.loading === nextProps.loading;
});
