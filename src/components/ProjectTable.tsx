import React, { useState } from "react";
import {
  Table,
  Button,
  Tag,
  Space,
  Popconfirm,
  Avatar,
  Tooltip,
  Input,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { ProjectList } from "../interfaces/ProjectInterface";

interface ProjectTableProps {
  data: ProjectList[];
  onDetail: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ProjectTable: React.FC<ProjectTableProps> = ({
  data,
  onDetail,
  onEdit,
  onDelete,
}) => {
  // State to manage search text
  const [searchText, setSearchText] = useState<string>("");

  // Function to handle the search
  const handleSearch = (selectedKeys: string[], confirm: () => void) => {
    setSearchText(selectedKeys[0]);
    confirm(); // Call the confirm function to apply the filter
  };

  // Function to reset the search
  const handleReset = (clearFilters: () => void) => {
    setSearchText("");
    clearFilters(); // Clear the filters
  };

  // Define columns for the table
  const columns: ColumnsType<ProjectList> = [
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: any) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Project Name"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm)} // Pass selectedKeys as string[]
          />
          <Space style={{ marginTop: 8 }}>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm)}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)}>Reset</Button>
          </Space>
        </div>
      ),
      onFilter: (value, record: ProjectList) =>
        record.projectName
          .toLowerCase()
          .includes((value as string).toLowerCase()), // Ensure value is treated as a string
      width: "30%",
      render: (_, record) => (
        <Button type="link" onClick={() => onDetail(record.id)}>
          {record.projectName}
        </Button>
      ),
    },
    {
      title: "Project Alias",
      dataIndex: "alias",
      key: "alias",
    },
    {
      title: "Project Description",
      dataIndex: "description",
      key: "description",
      render: (_, record) => <div>{record.description}</div>,
    },
    {
      title: "Project Category",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      render: (_, record) => <div>{record.creator.name}</div>,
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      render: (_, record) => (
        <Avatar.Group
          size="large"
          max={{
            count: 3,
            style: { color: "#f56a00", backgroundColor: "#fde3cf" },
          }}
        >
          {record.members.map((member) => (
            <Tooltip key={member.userId} title={member.name} placement="top">
              <Avatar
                src={member.avatar}
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
            </Tooltip>
          ))}
        </Avatar.Group>
      ),
    },
    {
      title: "Project Status",
      dataIndex: "deleted",
      key: "deleted",
      render: (deleted: boolean) => {
        return deleted ? <Tag color="red">DELETED</Tag> : null;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => onEdit(record.id)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger disabled={record.deleted} type="primary">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 10 }} // Optional pagination
      style={{
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }} // Overall style
    />
  );
};

export default ProjectTable;
