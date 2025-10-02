// Servicio de productos - Lógica de negocio extraída de productos.js

import { 
    getAllProducts, 
    getProductsByCategory, 
    getAllCategories,
    getProductById 
} from '../data/productosDB';
import { FILTER_CONFIG } from '../data/constants';

/**
 * Servicio de productos
 */
export class ProductService {
    /**
     * Obtiene todos los productos
     * @returns {Object} Objeto con todos los productos indexados por ID
     */
    static getAllProducts() {
        return getAllProducts();
    }

    /**
     * Obtiene todas las categorías
     * @returns {Object} Objeto con todas las categorías
     */
    static getAllCategories() {
        return getAllCategories();
    }

    /**
     * Obtiene un producto por ID
     * @param {string} id - ID del producto
     * @returns {Object|null} Producto encontrado o null
     */
    static getProductById(id) {
        return getProductById(id);
    }

    /**
     * Obtiene productos por categoría
     * @param {string} categoryKey - Clave de la categoría
     * @returns {Array} Array de productos de la categoría
     */
    static getProductsByCategory(categoryKey) {
        return getProductsByCategory(categoryKey);
    }

    /**
     * Busca productos por término de búsqueda
     * @param {string} searchTerm - Término de búsqueda
     * @returns {Array} Productos que coinciden con la búsqueda
     */
    static searchProducts(searchTerm) {
        if (!searchTerm || !searchTerm.trim()) {
            return Object.values(this.getAllProducts());
        }

        const searchLower = searchTerm.toLowerCase();
        const allProducts = Object.values(this.getAllProducts());

        return allProducts.filter(product => 
            product.nombre.toLowerCase().includes(searchLower) ||
            product.descripcion.toLowerCase().includes(searchLower) ||
            product.ingredientes.toLowerCase().includes(searchLower) ||
            product.descripcionDetallada.toLowerCase().includes(searchLower)
        );
    }

    /**
     * Filtra productos por rango de precio
     * @param {Array} products - Array de productos a filtrar
     * @param {number} minPrice - Precio mínimo
     * @param {number} maxPrice - Precio máximo
     * @returns {Array} Productos filtrados por precio
     */
    static filterByPrice(products, minPrice = FILTER_CONFIG.DEFAULT_MIN_PRICE, maxPrice = FILTER_CONFIG.DEFAULT_MAX_PRICE) {
        return products.filter(product => 
            product.precio >= minPrice && product.precio <= maxPrice
        );
    }

    /**
     * Filtra productos por categoría
     * @param {Array} products - Array de productos a filtrar
     * @param {string} categoryKey - Clave de la categoría
     * @returns {Array} Productos filtrados por categoría
     */
    static filterByCategory(products, categoryKey) {
        if (!categoryKey || categoryKey === 'todos') {
            return products;
        }

        const categoryProducts = this.getProductsByCategory(categoryKey);
        const categoryProductIds = categoryProducts.map(product => product.id);

        return products.filter(product => categoryProductIds.includes(product.id));
    }

    /**
     * Ordena productos según el criterio especificado
     * @param {Array} products - Array de productos a ordenar
     * @param {string} sortBy - Criterio de ordenamiento
     * @returns {Array} Productos ordenados
     */
    static sortProducts(products, sortBy = 'default') {
        const sortedProducts = [...products];

        switch (sortBy) {
            case 'price-asc':
                return sortedProducts.sort((a, b) => a.precio - b.precio);
            case 'price-desc':
                return sortedProducts.sort((a, b) => b.precio - a.precio);
            case 'rating':
                return sortedProducts.sort((a, b) => b.rating - a.rating);
            case 'name':
                return sortedProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
            case 'reviews':
                return sortedProducts.sort((a, b) => b.reviews - a.reviews);
            case 'default':
            default:
                return sortedProducts;
        }
    }

    /**
     * Obtiene productos destacados (con rating alto)
     * @param {number} minRating - Rating mínimo para considerar destacado
     * @param {number} limit - Límite de productos a retornar
     * @returns {Array} Productos destacados
     */
    static getFeaturedProducts(minRating = 4.8, limit = 4) {
        const allProducts = Object.values(this.getAllProducts());
        return allProducts
            .filter(product => product.rating >= minRating)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    }

    /**
     * Obtiene productos recientes (simulado por fecha de creación)
     * @param {number} limit - Límite de productos a retornar
     * @returns {Array} Productos recientes
     */
    static getRecentProducts(limit = 6) {
        const allProducts = Object.values(this.getAllProducts());
        // Simular productos recientes basado en el ID
        return allProducts
            .sort((a, b) => b.id.localeCompare(a.id))
            .slice(0, limit);
    }

    /**
     * Obtiene productos similares basado en categoría
     * @param {string} productId - ID del producto
     * @param {number} limit - Límite de productos similares
     * @returns {Array} Productos similares
     */
    static getSimilarProducts(productId, limit = 4) {
        const product = this.getProductById(productId);
        if (!product) return [];

        // Encontrar la categoría del producto
        const categories = this.getAllCategories();
        let productCategory = null;

        for (const [categoryKey, category] of Object.entries(categories)) {
            if (category.productos.some(p => p.id === productId)) {
                productCategory = categoryKey;
                break;
            }
        }

        if (!productCategory) return [];

        // Obtener productos de la misma categoría excluyendo el producto actual
        const categoryProducts = this.getProductsByCategory(productCategory);
        return categoryProducts
            .filter(p => p.id !== productId)
            .slice(0, limit);
    }

    /**
     * Obtiene el rango de precios de todos los productos
     * @returns {Object} { min: number, max: number }
     */
    static getPriceRange() {
        const allProducts = Object.values(this.getAllProducts());
        if (allProducts.length === 0) {
            return { min: 0, max: 0 };
        }

        const prices = allProducts.map(product => product.precio);
        return {
            min: Math.min(...prices),
            max: Math.max(...prices)
        };
    }

    /**
     * Obtiene estadísticas de productos
     * @returns {Object} Estadísticas de productos
     */
    static getProductStats() {
        const allProducts = Object.values(this.getAllProducts());
        const categories = this.getAllCategories();

        return {
            totalProducts: allProducts.length,
            totalCategories: Object.keys(categories).length,
            averageRating: allProducts.reduce((sum, product) => sum + product.rating, 0) / allProducts.length,
            priceRange: this.getPriceRange(),
            totalReviews: allProducts.reduce((sum, product) => sum + product.reviews, 0)
        };
    }

    /**
     * Aplica múltiples filtros a los productos
     * @param {Object} filters - Objeto con filtros a aplicar
     * @returns {Array} Productos filtrados
     */
    static applyFilters(filters) {
        let products = Object.values(this.getAllProducts());

        // Aplicar filtro de categoría
        if (filters.category && filters.category !== 'todos') {
            products = this.filterByCategory(products, filters.category);
        }

        // Aplicar filtro de precio
        if (filters.priceRange) {
            products = this.filterByPrice(
                products, 
                filters.priceRange.min, 
                filters.priceRange.max
            );
        }

        // Aplicar búsqueda
        if (filters.searchTerm) {
            products = this.searchProducts(filters.searchTerm);
        }

        // Aplicar ordenamiento
        if (filters.sortBy) {
            products = this.sortProducts(products, filters.sortBy);
        }

        return products;
    }

    /**
     * Verifica si un producto existe
     * @param {string} productId - ID del producto
     * @returns {boolean} true si existe
     */
    static productExists(productId) {
        return this.getProductById(productId) !== null;
    }

    /**
     * Obtiene productos por IDs
     * @param {Array} productIds - Array de IDs de productos
     * @returns {Array} Productos encontrados
     */
    static getProductsByIds(productIds) {
        return productIds
            .map(id => this.getProductById(id))
            .filter(product => product !== null);
    }

    /**
     * Obtiene productos con descuento (simulado)
     * @param {number} minDiscount - Descuento mínimo en porcentaje
     * @returns {Array} Productos con descuento
     */
    static getDiscountedProducts(minDiscount = 10) {
        // Simular productos con descuento basado en rating o precio
        const allProducts = Object.values(this.getAllProducts());
        return allProducts.filter(product => 
            product.rating >= 4.5 || product.precio > 20000
        );
    }
}
