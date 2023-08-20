import { request } from '@umijs/max';

/** 获取规则列表 GET /api/works */
export async function works(params: {
  // query
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
  /** 当前的页码 */
  page_no?: number;
  /** 页面的容量 */
  page_size?: number;
  keyword?:string;
  status?:number;
},options?: { [key: string]: any }) {
  //参数转换
   params.page_no = params.current;
   params.page_size = params.pageSize;
   delete params.current;
   delete params.pageSize;
  return  request<API.WorksList>('/api/user-business/works', {
    method: 'GET',
      params: {
        ...params,
      },
    ...(options || {}),
  }).then((res:any)=>{
    return {data:res.data?.items,success:true}
  })
    ;

}

/** 新建规则 PUT /api/updateWork */
export async function updateWork(options?: { [key: string]: any }) {
  console.log(options,"options");
  return request<API.WorkItem>('/api/user-business/works', {
    method: 'PUT',
    data: {...(options || {})},
  });
}

/** 新建规则 POST /api/addWork */
export async function addWork(options?: { [key: string]: any }) {
  console.log(options,"data");
  return request<API.WorkItem>('/api/user-business/works', {
    method: 'POST',
    data: {...options},
  });
}

/** 删除规则 DELETE /api/removeWork */
export async function removeWork(options?: { data: any }) {
  return request<Record<string, any>>('/api/user-business/works', {
    method: 'DELETE',
    ...(options || {}),
  });
}
