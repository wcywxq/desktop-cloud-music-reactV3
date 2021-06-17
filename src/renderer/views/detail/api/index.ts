import { request } from '@/utils';

/**
 * @description 获取歌单详情
 * @returns
 */
export const getSongDetail = (params: { id: string }) => request('/playlist/detail', { params: params });
