import React from "react";
import { Layout, Input, Avatar } from "antd";
import { BellOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const JiraHeader = () => {
  return (
    <Header style={styles.header} className="container">
      {/* Logo */}
      <div style={styles.logo}></div>

      {/* Search Input - Thanh tìm kiếm */}
      <Input
        style={styles.searchInput}
        placeholder="Search"
        prefix={<SearchOutlined />}
      />

      {/* User Avatar và Icons */}
      <div style={styles.userSection}>
        <BellOutlined style={styles.icon} />
        <Avatar style={styles.avatar} icon={<UserOutlined />} />
      </div>
    </Header>
  );
};

// Style cho các thành phần trong header
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#001529",
    padding: "0 20px",
  },
  logo: {
    width: "120px",
  },
  logoImage: {
    width: "100%",
    height: "auto",
  },
  searchInput: {
    width: "300px",
    marginRight: "20px",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    fontSize: "20px",
    marginRight: "20px",
    color: "#fff",
    cursor: "pointer",
  },
  avatar: {
    cursor: "pointer",
  },
};

export default JiraHeader;
