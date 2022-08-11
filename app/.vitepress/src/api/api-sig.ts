/*
 * @Author: xjc 2324881835@qq.com
 * @Date: 2022-07-22 10:58:14
 * @LastEditors: xjc 2324881835@qq.com
 * @LastEditTime: 2022-07-22 11:06:12
 * @FilePath: \openEuler-portal\app\.vitepress\src\api\api-sig.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @file  安全页接口配置文件
 * */

import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';
const baseUrl = 'https://www.openeuler.org';
// export const sigList = () => {
//     return new Promise((resolve, reject) => {
//         appAjax.postJson({
//             otherBaseUrl: sigApi,
//             url: '/sigs/',
//             type: 'get',
//             success(result) {
//                 if (result) {
//                     resolve(result);
//                     return;
//                 }
//                 reject(result);
//             },
//             error(msg) {
//                 reject(msg);
//             }

//         });

//     });
// };

// export const sigDetail = (id) => {
//     return new Promise((resolve, reject) => {
//         appAjax.postJson({
//             otherBaseUrl: sigApi,
//             url: `/sigmeetingsdata/${id}/`,
//             type: 'get',
//             success(result) {
//                 if (result) {
//                     resolve(result);
//                     return;
//                 }
//                 reject(result);
//             },
//             error(msg) {
//                 reject(msg);
//             }

//         });

//     });
// };
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
export function getSalon() {
  const url = `${baseUrl}/api-sig/activities/`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}
// export const sigMember = (id) => {
//     return new Promise((resolve, reject) => {
//         appAjax.postJson({
//             otherBaseUrl: sigApi,
//             url: `/groups/${id}/`,
//             type: 'get',
//             success(result) {
//                 if (result) {
//                     resolve(result);
//                     return;
//                 }
//                 reject(result);
//             },
//             error(msg) {
//                 reject(msg);
//             }

//         });

//     });
// };
