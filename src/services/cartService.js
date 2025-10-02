// Servicio del carrito - Lógica de negocio extraída de productos.js

import { getProductById } from '../data/productosDB';
import { CART_CONFIG } from '../data/constants';
import { formatPrice } from '../utils/formatters';

/**
 * Servicio del carrito de compras
 */
export class CartService {
    /**
     * Carga el carrito desde localStorage
     * @returns {Array} Carrito cargado
     */
    static loadCartFromStorage() {
        try {
            const savedCart = localStorage.getItem(CART_CONFIG.STORAGE_KEY);
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Error al cargar carrito desde localStorage:', error);
            return [];
        }
    }

    /**
     * Guarda el carrito en localStorage
     * @param {Array} cart - Carrito a guardar
     * @returns {boolean} true si se guardó exitosamente
     */
    static saveCartToStorage(cart) {
        try {
            localStorage.setItem(CART_CONFIG.STORAGE_KEY, JSON.stringify(cart));
            return true;
        } catch (error) {
            console.error('Error al guardar carrito en localStorage:', error);
            return false;
        }
    }

    /**
     * Agrega un producto al carrito
     * @param {Array} cart - Carrito actual
     * @param {string} productId - ID del producto
     * @param {number} quantity - Cantidad a agregar
     * @returns {Object} { newCart: Array, success: boolean, message: string }
     */
    static addToCart(cart, productId, quantity = 1) {
        const product = getProductById(productId);
        if (!product) {
            return {
                newCart: cart,
                success: false,
                message: 'Producto no encontrado'
            };
        }

        const existingItem = cart.find(item => item.id === productId);
        let newCart;

        if (existingItem) {
            // Si ya existe, actualizar cantidad
            const newQuantity = existingItem.cantidad + quantity;
            if (newQuantity > CART_CONFIG.MAX_QUANTITY) {
                return {
                    newCart: cart,
                    success: false,
                    message: 'Cantidad máxima alcanzada'
                };
            }

            newCart = cart.map(item =>
                item.id === productId 
                    ? { ...item, cantidad: newQuantity }
                    : item
            );
        } else {
            // Si no existe, agregarlo
            const newItem = {
                id: productId,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: Math.min(quantity, CART_CONFIG.MAX_QUANTITY),
                imagen: product.imagen
            };
            newCart = [...cart, newItem];
        }

        this.saveCartToStorage(newCart);
        return {
            newCart,
            success: true,
            message: `${product.nombre} agregado al carrito`
        };
    }

    /**
     * Remueve un producto del carrito
     * @param {Array} cart - Carrito actual
     * @param {string} productId - ID del producto
     * @returns {Object} { newCart: Array, success: boolean, message: string }
     */
    static removeFromCart(cart, productId) {
        const product = getProductById(productId);
        const newCart = cart.filter(item => item.id !== productId);
        
        this.saveCartToStorage(newCart);
        
        const message = product 
            ? `${product.nombre} eliminado del carrito`
            : 'Producto eliminado del carrito';
            
        return {
            newCart,
            success: true,
            message
        };
    }

    /**
     * Actualiza la cantidad de un producto en el carrito
     * @param {Array} cart - Carrito actual
     * @param {string} productId - ID del producto
     * @param {number} newQuantity - Nueva cantidad
     * @returns {Object} { newCart: Array, success: boolean, message: string }
     */
    static updateQuantity(cart, productId, newQuantity) {
        if (newQuantity < CART_CONFIG.MIN_QUANTITY) {
            return this.removeFromCart(cart, productId);
        }

        if (newQuantity > CART_CONFIG.MAX_QUANTITY) {
            return {
                newCart: cart,
                success: false,
                message: 'Cantidad máxima alcanzada'
            };
        }

        const newCart = cart.map(item =>
            item.id === productId 
                ? { ...item, cantidad: newQuantity }
                : item
        );

        this.saveCartToStorage(newCart);
        return {
            newCart,
            success: true,
            message: 'Cantidad actualizada'
        };
    }

    /**
     * Cambia la cantidad de un producto en el carrito
     * @param {Array} cart - Carrito actual
     * @param {string} productId - ID del producto
     * @param {number} change - Cambio en la cantidad (+1 o -1)
     * @returns {Object} { newCart: Array, success: boolean, message: string }
     */
    static changeQuantity(cart, productId, change) {
        const item = cart.find(item => item.id === productId);
        if (!item) {
            return {
                newCart: cart,
                success: false,
                message: 'Producto no encontrado en el carrito'
            };
        }

        const newQuantity = item.cantidad + change;
        return this.updateQuantity(cart, productId, newQuantity);
    }

    /**
     * Vacía el carrito
     * @returns {Object} { newCart: Array, success: boolean, message: string }
     */
    static clearCart() {
        this.saveCartToStorage([]);
        return {
            newCart: [],
            success: true,
            message: 'Carrito vaciado'
        };
    }

    /**
     * Calcula el total de items en el carrito
     * @param {Array} cart - Carrito
     * @returns {number} Total de items
     */
    static getTotalItems(cart) {
        return cart.reduce((sum, item) => sum + item.cantidad, 0);
    }

    /**
     * Calcula el total del carrito
     * @param {Array} cart - Carrito
     * @returns {number} Total del carrito
     */
    static getTotal(cart) {
        return cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    }

    /**
     * Calcula el total formateado del carrito
     * @param {Array} cart - Carrito
     * @returns {string} Total formateado
     */
    static getFormattedTotal(cart) {
        return formatPrice(this.getTotal(cart));
    }

    /**
     * Verifica si el carrito está vacío
     * @param {Array} cart - Carrito
     * @returns {boolean} true si está vacío
     */
    static isEmpty(cart) {
        return cart.length === 0;
    }

    /**
     * Obtiene la cantidad de un producto específico en el carrito
     * @param {Array} cart - Carrito
     * @param {string} productId - ID del producto
     * @returns {number} Cantidad en el carrito
     */
    static getProductQuantity(cart, productId) {
        const item = cart.find(item => item.id === productId);
        return item ? item.cantidad : 0;
    }

    /**
     * Verifica si un producto está en el carrito
     * @param {Array} cart - Carrito
     * @param {string} productId - ID del producto
     * @returns {boolean} true si está en el carrito
     */
    static isProductInCart(cart, productId) {
        return cart.some(item => item.id === productId);
    }

    /**
     * Obtiene información detallada de los items del carrito
     * @param {Array} cart - Carrito
     * @returns {Array} Items con información detallada
     */
    static getCartItemsWithDetails(cart) {
        return cart.map(item => {
            const product = getProductById(item.id);
            return {
                ...item,
                product: product,
                subtotal: item.precio * item.cantidad,
                formattedSubtotal: formatPrice(item.precio * item.cantidad),
                formattedPrice: formatPrice(item.precio)
            };
        });
    }

    /**
     * Calcula estadísticas del carrito
     * @param {Array} cart - Carrito
     * @returns {Object} Estadísticas del carrito
     */
    static getCartStats(cart) {
        const totalItems = this.getTotalItems(cart);
        const total = this.getTotal(cart);
        const averageItemPrice = totalItems > 0 ? total / totalItems : 0;
        const uniqueProducts = cart.length;

        return {
            totalItems,
            total,
            formattedTotal: formatPrice(total),
            averageItemPrice,
            formattedAverageItemPrice: formatPrice(averageItemPrice),
            uniqueProducts,
            isEmpty: this.isEmpty(cart)
        };
    }

    /**
     * Valida el carrito
     * @param {Array} cart - Carrito
     * @returns {Object} { isValid: boolean, errors: Array }
     */
    static validateCart(cart) {
        const errors = [];
        
        if (!Array.isArray(cart)) {
            errors.push('El carrito debe ser un array');
            return { isValid: false, errors };
        }

        for (const item of cart) {
            if (!item.id) {
                errors.push('Item sin ID encontrado');
                continue;
            }

            const product = getProductById(item.id);
            if (!product) {
                errors.push(`Producto con ID ${item.id} no encontrado`);
                continue;
            }

            if (!item.cantidad || item.cantidad < CART_CONFIG.MIN_QUANTITY) {
                errors.push(`Cantidad inválida para producto ${item.id}`);
                continue;
            }

            if (item.cantidad > CART_CONFIG.MAX_QUANTITY) {
                errors.push(`Cantidad excede el máximo para producto ${item.id}`);
                continue;
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Limpia items inválidos del carrito
     * @param {Array} cart - Carrito
     * @returns {Object} { newCart: Array, removedItems: Array }
     */
    static cleanCart(cart) {
        const validItems = [];
        const removedItems = [];

        for (const item of cart) {
            const product = getProductById(item.id);
            if (product && item.cantidad >= CART_CONFIG.MIN_QUANTITY && item.cantidad <= CART_CONFIG.MAX_QUANTITY) {
                validItems.push(item);
            } else {
                removedItems.push(item);
            }
        }

        if (removedItems.length > 0) {
            this.saveCartToStorage(validItems);
        }

        return {
            newCart: validItems,
            removedItems
        };
    }
}
