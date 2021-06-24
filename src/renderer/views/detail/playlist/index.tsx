import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Avatar, Button, Space, Divider, Tabs, Skeleton } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { RouteConfigComponentProps } from "react-router-config";
import styled from "styled-components";
import qs from "query-string";
import { transformDate, transformUnit } from "@/utils";
import { PlayCount } from "@/components/core";
import { Text } from "@/components/text";
import { RaiseButton } from "@/components/button";
import { SearchInput } from "@/components/input";
import { IconFont } from "@/components/icon";
import SongList from "./songs";
import Collector from "./collector";
import Comments from "./comments";
import { getPlaylistDetail } from "./api";
import type { DetailDataType } from "./typeing";

const { TabPane } = Tabs;

const Image = styled(Avatar)`
  position: relative;
  border-radius: 10px;
`;

const TabControl = styled(Tabs)`
  .ant-tabs-ink-bar {
    background: transparent;
  }
  .ant-tabs-nav {
    &:before {
      border-bottom: none;
    }
  }
`;

const PlaylistDetail: React.FC<RouteConfigComponentProps> = props => {
  const { match, history, location } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSet, setDataSet] = useState<DetailDataType.Playlist>();
  const [activeKey, setActiveKey] = useState<string>("songs");
  const { id } = qs.parse(location.search) as { id: string };

  const activeColor = useCallback(
    (currentKey: string) => {
      return activeKey === currentKey ? "#333" : "#9b9b9b";
    },
    [activeKey]
  );

  useEffect(() => {
    const fetchData = async (id: string) => {
      setLoading(true);
      try {
        const { playlist }: { playlist: DetailDataType.Playlist } = await getPlaylistDetail({ id });
        setDataSet(playlist);
      } catch (err) {
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData(id);
  }, [id]);

  useEffect(() => {
    const { pathname } = location;
    const activePath = pathname.split("/").slice(-1)[0];
    setActiveKey(activePath);
  }, [location]);

  /**
   * @description 选项卡切换监听
   * @param currentActiveKey
   */
  const onTabsChange = (currentActiveKey: string) => {
    setActiveKey(currentActiveKey);
    history.push(`${match.url}/${currentActiveKey}?id=${id}`);
  };

  return (
    <Skeleton active avatar loading={loading}>
      <Row style={{ gap: "25px" }}>
        <Col>
          <Image shape="square" size={190} src={dataSet?.coverImgUrl} />
          <PlayCount value={dataSet?.playCount || 0} />
        </Col>
        <Col flex={1}>
          <Space size="large" direction="vertical">
            <Space style={{ width: "100%" }}>
              <Button danger size="small">
                歌单
              </Button>
              <Text size={18} strong ellipsis active="#333" title={dataSet?.name}>
                {dataSet?.name}
              </Text>
            </Space>
            <Space style={{ width: "100%" }}>
              <Avatar size="small" src={dataSet?.creator?.avatarUrl} />
              <Text size={13} strong color="#cc8e4b" title={dataSet?.creator?.nickname}>
                {dataSet?.creator?.nickname}
              </Text>
              <Text size={13} color="#8c8c8c" title={`${transformDate(dataSet?.createTime)}创建`}>
                {transformDate(dataSet?.createTime)}创建
              </Text>
            </Space>
            <Space style={{ width: "100%" }}>
              <RaiseButton color="#fff" background="#ff4d4f" icon={<IconFont type="icon-play" />}>
                继续播放
              </RaiseButton>
              <RaiseButton color="#333" background="#f5f5f5" activebackground="#ddd" icon={<StarOutlined />}>
                收藏({transformUnit(dataSet?.subscribedCount || 0)})
              </RaiseButton>
              <RaiseButton color="#333" background="#f5f5f5" activebackground="#ddd">
                ...
              </RaiseButton>
            </Space>
          </Space>
        </Col>
      </Row>
      <Divider />
      <TabControl
        activeKey={activeKey}
        tabBarExtraContent={<SearchInput placeholder="搜索歌单音乐" />}
        onChange={onTabsChange}>
        <TabPane
          key="songs"
          tab={
            <Text size={16} strong color={activeColor("songs")} active={activeColor("songs")}>
              歌曲列表({dataSet?.trackIds.length || 0})
            </Text>
          }>
          <SongList data={dataSet} />
        </TabPane>
        <TabPane
          key="comments"
          tab={
            <Text size={16} strong color={activeColor("comments")} active={activeColor("comments")}>
              评论({dataSet?.commentCount || 0})
            </Text>
          }>
          <Comments data={dataSet} />
        </TabPane>
        <TabPane
          key="collector"
          tab={
            <Text size={16} strong color={activeColor("collector")} active={activeColor("collector")}>
              收藏者
            </Text>
          }>
          <Collector />
        </TabPane>
      </TabControl>
    </Skeleton>
  );
};

export default PlaylistDetail;
