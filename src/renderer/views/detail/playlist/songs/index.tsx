import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import dayjs from "dayjs";
import { HeartOutlined, DownloadOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Text } from "@/components/core";
import type { PropsDataType } from "../index";
import { getSongDetail } from "../api";

type Author = { id: number; name: string };

type Album = { id: number; name: string };

type SongsStruct = {
  id: number;
  name: string;
  ar: Author[];
  al: Album;
  dt: Date;
};

type SongsType = {
  songs: SongsStruct[];
};

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
    render: (scope: Author[]) => (
      <Text ellipsis title={scope.map(author => author.name).join(" / ")}>
        {scope.map(author => author.name).join(" / ")}
      </Text>
    )
  },
  {
    title: "专辑",
    dataIndex: "al",
    width: "25%",

    render: (scope: Album) => (
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

const Songs: React.FC<PropsDataType> = props => {
  const { data } = props;
  const [listData, setListData] = useState<SongsStruct[]>([]);

  useEffect(() => {
    const fetchData = async (ids: string) => {
      const { songs }: SongsType = await getSongDetail({ ids });
      setListData(songs);
    };
    if (data) {
      const { trackIds } = data;
      const ids = trackIds.map(item => item.id).join();
      fetchData(ids);
    }
  }, [data]);

  return <Table<SongsStruct> size="small" rowKey={record => record.id} columns={columns} dataSource={listData} />;
};

export default Songs;
