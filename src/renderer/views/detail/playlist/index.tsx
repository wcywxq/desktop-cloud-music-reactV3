import React, { useEffect, useState } from "react";
import { Row, Col, Avatar, Button, Space, Divider, Skeleton } from "antd";
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
import { Tabs, TabPaneStruct } from "@/components/tabs";
import { useTabActive } from "@/hooks";
import SongList from "./songs";
import Collector from "./collector";
import Comments from "./comments";
import { getPlaylistDetail } from "./api";
import type { DetailStateType, DetailRouteType } from "@/typings";

const { TabPane } = Tabs;

const Image = styled(Avatar)`
  position: relative;
  border-radius: 10px;
`;

const PlaylistDetail: React.FC<RouteConfigComponentProps> = ({ match, history, location }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSet, setDataSet] = useState<DetailStateType>();
  const { id } = qs.parse(location.search) as { id: string };
  const tabPaneList: TabPaneStruct<DetailRouteType>[] = [
    {
      key: "songs",
      title: `歌曲列表(${dataSet?.trackIds?.length || 0})`,
      component: (props: DetailRouteType) => <SongList {...props} />
    },
    {
      key: "comments",
      title: `评论(${dataSet?.commentCount || 0})`,
      component: (props: DetailRouteType) => <Comments {...props} />
    },
    { key: "collector", title: `收藏者`, component: (props: DetailRouteType) => <Collector {...props} /> }
  ];
  const { activeKey, setActiveKey, activeColor } = useTabActive(tabPaneList.map(item => item.key));
  const activePath = location.pathname.split("/").slice(-1)[0];

  useEffect(() => {
    const fetchData = async (id: string) => {
      setLoading(true);
      try {
        const { playlist }: { playlist: DetailStateType } = await getPlaylistDetail({ id });
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
    setActiveKey(activePath);
  }, [activePath, setActiveKey]);

  /**
   * @description 选项卡切换监听
   * @param currentActiveKey
   */
  const onTabsChange = (currentActiveKey: string) => {
    setActiveKey(currentActiveKey);
    history.push(`${match.url}/${currentActiveKey}?id=${id}`);
  };

  return (
    <Skeleton active avatar={{ shape: "square", size: 160 }} loading={loading}>
      <Row style={{ gap: "25px" }}>
        <Col>
          <Image shape="square" size={160} src={dataSet?.coverImgUrl} />
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
      <Tabs
        activeKey={activeKey}
        tabBarExtraContent={<SearchInput placeholder="搜索歌单音乐" />}
        onChange={onTabsChange}>
        {tabPaneList.map(item => (
          <TabPane
            key={item.key}
            tab={
              <Text size={16} strong color={activeColor(item.key)} active={activeColor(item.key)}>
                {item.title}
              </Text>
            }>
            {React.createElement<DetailRouteType>(item.component, {
              state: dataSet,
              loading
            })}
          </TabPane>
        ))}
      </Tabs>
    </Skeleton>
  );
};

export default PlaylistDetail;
