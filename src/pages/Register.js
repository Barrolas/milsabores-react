// Página Register - Página de registro de usuario

import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaUserPlus, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaBirthdayCake, FaGift } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuth } from '../hooks/useAuth';
import { showRegisterSuccessAlert, showFormIncompleteAlert, showAgeDiscountAlert, showDuocBenefitAlert, showCodeDiscountAlert, showInvalidCodeAlert } from '../utils/sweetAlert';
import './Register.css';

function Register() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        fechaNacimiento: '',
        password: '',
        confirmPassword: '',
        codigoDescuento: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [benefits, setBenefits] = useState({});
    
    const { register, validateRegisterForm } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Validar formulario
            const validation = validateRegisterForm(formData);
            
            if (!validation.isValid) {
                setErrors(validation.errors);
                showFormIncompleteAlert();
                return;
            }

            // Mostrar beneficios si los hay
            if (validation.benefits.duocBenefit) {
                await showDuocBenefitAlert();
            }
            if (validation.benefits.ageDiscount) {
                await showAgeDiscountAlert();
            }
            if (validation.benefits.promoCode) {
                await showCodeDiscountAlert();
            }

            // Intentar registro
            const result = await register(formData);
            
            if (result.success) {
                setBenefits(result.benefits);
                await showRegisterSuccessAlert();
                
                // Redirigir al login después del registro exitoso
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            console.error('Error en registro:', error);
            setErrors({ general: 'Error interno del servidor' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <Layout>
            <div className="register-page">
                <Container>
                    <Row className="justify-content-center min-vh-100 align-items-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="register-card">
                                <Card.Header className="register-header">
                                    <div className="register-header-content">
                                        <div className="register-icon">
                                            <FaUserPlus />
                                        </div>
                                        <h2 className="register-title">Crear Cuenta</h2>
                                        <p className="register-subtitle">
                                            Únete a nuestra comunidad y disfruta de beneficios exclusivos
                                        </p>
                                    </div>
                                </Card.Header>

                                <Card.Body className="register-body">
                                    {errors.general && (
                                        <Alert variant="danger" className="error-alert">
                                            {errors.general}
                                        </Alert>
                                    )}

                                    <Form onSubmit={handleSubmit}>
                                        <Row>
                                            {/* Campo Nombre */}
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="form-label">
                                                        <FaUser className="me-2" />
                                                        Nombre
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="nombre"
                                                        value={formData.nombre}
                                                        onChange={handleInputChange}
                                                        placeholder="Tu nombre"
                                                        className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                                                        disabled={isSubmitting}
                                                    />
                                                    {errors.nombre && (
                                                        <div className="invalid-feedback">
                                                            {errors.nombre}
                                                        </div>
                                                    )}
                                                </Form.Group>
                                            </Col>

                                            {/* Campo Apellido */}
                                            <Col md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className="form-label">
                                                        <FaUser className="me-2" />
                                                        Apellido
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="apellido"
                                                        value={formData.apellido}
                                                        onChange={handleInputChange}
                                                        placeholder="Tu apellido"
                                                        className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
                                                        disabled={isSubmitting}
                                                    />
                                                    {errors.apellido && (
                                                        <div className="invalid-feedback">
                                                            {errors.apellido}
                                                        </div>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        {/* Campo Email */}
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form-label">
                                                <FaEnvelope className="me-2" />
                                                Correo Electrónico
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="tu@email.com"
                                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                disabled={isSubmitting}
                                            />
                                            {errors.email && (
                                                <div className="invalid-feedback">
                                                    {errors.email}
                                                </div>
                                            )}
                                        </Form.Group>

                                        {/* Campo Fecha de Nacimiento */}
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form-label">
                                                <FaBirthdayCake className="me-2" />
                                                Fecha de Nacimiento
                                            </Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="fechaNacimiento"
                                                value={formData.fechaNacimiento}
                                                onChange={handleInputChange}
                                                className={`form-control ${errors.fechaNacimiento ? 'is-invalid' : ''}`}
                                                disabled={isSubmitting}
                                            />
                                            {errors.fechaNacimiento && (
                                                <div className="invalid-feedback">
                                                    {errors.fechaNacimiento}
                                                </div>
                                            )}
                                        </Form.Group>

                                        {/* Campo Contraseña */}
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form-label">
                                                <FaLock className="me-2" />
                                                Contraseña
                                            </Form.Label>
                                            <div className="password-input-container">
                                                <Form.Control
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    placeholder="Mínimo 8 caracteres"
                                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                    disabled={isSubmitting}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline-secondary"
                                                    className="password-toggle-btn"
                                                    onClick={togglePasswordVisibility}
                                                    disabled={isSubmitting}
                                                >
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </Button>
                                            </div>
                                            {errors.password && (
                                                <div className="invalid-feedback">
                                                    {errors.password}
                                                </div>
                                            )}
                                        </Form.Group>

                                        {/* Campo Confirmar Contraseña */}
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form-label">
                                                <FaLock className="me-2" />
                                                Confirmar Contraseña
                                            </Form.Label>
                                            <div className="password-input-container">
                                                <Form.Control
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleInputChange}
                                                    placeholder="Repite tu contraseña"
                                                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                                    disabled={isSubmitting}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline-secondary"
                                                    className="password-toggle-btn"
                                                    onClick={toggleConfirmPasswordVisibility}
                                                    disabled={isSubmitting}
                                                >
                                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                                </Button>
                                            </div>
                                            {errors.confirmPassword && (
                                                <div className="invalid-feedback">
                                                    {errors.confirmPassword}
                                                </div>
                                            )}
                                        </Form.Group>

                                        {/* Campo Código de Descuento */}
                                        <Form.Group className="mb-4">
                                            <Form.Label className="form-label">
                                                <FaGift className="me-2" />
                                                Código de Descuento (Opcional)
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="codigoDescuento"
                                                value={formData.codigoDescuento}
                                                onChange={handleInputChange}
                                                placeholder="Ingresa tu código"
                                                className={`form-control ${errors.codigoDescuento ? 'is-invalid' : ''}`}
                                                disabled={isSubmitting}
                                            />
                                            {errors.codigoDescuento && (
                                                <div className="invalid-feedback">
                                                    {errors.codigoDescuento}
                                                </div>
                                            )}
                                            <Form.Text className="text-muted">
                                                Prueba con: <strong>FELICES50</strong>
                                            </Form.Text>
                                        </Form.Group>

                                        {/* Botón de envío */}
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            size="lg"
                                            className="register-btn w-100"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Creando Cuenta...
                                                </>
                                            ) : (
                                                <>
                                                    <FaUserPlus className="me-2" />
                                                    Crear Cuenta
                                                </>
                                            )}
                                        </Button>
                                    </Form>

                                    {/* Enlaces adicionales */}
                                    <div className="register-footer">
                                        <div className="register-links">
                                            <Link to="/login" className="register-link">
                                                ¿Ya tienes cuenta? Inicia sesión aquí
                                            </Link>
                                        </div>
                                        <div className="register-links">
                                            <Link to="/" className="register-link">
                                                ← Volver al inicio
                                            </Link>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Layout>
    );
}

export default Register;
