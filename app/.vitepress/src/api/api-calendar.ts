import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

/**
 * 获取会议数据
 * @name getMeetingData
 * @return {Array} 镜像列表
 */
export function getMeetingData() {
  const url = '/api/meetings/meetingsdata/';
  return request.get(url).then((res: AxiosResponse) => res.data);
}

/**
 * 获取活动数据
 * @name getActivityData
 TODO:
 */
export function getActivityData() {
  const url = '/api/activitiesdata/';
  return request.get(url).then((res: AxiosResponse) => res.data);
}

/**
 * 获取活动详情
 * @name getActivityDetail
 TODO:
 */
export function getActivityDetail(id: string) {
  const url = `/api-euler/api-sig/activity/${id}/`;
  return request.get(url, {}).then((res: AxiosResponse) => res.data);
}
