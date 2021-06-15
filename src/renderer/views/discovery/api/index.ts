import request from "@/utils/request";

export type BannerType = {
  type: 0 | 1 | 2 | 3;
};

export type RecommendPlayListType = {
  limit: number;
};

/**
 * @description 获取轮播图数据
 * @returns
 */
export const getBanners = (params: BannerType = { type: 0 }) => request("/banner", { params });

/**
 * @description 推荐歌单
 * @returns
 */
export const getRecommendPlayList = (params: RecommendPlayListType = { limit: 10 }) =>
  request("/personalized", { params });
