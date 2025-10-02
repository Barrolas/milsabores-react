// Página Home - Página principal de la aplicación

import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import SectionWrapper from '../components/layout/SectionWrapper';
import CarouselComponent from '../components/Carousel';
import ProductGrid from '../components/products/ProductGrid';
import ProductModal from '../components/products/ProductModal';
import CartModal from '../components/cart/CartModal';
import { useCart } from '../contexts/CartContext';
import './Home.css';

function Home() {
    const [showProductModal, setShowProductModal] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    
    const { totalItems } = useCart();

    const handleShowProductDetails = (productId) => {
        setSelectedProductId(productId);
        setShowProductModal(true);
    };

    const handleHideProductModal = () => {
        setShowProductModal(false);
        setSelectedProductId(null);
    };

    const handleShowCartModal = () => {
        setShowCartModal(true);
    };

    const handleHideCartModal = () => {
        setShowCartModal(false);
    };


    return (
        <Layout onShowCartModal={handleShowCartModal}>
            {/* Carrusel Hero */}
            <CarouselComponent />


            {/* Sección de Productos */}
            <SectionWrapper
                id="productos"
                className="products-section"
                title="Nuestros Productos"
                subtitle="Descubre nuestra amplia variedad de tortas, postres y productos especiales"
                fluid={true}
                headerBackgroundColor="white"
                contentBackgroundColor="white"
            >
                <ProductGrid onShowProductDetails={handleShowProductDetails} />
            </SectionWrapper>

            {/* Sección Sobre Nosotros */}
            <SectionWrapper
                id="sobre-nosotros"
                className="about-section"
                title="Sobre Nosotros"
                subtitle="Conoce la historia y valores que hacen de Mil Sabores una pastelería única"
                fluid={true}
                headerBackgroundColor="white"
                contentBackgroundColor="#fdf2f8"
            >
                <Row className="align-items-stretch">
                    <Col lg={6} className="mb-4 mb-lg-0">
                        <div className="about-content">
                            <div className="about-text-section">
                                <p className="about-description">
                                    Con más de 10 años de experiencia en el mundo de la pastelería, 
                                    <strong> Mil Sabores</strong> se ha consolidado como una de las pastelerías más 
                                    reconocidas de la región. Nuestro compromiso es ofrecer productos 
                                    de la más alta calidad, elaborados con ingredientes frescos y 
                                    técnicas artesanales tradicionales.
                                </p>
                            </div>
                            
                            <div className="about-features-section mx-5">
                                <h4 className="features-title">¿Por qué elegirnos?</h4>
                                <div className="about-features">
                                    <div className="feature-item">
                                        <div className="feature-icon-wrapper">
                                            <i className="fas fa-heart feature-icon "></i>
                                        </div>
                                        <div className="feature-content mx-5">
                                            <h5>Hecho con Amor</h5>
                                            <p>Cada producto está elaborado con dedicación y cariño, transmitiendo el sabor del hogar en cada bocado.</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon-wrapper">
                                            <i className="fas fa-leaf feature-icon "></i>
                                        </div>
                                        <div className="feature-content mx-5">
                                            <h5>Ingredientes Frescos</h5>
                                            <p>Utilizamos solo los mejores ingredientes naturales y frescos, seleccionados cuidadosamente para cada receta.</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <div className="feature-icon-wrapper">
                                            <i className="fas fa-star feature-icon "></i>
                                        </div>
                                        <div className="feature-content mx-5">
                                            <h5>Calidad Premium</h5>
                                            <p>Nuestros productos superan las expectativas de nuestros clientes, garantizando una experiencia única.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="about-visual-section">
                            <div className="about-image">
                                <img
                                    src="/assets/images/logo-milsabores.png"
                                    alt="Mil Sabores - Pastelería Artesanal"
                                    className="img-fluid"
                                />
                            </div>
                            <div className="about-stats">
                                <div className="stat-item">
                                    <span className="stat-number">10+</span>
                                    <span className="stat-label">Años de Experiencia</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">500+</span>
                                    <span className="stat-label">Clientes Satisfechos</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">50+</span>
                                    <span className="stat-label">Productos Únicos</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </SectionWrapper>

            {/* Sección de Contacto */}
            <section className="contact-section">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={8}>
                            <div className="contact-content">
                                <h2 className="contact-title">¿Listo para Ordenar?</h2>
                                <p className="contact-description">
                                    Contáctanos para hacer tu pedido o resolver cualquier consulta. 
                                    Estamos aquí para hacer de tu experiencia algo especial.
                                </p>
                                <div className="contact-info">
                                    <div className="contact-item">
                                        <i className="fas fa-phone contact-icon"></i>
                                        <span>+56 9 1234 5678</span>
                                    </div>
                                    <div className="contact-item">
                                        <i className="fas fa-envelope contact-icon"></i>
                                        <span>contacto@milsabores.cl</span>
                                    </div>
                                    <div className="contact-item">
                                        <i className="fas fa-map-marker-alt contact-icon"></i>
                                        <span>Av. Principal 123, Santiago</span>
                                    </div>
                                </div>
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="contact-btn"
                                >
                                    Hacer Pedido
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Modales */}
            <ProductModal
                show={showProductModal}
                onHide={handleHideProductModal}
                productId={selectedProductId}
            />
            
            <CartModal
                show={showCartModal}
                onHide={handleHideCartModal}
            />
        </Layout>
    );
}

export default Home;
