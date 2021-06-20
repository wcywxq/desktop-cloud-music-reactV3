import React, { useEffect } from "react";
import type { DetailSongDataType } from "../index";

type IProps = {
  data?: DetailSongDataType;
};

const List: React.FC<IProps> = props => {
  const { data } = props;

  useEffect(() => {
    if (data) {
      const { trackIds } = data;
      console.log(trackIds);
    }
  }, [data]);

  return <>歌曲列表</>;
};

export default List;
