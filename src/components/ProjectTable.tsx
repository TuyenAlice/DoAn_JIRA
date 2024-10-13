import React from 'react';
import { Table, Button, Tag, Space, Popconfirm, Avatar, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { ProjectList } from '../interfaces/ProjectInterface';

interface ProjectTableProps {
    data: ProjectList[];
    onDetail: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const ProjectTable: React.FC<ProjectTableProps> = ({ data, onDetail, onEdit, onDelete }) => {
    const columns: ColumnsType<ProjectList> = [
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            render: (_, record) => (
                <Button
                    type='link'
                    onClick={() => onDetail(record.id)}
                >{record.projectName}
                </Button>
            ),
        },
        {
            title: 'Project alias',
            dataIndex: 'alias',
            key: 'alias'
        },
        {
            title: 'Project description',
            dataIndex: 'description',
            key: 'description',
            render: (_, record) => (
                <div>
                    {record.description}
                </div>
            )
        },
        {
            title: 'Project category',
            dataIndex: 'categoryName',
            key: 'categoryName'
        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            key: 'creator',
            render: (_, record) => (
                <div>
                    {record.creator.name}
                </div>
            )
        },
        {
            title: 'Members',
            dataIndex: 'members',
            key: 'members',
            render: (_, record) => (
                <Avatar.Group
                    key={record.id}
                    size="large"
                    max={{
                        count: 3,
                        style: { color: '#f56a00', backgroundColor: '#fde3cf' },
                    }}
                >
                    {
                        record.members.map((member) => (
                            <Tooltip key={member.userId} title={member.name} placement="top">
                                <Avatar
                                    key={member.userId}
                                    src={member.avatar}
                                    style={{ backgroundColor: '#87d068' }}
                                    icon={<UserOutlined />}
                                >
                                    {member.name}
                                </Avatar>
                            </Tooltip>
                        ))
                    }
                </Avatar.Group>
            )
        },
        {
            title: 'Project status',
            dataIndex: 'deleted',
            key: 'deleted',
            render: (_, record) => {
                if (record.deleted) {
                    return (
                        <Tag color={'red'}>
                            DELETED
                        </Tag>
                    )
                }
                return null;
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type='primary'
                        onClick={() => onEdit(record.id)}
                    >Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this project?"
                        onConfirm={() => onDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            danger
                            disabled={record.deleted}
                            type='primary'
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            )
        },
    ];

    return <Table columns={columns} dataSource={data} rowKey="id" />;
};

export default ProjectTable;