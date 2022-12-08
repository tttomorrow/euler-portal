import { request, AxiosResponse } from '@/shared/axios';

// 请求前缀
const url = '/api/osi-task-manager/intern/points/lists';
export function getRank(params: object) {
  return request
    .get(url, { params })
    .then((res: AxiosResponse) => res.data);
}
