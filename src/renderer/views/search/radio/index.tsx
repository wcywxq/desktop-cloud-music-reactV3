import React from "react";
import { SearchRouteType } from "@/typings";

const Radio: React.FC<SearchRouteType> = ({ state }) => {
  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

export default Radio;
