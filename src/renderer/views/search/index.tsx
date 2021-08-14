import React, { useState, useEffect } from "react";
import type { RouteConfigComponentProps } from "react-router-config";
import qs from "query-string";
import { useTabActive } from "@/hooks";
import { Tabs, TabPaneStruct } from "@/components/tabs";
import { Text } from "@/components/text";
import type { SearchStateType, SearchType, SearchRouteType } from "@/typings";
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

const Search: React.FC<RouteConfigComponentProps> = ({ match, location, history }) => {
  const { keywords } = qs.parse(location.search) as { keywords: string };
  const [dataSet, setDataSet] = useState<SearchStateType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);
  const activePath = location.pathname.split("/").slice(-1)[0];

  const tabPaneList: TabPaneStruct<SearchRouteType>[] = [
    {
      key: "single",
      title: "单曲",
      component: (props: SearchRouteType) => <Single {...props}>单曲</Single>
    },
    {
      key: "singer",
      title: "歌手",
      component: (props: SearchRouteType) => <Singer {...props}>歌手</Singer>
    },
    {
      key: "album",
      title: "专辑",
      component: (props: SearchRouteType) => <Album {...props}>专辑</Album>
    },
    {
      key: "video",
      title: "视频",
      component: (props: SearchRouteType) => <Video {...props}>视频</Video>
    },
    {
      key: "playlist",
      title: "歌单",
      component: (props: SearchRouteType) => <Playlist {...props}>歌单</Playlist>
    },
    {
      key: "lyric",
      title: "歌词",
      component: (props: SearchRouteType) => <Lyric {...props}>歌词</Lyric>
    },
    {
      key: "radio",
      title: "主播电台",
      component: (props: SearchRouteType) => <Radio {...props}>主播电台</Radio>
    },
    {
      key: "user",
      title: "用户",
      component: (props: SearchRouteType) => <User {...props}>用户</User>
    }
  ];

  const { activeKey, setActiveKey, activeColor } = useTabActive(tabPaneList.map(item => item.key));

  useEffect(() => {
    const fetchData = async (keywords: string, type: SearchType) => {
      setLoading(true);
      try {
        const { result }: { result: SearchStateType } = await searchWithKeywords({
          keywords,
          type,
          limit: pageSize,
          offset: (pageNum - 1) * pageSize
        });
        setDataSet(result);
      } catch (err) {
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData(keywords, SEARCH_TYPE_MAP[activePath]);
  }, [activePath, keywords, pageNum, pageSize]);

  useEffect(() => {
    setActiveKey(activePath);
  }, [activePath, setActiveKey]);

  /**
   * @description 选项卡切换监听
   * @param currentActiveKey
   */
  const onTabsChange = (currentActiveKey: string) => {
    setActiveKey(currentActiveKey);
    //  重置分页参数
    setPageNum(1);
    setPageSize(50);
    history.push(`${match.url}/${currentActiveKey}?keywords=${keywords}`);
  };

  /**
   * @description 切换页码
   * @param pageNum
   * @param pageSize
   */
  const handleCurrentChange = (pageNum: number, pageSize?: number) => {
    setPageNum(pageNum);
    pageSize !== undefined && setPageSize(pageSize);
  };

  /**
   * @description 切换每页条目
   * @param pageNum
   * @param pageSize
   */
  const handleSizeChange = (pageNum: number, pageSize: number) => {
    setPageNum(pageNum);
    setPageSize(pageSize);
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
          {React.createElement<SearchRouteType>(item.component, {
            state: dataSet,
            loading,
            pageNum,
            pageSize,
            handleCurrentChange,
            handleSizeChange
          })}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default Search;
