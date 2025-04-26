import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { getBanners } from '../../../services/banner.service';
import { CDN_URL } from '../../../constant';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const data = await getBanners();
        setBanners(data.banners);
        setLoading(false);
      } catch (err) {
        setError('Failed to load banners');
        setLoading(false);
        console.error('Error fetching banners:', err);
      }
    };

    fetchBanners();
  }, []);

  if (loading) return <div className="text-center py-5">Loading banners...</div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;
  if (banners.length === 0) return null;

  return (
    <div className="banner-container mb-4">
      <Carousel>
        {banners.map((banner) => (
          <Carousel.Item key={banner.id}>
            {banner.link ? (
              <a href={banner.link} target="_blank" rel="noopener noreferrer">
                <img
                  className="d-block w-100"
                  src={CDN_URL + banner.image}
                  alt={`Banner ${banner.id}`}
                  style={{ maxHeight: '500px', objectFit: 'cover' }}
                />
              </a>
            ) : (
              <img
                className="d-block w-100"
                src={CDN_URL + banner.image}
                alt={`Banner ${banner.id}`}
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              />
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;