// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    admin_id?:number,
    create_time?:number,
    group_id?:number,
    head_pic?:string,
    last_ip?:string,
    last_login?:number,
    nickname?:string,
    status?:number,
    update_time?:number,
    username?:string,
    /*name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;*/
  };

  type Token = {
    group_id?: number,
    platform?:string,
    refresh?:string,
    refresh_expires?:number,
    token?:string,
    token_expires?:number,
    username?:string
  };

  type AdminData = {
    admin?:CurrentUser,
    token?:Token,
    admin_group_type?:number,
    admin_site_id?:number,
    admin_site_name?:string,
  };

  type LoginResult = {
    status?: number;
    type?: string;
    currentAuthority?: string;
    data?: AdminData,
    tag_code?:number,
    message?:string,
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
