// Componente ProductCard - Tarjeta de producto individual

import React from 'react';
import { Card } from 'react-bootstrap';
import { FaStar, FaShoppingCart, FaEye } from 'react-icons/fa';
import { formatPrice, formatRating } from '../../utils/formatters';
import { useCart } from '../../contexts/CartContext';
import './ProductCard.css';

function ProductCard({ product, onShowDetails }) {
    const { addToCart, getProductQuantity, isProductInCart } = useCart();
    
    // Generar estrellas de rating
    const renderStars = () => {
        const { fullStars, hasHalfStar, emptyStars } = formatRating(product.rating);
        
        return (
            <div className="product-rating">
                {Array.from({ length: fullStars }, (_, i) => (
                    <FaStar key={i} className="star-filled" />
                ))}
                {hasHalfStar && <FaStar className="star-half" />}
                {Array.from({ length: emptyStars }, (_, i) => (
                    <FaStar key={i} className="star-empty" />
                ))}
                <span className="rating-text">({product.reviews})</span>
            </div>
        );
    };

    const handleAddToCart = () => {
        addToCart(product.id, 1);
    };

    const handleShowDetails = () => {
        if (onShowDetails) {
            onShowDetails(product.id);
        }
    };

    const quantityInCart = getProductQuantity(product.id);
    const isInCart = isProductInCart(product.id);

    return (
        <div className="col-lg-3 col-md-6 mb-4">
            <Card className="product-card h-100 shadow-sm">
                <div className="product-image-container" onClick={handleShowDetails} style={{ cursor: 'pointer' }}>
                    <Card.Img 
                        variant="top" 
                        src={product.imagen} 
                        alt={product.nombre}
                        className="product-image"
                    />
                    {isInCart && (
                        <div className="cart-indicator">
                            <span className="badge bg-primary">
                                {quantityInCart} en carrito
                            </span>
                        </div>
                    )}
                </div>
                
                <Card.Body className="d-flex flex-column">
                    <Card.Title className="product-title" onClick={handleShowDetails} style={{ cursor: 'pointer' }}>
                        {product.nombre}
                    </Card.Title>
                    
                    <Card.Text className="product-description text-muted">
                        {product.descripcion}
                    </Card.Text>
                    
                    {renderStars()}
                    
                    <div className="product-price">
                        <span className="price-amount">
                            {formatPrice(product.precio)}
                        </span>
                    </div>
                    
                    <div className="product-actions mt-auto">
                        <button 
                            className="btn btn-primary w-100 py-2"
                            onClick={handleAddToCart}
                            disabled={quantityInCart >= 99}
                        >
                            <FaShoppingCart className="me-1" />
                            {isInCart ? 'Agregar más' : 'Agregar al Carrito'}
                        </button>
                        
                        <button 
                            className="btn btn-outline-primary w-100"
                            onClick={handleShowDetails}
                        >
                            <FaEye className="me-2" />
                            Ver Detalles
                        </button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ProductCard;
