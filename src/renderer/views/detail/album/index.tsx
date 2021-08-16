import React from "react";
import { RouteConfigComponentProps } from "react-router-config";

const AlbumDetail: React.FC<RouteConfigComponentProps<{ id: string }>> = ({ match }) => {
  const { id } = match.params;

  return <>专辑详情{id}</>;
};

export default AlbumDetail;
