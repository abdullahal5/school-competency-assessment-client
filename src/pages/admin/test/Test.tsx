/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Button,
  Table,
  Space,
  Spin,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Select,
} from "antd";
import moment from "moment";
import type { ColumnsType } from "antd/es/table";
import {
  useGetTestSessionsQuery,
  useCreateTestSessionMutation,
  useUpdateTestSessionMutation,
  useDeleteTestSessionMutation,
} from "../../../redux/features/session/Session";
import type { ITestSession } from "../../../types";
import { useGetQuestionsQuery } from "../../../redux/features/questions/questionApi";

const { Option } = Select;

const Test = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading } = useGetTestSessionsQuery({
    page,
    limit: pageSize,
  });

  const [createTestSession] = useCreateTestSessionMutation();
  const [updateTestSession] = useUpdateTestSessionMutation();
  const [deleteTestSession] = useDeleteTestSessionMutation();

  const { data: questionsData, isLoading: isLoadingQuestions } =
    useGetQuestionsQuery({
      page: 1,
      limit: 100,
    });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<ITestSession | null>(
    null
  );

  const [form] = Form.useForm();

  const handleCreate = () => {
    setEditingSession(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (record: ITestSession) => {
    setEditingSession(record);

    form.setFieldsValue({
      ...record,
      deadline: moment(record.deadline),
      questions: record.questions.map((q: any) =>
        typeof q === "string" ? q : q._id
      ),
    });

    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this test session?")) {
      try {
        await deleteTestSession(id).unwrap();
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };

  const onFinish = async (values: any) => {
    try {
      const payload = {
        ...values,
        deadline: values.deadline.toISOString(),
      };

      if (editingSession) {
        await updateTestSession({
          id: editingSession._id!,
          patch: payload,
        }).unwrap();
      } else {
        await createTestSession(payload).unwrap();
      }

      setModalOpen(false);
    } catch (error) {
      console.error("Submit failed", error);
    }
  };

  const columns: ColumnsType<ITestSession> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Questions Count",
      key: "questionsCount",
      render: (_, record) => record.questions.length,
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      render: (value) => moment(value).format("YYYY-MM-DD"),
    },
    {
      title: "Time per Question (s)",
      dataIndex: "timePerQuestion",
      key: "timePerQuestion",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record._id!)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Button
        type="primary"
        onClick={handleCreate}
        style={{ marginBottom: 16 }}
      >
        Create Test Session
      </Button>

      {isLoading ? (
        <Spin />
      ) : (
        <Table
          rowKey="_id"
          dataSource={data?.data || []}
          columns={columns}
          pagination={{
            current: page,
            pageSize,
            total: data?.meta?.total || 0,
            onChange: (p, size) => {
              setPage(p);
              setPageSize(size);
            },
          }}
        />
      )}

      <Modal
        title={editingSession ? "Edit Test Session" : "Create Test Session"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => form.submit()}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Questions"
            name="questions"
            rules={[{ required: true, message: "Please select questions" }]}
          >
            <Select
              mode="multiple"
              loading={isLoadingQuestions}
              placeholder="Select questions"
              optionFilterProp="children"
              showSearch
              allowClear
            >
              {questionsData?.data.map((q) => (
                <Option key={q._id} value={q._id}>
                  {q.questionText}
                </Option>
              )) || null}
            </Select>
          </Form.Item>

          <Form.Item
            label="Deadline"
            name="deadline"
            rules={[{ required: true, message: "Please select deadline" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Time Per Question (seconds)"
            name="timePerQuestion"
            rules={[
              { required: true, message: "Please enter time per question" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} min={1} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Test;
