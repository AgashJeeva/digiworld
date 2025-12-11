import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import API from "../api/api";

const InquiryModal = ({ visible, onClose, product }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    API.post("/inquiries", { ...values, productId: product._id, productName: product.name })
      .then(() => {
        message.success("Inquiry submitted!");
        onClose();
      })
      .catch(() => message.error("Failed to submit"))
      .finally(() => setLoading(false));
  };

  return (
    <Modal visible={visible} title={`Inquiry for ${product?.name}`} onCancel={onClose} footer={null}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Your Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Message" name="message" rules={[{ required: true }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InquiryModal;
