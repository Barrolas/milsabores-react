// Componente Footer - Migrado desde el proyecto original

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer bg-dark text-light py-5">
            <Container>
                <Row>
                    {/* Información de la empresa */}
                    <Col lg={4} md={6} className="mb-4">
                        <div className="footer-brand">
                            <img 
                                src="/assets/images/logo-milsabores.png" 
                                alt="Mil Sabores Logo" 
                                className="footer-logo mb-3"
                            />
                            <h5 className="text-white mb-3">Mil Sabores</h5>
                            <p className="text-light mb-3">
                                Tu pastelería de confianza con más de 10 años de experiencia 
                                creando los mejores postres y tortas para tus momentos especiales.
                            </p>
                        </div>
                    </Col>

                    {/* Enlaces rápidos */}
                    <Col lg={2} md={6} className="mb-4">
                        <h6 className="text-white mb-3">Enlaces Rápidos</h6>
                        <ul className="footer-links list-unstyled">
                            <li><a href="/" className="text-light">Inicio</a></li>
                            <li><a href="/#productos" className="text-light">Productos</a></li>
                            <li><a href="/#sobre-nosotros" className="text-light">Sobre Nosotros</a></li>
                            <li><a href="/login" className="text-light">Iniciar Sesión</a></li>
                            <li><a href="/registro" className="text-light">Registrarse</a></li>
                        </ul>
                    </Col>

                    {/* Categorías */}
                    <Col lg={2} md={6} className="mb-4">
                        <h6 className="text-white mb-3">Categorías</h6>
                        <ul className="footer-links list-unstyled">
                            <li><a href="/#productos" className="text-light">Tortas Cuadradas</a></li>
                            <li><a href="/#productos" className="text-light">Tortas Circulares</a></li>
                            <li><a href="/#productos" className="text-light">Postres Individuales</a></li>
                            <li><a href="/#productos" className="text-light">Sin Azúcar</a></li>
                            <li><a href="/#productos" className="text-light">Tortas Especiales</a></li>
                        </ul>
                    </Col>

                    {/* Información de contacto */}
                    <Col lg={4} md={6} className="mb-4">
                        <h6 className="text-white mb-3">Contacto</h6>
                        <div className="contact-info">
                            <div className="contact-item d-flex align-items-center mb-2">
                                <FaMapMarkerAlt className="me-3 text-primary" />
                                <span className="text-light">
                                    Av. Principal 123, Santiago, Chile
                                </span>
                            </div>
                            <div className="contact-item d-flex align-items-center mb-2">
                                <FaPhone className="me-3 text-primary" />
                                <span className="text-light">
                                    +56 9 1234 5678
                                </span>
                            </div>
                            <div className="contact-item d-flex align-items-center mb-2">
                                <FaEnvelope className="me-3 text-primary" />
                                <span className="text-light">
                                    contacto@milsabores.cl
                                </span>
                            </div>
                            <div className="contact-item d-flex align-items-center mb-2">
                                <FaWhatsapp className="me-3 text-primary" />
                                <span className="text-light">
                                    +56 9 8765 4321
                                </span>
                            </div>
                        </div>
                    </Col>
                </Row>

                <hr className="my-4 border-secondary" />

                <Row className="align-items-center">
                    {/* Copyright */}
                    <Col md={6}>
                        <p className="text-light mb-0">
                            &copy; {currentYear} Mil Sabores. Todos los derechos reservados.
                        </p>
                    </Col>

                    {/* Redes sociales */}
                    <Col md={6} className="text-md-end">
                        <div className="social-links">
                            <a 
                                href="https://facebook.com/milsabores" 
                                className="social-link me-3"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                            >
                                <FaFacebook />
                            </a>
                            <a 
                                href="https://instagram.com/milsabores" 
                                className="social-link me-3"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </a>
                            <a 
                                href="https://wa.me/56987654321" 
                                className="social-link"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                            >
                                <FaWhatsapp />
                            </a>
                        </div>
                    </Col>
                </Row>

                {/* Información adicional */}
                <Row className="mt-3">
                    <Col>
                        <div className="footer-bottom text-center">
                            <p className="text-muted small mb-0">
                                Horarios de atención: Lunes a Viernes 9:00 - 20:00, 
                                Sábados 9:00 - 18:00, Domingos 10:00 - 16:00
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
