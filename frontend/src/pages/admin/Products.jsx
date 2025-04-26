import React, { useState, useEffect, useCallback } from 'react';
import { Container, Card, Table, Button, Modal, Form, Pagination, Image } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/product.service';
import { getCategories } from '../../services/category.service';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    link: '',
    is_hot: false,
    is_new: false,
    priceSale: '',
    priceOrigin: '',
    category_id: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Use useCallback to prevent unnecessary re-renders
  const fetchProducts = useCallback(async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await getProducts(page, 10, searchTerm);
      setProducts(response.products || []);
      setPagination({
        currentPage: Number(response.currentPage) || 1,
        totalPages: Number(response.totalPages) || 1,
        totalItems: Number(response.totalItems) || 0
      });
      setIsLoading(false);
    } catch (error) {
      toast.error('Error fetching products');
      setIsLoading(false);
    }
  }, [searchTerm]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data?.categories || []);
    } catch (error) {
      toast.error('Error fetching categories');
    }
  };

  // Effect to fetch products when searchTerm changes
  useEffect(() => {
    fetchProducts(1); // Reset to page 1 when search changes
  }, [searchTerm, fetchProducts]);

  // Initial data fetch
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleShowModal = (product = null) => {
    setSelectedProduct(product);
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        type: product.type || '',
        link: product.link || '',
        is_hot: product.is_hot || false,
        is_new: product.is_new || false,
        priceSale: product.priceSale || '',
        priceOrigin: product.priceOrigin || '',
        category_id: product.category_id || '',
        image: null
      });
      setImagePreview(product.image ? `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/uploads/${product.image}` : null);
    } else {
      setFormData({
        name: '',
        description: '',
        type: '',
        link: '',
        is_hot: false,
        is_new: false,
        priceSale: '',
        priceOrigin: '',
        category_id: '',
        image: null
      });
      setImagePreview(null);
    }
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      
      // Append all form data to FormData
      Object.keys(formData).forEach(key => {
        if (key === 'image' && formData[key]) {
          productData.append('image', formData[key]);
        } else if (formData[key] !== undefined && key !== 'image') {
          productData.append(key, formData[key]);
        }
      });

      if (selectedProduct) {
        await updateProduct(selectedProduct.id, productData);
        toast.success('Product updated successfully');
      } else {
        await createProduct(productData);
        toast.success('Product created successfully');
      }
      setShowModal(false);
      fetchProducts(pagination.currentPage);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Operation failed');
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        toast.success('Product deleted successfully');
        // If we're on the last page and it has only one item, go to previous page
        const isLastItemOnPage = products.length === 1;
        const isLastPage = pagination.currentPage === pagination.totalPages;
        if (isLastItemOnPage && isLastPage && pagination.currentPage > 1) {
          fetchProducts(pagination.currentPage - 1);
        } else {
          fetchProducts(pagination.currentPage);
        }
      } catch (error) {
        toast.error('Error deleting product');
      }
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== pagination.currentPage) {
      fetchProducts(pageNumber);
    }
  };

  const renderPagination = () => {
    if (pagination.totalPages <= 1) return null;

    const items = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, pagination.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(pagination.totalPages, startPage + maxPagesToShow - 1);

    // Adjust startPage if we're near the end
    if (endPage === pagination.totalPages) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // Add first page and ellipsis if necessary
    if (startPage > 1) {
      items.push(
        <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="ellipsis1" disabled />);
      }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
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

    // Add last page and ellipsis if necessary
    if (endPage < pagination.totalPages) {
      if (endPage < pagination.totalPages - 1) {
        items.push(<Pagination.Ellipsis key="ellipsis2" disabled />);
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

    return (
      <Pagination>
        <Pagination.Prev 
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
        />
        {items}
        <Pagination.Next 
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
        />
      </Pagination>
    );
  };

  return (
    <Container fluid className="mt-4">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4>Product Management</h4>
          <div className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '200px' }}
            />
            <Button variant="primary" onClick={() => handleShowModal()}>
              <FaPlus className="me-1" /> Add Product
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-4">No products found</div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price (Sale)</th>
                  <th>Price (Original)</th>
                  <th>Hot</th>
                  <th>New</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      {product.image && (
                        <Image 
                          src={`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/uploads/${product.image}`} 
                          alt={product.name} 
                          width={50} 
                          height={50} 
                          thumbnail 
                        />
                      )}
                    </td>
                    <td>{product.name}</td>
                    <td>${product.priceSale}</td>
                    <td>${product.priceOrigin}</td>
                    <td>{product.is_hot ? 'Yes' : 'No'}</td>
                    <td>{product.is_new ? 'Yes' : 'No'}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleShowModal(product)}
                        title="Edit"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {pagination.totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              {renderPagination()}
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct ? 'Edit Product' : 'Add New Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Sale Price</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={formData.priceSale}
                    onChange={(e) => setFormData({ ...formData, priceSale: e.target.value })}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Original Price</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={formData.priceOrigin}
                    onChange={(e) => setFormData({ ...formData, priceOrigin: e.target.value })}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  />
                </Form.Group>
              </div>
              
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Product Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <Image src={imagePreview} alt="Preview" fluid thumbnail style={{ maxHeight: '150px' }} />
                    </div>
                  )}
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Hot Product"
                    checked={formData.is_hot}
                    onChange={(e) => setFormData({ ...formData, is_hot: e.target.checked })}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="New Product"
                    checked={formData.is_new}
                    onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
                  />
                </Form.Group>
              </div>
            </div>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Form.Group>
            
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {selectedProduct ? 'Update' : 'Create'} Product
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Products;