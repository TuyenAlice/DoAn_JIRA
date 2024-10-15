import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Tag,
  Space,
  Popconfirm,
  Avatar,
  Tooltip,
  Input,
  Modal,
  Select,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { ProjectList } from "../interfaces/ProjectInterface";
import { addUserToProject } from "../services/project-service";
import { GetUser } from "../services/project-service"; // Make sure this is the correct path

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
  // State to manage search text and modal visibility
  const [searchText, setSearchText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [users, setUsers] = useState<any[]>([]); // State to hold users
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true); // Loading state for users
  const [error, setError] = useState<string | null>(null); // Error state for users

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true); // Set loading to true
      try {
        const response = await GetUser(); // Call the GetUser function
        setUsers(response.data); // Store the fetched users in state
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users."); // Set error message
      } finally {
        setLoadingUsers(false); // Set loading to false
      }
    };

    fetchUsers(); // Call the function to fetch users
  }, []); // Empty dependency array to run only on mount

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

  // Function to handle user selection in modal
  const handleUserSelect = (value: string) => {
    setSelectedUser(value);
  };

  // Function to handle modal OK button click
  const handleOk = async () => {
    if (selectedUser) {
      // Assuming addUserToProject function handles API call to add user
      await addUserToProject(selectedUser);
      setIsModalOpen(false);
      setSelectedUser(null); // Reset selected user
    }
  };

  // Function to handle modal Cancel button click
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Define columns for the table
  const columns: ColumnsType<ProjectList> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend"],
      width: 150,
    },
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
        <>
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
            <Tooltip key="addMember" title="Add Member" placement="top">
              <Avatar
                style={{ backgroundColor: "#87d068", cursor: "pointer" }}
                onClick={() => setIsModalOpen(true)} // Open modal on click
              >
                +
              </Avatar>
            </Tooltip>
          </Avatar.Group>

          {/* Modal to add user */}
          <Modal
            title="Add User to Project"
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Select
              placeholder="Select a user to add"
              style={{ width: "100%" }}
              onChange={handleUserSelect}
              loading={loadingUsers} // Show loading spinner while fetching users
            >
              {error && <Select.Option disabled>{error}</Select.Option>}{" "}
              {/* Show error if any */}
              {record.members.map((member) => (
                <Select.Option key={member.userId} value={member.userId}>
                  {member.name}
                </Select.Option>
              ))}
            </Select>
          </Modal>
        </>
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
