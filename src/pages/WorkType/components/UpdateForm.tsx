import { ModalForm, ProFormText } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.WorkTypeItem>;
export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.WorkTypeItem>;
  onOpenChange: (open: boolean) => void;
};

export const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <ModalForm
      title={'修改工作类型'}
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
      <ProFormText name="name" label="名称" placeholder="请输入工作类型的名称" />

      <ProFormText name="description" label="描述" placeholder="工作类型描述" />
    </ModalForm>
  );
};

export default UpdateForm;
