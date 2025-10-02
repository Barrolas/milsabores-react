// Componente ProductModal - Modal de detalles del producto

import React, { useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { FaStar, FaShoppingCart, FaHeart, FaShare, FaTimes } from 'react-icons/fa';
import { getProductById } from '../../data/productosDB';
import { formatPrice, formatRating } from '../../utils/formatters';
import { useCart } from '../../contexts/CartContext';
import './ProductModal.css';

function ProductModal({ show, onHide, productId }) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart, getProductQuantity, isProductInCart } = useCart();
    
    const product = getProductById(productId);
    
    if (!product) {
        return null;
    }

    const { fullStars, hasHalfStar, emptyStars } = formatRating(product.rating);
    const quantityInCart = getProductQuantity(product.id);
    const isInCart = isProductInCart(product.id);

    const handleAddToCart = () => {
        addToCart(product.id, quantity);
        setQuantity(1); // Reset quantity after adding
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 1 && value <= 99) {
            setQuantity(value);
        }
    };

    const handleQuantityIncrement = () => {
        if (quantity < 99) {
            setQuantity(quantity + 1);
        }
    };

    const handleQuantityDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const renderStars = () => {
        return (
            <div className="product-rating">
                {Array.from({ length: fullStars }, (_, i) => (
                    <FaStar key={i} className="star-filled" />
                ))}
                {hasHalfStar && <FaStar className="star-half" />}
                {Array.from({ length: emptyStars }, (_, i) => (
                    <FaStar key={i} className="star-empty" />
                ))}
                <span className="rating-text">({product.reviews} reseñas)</span>
            </div>
        );
    };

    const renderReviews = () => {
        if (!product.reseñas || product.reseñas.length === 0) {
            return null;
        }

        return (
            <div className="reviews-section">
                <h6 className="reviews-title">Reseñas de Clientes</h6>
                <div className="reviews-list">
                    {product.reseñas.map((review, index) => (
                        <div key={index} className="review-item">
                            <div className="review-header">
                                <div className="review-author">
                                    <strong>{review.autor}</strong>
                                    <div className="review-rating">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <FaStar 
                                                key={i} 
                                                className={i < review.rating ? 'star-filled' : 'star-empty'} 
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="review-date">
                                    {new Date(review.fecha).toLocaleDateString('es-CL')}
                                </div>
                            </div>
                            <div className="review-comment">
                                {review.comentario}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            className="product-modal"
        >
            <Modal.Header closeButton className="modal-header">
                <Modal.Title className="modal-title">
                    {product.nombre}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="modal-body">
                <Row>
                    {/* Imagen del producto */}
                    <Col md={6}>
                        <div className="product-image-container">
                            <img
                                src={product.imagen}
                                alt={product.nombre}
                                className="product-image"
                            />
                            {isInCart && (
                                <div className="cart-badge">
                                    <span className="badge bg-primary">
                                        {quantityInCart} en carrito
                                    </span>
                                </div>
                            )}
                        </div>
                    </Col>

                    {/* Información del producto */}
                    <Col md={6}>
                        <div className="product-info">
                            {/* Rating */}
                            <div className="product-rating-section mb-3">
                                {renderStars()}
                            </div>

                            {/* Precio */}
                            <div className="product-price-section mb-3">
                                <span className="product-price">
                                    {formatPrice(product.precio)}
                                </span>
                            </div>

                            {/* Descripción */}
                            <div className="product-description-section mb-3">
                                <h6>Descripción</h6>
                                <p className="product-description">
                                    {product.descripcionDetallada || product.descripcion}
                                </p>
                            </div>

                            {/* Información adicional */}
                            <div className="product-details-section mb-3">
                                <Row>
                                    <Col sm={6}>
                                        <div className="detail-item">
                                            <strong>Porciones:</strong>
                                            <span>{product.porciones}</span>
                                        </div>
                                    </Col>
                                    <Col sm={6}>
                                        <div className="detail-item">
                                            <strong>Calorías:</strong>
                                            <span>{product.calorias}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            {/* Ingredientes */}
                            <div className="product-ingredients-section mb-3">
                                <h6>Ingredientes</h6>
                                <p className="product-ingredients">
                                    {product.ingredientes}
                                </p>
                            </div>

                            {/* Cantidad y botón de agregar */}
                            <div className="product-actions-section">
                                <div className="quantity-selector mb-3">
                                    <label className="quantity-label">Cantidad:</label>
                                    <div className="quantity-controls">
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={handleQuantityDecrement}
                                            disabled={quantity <= 1}
                                            className="quantity-btn"
                                        >
                                            -
                                        </Button>
                                        <Form.Control
                                            type="number"
                                            min="1"
                                            max="99"
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            className="quantity-input"
                                        />
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={handleQuantityIncrement}
                                            disabled={quantity >= 99}
                                            className="quantity-btn"
                                        >
                                            +
                                        </Button>
                                    </div>
                                </div>

                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={handleAddToCart}
                                    className="add-to-cart-btn w-100"
                                    disabled={quantityInCart + quantity > 99}
                                >
                                    <FaShoppingCart className="me-2" />
                                    {isInCart ? 'Agregar más al Carrito' : 'Agregar al Carrito'}
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Reseñas */}
                <Row className="mt-4">
                    <Col>
                        {renderReviews()}
                    </Col>
                </Row>
            </Modal.Body>

            <Modal.Footer className="modal-footer">
                <div className="modal-actions">
                    <Button
                        variant="outline-secondary"
                        onClick={onHide}
                        className="close-btn"
                    >
                        <FaTimes className="me-2" />
                        Cerrar
                    </Button>
                    <Button
                        variant="outline-primary"
                        className="share-btn"
                    >
                        <FaShare className="me-2" />
                        Compartir
                    </Button>
                    <Button
                        variant="outline-danger"
                        className="favorite-btn"
                    >
                        <FaHeart className="me-2" />
                        Favorito
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default ProductModal;
