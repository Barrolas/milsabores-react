// Componente Layout - Estructura base de la aplicación

import React, { useState } from 'react';
import NavbarComponent from './Navbar';
import Footer from './Footer';
import './Layout.css';

/**
 * Componente Layout - Estructura base de la aplicación
 * 
 * Este componente proporciona la estructura común para todas las páginas:
 * - Navbar fijo en la parte superior
 * - Contenido principal que se expande
 * - Footer fijo en la parte inferior
 * 
 * @param {React.ReactNode} children - Contenido que se renderiza en el área principal
 * @param {Function} onShowCartModal - Función para mostrar el modal del carrito
 */
function Layout({ children, onShowCartModal }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="layout-container">
      {/* Navbar fijo en la parte superior */}
      <NavbarComponent 
        onShowCartModal={onShowCartModal}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={handleToggleSidebar}
        onCloseSidebar={handleCloseSidebar}
      />
      
      {/* Contenido principal */}
      <main className="layout-main">
        {children}
      </main>
      
      {/* Footer fijo en la parte inferior */}
      <Footer />
    </div>
  );
}

export default Layout;
