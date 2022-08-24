import { request } from '@/shared/axios';
import type { AxiosResponse } from '@/shared/axios';

/**
 * 调用接口获取邮件列表
 * @name getAllMailing
 * @return {Array} 邮件列表
 */

export function getAllMailing() {
  const url = '/api-euler/api/mail/list';

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
