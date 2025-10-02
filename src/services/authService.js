// Servicio de autenticación - Lógica de negocio extraída de login.js y registro.js

import { 
    validateEmailField, 
    validatePasswordField, 
    validateNameField, 
    validateBirthDateField,
    validatePasswordConfirmation,
    validateRegisterPasswordField,
    validateDiscountCode,
    isDuocEmail,
    isEligibleForAgeDiscount
} from '../utils/validators';
import { BENEFITS, MESSAGES } from '../data/constants';

/**
 * Servicio de autenticación
 */
export class AuthService {
    /**
     * Valida un formulario de login
     * @param {Object} formData - Datos del formulario
     * @returns {Object} { isValid: boolean, errors: Object }
     */
    static validateLoginForm(formData) {
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
    }

    /**
     * Valida un formulario de registro
     * @param {Object} formData - Datos del formulario
     * @returns {Object} { isValid: boolean, errors: Object, benefits: Object }
     */
    static validateRegisterForm(formData) {
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
                benefits.duocBenefit = BENEFITS.DUOC_BENEFIT;
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
                benefits.ageDiscount = `${BENEFITS.AGE_DISCOUNT_PERCENTAGE}% de descuento`;
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

        // Validar código de descuento (opcional)
        if (formData.codigoDescuento) {
            const codeValidation = validateDiscountCode(formData.codigoDescuento);
            if (!codeValidation.isValid) {
                errors.codigoDescuento = codeValidation.message;
                isValid = false;
            } else if (formData.codigoDescuento === BENEFITS.PROMO_CODE) {
                benefits.promoCode = `${BENEFITS.PROMO_DISCOUNT_PERCENTAGE}% de descuento de por vida`;
            }
        }

        return { isValid, errors, benefits };
    }

    /**
     * Procesa el login de un usuario (simulado)
     * @param {Object} credentials - Credenciales de login
     * @returns {Promise<Object>} Resultado del login
     */
    static async login(credentials) {
        try {
            // Validar formulario
            const validation = this.validateLoginForm(credentials);
            if (!validation.isValid) {
                return {
                    success: false,
                    errors: validation.errors,
                    message: MESSAGES.ERROR.REQUIRED_FIELD
                };
            }

            // Simular delay de API
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simular login exitoso
            const user = {
                id: '1',
                email: credentials.email,
                name: 'Usuario Demo',
                loginDate: new Date().toISOString(),
                isAuthenticated: true
            };

            return {
                success: true,
                user,
                message: MESSAGES.SUCCESS.LOGIN
            };

        } catch (error) {
            console.error('Error en login:', error);
            return {
                success: false,
                error: error.message,
                message: 'Error interno del servidor'
            };
        }
    }

    /**
     * Procesa el registro de un usuario (simulado)
     * @param {Object} userData - Datos del usuario
     * @returns {Promise<Object>} Resultado del registro
     */
    static async register(userData) {
        try {
            // Validar formulario
            const validation = this.validateRegisterForm(userData);
            if (!validation.isValid) {
                return {
                    success: false,
                    errors: validation.errors,
                    message: 'Formulario incompleto'
                };
            }

            // Simular delay de API
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Crear usuario
            const newUser = {
                id: this.generateUserId(),
                nombre: userData.nombre,
                apellido: userData.apellido,
                email: userData.email,
                fechaNacimiento: userData.fechaNacimiento,
                benefits: validation.benefits,
                registerDate: new Date().toISOString(),
                isAuthenticated: false
            };

            return {
                success: true,
                user: newUser,
                benefits: validation.benefits,
                message: MESSAGES.SUCCESS.REGISTER
            };

        } catch (error) {
            console.error('Error en registro:', error);
            return {
                success: false,
                error: error.message,
                message: 'Error interno del servidor'
            };
        }
    }

    /**
     * Verifica si un email está disponible (simulado)
     * @param {string} email - Email a verificar
     * @returns {Promise<boolean>} true si está disponible
     */
    static async checkEmailAvailability(email) {
        try {
            // Simular delay de API
            await new Promise(resolve => setTimeout(resolve, 500));

            // Simular que el email está disponible
            return { available: true };
        } catch (error) {
            console.error('Error verificando email:', error);
            return { available: false, error: error.message };
        }
    }

    /**
     * Valida un campo individual
     * @param {string} fieldName - Nombre del campo
     * @param {string} value - Valor del campo
     * @param {string} formType - Tipo de formulario ('login' o 'register')
     * @returns {Object} { isValid: boolean, message: string }
     */
    static validateField(fieldName, value, formType = 'login') {
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
            case 'codigoDescuento':
                return validateDiscountCode(value);
            default:
                return { isValid: true, message: '' };
        }
    }

    /**
     * Genera un ID único para usuario
     * @returns {string} ID único
     */
    static generateUserId() {
        return 'user_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    /**
     * Verifica si un usuario está autenticado
     * @param {Object} user - Usuario a verificar
     * @returns {boolean} true si está autenticado
     */
    static isAuthenticated(user) {
        return user && user.isAuthenticated === true;
    }

    /**
     * Obtiene los beneficios de un usuario
     * @param {Object} user - Usuario
     * @returns {Object} Beneficios del usuario
     */
    static getUserBenefits(user) {
        if (!user) return {};
        return user.benefits || {};
    }

    /**
     * Verifica si un usuario tiene un beneficio específico
     * @param {Object} user - Usuario
     * @param {string} benefitType - Tipo de beneficio
     * @returns {boolean} true si tiene el beneficio
     */
    static hasBenefit(user, benefitType) {
        const benefits = this.getUserBenefits(user);
        return benefits.hasOwnProperty(benefitType);
    }
}
