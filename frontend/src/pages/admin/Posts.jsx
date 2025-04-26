import React, { useState, useEffect, useRef } from 'react';
import { Container, Card, Table, Button, Modal, Form, Pagination } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getPosts, createPost, updatePost, deletePost } from '../../services/post.service';
import { Editor } from '@tinymce/tinymce-react';
import DOMPurify from 'dompurify';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        content: ''
    });

    // Add a ref for the Quill editor
    const quillRef = useRef(null);

    const fetchPosts = async (page = 1) => {
        try {
            const response = await getPosts(page, 10, searchTerm);
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

    const handleShowModal = (post = null) => {
        setSelectedPost(post);
        if (post) {
            setFormData({
                content: post.content || ''
            });
        } else {
            setFormData({
                content: ''
            });
        }
        setShowModal(true);
    };

    const handleViewPost = (post) => {
        setSelectedPost(post);
        setShowViewModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedPost) {
                await updatePost(selectedPost.id, formData);
                toast.success('Post updated successfully');
            } else {
                await createPost(formData);
                toast.success('Post created successfully');
            }
            setShowModal(false);
            fetchPosts(pagination.currentPage);
        } catch (error) {
            toast.error(error.response?.data?.error || 'Operation failed');
        }
    };

    const handleDelete = async (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await deletePost(postId);
                toast.success('Post deleted successfully');
                fetchPosts(pagination.currentPage);
            } catch (error) {
                toast.error('Error deleting post');
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
                    onClick={() => fetchPosts(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }
        return <Pagination>{items}</Pagination>;
    };

    // Quill editor modules and formats
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
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

    // Create a custom Quill component that uses refs instead of findDOMNode
    const QuillEditor = ({ value, onChange }) => {
        return (
            <div style={{ height: '300px', marginBottom: '50px' }}>
                <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={value}
                    onChange={onChange}
                    modules={modules}
                    formats={formats}
                />
            </div>
        );
    };

    return (
        <Container fluid className="mt-4">
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h4>Post Management</h4>
                    <div className="d-flex gap-2">
                        <Form.Control
                            type="text"
                            placeholder="Search posts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '200px' }}
                        />
                        <Button variant="primary" onClick={() => handleShowModal()}>
                            <FaPlus className="me-1" /> Add Post
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Content Preview</th>
                                <th>Author</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: DOMPurify.sanitize(post.content.substring(0, 100)) + '...'
                                            }}
                                        />
                                    </td>
                                    <td>{post.user?.fullName || 'Unknown'}</td>
                                    <td>{new Date(post.created_at).toLocaleString()}</td>
                                    <td>
                                        <Button
                                            variant="info"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleViewPost(post)}
                                            title="View"
                                        >
                                            <FaEye />
                                        </Button>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleShowModal(post)}
                                            title="Edit"
                                        >
                                            <FaEdit />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(post.id)}
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

            {/* Create/Edit Post Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{selectedPost ? 'Edit Post' : 'Add New Post'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Editor
                                apiKey="2jiabyfog04uc6gv6189slz590bf889i6fou93qxyf4u4qb2" // Add your TinyMCE API key here
                                value={formData.content}
                                onEditorChange={(content) => setFormData({ ...formData, content })}
                                init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar:
                                        'undo redo | formatselect | bold italic backcolor | ' +
                                        'alignleft aligncenter alignright alignjustify | ' +
                                        'bullist numlist outdent indent | removeformat | help'
                                }}
                            />
                            {/* <Editor
                                apiKey='2jiabyfog04uc6gv6189slz590bf889i6fou93qxyf4u4qb2'
                                value={formData.content}
                                onEditorChange={(content) => setFormData({ ...formData, content })}
                                init={{
                                    plugins: [
                                        // Core editing features
                                        'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                                        // Your account includes a free trial of TinyMCE premium features
                                        // Try the most popular premium features until Apr 26, 2025:
                                        'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
                                    ],
                                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                    tinycomments_mode: 'embedded',
                                    tinycomments_author: 'Author name',
                                    mergetags_list: [
                                        { value: 'First.Name', title: 'First Name' },
                                        { value: 'Email', title: 'Email' },
                                    ],
                                    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                                }}
                                initialValue="Welcome to TinyMCE!"
                            /> */}
                        </Form.Group>

                        <div className="d-flex justify-content-end mt-5">
                            <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                {selectedPost ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* View Post Modal */}
            <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>View Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedPost && (
                        <div>
                            <h5>Author: {selectedPost.user?.fullName || 'Unknown'}</h5>
                            <p>Created: {new Date(selectedPost.created_at).toLocaleString()}</p>
                            <hr />
                            <div
                                className="post-content"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(selectedPost.content)
                                }}
                            />
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowViewModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Posts;