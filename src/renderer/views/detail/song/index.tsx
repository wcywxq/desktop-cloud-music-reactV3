import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Avatar, Button, Space, Divider, Tabs } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { RouteConfigComponentProps } from "react-router-config";
import styled from "styled-components";
import qs from "query-string";
import { PlayCount, Text, RaiseButton, IconFont, Search } from "@/components/core";
import { transformDate, transformUnit } from "@/utils";
import SongList from "./list";
import Collector from "./collector";
import Comments from "./comments";
import { getSongDetail } from "./api";

type Creator = {
  avatarUrl: string;
  nickname: string;
};

export type DetailSongDataType = {
  id: number;
  coverImgUrl: string;
  playCount: number;
  name: string;
  creator: Creator;
  createTime: Date;
  subscribedCount: number;
  trackIds: number[]; // trackIds 可用来调用 song/detail 获取详细信息
};

const { TabPane } = Tabs;

const Flex = styled(Row)`
  gap: 25px;
`;

const Image = styled(Avatar)`
  position: relative;
  border-radius: 10px;
`;

const SpaceContainer = styled(Space)`
  width: 100%;
`;

const MessageContainer = styled.div``;

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

const DetailSong: React.FC<RouteConfigComponentProps<{ id: string }>> = props => {
  const { match, history, location } = props;
  const [dataSet, setDataSet] = useState<DetailSongDataType>();
  const [activeKey, setActiveKey] = useState<string>("list");
  const { id } = qs.parse(location.search) as { id: string };

  const activeColor = useCallback(
    (currentKey: string) => {
      return activeKey === currentKey ? "#333" : "#9b9b9b";
    },
    [activeKey]
  );

  useEffect(() => {
    const fetchData = async (id: string) => {
      const { playlist }: { playlist: DetailSongDataType } = await getSongDetail({ id });
      setDataSet(playlist);
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
    <>
      <MessageContainer>
        <Flex>
          <Col>
            <Image shape="square" size={190} src={dataSet?.coverImgUrl} />
            <PlayCount value={dataSet?.playCount || 0} />
          </Col>
          <Col flex={1}>
            <Space size="large" direction="vertical">
              <SpaceContainer>
                <Button danger size="small">
                  歌单
                </Button>
                <Text size={18} strong ellipsis active="#333" title={dataSet?.name}>
                  {dataSet?.name}
                </Text>
              </SpaceContainer>
              <SpaceContainer>
                <Avatar size="small" src={dataSet?.creator?.avatarUrl} />
                <Text size={13} strong color="#cc8e4b" title={dataSet?.creator?.nickname}>
                  {dataSet?.creator?.nickname}
                </Text>
                <Text size={13} color="#8c8c8c" title={`${transformDate(dataSet?.createTime)}创建`}>
                  {transformDate(dataSet?.createTime)}创建
                </Text>
              </SpaceContainer>
              <SpaceContainer>
                <RaiseButton color="#fff" background="#ff4d4f" icon={<IconFont type="icon-play" />}>
                  继续播放
                </RaiseButton>
                <RaiseButton color="#333" background="#f5f5f5" activebackground="#ddd" icon={<StarOutlined />}>
                  收藏({transformUnit(dataSet?.subscribedCount || 0)})
                </RaiseButton>
                <RaiseButton color="#333" background="#f5f5f5" activebackground="#ddd">
                  ...
                </RaiseButton>
              </SpaceContainer>
            </Space>
          </Col>
        </Flex>
      </MessageContainer>
      <Divider />
      <TabControl
        activeKey={activeKey}
        tabBarExtraContent={<Search placeholder="搜索歌单音乐" />}
        onChange={onTabsChange}>
        <TabPane
          key="list"
          tab={
            <Text size={16} strong color={activeColor("list")} active={activeColor("list")}>
              歌曲列表
            </Text>
          }>
          <SongList data={dataSet} />
        </TabPane>
        <TabPane
          key="comments"
          tab={
            <Text size={16} strong color={activeColor("comments")} active={activeColor("comments")}>
              评论
            </Text>
          }>
          <Comments />
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
    </>
  );
};

export default DetailSong;
