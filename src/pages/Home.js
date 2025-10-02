// Página Home - Página principal de la aplicación

import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Layout from '../components/layout/Layout';
import CarouselComponent from '../components/Carousel';
import ProductGrid from '../components/products/ProductGrid';
import ProductModal from '../components/products/ProductModal';
import CartModal from '../components/cart/CartModal';
import { useCart } from '../contexts/CartContext';
import { scrollToElement } from '../utils/helpers';
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

    const handleScrollToProducts = () => {
        scrollToElement('productos', 100);
    };

    const handleScrollToAbout = () => {
        scrollToElement('sobre-nosotros', 100);
    };

    return (
        <Layout onShowCartModal={handleShowCartModal}>
            {/* Carrusel Hero */}
            <CarouselComponent />

            {/* Sección de Bienvenida */}
            <section className="welcome-section">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col lg={8}>
                            <div className="welcome-content">
                                <h1 className="welcome-title">
                                    Bienvenidos a <span className="brand-name">Mil Sabores</span>
                                </h1>
                                <p className="welcome-description">
                                    Descubre el sabor auténtico de la pastelería artesanal. 
                                    Cada producto está elaborado con amor y los mejores ingredientes 
                                    para hacer de tus momentos especiales algo inolvidable.
                                </p>
                                <div className="welcome-actions">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        onClick={handleScrollToProducts}
                                        className="welcome-btn"
                                    >
                                        Ver Productos
                                    </Button>
                                    <Button
                                        variant="outline-primary"
                                        size="lg"
                                        onClick={handleScrollToAbout}
                                        className="welcome-btn"
                                    >
                                        Conocer Más
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Sección de Productos */}
            <section id="productos" className="products-section">
                <Container fluid>
                    <Row>
                        <Col>
                            <div className="section-header text-center mb-5">
                                <h2 className="section-title">Nuestros Productos</h2>
                                <p className="section-subtitle">
                                    Descubre nuestra amplia variedad de tortas, postres y productos especiales
                                </p>
                            </div>
                        </Col>
                    </Row>
                    
                    <ProductGrid onShowProductDetails={handleShowProductDetails} />
                </Container>
            </section>

            {/* Sección Sobre Nosotros */}
            <section id="sobre-nosotros" className="about-section">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6}>
                            <div className="about-content">
                                <h2 className="about-title">Sobre Nosotros</h2>
                                <p className="about-description">
                                    Con más de 10 años de experiencia en el mundo de la pastelería, 
                                    Mil Sabores se ha consolidado como una de las pastelerías más 
                                    reconocidas de la región. Nuestro compromiso es ofrecer productos 
                                    de la más alta calidad, elaborados con ingredientes frescos y 
                                    técnicas artesanales tradicionales.
                                </p>
                                <div className="about-features">
                                    <div className="feature-item">
                                        <i className="fas fa-heart feature-icon"></i>
                                        <div className="feature-content">
                                            <h5>Hecho con Amor</h5>
                                            <p>Cada producto está elaborado con dedicación y cariño</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <i className="fas fa-leaf feature-icon"></i>
                                        <div className="feature-content">
                                            <h5>Ingredientes Frescos</h5>
                                            <p>Utilizamos solo los mejores ingredientes naturales</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <i className="fas fa-star feature-icon"></i>
                                        <div className="feature-content">
                                            <h5>Calidad Premium</h5>
                                            <p>Nuestros productos superan las expectativas de nuestros clientes</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="about-image">
                                <img
                                    src="/assets/images/logo-milsabores.png"
                                    alt="Mil Sabores"
                                    className="img-fluid rounded"
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

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
