/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Spin,
  Tag,
  Typography,
  Modal,
  Popconfirm,
  message,
  Form,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import {
  useGetQuestionsQuery,
  useCreateQuestionMutation,
  useSoftDeleteQuestionMutation,
  useGetQuestionByIdQuery,
} from "../../../redux/features/questions/questionApi";

import { useGetCompetenciesQuery } from "../../../redux/features/competency/competencyApi";

import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { IQuestion, ICompetency } from "../../../types";
import TCForm from "../../../components/form/TCForm";
import TCSelect from "../../../components/form/TCSelect";
import TCInput from "../../../components/form/TCInput";
import type { FieldValues } from "react-hook-form";

const { Title } = Typography;

const levelOptions = [
  { value: "A1", label: "A1" },
  { value: "A2", label: "A2" },
  { value: "B1", label: "B1" },
  { value: "B2", label: "B2" },
  { value: "C1", label: "C1" },
  { value: "C2", label: "C2" },
];

// Form data type
type QuestionFormData = {
  competency: string; // competency id
  level: string;
  questionText: string;
  correctAnswer: string;
  points: number;
  explanation?: string;
  isMultipleChoice: boolean;
  tags: string[];
  options: string[];
};

const Question: React.FC = () => {
  // Pagination state
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    null
  );

  // API hooks
  const {
    data: questions,
    isLoading: isQuestionLoading,
    refetch,
  } = useGetQuestionsQuery({
    page,
    limit: pageSize,
  });

  const [createQuestion, { isLoading: isCreating }] =
    useCreateQuestionMutation();

  const [softDeleteQuestion] = useSoftDeleteQuestionMutation();

  const { data: questionDetails } = useGetQuestionByIdQuery(
    selectedQuestionId ?? "",
    {
      skip: !selectedQuestionId,
    }
  );

  // Competencies
  const { data: competencyData, isLoading: isCompetencyLoading } =
    useGetCompetenciesQuery({ limit: 100 });

  const competencyOptions =
    competencyData?.data.map((comp: ICompetency) => ({
      value: comp._id,
      label: comp.name,
    })) || [];

  // Table columns
  const columns: ColumnsType<IQuestion> = [
    {
      title: "Question",
      dataIndex: "questionText",
      key: "questionText",
      ellipsis: true,
    },
    {
      title: "Competency",
      dataIndex: ["competency", "name"],
      key: "competency",
      width: 150,
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      width: 80,
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
      width: 80,
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "isMultipleChoice",
      key: "isMultipleChoice",
      width: 120,
      render: (isMultipleChoice: boolean) => (
        <Tag color={isMultipleChoice ? "blue" : "green"}>
          {isMultipleChoice ? "Multiple Choice" : "Single Answer"}
        </Tag>
      ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => (
        <Space size="small">
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_: any, record: IQuestion) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedQuestionId(record._id as string);
              setViewModalOpen(true);
            }}
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedQuestionId(record._id as string);
              setCreateModalOpen(true);
            }}
          />
          <Popconfirm
            title="Are you sure delete this question?"
            onConfirm={async () => {
              try {
                await softDeleteQuestion(record._id).unwrap();
                message.success("Question deleted");
                refetch();
              } catch {
                message.error("Failed to delete question");
              }
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Pagination change handler
  const onTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current && pagination.current !== page) {
      setPage(pagination.current);
    }
    if (pagination.pageSize && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setPage(1);
    }
  };

  // Transform form data
  const transformFormData = (data: FieldValues): QuestionFormData => {
    return {
      competency: data.competency,
      level: data.level,
      questionText: data.questionText,
      correctAnswer: data.correctAnswer,
      points: Number(data.points),
      explanation: data.explanation,
      isMultipleChoice:
        data.isMultipleChoice === "true" || data.isMultipleChoice === true,
      tags:
        typeof data.tags === "string"
          ? data.tags
              .split(",")
              .map((tag: string) => tag.trim())
              .filter(Boolean)
          : [],
      options:
        typeof data.options === "string"
          ? data.options
              .split(",")
              .map((opt: string) => opt.trim())
              .filter(Boolean)
          : [],
    };
  };

  // Form submit handler
  const handleSubmit = async (formData: FieldValues): Promise<void> => {
    const transformed = transformFormData(formData);
    try {
      if (selectedQuestionId) {
        await createQuestion({
          id: selectedQuestionId,
          ...transformed,
        }).unwrap();
        message.success("Question updated");
      } else {
        await createQuestion(transformed).unwrap();
        message.success("Question created");
      }
      setCreateModalOpen(false);
      setSelectedQuestionId(null);
      refetch();
    } catch {
      message.error("Failed to save question");
    }
  };

  // Reset selected question on modal close
  useEffect(() => {
    if (!createModalOpen) {
      setSelectedQuestionId(null);
    }
  }, [createModalOpen]);

  return (
    <div style={{ padding: "24px" }}>
      <Title level={3} style={{ marginBottom: 16 }}>
        Question Pool
      </Title>

      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setSelectedQuestionId(null);
            setCreateModalOpen(true);
          }}
        >
          Create Question
        </Button>
      </div>

      {isQuestionLoading ? (
        <div style={{ textAlign: "center", padding: 24 }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table<IQuestion>
          columns={columns}
          dataSource={questions?.data || []}
          rowKey="_id"
          bordered
          pagination={{
            pageSize,
            total: questions?.meta?.total || 0,
            current: page,
            showSizeChanger: true,
          }}
          onChange={onTableChange}
        />
      )}

      {/* View Question Modal */}
      <Modal
        title="Question Details"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalOpen(false)}>
            Close
          </Button>,
        ]}
        width={700}
      >
        {questionDetails ? (
          <>
            <p>
              <b>Competency:</b> {questionDetails?.data.competency.name}
            </p>
            <p>
              <b>Level:</b> {questionDetails?.data.level}
            </p>
            <p>
              <b>Question:</b> {questionDetails?.data.questionText}
            </p>
            <p>
              <b>Options:</b>
            </p>
            <ul>
              {questionDetails?.data.options.map((opt: string, idx: number) => (
                <li key={idx}>{opt}</li>
              ))}
            </ul>
            <p>
              <b>Correct Answer:</b> {questionDetails?.data.correctAnswer}
            </p>
            <p>
              <b>Points:</b> {questionDetails?.data.points}
            </p>
            <p>
              <b>Explanation:</b> {questionDetails?.data.explanation || "N/A"}
            </p>
            <p>
              <b>Type:</b>{" "}
              {questionDetails?.data.isMultipleChoice
                ? "Multiple Choice"
                : "Single Answer"}
            </p>
            <p>
              <b>Tags:</b>{" "}
              {questionDetails?.data.tags.map((tag: boolean, idx: number) => (
                <Tag key={idx}>{tag}</Tag>
              ))}
            </p>
          </>
        ) : (
          <Spin />
        )}
      </Modal>

      {/* Create/Edit Question Modal */}
      <Modal
        title={selectedQuestionId ? "Edit Question" : "Create Question"}
        open={createModalOpen}
        onCancel={() => setCreateModalOpen(false)}
        footer={null}
        width={700}
        destroyOnClose
      >
        <TCForm
          defaultValues={
            selectedQuestionId ? questionDetails?.data ?? undefined : undefined
          }
          onSubmit={handleSubmit}
        >
          <TCSelect
            label="Competency"
            name="competency"
            options={competencyOptions}
            disabled={isCompetencyLoading || isCreating}
          />
          <TCSelect
            label="Level"
            name="level"
            options={levelOptions}
            disabled={isCreating}
          />
          <TCInput
            type="text"
            name="questionText"
            label="Question Text"
            disabled={isCreating}
            placeholder="Enter question text"
          />
          <TCInput
            type="text"
            name="correctAnswer"
            label="Correct Answer"
            disabled={isCreating}
            placeholder="Enter correct answer"
          />
          <TCInput
            type="number"
            name="points"
            label="Points"
            disabled={isCreating}
            placeholder="Points"
          />
          <TCInput
            type="text"
            name="explanation"
            label="Explanation"
            disabled={isCreating}
            placeholder="Explanation (optional)"
          />
          <TCSelect
            label="Is Multiple Choice"
            name="isMultipleChoice"
            options={[
              { value: "true", label: "Yes" },
              { value: "false", label: "No" },
            ]}
            disabled={isCreating}
          />
          <TCInput
            type="text"
            name="options"
            label="Options (comma separated)"
            disabled={isCreating}
            placeholder="Enter options separated by commas"
          />
          <TCInput
            type="text"
            name="tags"
            label="Tags (comma separated)"
            disabled={isCreating}
            placeholder="Separate tags by comma"
          />
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={isCreating}>
                {selectedQuestionId ? "Update" : "Create"}
              </Button>
              <Button onClick={() => setCreateModalOpen(false)}>Cancel</Button>
            </Space>
          </Form.Item>
        </TCForm>
      </Modal>
    </div>
  );
};

export default Question;
