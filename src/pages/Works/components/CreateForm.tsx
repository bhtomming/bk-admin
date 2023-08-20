import {
  ActionType,
  ModalForm,
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import '@umijs/max';
import {message, Modal} from 'antd';
import React, {useRef} from 'react';
import {addWork} from "@/services/xbk-services/worksApi";

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.WorkItem>;
export type CreateFormProps = {
  /*onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;*/
  createModalOpen:boolean;
  handleModalOpen: (open:boolean)=>void;
  //onFinish:async (values)=>boolean;
};
/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.WorkItem) => {
  const hide = message.loading('正在添加');
  try {
    await addWork({
      ...fields,
    });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

export const CreateForm: React.FC<CreateFormProps> = (props) => {
  const actionRef = useRef<ActionType>();
  return (
    <ModalForm
      title={'新建规则'}
      width="900px"
      open={props.createModalOpen}
      onOpenChange={props.handleModalOpen}
      onFinish={async (value) => {
        const success = await handleAdd(value as API.WorkItem);
        if (success) {
          props.handleModalOpen(false);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
      }}
    >
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
      <ProFormDateTimePicker
        name="work_time"
        label="时间"
      />
      <ProFormText
        name="address"
        label="地点"
        placeholder="工作地点"
        transform={(value)=>{return {address: {detail: value}} }}
      />
      <ProFormText
        name="phone"
        label="电话"
        placeholder="请输入联系电话"
      />
      <ProFormText
        name="contact"
        label="联系人"
        placeholder="请输入联系人"
      />
      <ProFormText
        name="price"
        label="工资"
        placeholder="请输入工资"
      />
      <ProFormTextArea
        name="context"
        label="详细工作内容"
      />

    </ModalForm>
  );
};

export default CreateForm;
