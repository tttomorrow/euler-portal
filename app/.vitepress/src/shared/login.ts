import { queryCourse, queryToken, queryIDToken } from '../api/api-login';
import { useCounter } from '../stores/counter';
import { storeToRefs } from 'pinia';
import { AuthenticationClient } from 'authing-js-sdk';

interface IObject<T = any> {
  [key: string]: T;
}
const LOGIN_KEYS = {
  USER_TOKEN: '_U_T_',
  USER_INFO: '_U_I_',
};

function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}; path=/; domain=.test.osinfra.cn`;
  document.cookie = `${cname}=${cvalue}; ${expires}`;
}
function getCookie(cname: string) {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
function deleteCookie(cname: string) {
  setCookie(cname, 'null', -1);
}

// 存储用户id及token，用于下次登录
export function saveUserAuth(code = '', photo = '', username = '') {
  if (!code) {
    deleteCookie(LOGIN_KEYS.USER_TOKEN);
    deleteCookie(LOGIN_KEYS.USER_INFO);
    deleteCookie('_Y_G_');
  } else {
    const str = JSON.stringify({ photo, username });
    setCookie(LOGIN_KEYS.USER_TOKEN, code, 1);
    setCookie(LOGIN_KEYS.USER_INFO, str, 1);
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

export function getCodeByUrl(community = 'openeuler') {
  const query = getUrlParam();
  if (query.code && query.state) {
    const param = {
      code: query.code,
      permission: 'sigRead',
      community,
      redirect: `${window?.location?.origin}${window?.location?.pathname}`,
    };
    queryToken(param)
      .then((res) => {
        const { data = {} } = res;
        const { token = '', photo = '', username = '' } = data;
        saveUserAuth(token, photo, username);
        deleteUrlCode(query);
        window.parent.window.location.reload();
      })
      .catch(() => {
        deleteUrlCode(query);
        window.parent.window.location.reload();
      });
  }
}

// 删除url上的code
function deleteUrlCode(query: IObject) {
  const arr = Object.entries(query);
  let url = location.origin + location.pathname;
  if (arr.length > 2) {
    const _arr = arr.filter((item) => !['code', 'state'].includes(item[0]));
    const search = _arr.reduce((pre, next) => {
      pre += `${next[0]}=${next[1]}`;
      return pre;
    }, '?');
    url += search;
  }
  history.replaceState(null, '', url);
}

function getUrlParam(url = window?.location?.search) {
  const param = {} as IObject;
  const arr = url.split('?');
  if (arr[1]) {
    const _arr = arr[1].split('&') || [];
    _arr.forEach((item) => {
      const it = item.split('=');
      if (it.length === 2) {
        const obj = {
          [it[0]]: it[1],
        };
        Object.assign(param, obj);
      }
    });
  }
  return param;
}

function createClient(community = 'openeuler', url?: string) {
  const lang = getLanguage();
  const obj: IObject = {
    openeuler: {
      // appId: '62845f26b7dbf20f7890c0ad',
      appId: '62679eab0b22b146d2ea0a3a',
      appHost: 'https://datastat.authing.cn',
      redirectUri:
        url || `${window?.location?.origin}${window?.location?.pathname}`,
      lang: lang.language,
    },
    openeulerPlayground: {
      appId: '6219de6da01da1ce012db473',
      appHost: 'https://openeuler.authing.cn',
      redirectUri: 'https://moocstudio.openeuler.sh/',
      lang: lang.language,
    },
  };
  if (obj[community]) {
    return new AuthenticationClient(obj[community]);
  }
  return new AuthenticationClient(obj.openeuler);
}
// scope配置，设置登录后用户返回信息
const scopeConfig = {
  scope: 'openid profile username',
};
export function showGuard() {
  // const client = createClient(community);
  // // 构造 OIDC 授权登录 URL
  // const url = client.buildAuthorizeUrl(scopeConfig);
  // const { loginIframeSrc } = useStoreData();
  // loginIframeSrc.value = url;
  location.href = `https://openeuler-usercenter.test.osinfra.cn/login?redirect_uri=${location.href}`;
}

export function goToOtherServices(name: string, uri?: string) {
  const client = createClient(name, uri);
  // 构造 OIDC 授权登录 URL
  const url = client.buildAuthorizeUrl(scopeConfig);
  return url;
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
  const counter = useCounter();
  const stores = storeToRefs(counter);
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
    queryCourse({ community }).then((res) => {
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
      queryCourse({ community: 'openeuler' })
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
