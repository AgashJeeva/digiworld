import React from "react";
import { Card, Tag, Button } from "antd";

const ProductCard = ({ product, onInquiry }) => {
  const { name, category, price, stock, colorOptions, ramOptions, storageOptions } = product;
  const stockColor = stock === 0 ? "red" : stock <= 5 ? "orange" : "green";

  return (
    <Card
      title={name}
      style={{ width: 280, margin: 12, borderRadius: 10, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
      hoverable
      actions={[
        <Button type="primary" onClick={() => onInquiry(product)}>
          Submit Inquiry
        </Button>,
      ]}
    >
      <p><b>Category:</b> {category}</p>
      <p><b>Price:</b> Rs. {price}</p>
      <p>
        <b>Stock:</b> <Tag color={stockColor}>{stock}</Tag>
      </p>
      <p><b>Colors:</b> {colorOptions.join(", ")}</p>
      <p><b>RAM:</b> {ramOptions.join(", ")}</p>
      <p><b>Storage:</b> {storageOptions.join(", ")}</p>
    </Card>
  );
};

export default ProductCard;
