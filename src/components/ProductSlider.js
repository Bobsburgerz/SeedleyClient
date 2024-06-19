import React, { useEffect, useState } from 'react';

const ProductSlider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentNavLink, setCurrentNavLink] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    }, 3200);

    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    setCurrentNavLink(images[currentSlide]?.navlink || ''); // Set currentNavLink based on the current slide
  }, [currentSlide, images]);

  return (
    <div style={{ display: 'flex', height: '180px' }} className="slider">
      {images.map((product, index) => (
        <div
          key={index}
          style={{
            cursor: 'pointer',
            position: 'absolute',
            opacity: currentSlide === index ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          <h4 style={{ marginTop: '-3px', marginBottom: '5px', color: '', fontSize: '19px' }}>
            Featured Products
          </h4>

          <a target="_blank" href={currentNavLink}>
            <div style={{ border: 'none', borderRadius: '5px', padding: '5px', width: '260px' }}>
              <p style={{ margin: '0px' }}>{product.name}</p>
              <h4 style={{ margin: '0px' }}>{product.price}</h4>
              <img
                style={{ borderRadius: '5px', width: '180px', height: '120px', objectFit: 'cover' }}
                src={product.image}
                alt={`Slide ${index}`}
              />
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProductSlider;