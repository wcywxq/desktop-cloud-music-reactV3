import React, { memo } from "react";
import { SearchStateType } from "@/typings";

interface IProps {
  loading?: boolean;
  children?: React.ReactNode;
  state?: SearchStateType;
}

const Lyric: React.FC<IProps> = props => {
  const { state, loading } = props;

  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

export default memo(Lyric, (prevProps, nextProps) => {
  return prevProps.state === nextProps.state && prevProps.loading === nextProps.loading;
});
