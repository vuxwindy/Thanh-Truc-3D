import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Modal, Form, Pagination, Image } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getBanners, createBanner, updateBanner, deleteBanner } from '../../services/banner.service';

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [formData, setFormData] = useState({
    link: '',
    order: 0,
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  const fetchBanners = async (page = 1) => {
    try {
      const response = await getBanners(page, 10);
      setBanners(response.banners);
      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalItems: response.totalItems
      });
    } catch (error) {
      toast.error('Error fetching banners');
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleShowModal = (banner = null) => {
    setSelectedBanner(banner);
    if (banner) {
      setFormData({
        link: banner.link || '',
        order: banner.order || 0,
        image: null
      });
      setImagePreview(banner.image ? `${import.meta.env.VITE_API_URL}/uploads/${banner.image}` : null);
    } else {
      setFormData({
        link: '',
        order: 0,
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
      const bannerData = new FormData();
      
      // Append all form data to FormData
      Object.keys(formData).forEach(key => {
        if (key === 'image' && formData[key]) {
          bannerData.append('image', formData[key]);
        } else if (formData[key] !== undefined && key !== 'image') {
          bannerData.append(key, formData[key]);
        }
      });

      if (selectedBanner) {
        await updateBanner(selectedBanner.id, bannerData);
        toast.success('Banner updated successfully');
      } else {
        await createBanner(bannerData);
        toast.success('Banner created successfully');
      }
      setShowModal(false);
      fetchBanners(pagination.currentPage);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Operation failed');
    }
  };

  const handleDelete = async (bannerId) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        await deleteBanner(bannerId);
        toast.success('Banner deleted successfully');
        fetchBanners(pagination.currentPage);
      } catch (error) {
        toast.error('Error deleting banner');
      }
    }
  };

  const renderPagination = () => {
    const items = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === pagination.currentPage}
          onClick={() => fetchBanners(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return <Pagination>{items}</Pagination>;
  };

  return (
    <Container fluid className="mt-4">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4>Banner Management</h4>
          <Button variant="primary" onClick={() => handleShowModal()}>
            <FaPlus className="me-1" /> Add Banner
          </Button>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Link</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner) => (
                <tr key={banner.id}>
                  <td>{banner.id}</td>
                  <td>
                    {banner.image && (
                      <Image 
                        src={`${import.meta.env.VITE_API_URL}/uploads/${banner.image}`} 
                        alt="Banner" 
                        width={100} 
                        height={50} 
                        thumbnail 
                      />
                    )}
                  </td>
                  <td>
                    <a href={banner.link} target="_blank" rel="noopener noreferrer">
                      {banner.link}
                    </a>
                  </td>
                  <td>{banner.order}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShowModal(banner)}
                      title="Edit"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(banner.id)}
                      title="Delete"
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-center mt-3">
            {renderPagination()}
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedBanner ? 'Edit Banner' : 'Add New Banner'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Link URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter link URL"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Display Order</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter display order"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              />
              <Form.Text className="text-muted">
                Banners are displayed in ascending order (lower numbers first)
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Banner Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="mt-2">
                  <Image src={imagePreview} alt="Preview" fluid style={{ maxHeight: '200px' }} />
                </div>
              )}
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {selectedBanner ? 'Update' : 'Create'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Banners;