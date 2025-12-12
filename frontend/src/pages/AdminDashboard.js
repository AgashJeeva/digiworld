import React, { useEffect, useState } from "react";
import { Table, Tag, message, Typography } from "antd";
import Navbar from "../components/Navbar";
import API from "../api/api";

const { Title } = Typography;

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch(() => message.error("Failed to load products"));
  }, []);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Price", dataIndex: "price", key: "price" },
    { 
      title: "Stock", dataIndex: "stock", key: "stock",
      render: (stock) => {
        const color = stock === 0 ? "red" : stock <= 5 ? "orange" : "green";
        return <Tag color={color}>{stock}</Tag>;
      },
    },
    { title: "Colors", dataIndex: "colorOptions", key: "colors", render: colors => colors.join(", ") },
    { title: "RAM", dataIndex: "ramOptions", key: "ram", render: ram => ram.join(", ") },
    { title: "Storage", dataIndex: "storageOptions", key: "storage", render: storage => storage.join(", ") },
  ];

  return (
    <>
      <Navbar />
      <div style={{ padding: 24, backgroundColor: "#f0f5ff", minHeight: "100vh" }}>
        <Title level={2} style={{ marginBottom: 24 }}>Admin Dashboard</Title>
        <Table dataSource={products} columns={columns} rowKey="_id" />
      </div>
    </>
  );
};

export default AdminDashboard;
