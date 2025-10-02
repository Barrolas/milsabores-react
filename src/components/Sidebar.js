import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { FaSearch, FaUser, FaSignInAlt, FaUserPlus, FaShoppingCart } from 'react-icons/fa';
import './Sidebar.css';

function SidebarComponent({ cartCount, cartPrice, onCartClick, onSearchChange, show, onHide, onToggle }) {
  const handleClose = () => {
    if (onHide) onHide();
  };

  const handleToggle = () => {
    if (onToggle) onToggle();
  };

  return (
    <>
      {/* Botón hamburguesa */}
      <button 
        className={`navbar-toggler border-0 d-lg-none ${show ? 'collapsed' : ''}`}
        type="button" 
        onClick={handleToggle}
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Sidebar Offcanvas */}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header>
          <Offcanvas.Title>
            <img 
              src="/assets/images/logo-milsabores.png" 
              alt="Mil Sabores Logo" 
              style={{ width: '60px' }}
            />
          </Offcanvas.Title>
          <button 
            type="button" 
            className="btn-close" 
            onClick={handleClose}
          ></button>
        </Offcanvas.Header>

        <Offcanvas.Body>
          {/* Enlaces de navegación */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link fw-medium py-3" href="/">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium py-3" href="/#productos">Productos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium py-3" href="/#sobre-nosotros">Sobre Nosotros</a>
            </li>
          </ul>

          {/* Barra de búsqueda */}
          <div className="mt-4">
            <div className="position-relative">
              <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-pink" />
              <input 
                type="text" 
                className="form-control ps-5 border-pink bg-white"
                placeholder="Buscar..." 
                style={{ borderRadius: '25px' }}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* Usuario y carrito */}
          <div className="mt-4 d-flex flex-column gap-3">
            {/* Mi cuenta */}
            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
                <FaUser className="text-pink" />
                <span className="fw-medium">Mi cuenta</span>
              </div>
              <div className="ps-3 d-flex flex-column gap-2">
                <a href="/login" className="btn btn-primary btn-sm">
                  <FaSignInAlt className="me-2" />
                  Iniciar sesión
                </a>
                <a href="/registro" className="btn btn-outline-primary btn-sm">
                  <FaUserPlus className="me-2" />
                  Crear una cuenta
                </a>
              </div>
            </div>

            {/* Carrito */}
            <div 
              className="d-flex align-items-center gap-3 p-3 bg-light rounded position-relative" 
              style={{ cursor: 'pointer' }}
              onClick={onCartClick}
            >
              <FaShoppingCart className="text-pink" />
              <span className="fw-medium">Carrito ${cartPrice || 0}</span>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SidebarComponent;