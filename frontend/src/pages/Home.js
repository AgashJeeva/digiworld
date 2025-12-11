import React, { useEffect, useState } from "react";
import { Row, Col, Spin } from "antd";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import API from "../api/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: 24 }}>
        {loading ? (
          <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
        ) : (
          <Row gutter={[16, 16]}>
            {products.map((product) => (
              <Col key={product._id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </>
  );
};

export default Home;
