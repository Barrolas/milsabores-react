// Componente Footer - Migrado desde el proyecto original

import React from 'react';
import { Container } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer bg-dark text-light py-3">
            <Container>
                <div className="text-center">
                    <img 
                        src="/assets/images/logo-milsabores.png" 
                        alt="Mil Sabores Logo" 
                        className="footer-logo mb-3"
                        style={{ width: '80px' }}
                    />
                    <div className="social-links mb-3">
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
                    <p className="text-light mb-0">
                        &copy; {currentYear} Mil Sabores. Todos los derechos reservados.
                    </p>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
