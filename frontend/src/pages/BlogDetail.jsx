import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogById } from '../services/blog.service';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const data = await getBlogById(id);
        setBlog(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch blog');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;
  if (!blog) return <div className="alert alert-warning mt-5">Blog not found</div>;

  return (
    <div className="container mt-5">
      <Link to="/customer/blogs" className="btn btn-outline-primary mb-4">
        ← Back to Blogs
      </Link>

      <article className="blog-post">
        <h1 className="mb-4">{blog.title}</h1>
        
        <div className="author-info d-flex align-items-center mb-4">
          {blog?.user?.avatar ? (
            <img 
              src={blog.user.avatar} 
              alt={blog.user.fullName || 'Author'} 
              className="rounded-circle me-3" 
              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
            />
          ) : (
            <div 
              className="rounded-circle bg-secondary d-flex align-items-center justify-content-center me-3" 
              style={{ width: '50px', height: '50px', color: 'white' }}
            >
              {blog?.user?.fullName?.charAt(0) || 'A'}
            </div>
          )}
          <div>
            <h6 className="mb-0">{blog?.user?.fullName || 'Anonymous'}</h6>
            {blog?.user?.email && <small className="text-muted">{blog.user.email}</small>}
            <div><small className="text-muted">Published: {new Date(blog.created_at).toLocaleDateString()}</small></div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-body">
            {/* Render HTML content from TinyMCE */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content || '' }}
            />
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;