import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header style={{ backgroundColor: "#1890ff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ color: "#fff", fontSize: 28, fontWeight: "bold" }}>
        DIGI WORLD
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/login">Admin</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
