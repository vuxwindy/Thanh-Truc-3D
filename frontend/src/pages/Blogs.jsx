import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../services/blog.service';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await getBlogs(page, 10, search);
        setBlogs(data.posts);
        setTotalPages(data.totalPages);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page, search]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Blog Posts</h1>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row">
        {blogs.map((blog) => (
          <div key={blog.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
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
                <p className="card-text">
                  {blog.content ?
                    <span dangerouslySetInnerHTML={{
                      __html: blog.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
                    }} /> :
                    'No content available'
                  }
                </p>
                <Link to={`/customer/blogs/${blog.id}`} className="btn btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-outline-primary me-2"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Blogs;