import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { ProjectCategory, ProjectDetail } from "../interfaces/ProjectInterface";
import TextArea from "antd/es/input/TextArea";
const { Option } = Select;

interface ProjectDetailProps {
  isCreate: boolean;
  isOpen: boolean;
  data: ProjectDetail | undefined;
  categories: ProjectCategory[] | undefined;
  onClose: () => void;
  onSubmit: (values: ProjectDetail) => void;
}

const ProjectDetai: React.FC<ProjectDetailProps> = ({
  isOpen,
  isCreate,
  data,
  categories,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  let projectCategories: any[] = [];

  const onCategoryChange = () => {};

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
      console.log(data);
    }
  }, [data, categories, form]);

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
        destroyOnClose
      >
        <Form
          onFinish={onSubmit}
          form={form}
          layout="vertical"
          name="projectDetailForm"
        >
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

          {/* Project alias */}
          <Form.Item
            label="Project alias"
            name="alias"
            rules={[
              { required: true, message: "Please input your project alias!" },
            ]}
          >
            <Input placeholder="Project alias" />
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
            label="Project category"
            name="projectCategory"
            rules={[
              {
                required: true,
                message: "Please input your project category!",
              },
            ]}
          >
            <Select
              style={{ width: 120 }}
              onChange={onCategoryChange}
              {...projectCategories.map((item) => {
                console.log(item);

                return (
                  <Option
                    key={item.value}
                    value={item.value}
                    label={item.label}
                  >
                    {item.label}
                  </Option>
                );
              })}
            ></Select>
          </Form.Item>
        </Form>
        <Select
          style={{ width: 120 }}
          onChange={onCategoryChange}
          options={[]}
        ></Select>
      </Modal>
    </>
  );
};

export default ProjectDetai;
