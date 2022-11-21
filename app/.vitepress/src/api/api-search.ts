import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

/**
 * 通用筛选
 * @name getSortData
 * @param {
 * page:1,
 * pageSize:10,
 * lang:'zh',
 * category:'blog'
 * }
 * @return  {
 * archives?:string,
 * articleName?: string,
 * author?:      string,
 * category?:    string,
 * date?:        string,
 * deleteType?:  string,
 * lang?:        string,
 * path?:        string,
 * summary?:     string;
 * tags?:        string[],
 * textContent?: string,
 * title?:       string,
 * type?:        string,
 *}
 */

interface SortParams {
  category: string;
  lang: string;
  page: number;
  pageSize: number;
}
interface search {
  keyword: string;
  page: number;
  pageSize: number;
  lang: string;
  type: string;
}

interface Condition {
  archives?: string;
  tags?: string;
  author?: string;
}
interface TagsParams {
  lang: string;
  category: string;
  want: string;
  condition?: Condition;
}

export function getSortData(params: SortParams) {
  const url = '/api-search/search/sort';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}

export function getTagsData(params: TagsParams) {
  const url = '/api-search/search/tags';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}
export function getSearchData(params: search) {
  const url = '/api-search/search/docs';
  return request
    .post(url, params)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}
export function getSearchCount(params: any) {
  const url = '/api-search/search/count';
  return request
    .post(url, params)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}
export function getSearchRpm(params: any) {
  const url = `/api-euler/api/repo/search`;
  return request
    .get(url, {
      headers: {
        authorization: 'Basic b3BlbmV1bGVyc2VydmVyOm9wZW5ldWxlcnNlcnZlckAxMjM0',
      },
      params,
    })
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}
export function getPop(params: any) {
  const url = `/api-search/search/pop?${params}`;
  return request
    .post(url)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 联想搜索
 * @name getRelevant
 * @param {}
 * @return  Array
 */
export function getRelevant(params: any) {
  const url = `/api-search/search/sugg`;
  return request
    .post(url, params)
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 首页数据卡片筛选
 * @name getStatistic
 * @param {}
 * @return  Array
 */

export function getStatistic() {
  const url = '/api-euler/api/search/statistics?type=openEuler';
  return request
    .get(url, {
      headers: {
        authorization: 'Basic b3BlbmV1bGVyc2VydmVyOm9wZW5ldWxlcnNlcnZlckAxMjM0',
      },
    })
    .then((res: AxiosResponse) => res.data);
}
