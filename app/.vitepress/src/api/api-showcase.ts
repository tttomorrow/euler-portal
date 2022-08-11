import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

/**
 * 获取用户案例
 * @name getUserCaseData
 *
 */
export function getUserCaseData(params: object) {
  const url = '/api-search/showcase/';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}
/**
 * 获取用户案例分类
 * @name getCaseTagData
 *
 */
export function getCaseTagData(params: object) {
  const url = '/api-search/industry/';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}
