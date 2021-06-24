// cloudsearch
import { request } from "@/utils";

type SearchType = 1 | 10 | 100 | 1000 | 1002 | 1004 | 1006 | 1009 | 1014 | 1018;

export interface SearchParams {
  keywords: string;
  type?: SearchType;
  limit?: number;
  offset?: number;
}

/**
 * @description 关键字搜索
 * @returns
 */
export const searchWithKeywords = (params: SearchParams) => request("/cloudsearch", { params });
