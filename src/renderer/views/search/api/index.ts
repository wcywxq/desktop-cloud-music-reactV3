// cloudsearch
import { request } from "@/utils";
import type { SearchType } from "@/typings";

export interface SearchParams {
  keywords: string;
  type: SearchType;
  limit?: number;
  offset?: number;
}

/**
 * @description 关键字搜索
 * @returns
 */
export const searchWithKeywords = (params: SearchParams) => request("/cloudsearch", { params });
