// Componente Carousel - Migrado desde el proyecto original

import React from 'react';
import { Carousel } from 'react-bootstrap';
import { CAROUSEL_IMAGES } from '../data/constants';
import './Carousel.css';

function CarouselComponent() {
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
                            <div className="carousel-image-container">
                                <img
                                    className="d-block w-100 carousel-image"
                                    src={item.image}
                                    alt={item.alt}
                                />
                                {/* Comentado para futuro - enlace a producto */}
                                {/* <Carousel.Caption>
                                    <button 
                                        className="btn btn-primary btn-lg"
                                        onClick={() => showProductDetails(item.id)}
                                    >
                                        Ver Detalles
                                    </button>
                                </Carousel.Caption> */}
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </section>
        </header>
    );
}

export default CarouselComponent;
