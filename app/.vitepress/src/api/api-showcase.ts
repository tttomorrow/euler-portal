import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

/**
 * 获取用户案例
 * @name getUserCaseData
 *
 */
export function getUserCaseData(params: object) {
  const url = '/showcase/';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}
/**
 * 获取用户案例分类
 * @name getCaseTagData
 *
 */
export function getCaseTagData() {
  const url = '/industry/';
  return request.post(url).then((res: AxiosResponse) => res.data);
}
