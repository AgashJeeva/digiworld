import React from "react";
import { Card, Tag, Button } from "antd";

const ProductCard = ({ product, onInquiry }) => {
  const { name, category, price, stock, colorOptions, ramOptions, storageOptions } = product;

  const stockColor = stock === 0 ? "red" : stock <= 5 ? "orange" : "green";

  return (
    <Card
      title={name}
      style={{ width: 300, margin: 16 }}
      bordered
      hoverable
      actions={[
        <Button type="primary" onClick={() => onInquiry(product)}>
          Submit Inquiry
        </Button>,
      ]}
    >
      <p>Category: {category}</p>
      <p>Price: Rs. {price}</p>
      <p>
        Stock: <Tag color={stockColor}>{stock}</Tag>
      </p>
      <p>Colors: {colorOptions.join(", ")}</p>
      <p>RAM: {ramOptions.join(", ")}</p>
      <p>Storage: {storageOptions.join(", ")}</p>
    </Card>
  );
};

export default ProductCard;
