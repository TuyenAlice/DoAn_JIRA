import { Form, Input, Button } from 'antd';
import Account from '../interfaces/AccountInterface';

interface SignupFormProps {
    onSubmit: (values: Account) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => (
    <Form onFinish={onSubmit}>
        <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
        >
            <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
        >
            <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
            name="phoneNumber"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
            <Input placeholder="Phone number" />
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit">
                Signup
            </Button>
        </Form.Item>
    </Form>
);

export default SignupForm;