import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

/**
 * 获取会议数据
 * @name getMeetingData
 * @return {Array}
 */
export function getMeetingData() {
  const url = '/api/meetings/meetingsdata/';
  return request
    .get(url, {
      headers: {
        authorization: 'Basic b3BlbmV1bGVyc2VydmVyOm9wZW5ldWxlcnNlcnZlckAxMjM0',
      },
    })
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 获取活动数据
 * @name getActivityData
 * @return {Array} 活动数据
 */
export function getActivityData() {
  const url = '/api/meetings/activitiesdata/';
  return request
    .get(url, {
      headers: {
        authorization: 'Basic b3BlbmV1bGVyc2VydmVyOm9wZW5ldWxlcnNlcnZlckAxMjM0',
      },
    })
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}

/**
 * 获取活动详情数据
 * @name getActivityDetail
 * @param {string} id 活动id
 * @return {Object} 活动数据
 */
export function getActivityDetail(id: string) {
  const url = `/api-euler/api-sig/activity/${id}/`;
  return request
    .get(url, {})
    .then((res: AxiosResponse) => res.data)
    .catch((e: any) => {
      throw new Error(e);
    });
}
