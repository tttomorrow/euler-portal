/**
 * @file  登录接口配置文件
 * */

import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
import { getUserAuth } from '@/shared/login';

/**
 * 获取授权的相关回调链接
 */
export function queryCourse(params: object) {
  const url = '/authing/user/permission';
  const { token } = getUserAuth();
  return request
    .get(url, {
      params,
      global: true,
      $doException: true,
      headers: {
        token,
      },
    })
    .then((res: AxiosResponse) => res.data);
}
/**
 * 获取授权token链接
 */
export function queryToken(params: object) {
  const url = '/authing/token/apply';
  const { token } = getUserAuth();
  return request
    .get(url, {
      params,
      global: true,
      headers: {
        token,
      },
    })
    .then((res: AxiosResponse) => res.data);
}
/**
 * 获取idtoken用于退出
 */
export function queryIDToken() {
  const url = '/authing/logout';
  const { token } = getUserAuth();
  return request
    .get(url, {
      headers: {
        token,
      },
    })
    .then((res: AxiosResponse) => res.data);
}
