import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './SectionWrapper.css';

/**
 * Componente reutilizable para crear secciones con patrón consistente
 * 
 * @param {string} id - ID único de la sección
 * @param {string} className - Clases CSS adicionales
 * @param {string} title - Título de la sección
 * @param {string} subtitle - Subtítulo de la sección
 * @param {React.ReactNode} children - Contenido de la sección
 * @param {boolean} fluid - Si el contenedor debe ser fluido
 * @param {string} headerBackgroundColor - Color de fondo del header (título)
 * @param {string} contentBackgroundColor - Color de fondo del contenido
 * @param {string} contentPadding - Padding personalizado para el contenido
 */
function SectionWrapper({ 
    id, 
    className = '', 
    title, 
    subtitle, 
    children, 
    fluid = false,
    headerBackgroundColor = 'white',
    contentBackgroundColor = 'white',
    contentPadding = '2rem 0 2rem 0'
}) {
    const ContainerComponent = fluid ? Container : Container;
    const containerProps = fluid ? { fluid: true } : {};

    return (
        <section 
            id={id} 
            className={`section-wrapper ${className}`}
        >
            {/* Header con fondo separado */}
            <div className="section-header-wrapper" style={{ backgroundColor: headerBackgroundColor }}>
                <ContainerComponent {...containerProps}>
                    <Row>
                        <Col>
                            <div className="section-header text-center mb-5">
                                <h2 className="section-title">{title}</h2>
                                {subtitle && (
                                    <p className="section-subtitle">
                                        {subtitle}
                                    </p>
                                )}
                            </div>
                        </Col>
                    </Row>
                </ContainerComponent>
            </div>
            
            {/* Contenido con fondo separado */}
            <div className="section-content-wrapper" style={{ backgroundColor: contentBackgroundColor, padding: contentPadding }}>
                <ContainerComponent {...containerProps}>
                    {children}
                </ContainerComponent>
            </div>
        </section>
    );
}

export default SectionWrapper;
