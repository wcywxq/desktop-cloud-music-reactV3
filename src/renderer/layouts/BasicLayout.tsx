import React from "react";
import { Layout, Space } from "antd";
import {
  CloudDownloadOutlined,
  CompassOutlined,
  DownloadOutlined,
  HeartOutlined,
  SearchOutlined,
  StarOutlined,
  WifiOutlined,
  WindowsOutlined,
  YoutubeOutlined,
  PlusCircleOutlined
} from "@ant-design/icons";
import styled from "styled-components";
import MusicPlayer from "@/components/MusicPlayer";
import HeaderControl from "@/components/HeaderControl";
import PlayListDrawer from "@/components/PlayListDrawer";
import { observer, useLocalObservable } from "mobx-react-lite";
import store from "@/store";

const { Sider, Header, Content, Footer } = Layout;

const BasicLayoutContainer = styled(Layout)`
  position: relative;
  min-height: 100vh !important;
`;

const BasicLayoutSider = styled(Sider)`
  background-color: #f5f5f5 !important;
`;

const BasicLayoutHeader = styled(Header)`
  background-color: #ffffff !important;
`;

const BasicLayoutFooter = styled(Footer)`
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 0 20px;
  background-color: #f5f5f5 !important;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
  z-index: 1000;
`;

const SiderMenuItem = styled.div`
  padding: 5px 10px;
`;

const SiderMenuItemTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  color: #9b9b9b;

  svg {
    font-size: 16px;
    cursor: pointer;
  }
`;

const SiderSubMenuItem = styled(Space)`
  width: 100%;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    color: #ff4d4f;
  }
`;

type MenuPropsType = {
  key: string | number;
  title: string;
  extra?: React.ReactNode;
  children?: Array<MenuPropsType & { icon: React.ReactNode }>;
};

const menuList: MenuPropsType[] = [
  {
    key: "recommend",
    title: "推荐",
    children: [
      { key: "find", title: "发现", icon: <CompassOutlined /> },
      { key: "fm", title: "私人FM", icon: <WifiOutlined /> },
      { key: "video", title: "视频", icon: <YoutubeOutlined /> },
      { key: "friend", title: "朋友", icon: <WindowsOutlined /> }
    ]
  },
  {
    key: "personalMusic",
    title: "我的音乐",
    children: [
      { key: "iTunes", title: "iTunes音乐", icon: <WindowsOutlined /> },
      { key: "download", title: "下载管理", icon: <DownloadOutlined /> },
      { key: "cloud", title: "我的音乐云盘", icon: <CloudDownloadOutlined /> },
      { key: "collect", title: "我的收藏", icon: <StarOutlined /> }
    ]
  },
  {
    key: "createPlayList",
    title: "创建的歌单",
    extra: <PlusCircleOutlined />,
    children: [
      { key: "loveMusic", title: "我喜欢的音乐", icon: <HeartOutlined /> },
      { key: "hotSearch", title: "热搜", icon: <SearchOutlined /> }
    ]
  }
];

const BasicLayout = observer(() => {
  const { common } = useLocalObservable(() => store);

  return (
    <React.Fragment>
      <BasicLayoutContainer>
        <BasicLayoutSider>
          {menuList.map(menu => (
            <SiderMenuItem key={menu.key}>
              <SiderMenuItemTitle>
                <span>{menu.title}</span>
                <span>{menu.extra}</span>
              </SiderMenuItemTitle>
              {menu.children?.map(child => (
                <SiderSubMenuItem key={child.key}>
                  <span className="menu-item-icon">{child.icon}</span>
                  <span className="menu-item-subTitle">{child.title}</span>
                </SiderSubMenuItem>
              ))}
            </SiderMenuItem>
          ))}
        </BasicLayoutSider>
        <Layout>
          <BasicLayoutHeader>
            <HeaderControl />
          </BasicLayoutHeader>
          <Content>{common.visiblePlayList ? 1 : 2}</Content>
        </Layout>
        <BasicLayoutFooter>
          <MusicPlayer />
        </BasicLayoutFooter>
      </BasicLayoutContainer>
      {/* 全局播放列表滑动窗口 */}
      <PlayListDrawer visible={common.visiblePlayList} />
    </React.Fragment>
  );
});

export default BasicLayout;
