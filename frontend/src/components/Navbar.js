import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header style={{ backgroundColor: "#1890ff" }}>
      <div className="logo" style={{ float: "left", color: "#fff", fontSize: 24, fontWeight: "bold" }}>
        DIGI WORLD
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} style={{ lineHeight: "64px", float: "right" }}>
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
