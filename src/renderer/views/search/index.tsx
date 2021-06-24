import React, { useState, useEffect } from "react";
import type { RouteConfigComponentProps } from "react-router-config";
import qs from "query-string";
import { useTabActive } from "@/hooks";
import { Tabs, TabPaneStruct } from "@/components/tabs";
import { Text } from "@/components/text";
import type { SearchState, SearchStateType, SearchType } from "@/typings";
import { SEARCH_TYPE_MAP } from "@/utils";
import { searchWithKeywords } from "./api";
import Single from "./single";
import Singer from "./singer";
import Album from "./album";
import Video from "./video";
import Playlist from "./playlist";
import Lyric from "./lyric";
import Radio from "./radio";
import User from "./user";

const { TabPane } = Tabs;

const Search: React.FC<RouteConfigComponentProps> = props => {
  const { match, location, history } = props;
  const { keywords, type } = qs.parse(location.search) as unknown as { keywords: string; type: SearchType };
  const [dataSet, setDataSet] =
    useState<
      Partial<
        SearchState.Single &
          SearchState.Album &
          SearchState.Singer &
          SearchState.Playlist &
          SearchState.User &
          SearchState.Lyric &
          SearchState.Radio &
          SearchState.Video
      >
    >();
  const [loading, setLoading] = useState<boolean>(false);

  const tabPaneList: TabPaneStruct[] = [
    {
      key: "single",
      title: "单曲",
      component: (
        <Single state={dataSet} loading={loading}>
          单曲
        </Single>
      )
    },
    {
      key: "singer",
      title: "歌手",
      component: <Singer state={dataSet}>歌手</Singer>
    },
    {
      key: "album",
      title: "专辑",
      component: <Album state={dataSet}>专辑</Album>
    },
    {
      key: "video",
      title: "视频",
      component: <Video state={dataSet}>视频</Video>
    },
    {
      key: "playlist",
      title: "歌单",
      component: <Playlist state={dataSet}>歌单</Playlist>
    },
    {
      key: "lyric",
      title: "歌词",
      component: <Lyric state={dataSet}>歌词</Lyric>
    },
    {
      key: "radio",
      title: "主播电台",
      component: <Radio state={dataSet}>主播电台</Radio>
    },
    {
      key: "user",
      title: "用户",
      component: <User state={dataSet}>用户</User>
    }
  ];

  const { activeKey, setActiveKey, activeColor } = useTabActive(tabPaneList.map(item => item.key));

  useEffect(() => {
    const fetchData = async (keywords: string, type: SearchType) => {
      setLoading(true);
      try {
        const { result }: SearchStateType = await searchWithKeywords({ keywords, type });
        setDataSet(result);
      } catch (err) {
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData(keywords, type);
  }, [keywords, type]);

  /**
   * @description 选项卡切换监听
   * @param currentActiveKey
   */
  const onTabsChange = (currentActiveKey: string) => {
    setActiveKey(currentActiveKey);
    history.push(`${match.url}?keywords=${keywords}&type=${SEARCH_TYPE_MAP[currentActiveKey]}`);
  };

  return (
    <Tabs activeKey={activeKey} onChange={onTabsChange}>
      {tabPaneList.map(item => (
        <TabPane
          key={item.key}
          tab={
            <Text size={16} strong color={activeColor(item.key)} active={activeColor(item.key)}>
              {item.title}
            </Text>
          }>
          {item.component}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default Search;
