// Utilidades de formateo - Para formatear datos en la aplicación

import { APP_CONFIG } from '../data/constants';

/**
 * Formatea un precio en pesos chilenos
 * @param {number} price - Precio a formatear
 * @returns {string} Precio formateado con símbolo de peso
 */
export const formatPrice = (price) => {
    return `$${price.toLocaleString(APP_CONFIG.LOCALE)}`;
};

/**
 * Formatea un precio con descuento aplicado
 * @param {number} originalPrice - Precio original
 * @param {number} discountPercentage - Porcentaje de descuento
 * @returns {Object} { originalPrice, discountedPrice, savings }
 */
export const formatPriceWithDiscount = (originalPrice, discountPercentage) => {
    const discountAmount = (originalPrice * discountPercentage) / 100;
    const discountedPrice = originalPrice - discountAmount;
    const savings = originalPrice - discountedPrice;
    
    return {
        originalPrice: formatPrice(originalPrice),
        discountedPrice: formatPrice(discountedPrice),
        savings: formatPrice(savings),
        discountPercentage: discountPercentage
    };
};

/**
 * Formatea una fecha en formato chileno
 * @param {Date|string} date - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export const formatDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString(APP_CONFIG.LOCALE);
};

/**
 * Formatea una fecha relativa (ej: "hace 2 días")
 * @param {Date|string} date - Fecha a formatear
 * @returns {string} Fecha relativa formateada
 */
export const formatRelativeDate = (date) => {
    const dateObj = new Date(date);
    const now = new Date();
    const diffInDays = Math.floor((now - dateObj) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
        return 'Hoy';
    } else if (diffInDays === 1) {
        return 'Ayer';
    } else if (diffInDays < 7) {
        return `Hace ${diffInDays} días`;
    } else if (diffInDays < 30) {
        const weeks = Math.floor(diffInDays / 7);
        return `Hace ${weeks} semana${weeks > 1 ? 's' : ''}`;
    } else {
        return formatDate(date);
    }
};

/**
 * Formatea un texto para capitalizar la primera letra
 * @param {string} text - Texto a capitalizar
 * @returns {string} Texto capitalizado
 */
export const capitalize = (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Formatea un texto para capitalizar cada palabra
 * @param {string} text - Texto a capitalizar
 * @returns {string} Texto con cada palabra capitalizada
 */
export const capitalizeWords = (text) => {
    if (!text) return '';
    return text.split(' ').map(word => capitalize(word)).join(' ');
};

/**
 * Formatea un número de teléfono chileno
 * @param {string} phone - Número de teléfono
 * @returns {string} Número formateado
 */
export const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    
    // Remover todos los caracteres no numéricos
    const cleaned = phone.replace(/\D/g, '');
    
    // Formatear según el patrón chileno
    if (cleaned.length === 9) {
        return `+56 ${cleaned.slice(0, 1)} ${cleaned.slice(1, 5)} ${cleaned.slice(5)}`;
    } else if (cleaned.length === 8) {
        return `+56 9 ${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    }
    
    return phone;
};

/**
 * Formatea un texto para mostrar solo una cantidad específica de caracteres
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado con "..."
 */
export const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};

/**
 * Formatea un rating para mostrar estrellas
 * @param {number} rating - Rating del producto (0-5)
 * @returns {Object} { fullStars, hasHalfStar, emptyStars }
 */
export const formatRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return {
        fullStars,
        hasHalfStar,
        emptyStars,
        displayRating: rating.toFixed(1)
    };
};

/**
 * Formatea una cantidad de productos para mostrar en el carrito
 * @param {number} quantity - Cantidad de productos
 * @returns {string} Cantidad formateada
 */
export const formatQuantity = (quantity) => {
    if (quantity === 0) return '0';
    if (quantity === 1) return '1';
    return `${quantity}`;
};

/**
 * Formatea un código de producto para mostrar
 * @param {string} productId - ID del producto
 * @returns {string} Código formateado
 */
export const formatProductCode = (productId) => {
    if (!productId) return '';
    return productId.toUpperCase();
};
