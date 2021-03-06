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
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 1001;
`;

const BasicLayoutHeader = styled(Header)`
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100% - 200px);
  background-color: #ffffff !important;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 999;
`;

const BasicLayoutContent = styled(Content)`
  margin: 64px 0;
  padding: 20px;
  background-color: #fff;
  height: calc(100vh - 128px);
  overflow-y: auto;
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
  z-index: 1001;
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

interface IMenuList {
  key: string;
  title: string;
  extra?: React.ReactNode;
  children?: Array<
    IMenuList & {
      icon: React.ReactNode;
    }
  >;
}

const menuList: IMenuList[] = [
  {
    key: "/recommend",
    title: "??????",
    children: [
      {
        key: "/discovery",
        title: "??????",
        icon: <CompassOutlined />
      },
      {
        key: "/fm",
        title: "??????FM",
        icon: <WifiOutlined />
      },
      {
        key: "/video",
        title: "??????",
        icon: <YoutubeOutlined />
      },
      {
        key: "/friend",
        title: "??????",
        icon: <WindowsOutlined />
      }
    ]
  },
  {
    key: "/personalMusic",
    title: "????????????",
    children: [
      {
        key: "/iTunes",
        title: "iTunes??????",
        icon: <WindowsOutlined />
      },
      {
        key: "/download",
        title: "????????????",
        icon: <DownloadOutlined />
      },
      {
        key: "/cloud",
        title: "??????????????????",
        icon: <CloudDownloadOutlined />
      },
      {
        key: "/collect",
        title: "????????????",
        icon: <StarOutlined />
      }
    ]
  },
  {
    key: "/createPlayList",
    title: "???????????????",
    extra: <PlusCircleOutlined />,
    children: [
      {
        key: "/loveMusic",
        title: "??????????????????",
        icon: <HeartOutlined />
      },
      {
        key: "/hotSearch",
        title: "??????",
        icon: <SearchOutlined />
      }
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
                <SiderSubMenuItem key={child.key} to={child.key} active={location.pathname === child.key ? 1 : 0}>
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
            <HeaderControl {...props} />
          </BasicLayoutHeader>
          <BasicLayoutContent>{renderRoutes(route?.routes)}</BasicLayoutContent>
        </Layout>
        <BasicLayoutFooter>
          <MusicPlayer />
        </BasicLayoutFooter>
      </BasicLayoutContainer>
      {/* ?????????????????????????????? */}
      <PlayListDrawer visible={common.visiblePlayList} />
    </React.Fragment>
  );
});

export default BasicLayout;
