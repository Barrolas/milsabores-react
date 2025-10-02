// Componente ProductFilters - Filtros para productos

import React, { useState } from 'react';
import { Card, Form, Button, Accordion } from 'react-bootstrap';
import { FaSearch, FaFilter, FaTimes, FaSort } from 'react-icons/fa';
import { getAllCategories } from '../../data/productosDB';
import { formatPrice } from '../../utils/formatters';
import './ProductFilters.css';

function ProductFilters({
    selectedCategory,
    priceFilter,
    priceRange,
    searchTerm,
    sortBy,
    filterStats,
    onCategoryChange,
    onPriceFilterChange,
    onPriceFilterClear,
    onSearchChange,
    onSortChange,
    onClearAllFilters
}) {
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
    const [localMinPrice, setLocalMinPrice] = useState(priceFilter.min);
    const [localMaxPrice, setLocalMaxPrice] = useState(priceFilter.max);

    const categories = getAllCategories();

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setLocalSearchTerm(value);
        onSearchChange(value);
    };

    const handlePriceFilterApply = () => {
        onPriceFilterChange(localMinPrice, localMaxPrice);
    };

    const handlePriceFilterClear = () => {
        setLocalMinPrice(priceRange.min);
        setLocalMaxPrice(priceRange.max);
        onPriceFilterClear();
    };

    const handleClearAll = () => {
        setLocalSearchTerm('');
        setLocalMinPrice(priceRange.min);
        setLocalMaxPrice(priceRange.max);
        onClearAllFilters();
    };

    const sortingOptions = [
        { value: 'default', label: 'Por defecto' },
        { value: 'name', label: 'Nombre A-Z' },
        { value: 'price-asc', label: 'Precio: Menor a Mayor' },
        { value: 'price-desc', label: 'Precio: Mayor a Menor' },
        { value: 'rating', label: 'Mejor Calificados' },
        { value: 'reviews', label: 'Más Reseñas' }
    ];

    return (
        <div className="product-filters">
            <Card className="filters-card">
                <Card.Header className="filters-header">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5 className="mb-0">
                            <FaFilter className="me-2" />
                            Filtros
                        </h5>
                        {filterStats.hasActiveFilters && (
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={handleClearAll}
                                className="clear-all-btn"
                            >
                                <FaTimes className="me-1" />
                                Limpiar
                            </Button>
                        )}
                    </div>
                </Card.Header>

                <Card.Body className="filters-body">
                    <Accordion defaultActiveKey="search" alwaysOpen>
                        {/* Búsqueda */}
                        <Accordion.Item eventKey="search">
                            <Accordion.Header>
                                <FaSearch className="me-2" />
                                Búsqueda
                            </Accordion.Header>
                            <Accordion.Body>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Buscar productos..."
                                        value={localSearchTerm}
                                        onChange={handleSearchChange}
                                        className="search-input"
                                    />
                                </Form.Group>
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* Categorías */}
                        <Accordion.Item eventKey="categories">
                            <Accordion.Header>
                                <FaFilter className="me-2" />
                                Categorías
                            </Accordion.Header>
                            <Accordion.Body>
                                <Form.Group className="mb-3">
                                    <Form.Select
                                        value={selectedCategory}
                                        onChange={(e) => onCategoryChange(e.target.value)}
                                        className="category-select"
                                    >
                                        <option value="todos">Todos los Productos</option>
                                        {Object.entries(categories).map(([key, category]) => (
                                            <option key={key} value={key}>
                                                {category.nombre}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* Filtro de Precio */}
                        <Accordion.Item eventKey="price">
                            <Accordion.Header>
                                <FaFilter className="me-2" />
                                Rango de Precio
                            </Accordion.Header>
                            <Accordion.Body>
                                <Form.Group className="mb-3">
                                    <div className="price-range-container">
                                        <div className="price-inputs">
                                            <Form.Group className="mb-2">
                                                <Form.Label className="price-label">Precio Mínimo</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    min={priceRange.min}
                                                    max={priceRange.max}
                                                    value={localMinPrice}
                                                    onChange={(e) => setLocalMinPrice(Number(e.target.value))}
                                                    className="price-input"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-2">
                                                <Form.Label className="price-label">Precio Máximo</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    min={priceRange.min}
                                                    max={priceRange.max}
                                                    value={localMaxPrice}
                                                    onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
                                                    className="price-input"
                                                />
                                            </Form.Group>
                                        </div>
                                        
                                        <div className="price-display mb-3">
                                            <span className="price-range-text">
                                                {formatPrice(localMinPrice)} - {formatPrice(localMaxPrice)}
                                            </span>
                                        </div>
                                        
                                        <div className="price-actions">
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={handlePriceFilterApply}
                                                className="me-2 apply-price-btn"
                                            >
                                                Aplicar
                                            </Button>
                                            {priceFilter.active && (
                                                <Button
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    onClick={handlePriceFilterClear}
                                                    className="clear-price-btn"
                                                >
                                                    Limpiar
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </Form.Group>
                            </Accordion.Body>
                        </Accordion.Item>

                        {/* Ordenamiento */}
                        <Accordion.Item eventKey="sort">
                            <Accordion.Header>
                                <FaSort className="me-2" />
                                Ordenar Por
                            </Accordion.Header>
                            <Accordion.Body>
                                <Form.Group className="mb-3">
                                    <Form.Select
                                        value={sortBy}
                                        onChange={(e) => onSortChange(e.target.value)}
                                        className="sort-select"
                                    >
                                        {sortingOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    {/* Resumen de filtros activos */}
                    {filterStats.hasActiveFilters && (
                        <div className="active-filters-summary mt-3">
                            <h6 className="summary-title">Filtros Activos:</h6>
                            <div className="active-filters-list">
                                {selectedCategory !== 'todos' && (
                                    <span className="badge bg-primary me-2 mb-2">
                                        Categoría: {categories[selectedCategory]?.nombre}
                                    </span>
                                )}
                                {priceFilter.active && (
                                    <span className="badge bg-success me-2 mb-2">
                                        Precio: {formatPrice(priceFilter.min)} - {formatPrice(priceFilter.max)}
                                    </span>
                                )}
                                {searchTerm && (
                                    <span className="badge bg-info me-2 mb-2">
                                        Búsqueda: "{searchTerm}"
                                    </span>
                                )}
                                {sortBy !== 'default' && (
                                    <span className="badge bg-warning me-2 mb-2">
                                        Orden: {sortingOptions.find(opt => opt.value === sortBy)?.label}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Estadísticas */}
                    <div className="filter-stats mt-3">
                        <div className="stats-item">
                            <span className="stats-label">Productos encontrados:</span>
                            <span className="stats-value">{filterStats.filteredCount}</span>
                        </div>
                        {filterStats.hasActiveFilters && (
                            <div className="stats-item">
                                <span className="stats-label">Total productos:</span>
                                <span className="stats-value">{filterStats.totalProducts}</span>
                            </div>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ProductFilters;
