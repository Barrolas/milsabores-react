// Página Login - Página de inicio de sesión

import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaSignInAlt, FaEye, FaEyeSlash, FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuth } from '../hooks/useAuth';
import { showLoginSuccessAlert, showFormIncompleteAlert } from '../utils/sweetAlert';
import './Login.css';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { login, validateLoginForm, validateField } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Validar en tiempo real si ya hay un error en el campo
        if (errors[name]) {
            const validation = validateField(name, value, 'login');
            
            if (validation.isValid) {
                // Limpiar error si ahora es válido
                setErrors(prev => ({
                    ...prev,
                    [name]: ''
                }));
            }
        }
    };

    const handleInputBlur = (e) => {
        const { name, value } = e.target;
        
        // Validar campo individual cuando el usuario sale del campo
        const validation = validateField(name, value, 'login');
        
        if (!validation.isValid) {
            setErrors(prev => ({
                ...prev,
                [name]: validation.message
            }));
        } else {
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
            const validation = validateLoginForm(formData);
            
            if (!validation.isValid) {
                setErrors(validation.errors);
                showFormIncompleteAlert();
                return;
            }

            // Intentar login
            const success = await login(formData);
            
            if (success) {
                // Redirigir al home después del login exitoso
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (error) {
            console.error('Error en login:', error);
            setErrors({ general: 'Error interno del servidor' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Layout>
            <div className="login-page">
                <Container style={{ paddingBottom: '1rem' }}>
                    <Row className="justify-content-center" style={{ minHeight: '70vh', alignItems: 'center', paddingTop: '1rem', paddingBottom: '0' }}>
                        <Col md={6} lg={5} xl={4}>
                            <Card className="login-card">
                                <Card.Header className="login-header">
                                    <div className="login-header-content">
                                        <div className="login-icon">
                                            <FaSignInAlt />
                                        </div>
                                        <h2 className="login-title">Iniciar Sesión</h2>
                                        <p className="login-subtitle">
                                            Accede a tu cuenta para continuar
                                        </p>
                                    </div>
                                </Card.Header>

                                <Card.Body className="login-body">
                                    {errors.general && (
                                        <Alert variant="danger" className="error-alert">
                                            {errors.general}
                                        </Alert>
                                    )}

                                    <Form onSubmit={handleSubmit}>
                                        {/* Campo Email */}
                                        <Form.Group className="mb-3">
                                            <Form.Label className="form-label">
                                                <FaUser className="me-2" />
                                                Correo Electrónico
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                onBlur={handleInputBlur}
                                                placeholder="Ingresa tu email"
                                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                disabled={isSubmitting}
                                            />
                                            {errors.email && (
                                                <div className="invalid-feedback">
                                                    {errors.email}
                                                </div>
                                            )}
                                        </Form.Group>

                                        {/* Campo Contraseña */}
                                        <Form.Group className="mb-4">
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
                                                    onBlur={handleInputBlur}
                                                    placeholder="Ingresa tu contraseña"
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

                                        {/* Botón de envío */}
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            size="lg"
                                            className="login-btn w-100"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Iniciando Sesión...
                                                </>
                                            ) : (
                                                <>
                                                    <FaSignInAlt className="me-2" />
                                                    Iniciar Sesión
                                                </>
                                            )}
                                        </Button>
                                    </Form>

                                    {/* Enlaces adicionales */}
                                    <div className="login-footer">
                                        <div className="login-links">
                                            <Link to="/registro" className="login-link">
                                                ¿No tienes cuenta? Regístrate aquí
                                            </Link>
                                        </div>
                                        <div className="login-links">
                                            <Link to="/" className="login-link">
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

export default Login;
