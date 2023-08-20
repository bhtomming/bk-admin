declare namespace API {
  type WorksList={
    works?: WorkItem[]
  };
  type WorkItem = {
    id:number,
    title?: string,
    type?: number,
    work_time?: number,
    content?: string,
    address?: object,
    phone?: string,
    contact?: string,
    price?: number,
    imgs?: object[],
    status?: number,
    user_id?: number,
    master_id?: number,
    created_at?:string,
    updated_at?:string,
  };
}

