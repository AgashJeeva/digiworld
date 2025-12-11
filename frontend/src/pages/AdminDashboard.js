import React, { useEffect, useState } from "react";
import { Table, Tag, message } from "antd";
import Navbar from "../components/Navbar";
import API from "../api/api";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => message.error("Failed to load products"));
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
  ];

  return (
    <>
      <Navbar />
      <div style={{ padding: 24 }}>
        <h2>Admin Dashboard</h2>
        <Table dataSource={products} columns={columns} rowKey="_id" />
      </div>
    </>
  );
};

export default AdminDashboard;
