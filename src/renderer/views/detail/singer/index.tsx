import React from "react";
import { RouteConfigComponentProps } from "react-router-config";

const SingerDetail: React.FC<RouteConfigComponentProps<{ id: string }>> = ({ match, history, location }) => {
  const { id } = match.params;
  return <>歌手详情{id}</>;
};

export default SingerDetail;
