import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getPostById, createPost, updatePost } from '../services/post.service';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaSave, FaTimes } from 'react-icons/fa';

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(id ? true : false);
  const [formData, setFormData] = useState({
    content: ''
  });

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const post = await getPostById(id);
          setFormData({
            content: post.content || ''
          });
        } catch (error) {
          toast.error('Error fetching post');
          navigate('/posts');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.content.trim()) {
      toast.error('Post content cannot be empty');
      return;
    }

    try {
      if (id) {
        await updatePost(id, formData);
        toast.success('Post updated successfully');
      } else {
        await createPost(formData);
        toast.success('Post created successfully');
      }
      navigate('/posts');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Operation failed');
    }
  };

  // Quill editor modules and formats
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'align',
    'link', 'image'
  ];

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>
          <h4>{id ? 'Edit Post' : 'Create New Post'}</h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                modules={modules}
                formats={formats}
                style={{ height: '400px', marginBottom: '60px' }}
                placeholder="Write your post content here..."
              />
            </Form.Group>

            <div className="d-flex justify-content-end mt-5">
              <Button 
                variant="secondary" 
                className="me-2" 
                onClick={() => navigate('/posts')}
              >
                <FaTimes className="me-1" /> Cancel
              </Button>
              <Button variant="primary" type="submit">
                <FaSave className="me-1" /> {id ? 'Update' : 'Publish'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PostEditor;