import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import { cveQuery } from '@/shared/@types/type-support.ts';

/**
 * 调用接口获取安全公告列表
 * @name getSecurityList
 */
export function getSecurityList(params: cveQuery) {
  // const url = '/api-cve/cve-security-notice-server/securitynotice/findAll';
  const url = '/api-cve/cve-security-notice-server/securitynotice/findAll';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}

/**
 * 调用接口获取Cve列表
 * @name getCveList
 */
export function getCveList(pages: cveQuery) {
  const url = '/api-cve/cve-security-notice-server/cvedatabase/findAll';
  return request.post(url, pages).then((res: AxiosResponse) => res.data);
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

/**
 * 调用接口获取兼容性列表
 * @name getCompatibilityList
 */
export function getCompatibilityList(params: cveQuery) {
  const url = '/api-cve/cve-security-notice-server/hardwarecomp/findAll';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}
