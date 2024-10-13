import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signin } from '../services/user-service';
import User from "../interfaces/UserInterface"
import Account from '../interfaces/AccountInterface';

const LoginPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();

    const onFinish = async (values: Account) => {
        await signin(values).then(setUser);
    };

    useEffect(() => {
        if (user) {
            console.log("User:", user);
            localStorage.setItem("accessToken", user.accessToken);
            // Navigate to dashboard or home page on successful login
            navigate('/project');
        }
    }, [user, navigate]);

    return (
        <Form onFinish={onFinish}>
            <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input placeholder="Email" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginPage;