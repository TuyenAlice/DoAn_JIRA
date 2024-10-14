import { Form, Input, Button, Card, Row, Col } from "antd";
import Account from "../interfaces/AccountInterface";
import { UserOutlined, LockOutlined, TwitterOutlined } from "@ant-design/icons";

interface SignupFormProps {
  onSubmit: (values: Account) => void;
  goToLogin: () => void;
}

// Validate
const validateMessages = {
  required: "${label} là bắt buộc!",
  types: {
    email: "${label} không đúng định dạng!",
  },
  string: {
    min: "${label} ít nhất ${min} ký tự!",
  },
};

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, goToLogin }) => (
  <div
    className="container"
    style={{
      height: window.innerHeight,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Card title="Đăng Ký Tài Khoản" style={{ width: 400 }}>
      <Form
        onFinish={onSubmit}
        name="register"
        layout="vertical"
        validateMessages={validateMessages}
      >
        <Form.Item
          label="Email"
          className="my-8"
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Email",
              type: "email",
            },
          ]}
        >
          <Input
            placeholder="Email"
            prefix={<UserOutlined />}
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item
          className="mb-8"
          name="password"
          label="Mật Khẩu"
          rules={[
            { required: true },
            { min: 6, message: "Mật khẩu tối thiểu 6 ký tự!" },
          ]}
        >
          <Input.Password
            placeholder="Password"
            prefix={<UserOutlined />}
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item
          label="Họ Tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
        >
          <Input placeholder="Name" autoComplete="name" />
        </Form.Item>

        <Form.Item
          className="my-8"
          name="phoneNumber"
          label="Số Điện Thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input placeholder="Phone number" type="tel" autoComplete="tel" />
        </Form.Item>

        <Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Button
                htmlType="submit"
                style={{
                  width: "100%",
                  color: "#4096ff",
                }}
                className="text-white"
                size="large"
              >
                Đăng Ký
              </Button>
            </Col>
            <Col span={12}>
              <Button
                onClick={() => goToLogin()}
                style={{
                  width: "100%",
                  backgroundColor: "#4096ff",
                }}
                className="text-white"
                size="large"
                type="primary"
                htmlType="submit"
              >
                Đăng Nhập
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <div className="social d-flex mt-3">
          <Button
            style={{ backgroundColor: "rgb(59,89,152)" }}
            shape="circle"
            size="large"
          >
            <span className="font-weight-bold text-white">F</span>
          </Button>
          <Button
            type="primary"
            shape="circle"
            icon={<TwitterOutlined />}
            size="large"
            className="ml-3"
          />
        </div>
      </Form>
    </Card>
  </div>
);

export default SignupForm;
