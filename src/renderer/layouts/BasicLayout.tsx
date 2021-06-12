import React from "react";
import { Layout, Space, Card } from "antd";
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
import { Link } from "react-router-dom";
import styled from "styled-components";
import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
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
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100% - 200px);
  background-color: #ffffff !important;
`;

const BasicLayoutContent = styled(Content)`
  margin: 64px 0;
  padding: 20px;
  background-color: #fff;
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
  padding: 5px 0;
  color: #9b9b9b;
  transform: scale(0.9);

  svg {
    font-size: 16px;
    cursor: pointer;
  }
`;

const SiderSubMenuItem = styled(Link)`
  display: block;
  width: 100%;
  padding: 5px 10px;
  color: ${(props: { active: 1 | 0 }) => (props.active === 1 ? "#ff4d4f" : "#333")};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #ff4d4f;
  }
`;

type MenuPropsType = {
  key: string;
  title: string;
  extra?: React.ReactNode;
  children?: Array<
    MenuPropsType & {
      icon: React.ReactNode;
      path: string;
    }
  >;
};

const menuList: MenuPropsType[] = [
  {
    key: "recommend",
    title: "推荐",
    children: [
      { key: "discovery", title: "发现", icon: <CompassOutlined />, path: "/discovery" },
      { key: "fm", title: "私人FM", icon: <WifiOutlined />, path: "/fm" },
      { key: "video", title: "视频", icon: <YoutubeOutlined />, path: "/video" },
      { key: "friend", title: "朋友", icon: <WindowsOutlined />, path: "/friend" }
    ]
  },
  {
    key: "personalMusic",
    title: "我的音乐",
    children: [
      { key: "iTunes", title: "iTunes音乐", icon: <WindowsOutlined />, path: "/iTunes" },
      { key: "download", title: "下载管理", icon: <DownloadOutlined />, path: "/download" },
      { key: "cloud", title: "我的音乐云盘", icon: <CloudDownloadOutlined />, path: "/cloud" },
      { key: "collect", title: "我的收藏", icon: <StarOutlined />, path: "/collect" }
    ]
  },
  {
    key: "createPlayList",
    title: "创建的歌单",
    extra: <PlusCircleOutlined />,
    children: [
      { key: "loveMusic", title: "我喜欢的音乐", icon: <HeartOutlined />, path: "/loveMusic" },
      { key: "hotSearch", title: "热搜", icon: <SearchOutlined />, path: "/hotSearch" }
    ]
  }
];

const BasicLayout = observer((props: RouteConfigComponentProps) => {
  const { route, location } = props;
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
                <SiderSubMenuItem key={child.key} to={child.path} active={location.pathname === child.path ? 1 : 0}>
                  <Space>
                    <span className="menu-item-icon">{child.icon}</span>
                    <span className="menu-item-subTitle">{child.title}</span>
                  </Space>
                </SiderSubMenuItem>
              ))}
            </SiderMenuItem>
          ))}
        </BasicLayoutSider>
        <Layout>
          <BasicLayoutHeader>
            <HeaderControl />
          </BasicLayoutHeader>
          <BasicLayoutContent>{renderRoutes(route?.routes)}</BasicLayoutContent>
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
