import { useState } from "react";
import { Button, Table, Space, Spin, Modal, Form, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  useGetCompetenciesQuery,
  useCreateCompetencyMutation,
  useUpdateCompetencyMutation,
  useDeleteCompetencyMutation,
} from "../../../redux/features/competency/competencyApi";
import type { ICompetency } from "../../../types";

const Competency = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data: competencyData, isLoading } = useGetCompetenciesQuery({
    page,
    limit: pageSize,
  });

  const [createCompetency] = useCreateCompetencyMutation();
  const [updateCompetency] = useUpdateCompetencyMutation();
  const [deleteCompetency] = useDeleteCompetencyMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCompetency, setEditingCompetency] =
    useState<ICompetency | null>(null);

  const [form] = Form.useForm();

  const handleCreate = () => {
    setEditingCompetency(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (record: ICompetency) => {
    setEditingCompetency(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this competency?")) {
      await deleteCompetency(id).unwrap();
    }
  };

  const onFinish = async (values: Partial<ICompetency>) => {
    try {
      if (editingCompetency) {
        await updateCompetency({
          id: editingCompetency._id,
          patch: values,
        }).unwrap();
      } else {
        await createCompetency(values).unwrap();
      }
      setModalOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const columns: ColumnsType<ICompetency> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Button
        type="primary"
        onClick={handleCreate}
        style={{ marginBottom: 16 }}
      >
        Create Competency
      </Button>

      {isLoading ? (
        <Spin />
      ) : (
        <Table
          rowKey="_id"
          dataSource={competencyData?.data || []}
          columns={columns}
          pagination={{
            current: page,
            pageSize,
            total: competencyData?.meta?.total || 0,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
        />
      )}

      <Modal
        title={editingCompetency ? "Edit Competency" : "Create Competency"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter competency name" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Competency;
