// Custom Hook para autenticación - Migrado desde login.js y registro.js

import { useState, useCallback } from 'react';
import { 
    validateEmailField, 
    validatePasswordField, 
    validateNameField, 
    validateBirthDateField,
    validatePasswordConfirmation,
    validateRegisterPasswordField,
    isDuocEmail,
    isEligibleForAgeDiscount
} from '../utils/validators';
import { showLoginSuccessAlert, showRegisterSuccessAlert, showFormIncompleteAlert } from '../utils/sweetAlert';

/**
 * Hook para manejar la autenticación de usuarios
 * @returns {Object} Funciones y estado de autenticación
 */
export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

    /**
     * Valida el formulario de login
     * @param {Object} formData - Datos del formulario
     * @returns {Object} { isValid: boolean, errors: Object }
     */
    const validateLoginForm = useCallback((formData) => {
        const errors = {};
        let isValid = true;

        // Validar email
        const emailValidation = validateEmailField(formData.email);
        if (!emailValidation.isValid) {
            errors.email = emailValidation.message;
            isValid = false;
        }

        // Validar contraseña
        const passwordValidation = validatePasswordField(formData.password);
        if (!passwordValidation.isValid) {
            errors.password = passwordValidation.message;
            isValid = false;
        }

        return { isValid, errors };
    }, []);

    /**
     * Valida el formulario de registro
     * @param {Object} formData - Datos del formulario
     * @returns {Object} { isValid: boolean, errors: Object, benefits: Object }
     */
    const validateRegisterForm = useCallback((formData) => {
        const errors = {};
        const benefits = {};
        let isValid = true;

        // Validar nombre
        const nameValidation = validateNameField(formData.nombre);
        if (!nameValidation.isValid) {
            errors.nombre = nameValidation.message;
            isValid = false;
        }

        // Validar apellido
        const apellidoValidation = validateNameField(formData.apellido);
        if (!apellidoValidation.isValid) {
            errors.apellido = apellidoValidation.message;
            isValid = false;
        }

        // Validar email
        const emailValidation = validateEmailField(formData.email);
        if (!emailValidation.isValid) {
            errors.email = emailValidation.message;
            isValid = false;
        } else {
            // Verificar beneficio de Duoc
            if (isDuocEmail(formData.email)) {
                benefits.duocBenefit = 'Torta gratis en cumpleaños';
            }
        }

        // Validar fecha de nacimiento
        const birthDateValidation = validateBirthDateField(formData.fechaNacimiento);
        if (!birthDateValidation.isValid) {
            errors.fechaNacimiento = birthDateValidation.message;
            isValid = false;
        } else {
            // Verificar beneficio por edad
            if (isEligibleForAgeDiscount(birthDateValidation.age)) {
                benefits.ageDiscount = '50% de descuento';
            }
        }

        // Validar contraseña
        const passwordValidation = validateRegisterPasswordField(formData.password);
        if (!passwordValidation.isValid) {
            errors.password = passwordValidation.message;
            isValid = false;
        }

        // Validar confirmación de contraseña
        const confirmPasswordValidation = validatePasswordConfirmation(formData.password, formData.confirmPassword);
        if (!confirmPasswordValidation.isValid) {
            errors.confirmPassword = confirmPasswordValidation.message;
            isValid = false;
        }

        return { isValid, errors, benefits };
    }, []);

    /**
     * Procesa el login del usuario
     * @param {Object} formData - Datos del formulario
     * @returns {Promise<boolean>} true si el login fue exitoso
     */
    const login = useCallback(async (formData) => {
        setLoading(true);
        
        try {
            const validation = validateLoginForm(formData);
            
            if (!validation.isValid) {
                showFormIncompleteAlert();
                return false;
            }

            // Simular login exitoso
            await showLoginSuccessAlert();
            
            // Simular usuario logueado
            const loggedUser = {
                id: '1',
                email: formData.email,
                name: 'Usuario Demo',
                loginDate: new Date().toISOString()
            };
            
            setUser(loggedUser);
            setIsAuthenticated(true);
            
            return true;
        } catch (error) {
            console.error('Error en login:', error);
            return false;
        } finally {
            setLoading(false);
        }
    }, [validateLoginForm]);

    /**
     * Procesa el registro del usuario
     * @param {Object} formData - Datos del formulario
     * @returns {Promise<boolean>} true si el registro fue exitoso
     */
    const register = useCallback(async (formData) => {
        setLoading(true);
        
        try {
            const validation = validateRegisterForm(formData);
            
            if (!validation.isValid) {
                showFormIncompleteAlert();
                return { success: false, errors: validation.errors };
            }

            // Simular registro exitoso
            await showRegisterSuccessAlert();
            
            // Simular usuario registrado
            const newUser = {
                id: generateUniqueId(),
                nombre: formData.nombre,
                apellido: formData.apellido,
                email: formData.email,
                fechaNacimiento: formData.fechaNacimiento,
                benefits: validation.benefits,
                registerDate: new Date().toISOString()
            };
            
            // En una aplicación real, aquí se enviarían los datos al servidor
            console.log('Usuario registrado:', newUser);
            
            return { success: true, user: newUser, benefits: validation.benefits };
        } catch (error) {
            console.error('Error en registro:', error);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }, [validateRegisterForm]);

    /**
     * Cierra la sesión del usuario
     */
    const logout = useCallback(() => {
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    /**
     * Valida un campo individual
     * @param {string} fieldName - Nombre del campo
     * @param {string} value - Valor del campo
     * @param {string} formType - Tipo de formulario ('login' o 'register')
     * @returns {Object} { isValid: boolean, message: string }
     */
    const validateField = useCallback((fieldName, value, formType = 'login') => {
        switch (fieldName) {
            case 'email':
                return validateEmailField(value);
            case 'password':
                return formType === 'register' 
                    ? validateRegisterPasswordField(value)
                    : validatePasswordField(value);
            case 'nombre':
            case 'apellido':
                return validateNameField(value);
            case 'fechaNacimiento':
                return validateBirthDateField(value);
            case 'confirmPassword':
                return validatePasswordConfirmation(value, value);
            default:
                return { isValid: true, message: '' };
        }
    }, []);

    return {
        // Estado
        user,
        isAuthenticated,
        loading,
        
        // Funciones
        login,
        register,
        logout,
        validateField,
        validateLoginForm,
        validateRegisterForm
    };
};

/**
 * Genera un ID único simple
 * @returns {string} ID único
 */
const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
