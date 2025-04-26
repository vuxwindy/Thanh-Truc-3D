import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Spinner } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getPostById, deletePost } from '../services/post.service';
import { getUserSession } from '../utils/session';
import DOMPurify from 'dompurify';
import { FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';

const PostView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = getUserSession();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (error) {
        toast.error('Error fetching post');
        navigate('/posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        toast.success('Post deleted successfully');
        navigate('/posts');
      } catch (error) {
        toast.error('Error deleting post');
      }
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!post) {
    return (
      <Container className="mt-5">
        <Card>
          <Card.Body className="text-center">
            <h3>Post not found</h3>
            <Link to="/posts">
              <Button variant="primary" className="mt-3">
                <FaArrowLeft className="me-2" /> Back to Posts
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const isAuthor = currentUser && post.user_id === currentUser.id;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div>
            <small className="text-muted">
              Posted by {post.user?.username || 'Unknown'} on {new Date(post.created_at).toLocaleString()}
            </small>
          </div>
          <div>
            <Link to="/posts">
              <Button variant="outline-secondary" size="sm" className="me-2">
                <FaArrowLeft className="me-1" /> Back
              </Button>
            </Link>
            {isAuthor && (
              <>
                <Link to={`/edit-post/${post.id}`}>
                  <Button variant="outline-warning" size="sm" className="me-2">
                    <FaEdit className="me-1" /> Edit
                  </Button>
                </Link>
                <Button variant="outline-danger" size="sm" onClick={handleDelete}>
                  <FaTrash className="me-1" /> Delete
                </Button>
              </>
            )}
          </div>
        </Card.Header>
        <Card.Body>
          <div 
            className="post-content"
            dangerouslySetInnerHTML={{ 
              __html: DOMPurify.sanitize(post.content) 
            }} 
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PostView;