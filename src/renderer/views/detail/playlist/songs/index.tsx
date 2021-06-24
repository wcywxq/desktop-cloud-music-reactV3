import React, { useEffect, useState } from "react";
import { Space, Table, Spin } from "antd";
import dayjs from "dayjs";
import { HeartOutlined, DownloadOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Text } from "@/components/text";
import type { PlaylistDataType } from "../typeing";
import { getSongDetail } from "../api";

interface IAuthor {
  id: number;
  name: string;
}

interface IAlbum {
  id: number;
  name: string;
}

interface ISongs {
  id: number;
  name: string;
  ar: IAuthor[];
  al: IAlbum;
  dt: Date;
}

const columns: ColumnsType<ISongs> = [
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
    render: (scope: IAuthor[]) => (
      <Text ellipsis title={scope.map(author => author.name).join(" / ")}>
        {scope.map(author => author.name).join(" / ")}
      </Text>
    )
  },
  {
    title: "专辑",
    dataIndex: "al",
    width: "25%",

    render: (scope: IAlbum) => (
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

const Songs: React.FC<PlaylistDataType> = props => {
  const { data } = props;
  const [listData, setListData] = useState<ISongs[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (ids: string) => {
      setLoading(true);
      try {
        const { songs }: { songs: ISongs[] } = await getSongDetail({ ids });
        setListData(songs);
      } catch (err) {
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    };
    if (data) {
      const { trackIds } = data;
      const ids = trackIds.map(item => item.id).join();
      fetchData(ids);
    }
  }, [data]);

  return (
    <Table<ISongs>
      size="small"
      rowKey={record => record.id}
      loading={loading}
      columns={columns}
      dataSource={listData}
    />
  );
};

export default Songs;
