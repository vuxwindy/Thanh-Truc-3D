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
    <div className="position-relative mb-4">
      <Carousel>
        {banners.map((banner) => (
          <Carousel.Item key={banner.id}>
            {banner.link ? (
              <a href={banner.link} target="_blank" rel="noopener noreferrer">
                <img
                  className="d-block w-100"
                  src={CDN_URL + banner.image}
                  alt={`Banner ${banner.id}`}
                  style={{ maxHeight: '600px', objectFit: 'cover', filter: 'brightness(0.7)' }}
                />
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                       background: 'linear-gradient(to bottom, rgba(0,0,0,0) 60%, #1a1a1a 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                   <Carousel.Caption className="position-absolute top-50 start-50 translate-middle text-center">
                    <h1 className="text-white fw-bold">Khám phá công nghệ vượt trội và trò chơi hấp dẫn nhất</h1>
                    <p className="text-light">'Ưu Đãi Đặc Biệt Tháng 5'</p>
                  </Carousel.Caption>              
              </a>
            ) : (
                <>
              <img
                className="d-block w-100"
                src={CDN_URL + banner.image}
                alt={`Banner ${banner.id}`}
                style={{ maxHeight: '600px', objectFit: 'cover', filter: 'brightness(0.7)' }}
              /> 
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 60%,rgb(26, 26, 26) 100%)',
                    pointerEvents: 'none',
                  }}
                />
              <Carousel.Caption className="position-absolute top-50 start-50 translate-middle text-center">
                <h1 className="text-white fw-bold">Khám phá công nghệ vượt trội và trò chơi hấp dẫn nhất</h1>
                <p className="text-light">'Ưu Đãi Đặc Biệt Tháng 5'</p>
              </Carousel.Caption>
              </>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;