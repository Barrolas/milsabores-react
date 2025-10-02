// Componente Navbar - Migrado desde el proyecto original

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaUser, FaShoppingCart, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';
import SidebarComponent from '../Sidebar';
import './Navbar.css';

const brandPink = '#e83e8c'; // Color rosa de la marca

function NavbarComponent({ onShowCartModal, sidebarOpen, onToggleSidebar, onCloseSidebar }) {
    // Estado real del carrito desde CartContext
    const { totalItems, totalPrice } = useCart();

    // Función para mostrar el modal del carrito
    const showCartModal = () => {
        if (onShowCartModal) {
            onShowCartModal();
        } else {
            alert('Carrito abierto (funcionalidad pendiente)');
        }
    };


    return (
        <Navbar expand="lg" bg="white" className="shadow-sm sticky-top">
            <Container fluid className="px-4">
                <div className="row w-100 align-items-center">
                    {/* Logo */}
                    <div className="col-auto px-3">
                        <Navbar.Brand href="/" className="d-flex align-items-center">
                            <img 
                                src="/assets/images/logo-milsabores.png" 
                                alt="Mil Sabores Logo" 
                                className="me-2"
                                style={{ width: '102px' }}
                            />
                        </Navbar.Brand>
                    </div>

                    {/* Nombre de la pastelería - Solo visible en móvil/tablet */}
                    <div className="col d-lg-none text-center">
                        <h5 className="mb-0 fw-bold text-dark">Mil Sabores</h5>
                        <small className="text-pink">Pastelería</small>
                    </div>

                    {/* Dropdown de categorias */}
                    <div className="col d-none d-lg-block">
                        <Nav className="d-flex flex-row justify-content-start">
                            <Nav.Item className="me-4">
                                <Nav.Link href="/" className="fw-medium px-2">Inicio</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="me-4">
                                <Nav.Link href="/#productos" className="fw-medium px-2">Productos</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/#sobre-nosotros" className="fw-medium px-2">Sobre Nosotros</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>


                    {/* User Actions */}
                    <div className="col-auto d-flex align-items-center justify-content-end">
                        {/* Desktop User Actions */}
                        <div className="d-none d-lg-flex align-items-center">
                            <Nav className="d-flex align-items-center justify-content-end">
                                <Nav.Item className="me-3">
                                    <Nav.Link href="/login" className="d-flex align-items-center text-dark">
                                        <FaSignInAlt className="me-2" style={{ color: brandPink }} />
                                        <span className="fw-medium">Iniciar Sesión</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="me-3">
                                    <Nav.Link href="/registro" className="d-flex align-items-center text-dark">
                                        <FaUserPlus className="me-2" style={{ color: brandPink }} />
                                        <span className="fw-medium">Registrarse</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <button 
                                        className="btn btn-outline-primary d-flex align-items-center cart-button"
                                        onClick={showCartModal}
                                        style={{ 
                                            borderRadius: '20px',
                                            borderColor: brandPink,
                                            color: brandPink
                                        }}
                                    >
                                        <FaShoppingCart className="me-2" />
                                        <span className="fw-medium">Carrito</span>
                                        {totalItems > 0 && (
                                            <span 
                                                className="badge bg-primary ms-2"
                                                style={{ backgroundColor: brandPink + '!important' }}
                                            >
                                                {totalItems}
                                            </span>
                                        )}
                                    </button>
                                </Nav.Item>
                            </Nav>
                        </div>

                        {/* Mobile Cart Button */}
                        <div className="d-lg-none">
                            <button 
                                className="btn btn-outline-primary d-flex align-items-center me-3 cart-button"
                                onClick={showCartModal}
                                style={{ 
                                    borderRadius: '20px',
                                    borderColor: brandPink,
                                    color: brandPink
                                }}
                            >
                                <FaShoppingCart />
                                {totalItems > 0 && (
                                    <span 
                                        className="badge bg-primary ms-1"
                                        style={{ backgroundColor: brandPink + '!important' }}
                                    >
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Sidebar Toggle */}
                        <SidebarComponent 
                            cartCount={totalItems}
                            cartPrice={totalPrice}
                            onCartClick={showCartModal}
                            show={sidebarOpen}
                            onToggle={onToggleSidebar}
                            onHide={onCloseSidebar}
                        />
                    </div>
                </div>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
