import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { signup } from "../services/user-service";
import Account from "../interfaces/AccountInterface";
import SignupForm from "../components/SignupForm";
import { Layout, notification } from "antd";
const { Header, Footer, Sider, Content } = Layout;

const SignupPage = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState<Account>();
  const [{ width, height }, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // const onSignup = async (values: Account) => {
  //     await signup(values).then((response) => {
  //         console.log(response.message);
  //         setAccount(response.data);
  //     }).catch((error) => {
  //         alert(error.response.data.message);
  //     });
  // };

  const onSignup = async (values: Account) => {
    await signup(values)
      .then((response) => {
        notification.success({
          message: "Đăng ký thành công",
        });
        setAccount(response.data);
      })
      .catch((error) => {
        notification.warning({
          message: `${error.response?.data.message}`,
        });
        console.log("error", error.response?.data);
      });
  };

  useEffect(() => {
    if (account) {
      console.log("abc");
      goToLogin();
    }
    const handleResize = () => {
      setSize({
        width: Math.round(window.innerWidth),
        height: Math.round(window.innerHeight),
      });
    };

    // Gán sự kiện resize
    window.addEventListener("resize", handleResize);

    // Cleanup sự kiện resize khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [account, navigate]);

  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <Layout>
      <Sider
        width={width}
        style={{
          height: "100vh",
          backgroundImage: `url(https://picsum.photos/${Math.round(
            width / 2
          )}/${height})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
        }}
      ></Sider>
      <Content
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <SignupForm onSubmit={onSignup} goToLogin={goToLogin} />
      </Content>
    </Layout>
  );
};

export default SignupPage;
