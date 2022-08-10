/**
 * @file  安全页接口配置文件
 * */

import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
const baseUrl = 'https://www.openeuler.org';

interface LIST_PARAMS {
  page: number;
  pageSize: number;
}
export function getSigList() {
  const url = `${baseUrl}/api-sig/sigs/`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}
export function getSigDetail(id: number) {
  const url = `${baseUrl}/api-sig/sigmeetingsdata/${id}/`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}
export function getSigMember(id: number) {
  const url = `${baseUrl}/api-sig/groups/${id}/`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}
export function getCompleteList(params?: LIST_PARAMS) {
  const url = 'https://omapi.osinfra.cn/query/sig/info?community=openeuler';
  return request.post(url, params).then((res: AxiosResponse) => res.data);
}
