import { Form, Input, Button, message, Card, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { signin } from "../services/user-service";
import User from "../interfaces/UserInterface";
import Account from "../interfaces/AccountInterface";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: Account) => {
    try {
      setLoading(true);
      const response = await signin(values);
      setUser(response.data);
      message.success("Đăng nhập thành công");
      //navigate("/project");
      //   navigate("/dashboard"); // Redirect after successful login
    } catch (error: any) {
      notification.error({
        message: "Đăng nhập thất bại",
        description: error.response?.data?.message || "Đã có lỗi xảy ra",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      // localStorage.setItem("accessToken", user.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/project");
    }
  }, [user, navigate]);

  // foget pass
  const handleRegisterRedirect = () => {
    navigate("/signup");
  };

  return (
    <Card
      className="flex items-center justify-center min-h-screen bg-gray-100 p-6"
      style={{ width: 400 }}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Đăng Nhập</h2>

        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không đúng định dạng" }, // Email validation
            ]}
          >
            <Input
              placeholder="Email"
              prefix={<UserOutlined className="site-form-item-icon" />}
              size="large"
              className="rounded-lg"
              autoComplete="email"
              type="primary"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Mật khẩu
              "
              size="large"
              className="rounded-lg"
              autoComplete="current-password"
              type="primary"
            />
          </Form.Item>

          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              {loading ? "Logging in..." : "Đăng nhập"}{" "}
            </Button>
          </Form.Item>
          <div
            className="flex justify-between mt-4 text-center"
            style={{ textAlign: "center" }}
          >
            <a
              onClick={handleRegisterRedirect}
              className="text-sm text-blue-500 hover:underline cursor-pointer"
            >
              Đăng ký
            </a>
          </div>
        </Form>
      </div>
    </Card>
  );
};

export default LoginPage;
