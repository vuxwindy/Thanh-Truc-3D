import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Button, Pagination, Form } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getPosts } from '../services/post.service';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPosts = async (page = 1) => {
    try {
      const response = await getPosts(page, 6, searchTerm);
      setPosts(response.posts);
      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalItems: response.totalItems
      });
    } catch (error) {
      toast.error('Error fetching posts');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [searchTerm]);

  const renderPagination = () => {
    const items = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === pagination.currentPage}
          onClick={() => fetchPosts(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return <Pagination>{items}</Pagination>;
  };

  return (
    <Container className="mt-4">
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h3>Blog Posts</h3>
          <div className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '200px' }}
            />
            <Link to="/create-post">
              <Button variant="primary">
                <FaPlus className="me-1" /> New Post
              </Button>
            </Link>
          </div>
        </Card.Header>
      </Card>

      <Row>
        {posts.map((post) => (
          <Col md={4} className="mb-4" key={post.id}>
            <Card className="h-100">
              <Card.Body>
                <div 
                  className="post-preview"
                  dangerouslySetInnerHTML={{ 
                    __html: DOMPurify.sanitize(post.content.substring(0, 150)) + '...' 
                  }} 
                />
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  By {post.user?.username || 'Unknown'} on {new Date(post.created_at).toLocaleDateString()}
                </small>
                <Link to={`/posts/${post.id}`}>
                  <Button variant="outline-primary" size="sm">Read More</Button>
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {posts.length === 0 && (
        <div className="text-center my-5">
          <h4>No posts found</h4>
          <p>Be the first to create a post!</p>
        </div>
      )}

      <div className="d-flex justify-content-center mt-4">
        {renderPagination()}
      </div>
    </Container>
  );
};

export default Posts;