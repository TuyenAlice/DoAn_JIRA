import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signup } from '../services/user-service';
import Account from '../interfaces/AccountInterface';
import SignupForm from '../components/SignupForm';

const SignupPage = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useState<Account>();

    const onSignup = async (values: Account) => {
        await signup(values).then((response) => {
            console.log(response.message);
            setAccount(response.data);
        });
    };

    useEffect(() => {
        if (account) {
            console.log("Account:", account);
            // Navigate to dashboard or home page on login page
            navigate('/');
        }
    }, [account, navigate]);

    return <SignupForm onSubmit={onSignup} />;
};

export default SignupPage;