import { request, AxiosResponse } from '@/shared/axios';

// 请求前缀
const request_prefix = '/api/osi-task-manager/intern/points/lists';
export function getRank(params: object) {
  return request
    .get(request_prefix, { params })
    .then((res: AxiosResponse) => res.data);
}
