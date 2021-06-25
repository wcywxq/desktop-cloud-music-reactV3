import React, { useEffect, useState } from "react";
import { Space, Table, Spin } from "antd";
import dayjs from "dayjs";
import { HeartOutlined, DownloadOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Text } from "@/components/text";
import type { AlbumStruct, AuthorStruct, SongsStruct, DetailRouteType } from "@/typings";
import { getSongDetail } from "../api";

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

const Songs: React.FC<DetailRouteType> = ({ state }) => {
  const [listData, setListData] = useState<SongsStruct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (ids: string) => {
      setLoading(true);
      try {
        const { songs }: { songs: SongsStruct[] } = await getSongDetail({ ids });
        setListData(songs);
      } catch (err) {
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    };
    if (state) {
      const { trackIds } = state;
      const ids = trackIds?.map(item => item.id).join();
      if (ids) {
        fetchData(ids);
      }
    }
  }, [state]);

  return (
    <Table<SongsStruct>
      size="small"
      rowKey={record => record.id}
      loading={loading}
      columns={columns}
      dataSource={listData}
      pagination={{ size: "small", pageSizeOptions: ["50"], showSizeChanger: false, showQuickJumper: true }}
    />
  );
};

export default Songs;
