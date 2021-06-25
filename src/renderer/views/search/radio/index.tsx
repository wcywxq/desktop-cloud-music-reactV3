import React, { memo } from "react";
import { SearchRouteType } from "@/typings";

const Radio: React.FC<SearchRouteType> = props => {
  const { state } = props;

  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

export default memo(Radio, (prevProps, nextProps) => {
  return prevProps.state === nextProps.state && prevProps.loading === nextProps.loading;
});
