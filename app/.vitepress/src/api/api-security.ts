/**
 * 调用接口获取安全公告列表
 * @name getSecurityList
 * @param {boolean} mirrorstats 镜像状态 true-运行的镜像
 * @return {Array} 镜像列表
 */

import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

export function getSecurityList( params:any ) {
    const url = '/api-cve/cve-security-notice-server/securitynotice/findAll';
    return request.post(url, params).then((res: AxiosResponse) => res.data)
}
