// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发

import { User } from "./types/user";

const apiUrl = process.env.REACT_APP_API_URL;

//设置一个key
const localStorageKey = "__auth_provider_token__";

//根据key去取token令牌  window.localstorage用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期
//localStorage.getItem(key):获取指定key本地存储的值
//localStorage.setItem(key,value)：将value存储到key字段
//localStorage.removeItem(key):删除指定key本地存储的值
export const getToken = () => window.localStorage.getItem(localStorageKey);

//登录成功时将后端返回的token信息存放入localStorage持久化保存
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

//登录方法 登录成功时 调用持久化保存放方 失败则注册
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

//注册方法
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

//退出登录
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
