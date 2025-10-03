// Componente Carousel - Migrado desde el proyecto original

import React from 'react';
import { Carousel } from 'react-bootstrap';
import { CAROUSEL_IMAGES } from '../data/constants';
import './Carousel.css';

function CarouselComponent({ onShowProductDetails }) {
    return (
        <header className="carousel-header">
            <section className="hero-section">
                <Carousel 
                    fade 
                    interval={5000} 
                    controls={true} 
                    indicators={true}
                    pause="hover"
                    className="hero-carousel"
                >
                    {CAROUSEL_IMAGES.map((item) => (
                        <Carousel.Item key={item.id}>
                            <div 
                                className="carousel-image-container clickable-carousel-item"
                                onClick={() => onShowProductDetails && onShowProductDetails(item.id)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        onShowProductDetails && onShowProductDetails(item.id);
                                    }
                                }}
                            >
                                <img
                                    className="d-block w-100 carousel-image"
                                    src={item.image}
                                    alt={item.alt}
                                />
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </section>
        </header>
    );
}

export default CarouselComponent;
