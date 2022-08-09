import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import { cveQuery, selectParams } from '@/shared/@types/type-support.ts';

/**
 * 调用接口获取安全公告列表
 * @name getSecurityList
 */
export function getSecurityList(params: cveQuery) {
  // const url = '/api-cve/cve-security-notice-server/securitynotice/findAll';
  const url =
    '/api-euler/api-cve/cve-security-notice-server/securitynotice/findAll';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}

/**
 * 调用接口获取Cve列表
 * @name getCveList
 */
export function getCveList(pages: cveQuery) {
  const url =
    '/api-euler/api-cve/cve-security-notice-server/cvedatabase/findAll';
  return request.post(url, pages).then((res: AxiosResponse) => res.data);
}

/**
 * 调用接口获取Security详情
 * @name getSecurityDetail
 */
export function getSecurityDetail(params: any) {
  const url = `/api-euler/api-cve/cve-security-notice-server/securitynotice/getBySecurityNoticeNo?securityNoticeNo=${params.securityNoticeNo}`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}

/**
 * 调用接口获取兼容性列表-整机
 * @name getCompatibilityList
 */
export function getCompatibilityList(params: cveQuery) {
  const url =
    '/api-euler/api-cve/cve-security-notice-server/hardwarecomp/findAll';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}

/**
 * 调用接口获取驱动--架构的下拉列表
 * @name getCompatibilityList
 */
export function driverArchitectureOptions(params: selectParams) {
  const url =
    '/api-euler/api-cve/cve-security-notice-server/hardwarecomp/getArchitecture';
  return request.get(url, params).then((res: AxiosResponse) => res.data);
}

/**
 * 调用接口获取驱动--操作系统的下拉列表
 * @name getCompatibilityList
 */
export function driverOSOptions(params: selectParams) {
  const url =
    '/api-euler/api-cve/cve-security-notice-server/hardwarecomp/getOS';
  return request.get(url, params).then((res: AxiosResponse) => res.data);
}

/**
 * 调用接口获取兼容性列表-板卡
 * @name getCompatibilityList
 */
export function getDriverList(params: cveQuery) {
  const url =
    '/api-euler/api-cve/cve-security-notice-server/drivercomp/findAll';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}

/**
 * 调用接口获取兼容性列表-开源软件
 * @name getSoftwareList
 */
export function getSoftwareList(params: cveQuery) {
  const url = ` /compatibility/web_backend/compat_software_info?page_size=${params.pages.size}&page_num=${params.pages.page}`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}

/**
 * 调用接口获取兼容性列表-商业软件
 * @name businessSoftwareList
 */
export function getBusinessSoftwareList(params: cveQuery) {
  const url = ` /certification/software/communityChecklist?pageSize=${params.pages.size}&pageNo=${params.pages.page}`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}
