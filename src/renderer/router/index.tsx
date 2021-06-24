import React from "react";
import Loadable from "react-loadable";
import { RouteConfig } from "react-router-config";
import { Redirect } from "react-router-dom";
import Loading from "@/components/Loading";
import BasicLayout from "@/layouts/BasicLayout";
import RouterView from "@/layouts/RouterView";

export interface Routes extends RouteConfig {
  routes?: Routes[];
  hiddenInMenu?: boolean;
  icon?: React.ReactNode;
}

const routes: Routes[] = [
  {
    path: "/",
    component: BasicLayout,
    routes: [
      {
        path: "/discovery",
        title: "发现",
        component: Loadable({ loading: Loading, loader: () => import("@/views/discovery") })
      },
      {
        path: "/fm",
        title: "私人FM",
        component: Loadable({ loading: Loading, loader: () => import("@/views/fm") })
      },
      {
        path: "/video",
        title: "视频",
        component: Loadable({ loading: Loading, loader: () => import("@/views/video") })
      },
      {
        path: "/friend",
        title: "朋友",
        component: Loadable({ loading: Loading, loader: () => import("@/views/friend") })
      },
      {
        path: "/iTunes",
        title: "iTunes音乐",
        component: Loadable({ loading: Loading, loader: () => import("@/views/iTunes") })
      },
      {
        path: "/download",
        title: "下载管理",
        component: Loadable({ loading: Loading, loader: () => import("@/views/download") })
      },
      {
        path: "/cloud",
        title: "我的音乐云盘",
        component: Loadable({ loading: Loading, loader: () => import("@/views/cloud") })
      },
      {
        path: "/collect",
        title: "我的收藏",
        component: Loadable({ loading: Loading, loader: () => import("@/views/collect") })
      },
      {
        path: "/setting",
        title: "设置",
        component: Loadable({ loading: Loading, loader: () => import("@/views/setting") })
      },
      {
        path: "/detail",
        title: "详情",
        component: RouterView,
        routes: [
          {
            path: "/detail/playlist",
            title: "歌单详情",
            component: Loadable({ loading: Loading, loader: () => import("@/views/detail/playlist") }),
            routes: [
              {
                path: "/detail/playlist/songs",
                title: "歌曲列表",
                component: Loadable({ loading: Loading, loader: () => import("@/views/detail/playlist/songs") })
              },
              {
                path: "/detail/playlist/comments",
                title: "评论",
                component: Loadable({ loading: Loading, loader: () => import("@/views/detail/playlist/comments") })
              },
              {
                path: "/detail/playlist/collector",
                title: "收藏者",
                component: Loadable({ loading: Loading, loader: () => import("@/views/detail/playlist/collector") })
              }
            ]
          }
        ]
      },
      {
        path: "/search",
        title: "搜索",
        component: Loadable({ loading: Loading, loader: () => import("@/views/search") }),
        routes: [
          {
            path: "/search/single",
            title: "单曲",
            component: Loadable({ loading: Loading, loader: () => import("@/views/search/single") })
          },
          {
            path: "/search/singer",
            title: "歌手",
            component: Loadable({ loading: Loading, loader: () => import("@/views/search/singer") })
          },
          {
            path: "/search/album",
            title: "专辑",
            component: Loadable({ loading: Loading, loader: () => import("@/views/search/album") })
          },
          {
            path: "/search/video",
            title: "视频",
            component: Loadable({ loading: Loading, loader: () => import("@/views/search/video") })
          },
          {
            path: "/search/playlist",
            title: "歌单",
            component: Loadable({ loading: Loading, loader: () => import("@/views/search/playlist") })
          },
          {
            path: "/search/lyric",
            title: "歌词",
            component: Loadable({ loading: Loading, loader: () => import("@/views/search/lyric") })
          },
          {
            path: "/search/radio",
            title: "电台",
            component: Loadable({ loading: Loading, loader: () => import("@/views/search/radio") })
          },
          {
            path: "/search/user",
            title: "用户",
            component: Loadable({ loading: Loading, loader: () => import("@/views/search/user") })
          }
        ]
      }
    ]
  }
];

export default routes;
