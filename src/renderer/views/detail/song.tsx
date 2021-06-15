import React from "react";
import { RouteConfigComponentProps } from "react-router-config";

const DetailSong: React.FC<RouteConfigComponentProps<{ id: string }>> = props => {
  const { match } = props;

  return <>歌单 {match.params.id}</>;
};

export default DetailSong;
