import React, { memo } from "react";
import { SearchStateType } from "@/typings";

interface IProps {
  loading?: boolean;
  children?: React.ReactNode;
  state?: SearchStateType;
}

const User: React.FC<IProps> = props => {
  const { state } = props;

  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

export default memo(User, (prevProps, nextProps) => {
  return prevProps.state === nextProps.state && prevProps.loading === nextProps.loading;
});
