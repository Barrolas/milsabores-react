// Utilidades de validación - Migradas desde login.js y registro.js

import { VALIDATION_RULES, BENEFITS, MESSAGES } from '../data/constants';

/**
 * Valida el formato de un email
 * @param {string} email - Email a validar
 * @returns {boolean} true si es válido, false si no
 */
export const validateEmail = (email) => {
    return VALIDATION_RULES.EMAIL_REGEX.test(email);
};

/**
 * Valida un campo de email completo (vacío + formato)
 * @param {string} email - Email a validar
 * @returns {Object} { isValid: boolean, message: string }
 */
export const validateEmailField = (email) => {
    const trimmedEmail = email.trim();
    
    if (trimmedEmail === '') {
        return { isValid: false, message: MESSAGES.ERROR.REQUIRED_FIELD };
    }
    
    if (!validateEmail(trimmedEmail)) {
        return { isValid: false, message: MESSAGES.ERROR.INVALID_EMAIL };
    }
    
    return { isValid: true, message: '' };
};

/**
 * Valida un campo de contraseña
 * @param {string} password - Contraseña a validar
 * @returns {Object} { isValid: boolean, message: string }
 */
export const validatePasswordField = (password) => {
    if (password === '') {
        return { isValid: false, message: MESSAGES.ERROR.REQUIRED_FIELD };
    }
    
    if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
        return { 
            isValid: false, 
            message: `La contraseña debe tener al menos ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} caracteres` 
        };
    }
    
    return { isValid: true, message: '' };
};

/**
 * Valida un campo de contraseña para registro (más estricto)
 * @param {string} password - Contraseña a validar
 * @returns {Object} { isValid: boolean, message: string }
 */
export const validateRegisterPasswordField = (password) => {
    if (password === '') {
        return { isValid: false, message: MESSAGES.ERROR.REQUIRED_FIELD };
    }
    
    if (password.length < 8) {
        return { isValid: false, message: 'La contraseña debe tener al menos 8 caracteres' };
    }
    
    if (!VALIDATION_RULES.PASSWORD_REGEX.test(password)) {
        return { 
            isValid: false, 
            message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número' 
        };
    }
    
    return { isValid: true, message: '' };
};

/**
 * Valida un campo de nombre
 * @param {string} name - Nombre a validar
 * @returns {Object} { isValid: boolean, message: string }
 */
export const validateNameField = (name) => {
    const trimmedName = name.trim();
    
    if (trimmedName === '') {
        return { isValid: false, message: MESSAGES.ERROR.REQUIRED_FIELD };
    }
    
    if (trimmedName.length < VALIDATION_RULES.NAME_MIN_LENGTH) {
        return { 
            isValid: false, 
            message: `El nombre debe tener al menos ${VALIDATION_RULES.NAME_MIN_LENGTH} caracteres` 
        };
    }
    
    if (!VALIDATION_RULES.NAME_REGEX.test(trimmedName)) {
        return { isValid: false, message: MESSAGES.ERROR.INVALID_NAME };
    }
    
    return { isValid: true, message: '' };
};

/**
 * Valida un campo de fecha de nacimiento
 * @param {string} birthDate - Fecha de nacimiento a validar
 * @returns {Object} { isValid: boolean, message: string, age: number }
 */
export const validateBirthDateField = (birthDate) => {
    if (birthDate === '') {
        return { isValid: false, message: MESSAGES.ERROR.REQUIRED_FIELD, age: 0 };
    }
    
    const fecha = new Date(birthDate);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fecha.getFullYear();
    
    if (edad < VALIDATION_RULES.MIN_AGE) {
        return { 
            isValid: false, 
            message: `Debes ser mayor de ${VALIDATION_RULES.MIN_AGE} años`, 
            age: edad 
        };
    }
    
    if (edad > VALIDATION_RULES.MAX_AGE) {
        return { 
            isValid: false, 
            message: 'Ingresa una fecha válida', 
            age: edad 
        };
    }
    
    return { isValid: true, message: '', age: edad };
};

/**
 * Valida que dos contraseñas coincidan
 * @param {string} password - Contraseña original
 * @param {string} confirmPassword - Contraseña de confirmación
 * @returns {Object} { isValid: boolean, message: string }
 */
export const validatePasswordConfirmation = (password, confirmPassword) => {
    if (confirmPassword === '') {
        return { isValid: false, message: 'Confirma tu contraseña' };
    }
    
    if (confirmPassword !== password) {
        return { isValid: false, message: MESSAGES.ERROR.PASSWORDS_DONT_MATCH };
    }
    
    return { isValid: true, message: '' };
};

/**
 * Valida un código de descuento
 * @param {string} code - Código a validar
 * @returns {Object} { isValid: boolean, message: string }
 */
export const validateDiscountCode = (code) => {
    const trimmedCode = code.trim();
    
    if (trimmedCode === '') {
        return { isValid: true, message: '' }; // Campo opcional
    }
    
    if (trimmedCode === BENEFITS.PROMO_CODE) {
        return { isValid: true, message: '' };
    }
    
    return { isValid: false, message: 'Código inválido' };
};

/**
 * Verifica si un email es de Duoc UC
 * @param {string} email - Email a verificar
 * @returns {boolean} true si es de Duoc, false si no
 */
export const isDuocEmail = (email) => {
    return email.trim().endsWith(BENEFITS.DUOC_EMAIL_SUFFIX);
};

/**
 * Verifica si una persona es elegible para descuento por edad
 * @param {number} age - Edad de la persona
 * @returns {boolean} true si es elegible, false si no
 */
export const isEligibleForAgeDiscount = (age) => {
    return age >= BENEFITS.AGE_DISCOUNT_MIN;
};
