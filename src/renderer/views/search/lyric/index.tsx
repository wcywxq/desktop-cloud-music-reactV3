import React from "react";
import { SearchState } from "@/typings";

interface IProps {
  state?: Partial<
    SearchState.Single &
      SearchState.Album &
      SearchState.Singer &
      SearchState.Playlist &
      SearchState.User &
      SearchState.Lyric &
      SearchState.Radio &
      SearchState.Video
  >;
}

const Lyric: React.FC<IProps> = props => {
  const { state } = props;

  return (
    <pre>
      <code>{JSON.stringify(state, null, 2)}</code>
    </pre>
  );
};

export default Lyric;
