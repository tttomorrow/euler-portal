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
export function getSigDetail(id: number) {
  const url = `${baseUrl}/api-sig/sigmeetingsdata/${id}/`;
  return request.get(url).then((res: AxiosResponse) => res.data);
}
export function getSigMember(id: number) {
  const url = `${baseUrl}/api-sig/groups/${id}/`;
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
