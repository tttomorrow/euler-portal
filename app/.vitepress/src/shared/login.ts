import { queryPermission, queryIDToken } from '../api/api-login';
import { useLogin } from '../stores/login';
import { storeToRefs } from 'pinia';
import { AuthenticationClient } from 'authing-js-sdk';

interface IObject<T = any> {
  [key: string]: T;
}
const LOGIN_KEYS = {
  USER_TOKEN: '_U_T_',
  USER_INFO: '_U_I_',
};

function setCookie(cname: string, cvalue: string, isDelete?: boolean) {
  const deleteStr = isDelete ? 'max-age=0; ' : '';
  try {
    const domain = '.openeuler.org';
    const expires = `${deleteStr}path=/; domain=${domain}`;
    document.cookie = `${cname}=${cvalue}; ${expires}`;
  } catch {}
}
function getCookie(cname: string) {
  const name = `${cname}=`;
  let ca: any = [];
  try {
    ca = document.cookie.split(';');
  } catch {
    ca = [];
  }
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
function deleteCookie(cname: string) {
  setCookie(cname, 'null', true);
}

// 存储用户id及token，用于下次登录
export function saveUserAuth(code = '', photo = '', username = '') {
  if (!code) {
    deleteCookie(LOGIN_KEYS.USER_TOKEN);
    deleteCookie(LOGIN_KEYS.USER_INFO);
  } else {
    const str = JSON.stringify({ photo, username });
    setCookie(LOGIN_KEYS.USER_TOKEN, code);
    setCookie(LOGIN_KEYS.USER_INFO, str);
  }
}

// 获取用户id及token
export function getUserAuth() {
  const token = getCookie(LOGIN_KEYS.USER_TOKEN) || '';
  const str = getCookie(LOGIN_KEYS.USER_INFO) || '';
  let obj: IObject = {};
  try {
    obj = JSON.parse(str);
  } catch {
    obj = {};
  }
  const { photo = '', username = '' } = obj;
  if (!token) {
    saveUserAuth();
  }
  return {
    token,
    photo,
    username,
  };
}

// 退出登录
export function logout(community = 'openeuler') {
  queryIDToken().then((res) => {
    const idToken = res.data.id_token;
    const client1 = createClient(community);
    const logoutUrl = client1.buildLogoutUrl({
      expert: true,
      redirectUri: `${window?.location?.origin}`,
      idToken,
    });
    saveUserAuth();
    window!.location!.href = logoutUrl;
  });
}

// 跳转首页
export function goToHome() {
  window?.location?.reload();
}

function createClient(community = 'openeuler', url?: string) {
  const lang = getLanguage();
  const obj: IObject = {
    openeuler: {
      appId: '62679eab0b22b146d2ea0a3a',
      appHost: 'https://datastat.authing.cn',
      redirectUri: url || 'https://id.openeuler.org/login',
      lang: lang.language,
    },
  };
  if (obj[community]) {
    return new AuthenticationClient(obj[community]);
  }
  return new AuthenticationClient(obj.openeuler);
}
export function showGuard() {
  const origin = 'https://id.openeuler.org';
  location.href = `${origin}/login?redirect_uri=${location.href}`;
}

// token失效跳转首页
export function tokenFailIndicateLogin() {
  saveUserAuth();
  const { guardAuthClient } = useStoreData();
  guardAuthClient.value = {};
  goToHome();
}

/**
 * @callback store 将store返回，使用解构赋值接受
 */
export function useStoreData() {
  const login = useLogin();
  const stores = storeToRefs(login);
  return stores;
}

// 刷新页面后store内参数被清除，需重新设定
export function setStoreData(community = 'openeuler') {
  refreshInfo(community);
}

// 刷新后重新请求登录用户信息
export function refreshInfo(community = 'openeuler') {
  const { token, username, photo } = getUserAuth();
  if (token) {
    const { guardAuthClient } = useStoreData();
    // 优先取存储的photo
    guardAuthClient.value = { username, photo };
    queryPermission({ community }).then((res) => {
      const { data } = res;
      if (Object.prototype.toString.call(data) === '[object Object]') {
        guardAuthClient.value = data;
        saveUserAuth(token, data.photo, data.username);
      }
    });
  }
}

// 判断是否为有效登录状态
export function isLogined() {
  return new Promise((resolve, reject) => {
    const { token } = getUserAuth();
    if (token) {
      queryPermission({ community: 'openeuler' })
        .then((res) => {
          const { data } = res;
          if (data) {
            resolve(true);
          } else {
            reject(false);
          }
        })
        .catch(() => reject(false));
    } else {
      reject(false);
    }
  });
}

export function hasPermission(per: string) {
  const { guardAuthClient } = useStoreData();
  if (Array.isArray(guardAuthClient?.value?.permissions)) {
    return guardAuthClient.value.permissions.includes(per);
  }
  return false;
}

export function getLanguage() {
  if (location.pathname.includes('/zh/')) {
    return {
      lang: 'zh',
      language: 'zh-CN',
    };
  }
  return {
    lang: 'en',
    language: 'en-US',
  };
}