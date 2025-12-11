import React, { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);
    API.post("/auth/login", values)
      .then((res) => {
        message.success("Login successful!");
        localStorage.setItem("adminToken", res.data.token);
        navigate("/admin");
      })
      .catch((err) => {
        message.error("Login failed! Check credentials.");
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 100 }}>
      <Card title="Admin Login" style={{ width: 400 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter email" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter password" }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
