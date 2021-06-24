import { request } from "@/utils";

type BannerType = 0 | 1 | 2 | 3;

export interface IBanner {
  type: BannerType;
}

export interface IRecommendPlaylist {
  limit: number;
}

/**
 * @description 获取轮播图数据
 * @returns
 */
export const getBanners = (params: IBanner = { type: 0 }) => request("/banner", { params });

/**
 * @description 推荐歌单
 * @returns
 */
export const getRecommendPlaylist = (params: IRecommendPlaylist = { limit: 10 }) =>
  request("/personalized", { params });
