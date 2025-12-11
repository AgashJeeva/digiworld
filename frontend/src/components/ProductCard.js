import React from "react";
import { Card, Tag } from "antd";

const ProductCard = ({ product }) => {
  const { name, category, price, stock, colorOptions, ramOptions, storageOptions } = product;

  // Stock color
  const stockColor = stock === 0 ? "red" : stock <= 5 ? "orange" : "green";

  return (
    <Card
      title={name}
      style={{ width: 300, margin: 16 }}
      bordered
      hoverable
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
