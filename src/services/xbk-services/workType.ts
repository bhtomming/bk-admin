import { request } from '@umijs/max';

/** 获取规则列表 GET /api/workType */
export async function workTypeList() {
  return request<API.WorkTypeList>('/api/work_type/list', {
    method: 'GET',
  }).then((res: any) => {
    return { data: res.data?.items, success: true };
  });
}

/** 新建规则 PUT /api/updateWork */
export async function updateWorkType(options?: { [key: string]: any }) {
  return request<API.WorkTypeItem>('/api/work_type/edit', {
    method: 'PUT',
    data: { ...(options || {}) },
  });
}

/** 新建规则 POST /api/addWork */
export async function addWorkType(options?: { [key: string]: any }) {
  return request<API.WorkTypeItem>('/api/work_type/add', {
    method: 'POST',
    data: { ...options },
  });
}

/** 删除规则 DELETE /api/removeWork */
export async function removeWorkType(options?: { data: any }) {
  return request<Record<string, any>>('/api/work_type/del', {
    method: 'DELETE',
    ...(options || {}),
  });
}
