/**
 * @file  安全页接口配置文件
 * */

import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
interface LIST_PARAMS {
  page: number;
  pageSize: number;
}
export function getSigList() {
  const baseUrl = 'https://www.openeuler.org';
  const url = `${baseUrl}/api-sig/sigs/`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}
export function getCompleteList(params?: LIST_PARAMS) {
  const url = `/query/sig/info?community=openeuler&page=${params?.page}&pageSize=${params?.pageSize}&search=fuzzy`;
  return request.post(url).then((res: AxiosResponse) => res.data);
}
export function getRepoList() {
  const url = `/query/sig/repo?community=openeuler&search=fuzzy`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}
export function getAllList() {
  const url = '/query/sig/info?community=openeuler&search=fuzzy';
  return request.post(url).then((res: AxiosResponse) => res.data);
}
export function getSigDetail(id: string) {
  const url = `/api/meetings/sigmeetingsdata/${id}/`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}
export function getSigMember(params: object) {
  const url = '/query/sig/info';
  return request.get(url, { params }).then((res: AxiosResponse) => res.data);
}
export function getSigRepositoryList(params: object) {
  const url = '/query/sig/repo/committers';
  return request.get(url, { params }).then((res: AxiosResponse) => res.data);
}
export function getSalon() {
  const baseUrl = 'https://www.openeuler.org';
  const url = `${baseUrl}/api-sig/activities/`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}

/**
 * sig用户的个人贡献
 */
export function querySigUserContribute(params: object) {
  const url = '/query/sig/usercontribute';
  return request.get(url, { params }).then((res: AxiosResponse) => res.data);
}

/**
 * sig landscape
 */
export function getSigLandscape() {
  const url = '/query/sig/scoreAll?community=openeuler';
  return request.get(url).then((res: AxiosResponse) => res.data);
}
