import { useEffect, useState } from "react";
import { Layout } from "antd";
import LoginPage from "../pages/LoginPage";
const { Sider, Content } = Layout;

export const LoginTemplate = () => {
  const [{ width, height }, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      <Sider
        width={width}
        style={{
          height: "100vh",
          backgroundImage: `url(https://picsum.photos/${width}/${height})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          filter: "brightness(0.7)", // Darkens the background image
        }}
      />

      {/* Content with Overlay Form */}
      <Content
        className="form-login"
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg border border-gray-200">
          <LoginPage />
        </div>
      </Content>
    </Layout>
  );
};
