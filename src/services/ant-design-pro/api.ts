// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import {RcFile} from "antd/es/upload/interface";

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return new Promise<API.CurrentUser>(function(resolve,reject){

    const userInfo = JSON.parse(<string>localStorage.getItem('adminInfo'));
    const token = JSON.parse(<string>localStorage.getItem('token'));
    if(userInfo && token?.token_expires > Date.now()/1000)
    {
      resolve(userInfo);
    }else
    {
      localStorage.removeItem("token");
      localStorage.removeItem("adminInfo")
      reject(new Error('not access allow 401'));
    }

  });
  /*return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });*/
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login/chack', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  }).then((res)=>{console.log(res);return res});
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/**上传文件、图片接口***/
export async function upload(options?: { [key: string]: any }) {
  console.log(options);
  return request<string | ((file: RcFile) => string) | ((file: RcFile) => PromiseLike<string>)>('/api/upload/upload', {
    method: 'POST',
    ...(options || {}),
  });
}
