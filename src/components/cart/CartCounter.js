// Componente CartCounter - Contador del carrito

import React from 'react';
import { useCart } from '../../contexts/CartContext';
import './CartCounter.css';

function CartCounter({ className = '', showPrice = false }) {
    const { totalItems, totalPrice } = useCart();
    
    const formattedPrice = totalPrice.toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP'
    });

    if (totalItems === 0) {
        return null;
    }

    return (
        <div className={`cart-counter ${className}`}>
            <span className="cart-count">
                {totalItems}
            </span>
            {showPrice && (
                <span className="cart-price">
                    {formattedPrice}
                </span>
            )}
        </div>
    );
}

export default CartCounter;
