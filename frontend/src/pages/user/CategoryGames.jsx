import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Form, InputGroup, Pagination, Modal } from 'react-bootstrap';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { getCategoryById, getProductsByCategory, getProductById } from '../../services/categoryProduct.service';
import { addToCart } from '../../services/cart.service';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../store/slices/cartSlice';
import { toast } from 'react-toastify';
import ProductReview from '../../components/ProductReview ';
import SimpleImageSlider from "react-simple-image-slider";

const CategoryGames = () => {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [pagination, setPagination] = useState({
    currentPage: parseInt(searchParams.get('page') || '1'),
    totalPages: 0,
    totalItems: 0
  });
  const limit = 8; // Products per page
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchParams.get('search') || '');
  //product reviews
  const reviews = [
    {
      name: "Nguyễn Văn Minh",
      rating: 5,
      comment: "Sản phẩm rất tốt, mình thích code blockchain của bạn, rất chuẩn!",
      date: "12/05/2025",
    },
    {
      name: "Trần Thị Hoài Thu",
      rating: 5,
      comment: "Chất lượng code chuẩn, gioa diện đóng gói đẹp.",
      date: "10/05/2025",
    },
  ];
  // Product detail modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const parentRef = useRef(null)
  const [width, setWidth] = useState(0);
  const [ratio, setRatio] = useState(9 / 16); // mặc định nếu chưa load được ảnh


  // Add debounce effect for search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Wait for 500ms after last keystroke

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Update useEffect to use the service functions
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);

        // Fetch category details
        const categoryData = await getCategoryById(categoryId);
        setCategory(categoryData);

        // Fetch products for this category with search and pagination
        const productsData = await getProductsByCategory(
          categoryId,
          debouncedSearchTerm,
          pagination.currentPage,
          limit
        );

        setProducts(productsData.products || []);
        setPagination({
          currentPage: productsData.currentPage,
          totalPages: productsData.totalPages,
          totalItems: productsData.totalItems
        });

        setLoading(false);
      } catch (err) {
        console.error('Lỗi khi tải sản phẩm danh mục:', err);
        setError('Không tải được sản phẩm cho danh mục này');
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryId, debouncedSearchTerm, pagination.currentPage]);



  // Lấy width của phần tử mẹ
  useEffect(() => {
    if (parentRef.current) {
      setWidth(parentRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (parentRef.current) {
        setWidth(parentRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedProduct?.image]);

  // Lấy tỷ lệ thực của ảnh đầu tiên
  useEffect(() => {
    if (selectedProduct?.image?.length) {
      const img = new Image();
      img.src = `${import.meta.env.VITE_API_URL}/uploads/${selectedProduct.image[0]}`;
      img.onload = () => {
        setRatio(img.naturalHeight / img.naturalWidth);
      };
    }
  }, [selectedProduct?.image]);
  // Handle product click to show details
  const handleProductClick = async (productId) => {
    try {
      setLoadingProduct(true);
      setShowModal(true);

      const productData = await getProductById(productId);
      setSelectedProduct(productData);

      setLoadingProduct(false);
    } catch (err) {
      console.error('Lỗi khi tìm kiếm thông tin chi tiết sản phẩm:', err);
      setLoadingProduct(false);
    }
  };
  const dispatch = useDispatch();

  // Handle add to cart
  const handleAddToCart = async (product) => {
    try {
      setCartLoading(true);
      await dispatch(addItemToCart({ productId: product.id, quantity: 1 })).unwrap();
      toast.success(`${product.name} đã thêm vào giỏ hàng!`);
      // Gửi thông báo về việc thêm sản phẩm vào giỏ hàng
      // Trang thông báo lỗi

      // await axios.post(`${API_URL}/notifications`, {
      //   userId: currentUser.id, // id người dùng
      //   message: `Bạn đã thêm ${productName} vào giỏ hàng.`,
      // });
    } catch (err) {
      console.error('Lỗi khi thêm vào giỏ hàng:', err);
      toast.error('Không thêm được sản phẩm vào giỏ hàng. Vui lòng thử lại.');
    } finally {
      setCartLoading(false);
    }
  };

  // Close modal handler
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  // Update search handlers
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    setSearchParams({
      search: value,
      page: '1'
    });
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setPagination(prev => ({ ...prev, currentPage: pageNumber }));
    setSearchParams({
      search: searchTerm,
      page: pageNumber.toString()
    });
  };

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];

    // Previous button
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => handlePageChange(Math.max(1, pagination.currentPage - 1))}
        disabled={pagination.currentPage === 1}
      />
    );

    // First page
    if (pagination.currentPage > 3) {
      items.push(
        <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
          1
        </Pagination.Item>
      );
      if (pagination.currentPage > 4) {
        items.push(<Pagination.Ellipsis key="ellipsis1" />);
      }
    }

    // Pages around current page
    for (let i = Math.max(1, pagination.currentPage - 1); i <= Math.min(pagination.totalPages, pagination.currentPage + 1); i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === pagination.currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    // Last page
    if (pagination.currentPage < pagination.totalPages - 2) {
      if (pagination.currentPage < pagination.totalPages - 3) {
        items.push(<Pagination.Ellipsis key="ellipsis2" />);
      }
      items.push(
        <Pagination.Item
          key={pagination.totalPages}
          onClick={() => handlePageChange(pagination.totalPages)}
        >
          {pagination.totalPages}
        </Pagination.Item>
      );
    }

    // Next button
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => handlePageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
        disabled={pagination.currentPage === pagination.totalPages}
      />
    );

    return items;
  };

  const height = Math.round(width * ratio);


  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <div className="alert alert-danger">{error}</div>
      </Container>
    );
  }

  return (
    <div className="pt-5 " >
      <Container className=" text-light " >
        {/* <Row className="min-vh-50 d-flex py-5 mb-5 rounded-3 " style={{ backgroundImage: `url('/banner11.jpg')`,backgroundSize: 'cover',  backgroundPosition: 'center',   boxShadow: '0 0 5px rgba(34, 255, 0, 0.36)'}}>
    
        <h1 className="mb-4 pt-5">{category?.name || 'Category'}</h1>
        <h4 className="text-secondary pb-5">
          Được hơn 10.000 cá nhân, tổ chức tin tưởng sử dụng dịch vụ <br />
          từ các công ty khởi nghiệp đầy tham vọng đến các doanh nghiệp lớn.
        </h4> </Row> */}
        {/* Search Bar */}
        <Row className="mb-4 py-5">
          <Col md={6} className="mx-auto">
            <InputGroup>
              <Form.Control
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search products"
              />
              {/* <InputGroup.Text>
               <FaSearch />  
            </InputGroup.Text> */}
            </InputGroup>
          </Col>
        </Row>



        {/* Results summary */}
        <Row className="mb-3">
          <h1 className="mb-4 pt-5">{category?.name || 'Category'}</h1>
          <Col>
            <p className="text-light">
              {pagination.totalItems > 0
                ? `Showing ${products.length} of ${pagination.totalItems} products`
                : 'No products found'}
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </Col>
        </Row>

        {products.length === 0 ? (
          <div className="alert alert-info">
            {searchTerm ? 'No products match your search.' : 'No products found in this category.'}
          </div>
        ) : (
          <>
            <Row>
              {products.map(product => (
                <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <Card className="shadow-sm product-card rounded-3 " style={{
                    border: "1px solid transparent",
                    backgroundColor: "rgba(255, 255, 255, 0.04)", overflow: 'hidden', position: 'relative'
                  }}>
                    <div
                      className="product-image-container"
                      onClick={() => handleProductClick(product.id)}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={(e) => {
                        const img = e.currentTarget.querySelector('img');
                        if (img) img.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        const img = e.currentTarget.querySelector('img');
                        if (img) img.style.transform = 'scale(1)';
                      }}
                    >
                      {product.image && (
                        <Card.Img
                          variant="top"
                          src={`${import.meta.env.VITE_API_URL}/uploads/${product.image}`}
                          alt={product.name}
                          style={{ height: '180px', objectFit: 'fill', transition: 'transform 0.3s ease', }}
                        />
                      )}
                    </div>
                    <Card.Body onClick={() => handleProductClick(product.id)} className="text-light"
                      style={{ cursor: 'pointer' }}>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text className="text-truncate text-secondary">{product.description}</Card.Text>
                      {/* <div className="d-flex justify-content-between align-items-center">
                      <span className="text-danger fw-bold">${product.priceSale}</span>
                      {Number(product.priceOrigin) > Number(product.priceSale) && (
                        <span className="text-muted text-decoration-line-through">${product.priceOrigin}</span>
                      )}
                    </div> */}
                      {/* <Card.Footer className="bg-white border-top-0">
                      <Button variant="primary" className="w-100">
                        <FaShoppingCart className="me-2" />
                        View Detail Product 
                      </Button>
                    </Card.Footer> */}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <Row className="mt-4">
                <Col className="d-flex justify-content-center">
                  <Pagination>{renderPaginationItems()}</Pagination>
                </Col>
              </Row>
            )}
          </>
        )}
        {/* <ProductReview reviews={reviews} /> */}

        {/* Product Detail Modal */}
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct?.name || 'Product Details'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {loadingProduct ? (
              <div className="text-center py-4">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : selectedProduct ? (
              <Row className='flex-column'>
                <Col>
                  <div ref={parentRef} className='w-100'>
                    {selectedProduct.image && selectedProduct.image.length && (
                      Array.isArray(selectedProduct.image) ? <SimpleImageSlider
                        width={width}
                        height={height}
                        images={selectedProduct.image.map(item => `${import.meta.env.VITE_API_URL}/uploads/${item}`)}
                        showBullets={true}
                        showNavs={true}
                      /> :
                        <img
                          src={`${import.meta.env.VITE_API_URL}/uploads/${selectedProduct.image}`}
                          alt={selectedProduct.name}
                          className="img-fluid rounded w-100"
                          style={{ objectFit: 'contain' }}
                        />
                    )}
                  </div>
                </Col>
                <Col>
                  <h4>{selectedProduct.name}</h4>
                  <p className="text-muted mb-2">Category: {selectedProduct.category?.name}</p>

                  <div className="mb-3">
                    <span className="text-danger fs-4 fw-bold me-2">${selectedProduct.priceSale}</span>
                    {Number(selectedProduct.priceOrigin) > Number(selectedProduct.priceSale) && (
                      <span className="text-muted text-decoration-line-through">${selectedProduct.priceOrigin}</span>
                    )}
                  </div>

                  <div className="mb-3">
                    <h5>Description</h5>
                    <div
                      style={{
                        whiteSpace: "pre-wrap",
                        fontFamily: "monospace",
                        fontSize: "14px",
                      }}
                    >
                      {selectedProduct.description}
                    </div>
                    {/* <p>{selectedProduct.description}</p> */}
                  </div>

                  {selectedProduct.is_hot && (
                    <div className="mb-2">
                      <span className="badge bg-danger me-2">Hot</span>
                    </div>
                  )}

                  {selectedProduct.is_new && (
                    <div className="mb-2">
                      <span className="badge bg-success me-2">New</span>
                    </div>
                  )}

                  {
                    selectedProduct?.productVideoUrl ? <div className="">
                      <video
                        width="100%"
                        height="auto"
                        controls  // hiển thị nút play/pause, âm lượng...
                        autoPlay={false}
                        loop
                      >
                        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                        Trình duyệt của bạn không hỗ trợ video.
                      </video>
                    </div> : <></>
                  }


                  <Button variant="primary" className="w-100 mt-3"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                      handleAddToCart(selectedProduct);
                    }}
                    disabled={cartLoading}
                  >
                    <FaShoppingCart className="me-2" />
                    Add to Cart
                  </Button>
                </Col>
              </Row>
            ) : (
              <p>No product details available</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default CategoryGames;