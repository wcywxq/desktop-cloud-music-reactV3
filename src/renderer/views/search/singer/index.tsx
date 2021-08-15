import React from "react";
import { SearchRouteType } from "@/typings";

const Singer: React.FC<SearchRouteType> = ({ state, loading }) => {
  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

export default Singer;
