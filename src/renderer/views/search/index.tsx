import React, { useState, useEffect } from "react";
import type { RouteConfigComponentProps } from "react-router-config";
import qs from "query-string";
import { useTabActive } from "@/hooks";
import { Tabs, TabPaneStruct } from "@/components/tabs";
import { Text } from "@/components/text";
import type { SearchDataType } from "@/typings";
import { searchWithKeywords } from "./api";

const { TabPane } = Tabs;

const Search: React.FC<RouteConfigComponentProps> = props => {
  const { location } = props;
  const { keywords } = qs.parse(location.search) as { keywords: string };
  const [loading, setLoading] = useState<boolean>(false);

  const tabPaneList: TabPaneStruct[] = [
    { key: "single", title: "单曲", component: <>单曲</> },
    { key: "singer", title: "歌手", component: <>歌手</> },
    { key: "album", title: "专辑", component: <>专辑</> },
    { key: "video", title: "视频", component: <>视频</> },
    { key: "playlist", title: "歌单", component: <>歌单</> },
    { key: "lyric", title: "歌词", component: <>歌词</> },
    { key: "radio", title: "主播电台", component: <>主播电台</> },
    { key: "user", title: "用户", component: <>用户</> }
  ];

  const { activeKey, setActiveKey, activeColor } = useTabActive(tabPaneList.map(item => item.key));

  useEffect(() => {
    const fetchData = async (keywords: string) => {
      setLoading(true);
      try {
        const { result }: { result: SearchDataType.Single } = await searchWithKeywords({ keywords });
        console.log(result);
        // setDataSet(playlist);
      } catch (err) {
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData(keywords);
  }, [keywords]);

  /**
   * @description 选项卡切换监听
   * @param currentActiveKey
   */
  const onTabsChange = (currentActiveKey: string) => {
    setActiveKey(currentActiveKey);
    // history.push(`${match.url}/${currentActiveKey}?id=${id}`);
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
