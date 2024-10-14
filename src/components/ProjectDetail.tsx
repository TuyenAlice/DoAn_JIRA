import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { ProjectCategory, ProjectDetail, ProjectDetailDto } from "../interfaces/ProjectInterface";
import TextArea from "antd/es/input/TextArea";
import User from "../interfaces/UserInterface";
const { Option } = Select;

interface ProjectDetailProps {
    isCreate: boolean;
    isOpen: boolean;
    data: ProjectDetail | undefined;
    categories: ProjectCategory[] | undefined;
    users: User[] | undefined;
    onClose: () => void;
    onSubmit: (values: ProjectDetailDto) => void;
}

const ProjectDetai: React.FC<ProjectDetailProps> = ({
    isOpen,
    isCreate,
    data,
    categories,
    users,
    onClose,
    onSubmit,
}) => {
    const [form] = Form.useForm();

    const onCategoryChange = () => { };

    let projectDetailInfo = {} as ProjectDetailDto;

    const mapper = (data: ProjectDetail): ProjectDetailDto => ({
        id: data.id,
        categoryId: data.projectCategory.id,
        creator: data.creator.id,
        description: data.description,
        projectName: data.projectName,
        alias: data.alias
    });

    useEffect(() => {
        if (data) {
            projectDetailInfo = mapper(data);
            form.setFieldsValue(projectDetailInfo);
            console.log(projectDetailInfo);
        }

        if (isCreate) {
            form.resetFields();
        }

    }, [data, categories, form, isCreate]);

    // Render project category options
    const renderCategoryOptions = () => {
        if (categories) {
            return categories.map((category) => (
                <Option key={category.id} value={category.id}>
                    {category.name}
                </Option>
            ));
        }
        return null; // Return null if no categories are available
    };

    const renderUserOptions = () => {
        if (users) {
            return users.map((user) => (
                <Option key={user.id} value={user.id}>
                    {user.name}
                </Option>
            ));
        }
        return null; // Return null if no categories are available
    };

    return (
        <>
            <Modal
                title="ProjectDetail"
                centered
                open={isOpen}
                onCancel={onClose}
                onOk={form.submit}
                okText={isCreate ? "Create" : "Update"}
                cancelText="Cancel"
                okButtonProps={{ autoFocus: true, htmlType: "submit" }}
                width={1000}
                destroyOnClose={true}
            >
                <Form
                    onFinish={onSubmit}
                    form={form}
                    layout="vertical"
                    name="projectDetailForm"
                >
                    {/* Project id */}
                    <Form.Item
                        hidden={true}
                        label="Project Name"
                        name="id"
                    >
                        <Input placeholder="Project Name" />
                    </Form.Item>

                    {/* Project name */}
                    <Form.Item
                        label="Project Name"
                        name="projectName"
                        rules={[
                            { required: true, message: "Please input your project name!" },
                        ]}
                    >
                        <Input placeholder="Project Name" />
                    </Form.Item>

                    {/* Project description */}
                    <Form.Item
                        label="Project description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Please input your project description!",
                            },
                        ]}
                    >
                        <TextArea rows={3} placeholder="Project description" />
                    </Form.Item>

                    {/* Project category */}
                    <Form.Item
                        label="Project Category"
                        name="categoryId"
                        rules={[
                            { required: true, message: "Please select your project category!" },
                        ]}
                    >
                        <Select
                            placeholder="Select Project Category"
                            style={{ width: "100%" }}
                        >
                            {renderCategoryOptions()} {/* Render category options */}
                        </Select>
                    </Form.Item>

                    {/* Project creator */}
                    <Form.Item
                        hidden={isCreate}
                        label="Creator"
                        name="creator"
                        rules={[
                            { required: !isCreate, message: "Please select your project creator!" },
                        ]}
                    >
                        <Select
                            placeholder="Select Project Category"
                            style={{ width: "100%" }}
                        >
                            {renderUserOptions()} {/* Render category options */}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ProjectDetai;
