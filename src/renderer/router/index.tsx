import Loadable from "react-loadable";
import { RouteConfig } from "react-router-config";
import Loading from "@/components/Loading";
import BasicLayout from "@/layouts/BasicLayout";

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
      }
    ]
  }
];

export default routes;
