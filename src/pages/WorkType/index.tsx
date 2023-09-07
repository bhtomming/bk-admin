import {
  removeWorkType,
  workTypeList,
  updateWorkType,
  addWorkType,
} from '@/services/xbk-services/workType';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { PlusOutlined } from '@ant-design/icons';

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在更新...');
  try {
    await updateWorkType({
      ...fields,
    });
    hide();
    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改出错，请核对信息再提交!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.WorkTypeItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeWorkType({
      data: { id: selectedRows.map((row) => row.id) },
    });
    hide();
    message.success('删除成功，自动刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请核对信息再试！');
    return false;
  }
};
const WorkTypeList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.WorkTypeItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.WorkTypeItem[]>([]);

  const [delModalOpen, handleDelModalOpen] = useState<boolean>(false);
  const [sureDel, setSureDel] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.WorkTypeItem) => {
    const hide = message.loading('正在添加');
    try {
      await addWorkType({
        ...fields,
      });
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      hide();
      message.error('添加失败，稍后再试！');
      return false;
    }
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.WorkTypeItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      sorter: true,
      tip: '编号',
      search: false,
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record: API.WorkTypeItem) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        <a
          key="del"
          onClick={async () => {
            setSelectId(record.id);
            handleDelModalOpen(true);
            console.log(sureDel, 'suerDel');
          }}
        >
          删除
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.WorkTypeItem, API.PageParams>
        headerTitle={'已发工作列表'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={workTypeList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 添加
          </Button>,
        ]}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}

      <ModalForm
        title={'添加工作类型'}
        width="900px"
        modalProps={{
          destroyOnClose: true,
        }}
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.WorkTypeItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          name="name"
          label="名称"
          tooltip="工作类型名称"
          placeholder="请输入工作类型名称"
        />
        <ProFormText name="description" label="描述" placeholder="描述工作类型" />
      </ModalForm>

      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        onOpenChange={handleUpdateModalOpen}
        values={currentRow || {}}
      />
      <Modal
        title="删除提示"
        visible={delModalOpen}
        onOk={async () => {
          setSureDel(true);
          handleDelModalOpen(false);
          await removeWorkType({
            data: { id: selectId },
          });
          actionRef.current?.reloadAndRest?.();
        }}
        onCancel={() => {
          setSureDel(false);
          handleDelModalOpen(false);
        }}
      >
        <p>是否要删除该信息</p>
      </Modal>
    </PageContainer>
  );
};
export default WorkTypeList;
