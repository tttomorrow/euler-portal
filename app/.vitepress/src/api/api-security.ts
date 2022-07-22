import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import { QueryParams } from '@/shared/@types/type-cvelist';
import { BulletinParams } from '@/shared/@types/type-safety-bulletin';
// import { DetailParams } from '@/shared/@types/type-bulletin-detail';

/**
 * 调用接口获取安全公告列表
 * @name getSecurityList
 */
export function getSecurityList(params: BulletinParams) {
  // const url = '/api-cve/cve-security-notice-server/securitynotice/findAll';
  const url = '/api-cve/cve-security-notice-server/securitynotice/findAll';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}

/**
 * 调用接口获取Cve列表
 * @name getCveList
 */
export function getCveList(params: QueryParams) {
  const url = '/api-cve/cve-security-notice-server/cvedatabase/findAll';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}

/**
 * 调用接口获取Security详情
 * @name getSecurityDetail
 */
export function getSecurityDetail(params: any) {
  const url =
    '/api-cve/cve-security-notice-server/securitynotice/getBySecurityNoticeNo';
  return request.get(url, params).then((res: AxiosResponse) => res.data);
}
