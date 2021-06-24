import type { SearchType } from "@/typings";

export const SEARCH_TYPE_MAP: { [key: string]: SearchType } = {
  single: "1",
  singer: "100",
  album: "10",
  video: "1014",
  playlist: "1000",
  lyric: "1006",
  radio: "1009",
  user: "1002"
};
