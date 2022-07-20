/**
 * 调用接口获取镜像列表
 * @name getAllMirror
 * @param {boolean} mirrorstats 镜像状态 true-运行的镜像
 * @return {Array} 镜像列表
 */

import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

export function getAllMirror() {
  const url = '/api/mirrors/?mirrorstats=true';
  return request.get(url).then((res: AxiosResponse) => res.data);
}
