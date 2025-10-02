// Componente ProductGrid - Grid de productos con filtros

import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../contexts/CartContext';
import { getAllCategories } from '../../data/productosDB';
import './ProductGrid.css';

function ProductGrid({ onShowProductDetails }) {
    const { 
        filteredProducts, 
        filterStats, 
        priceRange,
        selectedCategory,
        priceFilter,
        searchTerm,
        sortBy,
        selectCategory,
        applyPriceFilter,
        clearPriceFilter,
        setSearch,
        setSorting,
        clearAllFilters
    } = useProducts();

    const { totalItems } = useCart();
    
    // Obtener el nombre de la categoría seleccionada
    const categories = getAllCategories();
    const getCategoryName = (categoryKey) => {
        if (categoryKey === 'todos') return 'Todos los Productos';
        return categories[categoryKey]?.nombre || 'Productos';
    };

    const handleShowProductDetails = (productId) => {
        if (onShowProductDetails) {
            onShowProductDetails(productId);
        }
    };

    return (
        <Container fluid className="product-grid-container">
            <Row>
                {/* Sidebar de filtros */}
                <Col lg={3} className="mb-4">
                    <ProductFilters
                        selectedCategory={selectedCategory}
                        priceFilter={priceFilter}
                        priceRange={priceRange}
                        searchTerm={searchTerm}
                        sortBy={sortBy}
                        filterStats={filterStats}
                        onCategoryChange={selectCategory}
                        onPriceFilterChange={applyPriceFilter}
                        onPriceFilterClear={clearPriceFilter}
                        onSearchChange={setSearch}
                        onSortChange={setSorting}
                        onClearAllFilters={clearAllFilters}
                    />
                </Col>

                {/* Grid de productos */}
                <Col lg={9}>
                    <div className="products-section">
                        <div className="products-content">
                        {/* Header de productos */}
                        <div className="products-header mb-4">
                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                <div>
                                    <h2 className="products-title mb-1">
                                        {getCategoryName(selectedCategory)}
                                    </h2>
                                    <p className="products-subtitle text-muted mb-0 text-start">
                                        {filterStats.hasActiveFilters 
                                            ? `${filterStats.filteredCount} de ${filterStats.totalProducts} productos`
                                            : `${filterStats.totalProducts} productos disponibles`
                                        }
                                    </p>
                                </div>
                                
                                <div className="cart-summary">
                                    <span className="badge bg-primary fs-6">
                                        {totalItems} en carrito
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Mensaje cuando no hay productos */}
                        {filteredProducts.length === 0 ? (
                            <div className="no-products-message text-center py-5">
                                <div className="no-products-icon mb-3">
                                    <i className="fas fa-search fa-3x text-muted"></i>
                                </div>
                                <h4 className="text-muted mb-2">No se encontraron productos</h4>
                                <p className="text-muted mb-3">
                                    {filterStats.hasActiveFilters 
                                        ? 'Intenta ajustar los filtros para ver más productos.'
                                        : 'No hay productos disponibles en este momento.'
                                    }
                                </p>
                                {filterStats.hasActiveFilters && (
                                    <button 
                                        className="btn btn-outline-primary"
                                        onClick={clearAllFilters}
                                    >
                                        Limpiar Filtros
                                    </button>
                                )}
                            </div>
                        ) : (
                            /* Grid de productos */
                            <Row>
                                {filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onShowDetails={handleShowProductDetails}
                                    />
                                ))}
                            </Row>
                        )}

                        {/* Información adicional */}
                        {filteredProducts.length > 0 && (
                            <div className="products-footer mt-5 text-center">
                                <p className="text-muted">
                                    Mostrando {filteredProducts.length} productos
                                    {filterStats.hasActiveFilters && ' con filtros aplicados'}
                                </p>
                            </div>
                        )}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductGrid;
