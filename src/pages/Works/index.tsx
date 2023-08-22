import { removeWork, works, updateWork } from '@/services/xbk-services/worksApi';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, message, Modal } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import CreateForm from '@/pages/Works/components/CreateForm';

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在更新...');
  try {
    await updateWork({
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
const handleRemove = async (selectedRows: API.WorkItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeWork({
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
const WorkList: React.FC = () => {
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
  const [currentRow, setCurrentRow] = useState<API.WorkItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.WorkItem[]>([]);

  const [delModalOpen, handleDelModalOpen] = useState<boolean>(false);
  const [sureDel, setSureDel] = useState<boolean>(false);
  const [selectId, setSelectId] = useState<number>(0);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.WorkItem>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      sorter: true,
      tip: '工作id',
      search: false,
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '工作类型',
      dataIndex: 'type',
      valueEnum: {
        0: {
          text: '代丢垃圾',
        },
        1: {
          text: '代拉送货品',
        },
        2: {
          text: '代驾',
        },
        3: {
          text: '送车',
        },
        4: {
          text: '其他',
        },
      },
    },
    {
      title: '联系人',
      dataIndex: 'contact',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '待接单',
        },
        1: {
          text: '工作中',
        },
        2: {
          text: '已完成',
        },
        3: {
          text: '未知',
        },
      },
    },
    {
      title: '发布时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record: API.WorkItem) => [
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
            /*if(sureDel)
          {
            await removeWork({
              data: {id: record.id},
            });
            actionRef.current?.reloadAndRest?.();
          }*/
          }}
        >
          删除
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.WorkItem, API.PageParams>
        headerTitle={'已发工作列表'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        /*toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 发布工作
          </Button>,
        ]}*/
        request={works}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
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
          {/*<Button type="primary">批量审批</Button>*/}
        </FooterToolbar>
      )}
      <CreateForm createModalOpen={createModalOpen} handleModalOpen={handleModalOpen} />

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
          await removeWork({
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
export default WorkList;
