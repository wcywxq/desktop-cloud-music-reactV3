import React, { memo } from "react";
import { SearchRouteType } from "@/typings";

const Video: React.FC<SearchRouteType> = props => {
  const { state, loading } = props;

  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

export default memo(Video, (prevProps, nextProps) => {
  return prevProps.state === nextProps.state && prevProps.loading === nextProps.loading;
});
