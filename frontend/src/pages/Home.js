import React, { useEffect, useState } from "react";
import { Row, Col, Spin, Select, Typography } from "antd";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import InquiryModal from "../components/InquiryModal";
import API from "../api/api";

const { Option } = Select;
const { Title } = Typography;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [filterCategory, setFilterCategory] = useState("all");
  const [filterColor, setFilterColor] = useState("all");
  const [filterRAM, setFilterRAM] = useState("all");
  const [filterStorage, setFilterStorage] = useState("all");

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInquiry = (product) => setSelectedProduct(product);
  const handleCloseModal = () => setSelectedProduct(null);

  const allColors = [...new Set(products.flatMap((p) => p.colorOptions))];
  const allRAM = [...new Set(products.flatMap((p) => p.ramOptions))];
  const allStorage = [...new Set(products.flatMap((p) => p.storageOptions))];

  const filteredProducts = products.filter((p) => {
    return (
      (filterCategory === "all" || p.category === filterCategory) &&
      (filterColor === "all" || p.colorOptions.includes(filterColor)) &&
      (filterRAM === "all" || p.ramOptions.includes(filterRAM)) &&
      (filterStorage === "all" || p.storageOptions.includes(filterStorage))
    );
  });

  return (
    <>
      <Navbar />
      <div style={{ padding: 24, backgroundColor: "#f0f5ff", minHeight: "100vh" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>All Products</Title>

        <Row gutter={[16, 16]} justify="center" style={{ marginBottom: 24 }}>
          <Col>
            <Select defaultValue="all" style={{ width: 150 }} onChange={(v) => setFilterCategory(v)}>
              <Option value="all">All Categories</Option>
              <Option value="Mobile">Mobile</Option>
              <Option value="Laptop">Laptop</Option>
              <Option value="Tablet">Tablet</Option>
              <Option value="Accessory">Accessory</Option>
            </Select>
          </Col>
          <Col>
            <Select defaultValue="all" style={{ width: 120 }} onChange={(v) => setFilterColor(v)}>
              <Option value="all">All Colors</Option>
              {allColors.map((c) => <Option key={c} value={c}>{c}</Option>)}
            </Select>
          </Col>
          <Col>
            <Select defaultValue="all" style={{ width: 120 }} onChange={(v) => setFilterRAM(v)}>
              <Option value="all">All RAM</Option>
              {allRAM.map((r) => <Option key={r} value={r}>{r}</Option>)}
            </Select>
          </Col>
          <Col>
            <Select defaultValue="all" style={{ width: 140 }} onChange={(v) => setFilterStorage(v)}>
              <Option value="all">All Storage</Option>
              {allStorage.map((s) => <Option key={s} value={s}>{s}</Option>)}
            </Select>
          </Col>
        </Row>

        {loading ? (
          <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
        ) : (
          <Row gutter={[16, 16]} justify="center">
            {filteredProducts.map((product) => (
              <Col key={product._id}>
                <ProductCard product={product} onInquiry={handleInquiry} />
              </Col>
            ))}
          </Row>
        )}

        {selectedProduct && (
          <InquiryModal visible={!!selectedProduct} onClose={handleCloseModal} product={selectedProduct} />
        )}
      </div>
    </>
  );
};

export default Home;
