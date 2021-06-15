import Loadable from "react-loadable";
import { RouteConfig } from "react-router-config";
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
            path: "/detail/song/:id",
            title: "歌单详情",
            component: Loadable({ loading: Loading, loader: () => import("@/views/detail/song") })
          }
        ]
      }
    ]
  }
];

export default routes;
