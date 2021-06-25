import { request } from "@/utils";

/**
 * @description 获取歌单详情
 * @returns
 */
export const getPlaylistDetail = (params: { id: string }) => request("/playlist/detail", { params });

/**
 * @description 获取歌曲详情
 * @param params
 * @returns
 */
export const getSongDetail = (params: { ids: string; }) => request("/song/detail", { params });

/**
 * @description 获取歌单评论
 * @param params
 * @returns
 */
export const getPlaylistComments = (params: { id: string; limit: number; offset: number }) =>
  request("/comment/playlist", { params });
