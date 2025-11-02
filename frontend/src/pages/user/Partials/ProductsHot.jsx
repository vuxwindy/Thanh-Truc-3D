import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { getHotProducts } from "../../../services/product.service";

const ProductsHot = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getHotProducts();
        setProducts(data || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products by category:", err);
        setError("Không thể tải sản phẩm");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/customer/games/${productId}`);
  };

  if (loading) {
    return <div className="text-center py-3">Đang tải sản phẩm...</div>;
  }

  if (error) {
    return <div className="text-center py-3 text-danger">{error}</div>;
  }

  return (
    <div className="Hot-Products my-4 p-5">


      {/* Hot Products Section */}
      {products.length >0 && (
        <div className="mt-5">
          <h2 className="text-warning fw-bold mb-4">🔥 SẢN PHẨM HOT</h2>
          <Row>
            {products.map((product) => (
                <Col
                  key={product.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-4"
                >
                  <Card
                    className="shadow-sm product-card rounded-3"
                    style={{
                      border: "1px solid transparent",
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <div
                      className="product-image-container"
                      onClick={() => handleProductClick(product.id)}
                      style={{ cursor: "pointer" }}
                      onMouseEnter={(e) => {
                        const img = e.currentTarget.querySelector("img");
                        if (img) img.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        const img = e.currentTarget.querySelector("img");
                        if (img) img.style.transform = "scale(1)";
                      }}
                    >
                      {product.image && (
                        <Card.Img
                          variant="top"
                          src={`${import.meta.env.VITE_API_URL}/uploads/${product.image}`}
                          alt={product.name}
                          style={{
                            height: "180px",
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      )}
                      {/* Badge HOT */}
                      <span
                        className="badge bg-danger position-absolute"
                        style={{ top: "10px", left: "10px" }}
                      >
                        HOT
                      </span>
                    </div>

                    <Card.Body
                      onClick={() => handleProductClick(product.id)}
                      className="text-light"
                      style={{ cursor: "pointer" }}
                    >
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text className="text-truncate text-secondary">
                        {product.description}
                      </Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-danger fw-bold">
                          ${product.priceSale}
                        </span>
                        {Number(product.priceOrigin) >
                          Number(product.priceSale) && (
                          <span className="text-muted text-decoration-line-through">
                            ${product.priceOrigin}
                          </span>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default ProductsHot;
