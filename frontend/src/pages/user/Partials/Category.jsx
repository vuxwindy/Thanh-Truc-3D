import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { getProductsByCategories } from '../../../services/product.service';
import { CDN_URL } from '../../../constant';

const Category = () => {
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                setLoading(true);
                const data = await getProductsByCategories();
                setCategoryProducts(data.categoryProducts);
                setLoading(false);
            } catch (err) {
                setError('Failed to load category products');
                setLoading(false);
                console.error('Error fetching category products:', err);
            }
        };

        fetchCategoryProducts();
    }, []);

    if (loading) {
        return <div className="text-center py-3">Loading categories...</div>;
    }

    if (error) {
        return <div className="text-center py-3 text-danger">{error}</div>;
    }

    if (categoryProducts.length === 0) {
        return <div className="text-center py-3">No categories found</div>;
    }

    return (
        <div className="category-section my-4 p-5  ">
            <h2 className="mb-4   fw-bold text-dark">Danh Mục Sản Phẩm</h2>
            <Row>
                {categoryProducts.map(({ category, product }) => (
                    <Col key={category.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                         <a href={`/customer/games/category/${category.id}`}style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Card className="h-100 shadow rounded-2 border-0">
                            <Card.Header style={{ backgroundColor: '#fcd12a', color: '#222' }} className="fw-bold text-center rounded-top-2">
                                <h5 className="mb-0">{category.name}</h5>
                            </Card.Header>
                            {product.image && (
                                <Card.Img 
                                    variant="top" 
                                    src={`${CDN_URL}/${product.image}`} 
                                    alt={product.name}
                                      className="rounded-0"
                                    style={{ height: '180px', objectFit: 'cover' }}
                                />
                            )}
                            <Card.Body style={{ backgroundColor: '#f6eddc' }} className="border-0 rounded-bottom-2">
                                <Card.Title className="fw-semibold">{product.name}</Card.Title>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p className="text-danger mb-0 fw-bold">${product.priceSale}</p>
                                        {Number(product.priceOrigin) > Number(product.priceSale) && (
                                            <small className="text-muted text-decoration-line-through">
                                                ${product.priceOrigin}
                                            </small>
                                        )}
                                    </div>
                                    <div>
                                        {product.is_hot && (
                                            <span className="badge bg-danger me-1">Hot</span>
                                        )}
                                        {product.is_new && (
                                            <span className="badge bg-success">New</span>
                                        )}
                                    </div>
                                </div>
                            </Card.Body>
                            {/* <Card.Footer style={{ backgroundColor: '#f6eddc' }} className="border-0 rounded-bottom-2">
                                <a href={`/customer/games/category/${category.id}`}
                                 className="btn btn-warning btn-sm w-100 fw-semibold"
                                 style={{ color: '#222' }}>
                                    View All Products
                                </a>
                            </Card.Footer> */}
                        </Card> </a>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Category;