// Custom Hook para productos - Migrado desde productos.js

import { useState, useCallback, useMemo } from 'react';
import { 
    getAllProducts, 
    getProductsByCategory, 
    getAllCategories,
    getProductById 
} from '../data/productosDB';
import { FILTER_CONFIG } from '../data/constants';

/**
 * Hook para manejar productos y filtros
 * @returns {Object} Funciones y estado de productos
 */
export const useProducts = () => {
    const [selectedCategory, setSelectedCategory] = useState('todos');
    const [priceFilter, setPriceFilter] = useState({
        min: FILTER_CONFIG.DEFAULT_MIN_PRICE,
        max: FILTER_CONFIG.DEFAULT_MAX_PRICE,
        active: false
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('default'); // default, price-asc, price-desc, rating, name
    const [loading, setLoading] = useState(false);

    /**
     * Obtiene todos los productos
     * @returns {Object} Objeto con todos los productos indexados por ID
     */
    const getAllProductsData = useCallback(() => {
        return getAllProducts();
    }, []);

    /**
     * Obtiene todas las categorías
     * @returns {Object} Objeto con todas las categorías
     */
    const getAllCategoriesData = useCallback(() => {
        return getAllCategories();
    }, []);

    /**
     * Obtiene un producto por ID
     * @param {string} id - ID del producto
     * @returns {Object|null} Producto encontrado o null
     */
    const getProduct = useCallback((id) => {
        return getProductById(id);
    }, []);

    /**
     * Filtra productos por categoría
     * @param {Array} products - Array de productos a filtrar
     * @returns {Array} Productos filtrados por categoría
     */
    const filterByCategory = useCallback((products) => {
        if (selectedCategory === 'todos') {
            return products;
        }
        
        const categoryProducts = getProductsByCategory(selectedCategory);
        const categoryProductIds = categoryProducts.map(product => product.id);
        
        return products.filter(product => categoryProductIds.includes(product.id));
    }, [selectedCategory]);

    /**
     * Filtra productos por precio
     * @param {Array} products - Array de productos a filtrar
     * @returns {Array} Productos filtrados por precio
     */
    const filterByPrice = useCallback((products) => {
        if (!priceFilter.active) {
            return products;
        }
        
        return products.filter(product => 
            product.precio >= priceFilter.min && product.precio <= priceFilter.max
        );
    }, [priceFilter]);

    /**
     * Filtra productos por término de búsqueda
     * @param {Array} products - Array de productos a filtrar
     * @returns {Array} Productos filtrados por búsqueda
     */
    const filterBySearch = useCallback((products) => {
        if (!searchTerm.trim()) {
            return products;
        }
        
        const searchLower = searchTerm.toLowerCase();
        return products.filter(product => 
            product.nombre.toLowerCase().includes(searchLower) ||
            product.descripcion.toLowerCase().includes(searchLower) ||
            product.ingredientes.toLowerCase().includes(searchLower)
        );
    }, [searchTerm]);

    /**
     * Ordena productos según el criterio seleccionado
     * @param {Array} products - Array de productos a ordenar
     * @returns {Array} Productos ordenados
     */
    const sortProducts = useCallback((products) => {
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
            case 'default':
            default:
                return sortedProducts;
        }
    }, [sortBy]);

    /**
     * Obtiene productos filtrados y ordenados
     */
    const filteredProducts = useMemo(() => {
        const allProducts = Object.values(getAllProductsData());
        
        let products = allProducts;
        
        // Aplicar filtros en orden
        products = filterByCategory(products);
        products = filterByPrice(products);
        products = filterBySearch(products);
        
        // Ordenar
        products = sortProducts(products);
        
        return products;
    }, [
        getAllProductsData,
        filterByCategory,
        filterByPrice,
        filterBySearch,
        sortProducts
    ]);

    /**
     * Obtiene productos destacados (para el carrusel)
     */
    const featuredProducts = useMemo(() => {
        const allProducts = Object.values(getAllProductsData());
        return allProducts.filter(product => product.rating >= 4.8).slice(0, 4);
    }, [getAllProductsData]);

    /**
     * Obtiene productos por categoría
     * @param {string} categoryKey - Clave de la categoría
     * @returns {Array} Productos de la categoría
     */
    const getProductsByCategoryKey = useCallback((categoryKey) => {
        return getProductsByCategory(categoryKey);
    }, []);

    /**
     * Establece la categoría seleccionada
     * @param {string} category - Categoría seleccionada
     */
    const selectCategory = useCallback((category) => {
        setSelectedCategory(category);
    }, []);

    /**
     * Aplica filtro de precio
     * @param {number} min - Precio mínimo
     * @param {number} max - Precio máximo
     */
    const applyPriceFilter = useCallback((min, max) => {
        setPriceFilter({
            min: min || FILTER_CONFIG.DEFAULT_MIN_PRICE,
            max: max || FILTER_CONFIG.DEFAULT_MAX_PRICE,
            active: true
        });
    }, []);

    /**
     * Limpia el filtro de precio
     */
    const clearPriceFilter = useCallback(() => {
        setPriceFilter({
            min: FILTER_CONFIG.DEFAULT_MIN_PRICE,
            max: FILTER_CONFIG.DEFAULT_MAX_PRICE,
            active: false
        });
    }, []);

    /**
     * Establece el término de búsqueda
     * @param {string} term - Término de búsqueda
     */
    const setSearch = useCallback((term) => {
        setSearchTerm(term);
    }, []);

    /**
     * Establece el criterio de ordenamiento
     * @param {string} sort - Criterio de ordenamiento
     */
    const setSorting = useCallback((sort) => {
        setSortBy(sort);
    }, []);

    /**
     * Limpia todos los filtros
     */
    const clearAllFilters = useCallback(() => {
        setSelectedCategory('todos');
        setPriceFilter({
            min: FILTER_CONFIG.DEFAULT_MIN_PRICE,
            max: FILTER_CONFIG.DEFAULT_MAX_PRICE,
            active: false
        });
        setSearchTerm('');
        setSortBy('default');
    }, []);

    /**
     * Obtiene estadísticas de los productos filtrados
     */
    const filterStats = useMemo(() => {
        const totalProducts = Object.values(getAllProductsData()).length;
        const filteredCount = filteredProducts.length;
        const hasActiveFilters = selectedCategory !== 'todos' || 
                               priceFilter.active || 
                               searchTerm.trim() !== '' || 
                               sortBy !== 'default';

        return {
            totalProducts,
            filteredCount,
            hasActiveFilters,
            categoryCount: selectedCategory !== 'todos' ? 
                getProductsByCategory(selectedCategory).length : totalProducts
        };
    }, [filteredProducts, selectedCategory, priceFilter.active, searchTerm, sortBy, getAllProductsData]);

    /**
     * Obtiene el rango de precios de todos los productos
     */
    const priceRange = useMemo(() => {
        const allProducts = Object.values(getAllProductsData());
        if (allProducts.length === 0) {
            return { min: 0, max: 0 };
        }
        
        const prices = allProducts.map(product => product.precio);
        return {
            min: Math.min(...prices),
            max: Math.max(...prices)
        };
    }, [getAllProductsData]);

    return {
        // Estado
        selectedCategory,
        priceFilter,
        searchTerm,
        sortBy,
        loading,
        
        // Datos
        filteredProducts,
        featuredProducts,
        filterStats,
        priceRange,
        
        // Funciones principales
        getAllProductsData,
        getAllCategoriesData,
        getProduct,
        getProductsByCategoryKey,
        
        // Funciones de filtros
        selectCategory,
        applyPriceFilter,
        clearPriceFilter,
        setSearch,
        setSorting,
        clearAllFilters,
        
        // Funciones de filtrado (para uso interno)
        filterByCategory,
        filterByPrice,
        filterBySearch,
        sortProducts
    };
};
