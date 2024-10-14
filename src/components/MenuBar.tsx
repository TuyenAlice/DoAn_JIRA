import { useState } from "react";
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Menu, Button } from "antd";

// Các mục menu
const menuItems = [
  {
    key: "1",
    icon: <PieChartOutlined />,
    label: "Dự án",
  },
  {
    key: "2",
    icon: <DesktopOutlined />,
    label: "Quản lý người dùng",
  },
  {
    key: "3",
    icon: <ContainerOutlined />,
    label: "Dashboard",
  },
];

const MenuBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  // Hàm để toggle trạng thái collapsed
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`bg-gray-800 ${
        collapsed ? "w-16" : "w-64"
      } transition-all duration-300`}
    >
      <div className="flex justify-between items-center p-4 text-white">
        <span className="text-xl font-bold">Logo</span>
        <Button
          type="text"
          onClick={toggleCollapsed}
          className="text-white"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
      </div>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={menuItems.map((item) => ({
          key: item.key,
          icon: item.icon,
          label: item.label,
        }))}
      />
    </div>
  );
};

export default MenuBar;
