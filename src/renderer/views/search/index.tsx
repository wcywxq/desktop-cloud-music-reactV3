import React, { useState, useEffect } from "react";
import type { RouteConfigComponentProps } from "react-router-config";
import qs from "query-string";
import { useTabActive } from "@/hooks";
import { Tabs, TabPaneStruct } from "@/components/tabs";
import { Text } from "@/components/text";
import type { SearchState, SearchStateType, SearchType } from "@/typings";
import { searchWithKeywords } from "./api";
import Single from "./Single";

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
    { key: "1", title: "单曲", component: <Single state={dataSet}>单曲</Single> },
    { key: "100", title: "歌手", component: <>歌手</> },
    { key: "10", title: "专辑", component: <>专辑</> },
    { key: "1014", title: "视频", component: <>视频</> },
    { key: "1000", title: "歌单", component: <>歌单</> },
    { key: "1006", title: "歌词", component: <>歌词</> },
    { key: "1009", title: "主播电台", component: <>主播电台</> },
    { key: "1002", title: "用户", component: <>用户</> }
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
    history.push(`${match.url}?keywords=${keywords}&type=${currentActiveKey}`);
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
