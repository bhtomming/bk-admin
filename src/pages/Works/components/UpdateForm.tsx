import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import '@umijs/max';
import { message, UploadFile } from 'antd';
import React from 'react';
import type { RcFile } from 'antd/es/upload/interface';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.WorkItem>;
export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.WorkItem>;
  onOpenChange: (open: boolean) => void;
  //onFinish:async (values)=>boolean;
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传jpeg或png类型的文件');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('文件必须小于 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  //const actionRef = useRef<ActionType>();
  /*const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    console.log(info,"fileinfo");
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
    }
  };*/
  return (
    <ModalForm
      title={'修改工作信息'}
      width="900px"
      modalProps={{
        destroyOnClose: true,
      }}
      open={props.updateModalOpen}
      onOpenChange={props.onOpenChange}
      onFinish={props.onSubmit}
      initialValues={{ ...props.values }} //初始化数据
    >
      <ProFormText name="id" hidden={true} />
      <ProFormText
        name="title"
        label="标题"
        tooltip="工作名称作为信息标题"
        placeholder="请输入工作标题"
      />
      <ProFormSelect
        width="md"
        request={async () => [
          { label: '代丢垃圾', value: 0 },
          { label: '代拉送货品', value: 1 },
          { label: '代驾', value: 2 },
          { label: '送车', value: 3 },
          { label: '其他', value: 4 },
        ]}
        name="type"
        label="请选择工作类型"
      />
      <ProFormDateTimePicker name="work_time" label="时间" />
      <ProFormText
        name="address"
        label="地点"
        placeholder="工作地点"
        convertValue={(value) => {
          return value.detail;
        }}
        transform={(value) => {
          return { address: { ...props.values?.address, detail: value } };
        }}
      />
      <ProFormText name="phone" label="电话" placeholder="请输入联系电话" />
      <ProFormText name="contact" label="联系人" placeholder="请输入联系人" />
      <ProFormText name="price" label="工资" placeholder="请输入工资" />
      <ProFormUploadButton
        name="imgs"
        label="Upload"
        max={3}
        fieldProps={{
          name: 'file',
          listType: 'picture-card',
          beforeUpload,
        }}
        action="/api/upload/upload"
        // onChange={handleChange}
        transform={(value) => {
          return {
            imgs: value.map((imgItem: UploadFile) => {
              return imgItem?.response
                ? { url: imgItem.response.data?.url, path: imgItem.response.data.path }
                : imgItem;
            }),
          };
        }}
      />
      <ProFormTextArea name="context" label="详细工作内容" />
      <ProFormText name="user_id" hidden={true} />
      <ProFormText name="master_id" hidden={true} />
      <ProFormText name="created_at" hidden={true} />
      <ProFormText name="updated_at" hidden={true} />
    </ModalForm>
  );
};

export default UpdateForm;
