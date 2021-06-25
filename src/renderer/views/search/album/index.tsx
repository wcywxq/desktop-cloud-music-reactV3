import React, { memo } from "react";
import { SearchRouteType } from "@/typings";

const Album: React.FC<SearchRouteType> = ({ state, loading }) => {
  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

export default memo(Album, (prevProps, nextProps) => {
  return prevProps.state === nextProps.state && prevProps.loading === nextProps.loading;
});
