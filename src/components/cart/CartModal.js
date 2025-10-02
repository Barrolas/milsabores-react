// Componente CartModal - Modal del carrito de compras

import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { FaShoppingCart, FaTrash, FaPlus, FaMinus, FaTimes } from 'react-icons/fa';
import { useCart } from '../../contexts/CartContext';
import { formatPrice } from '../../utils/formatters';
import { showClearCartConfirmAlert, showRemoveProductConfirmAlert } from '../../utils/sweetAlert';
import './CartModal.css';

function CartModal({ show, onHide }) {
    const {
        cart,
        totalItems,
        totalPrice,
        updateQuantity,
        removeFromCart,
        clearCart
    } = useCart();

    const handleQuantityChange = async (productId, change) => {
        const currentItem = cart.find(item => item.id === productId);
        if (!currentItem) return;

        const newQuantity = currentItem.cantidad + change;
        
        if (newQuantity <= 0) {
            const confirmed = await showRemoveProductConfirmAlert(currentItem.nombre);
            if (confirmed) {
                removeFromCart(productId);
            }
        } else {
            updateQuantity(productId, newQuantity);
        }
    };

    const handleRemoveItem = async (productId) => {
        const item = cart.find(item => item.id === productId);
        if (!item) return;

        const confirmed = await showRemoveProductConfirmAlert(item.nombre);
        if (confirmed) {
            removeFromCart(productId);
        }
    };

    const handleClearCart = async () => {
        const confirmed = await showClearCartConfirmAlert();
        if (confirmed) {
            clearCart();
        }
    };

    const handleCheckout = () => {
        // Placeholder para checkout
        alert('Funcionalidad de checkout pendiente');
    };

    const renderCartItem = (item) => {
        const subtotal = item.precio * item.cantidad;
        
        return (
            <div key={item.id} className="cart-item">
                <Row className="align-items-center">
                    {/* Imagen del producto */}
                    <Col xs={3} sm={2}>
                        <div className="cart-item-image">
                            <img
                                src={item.imagen}
                                alt={item.nombre}
                                className="img-fluid rounded"
                            />
                        </div>
                    </Col>

                    {/* Información del producto */}
                    <Col xs={9} sm={4}>
                        <div className="cart-item-info">
                            <h6 className="cart-item-name">{item.nombre}</h6>
                            <p className="cart-item-price text-muted">
                                {formatPrice(item.precio)} c/u
                            </p>
                        </div>
                    </Col>

                    {/* Controles de cantidad */}
                    <Col xs={6} sm={3}>
                        <div className="cart-item-quantity">
                            <div className="quantity-controls">
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => handleQuantityChange(item.id, -1)}
                                    className="quantity-btn"
                                >
                                    <FaMinus />
                                </Button>
                                <span className="quantity-display">
                                    {item.cantidad}
                                </span>
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => handleQuantityChange(item.id, 1)}
                                    className="quantity-btn"
                                    disabled={item.cantidad >= 99}
                                >
                                    <FaPlus />
                                </Button>
                            </div>
                        </div>
                    </Col>

                    {/* Subtotal y acciones */}
                    <Col xs={6} sm={3}>
                        <div className="cart-item-actions">
                            <div className="cart-item-subtotal">
                                <strong>{formatPrice(subtotal)}</strong>
                            </div>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleRemoveItem(item.id)}
                                className="remove-btn"
                            >
                                <FaTrash />
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    };

    const renderEmptyCart = () => (
        <div className="empty-cart">
            <div className="empty-cart-icon">
                <FaShoppingCart />
            </div>
            <h5 className="empty-cart-title">Tu carrito está vacío</h5>
            <p className="empty-cart-message">
                Agrega algunos productos para comenzar tu compra
            </p>
            <Button
                variant="primary"
                onClick={onHide}
                className="continue-shopping-btn"
            >
                Continuar Comprando
            </Button>
        </div>
    );

    const renderCartSummary = () => (
        <div className="cart-summary">
            <div className="cart-summary-header">
                <h5>Resumen del Carrito</h5>
            </div>
            
            <div className="cart-summary-details">
                <div className="summary-row">
                    <span>Productos:</span>
                    <span>{totalItems}</span>
                </div>
                <div className="summary-row">
                    <span>Total:</span>
                    <span className="total-price">{formatPrice(totalPrice)}</span>
                </div>
            </div>
            
            <div className="cart-summary-actions">
                <Button
                    variant="outline-secondary"
                    onClick={handleClearCart}
                    className="clear-cart-btn"
                    disabled={cart.length === 0}
                >
                    <FaTrash className="me-2" />
                    Vaciar Carrito
                </Button>
                <Button
                    variant="primary"
                    onClick={handleCheckout}
                    className="checkout-btn"
                    disabled={cart.length === 0}
                >
                    <FaShoppingCart className="me-2" />
                    Proceder al Pago
                </Button>
            </div>
        </div>
    );

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
            className="cart-modal"
        >
            <Modal.Header closeButton className="modal-header">
                <Modal.Title className="modal-title">
                    <FaShoppingCart className="me-2" />
                    Carrito de Compras
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="modal-body">
                {cart.length === 0 ? (
                    renderEmptyCart()
                ) : (
                    <Row>
                        {/* Lista de productos */}
                        <Col lg={8}>
                            <div className="cart-items">
                                <div className="cart-items-header">
                                    <h6>Productos en tu carrito</h6>
                                </div>
                                <div className="cart-items-list">
                                    {cart.map(renderCartItem)}
                                </div>
                            </div>
                        </Col>

                        {/* Resumen del carrito */}
                        <Col lg={4}>
                            {renderCartSummary()}
                        </Col>
                    </Row>
                )}
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
                    {cart.length > 0 && (
                        <Button
                            variant="primary"
                            onClick={handleCheckout}
                            className="checkout-btn"
                        >
                            <FaShoppingCart className="me-2" />
                            Finalizar Compra
                        </Button>
                    )}
                </div>
            </Modal.Footer>
        </Modal>
    );
}

export default CartModal;
