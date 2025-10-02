// Configuración de SweetAlert2 - Para alertas elegantes

import Swal from 'sweetalert2';
import { SWEET_ALERT_CONFIG, COLORS } from '../data/constants';

/**
 * Configuración base de SweetAlert
 */
const swalConfig = {
    confirmButtonColor: SWEET_ALERT_CONFIG.CONFIRM_BUTTON_COLOR,
    cancelButtonColor: SWEET_ALERT_CONFIG.CANCEL_BUTTON_COLOR,
    timer: SWEET_ALERT_CONFIG.TIMER,
    timerProgressBar: SWEET_ALERT_CONFIG.TIMER_PROGRESS_BAR,
    buttonsStyling: true,
    customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-secondary'
    }
};

/**
 * Muestra una alerta de éxito
 * @param {string} title - Título del mensaje
 * @param {string} text - Texto del mensaje
 * @param {Object} options - Opciones adicionales
 */
export const showSuccessAlert = (title, text = '', options = {}) => {
    return Swal.fire({
        ...swalConfig,
        title,
        text,
        icon: 'success',
        confirmButtonText: '¡Perfecto!',
        ...options
    });
};

/**
 * Muestra una alerta de error
 * @param {string} title - Título del mensaje
 * @param {string} text - Texto del mensaje
 * @param {Object} options - Opciones adicionales
 */
export const showErrorAlert = (title, text = '', options = {}) => {
    return Swal.fire({
        ...swalConfig,
        title,
        text,
        icon: 'error',
        confirmButtonText: 'Entendido',
        ...options
    });
};

/**
 * Muestra una alerta de advertencia
 * @param {string} title - Título del mensaje
 * @param {string} text - Texto del mensaje
 * @param {Object} options - Opciones adicionales
 */
export const showWarningAlert = (title, text = '', options = {}) => {
    return Swal.fire({
        ...swalConfig,
        title,
        text,
        icon: 'warning',
        confirmButtonText: 'Entendido',
        ...options
    });
};

/**
 * Muestra una alerta de información
 * @param {string} title - Título del mensaje
 * @param {string} text - Texto del mensaje
 * @param {Object} options - Opciones adicionales
 */
export const showInfoAlert = (title, text = '', options = {}) => {
    return Swal.fire({
        ...swalConfig,
        title,
        text,
        icon: 'info',
        confirmButtonText: 'Entendido',
        ...options
    });
};

/**
 * Muestra una alerta de confirmación
 * @param {string} title - Título del mensaje
 * @param {string} text - Texto del mensaje
 * @param {Object} options - Opciones adicionales
 * @returns {Promise<boolean>} true si confirma, false si cancela
 */
export const showConfirmAlert = (title, text = '', options = {}) => {
    return Swal.fire({
        ...swalConfig,
        title,
        text,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar',
        ...options
    }).then((result) => {
        return result.isConfirmed;
    });
};

/**
 * Muestra una alerta de login exitoso (simulado)
 */
export const showLoginSuccessAlert = () => {
    return showInfoAlert(
        '¡Login Simulado!',
        'Este es un botón de demostración. No hay autenticación real.',
        {
            timer: 3000,
            timerProgressBar: true
        }
    );
};

/**
 * Muestra una alerta de registro exitoso
 */
export const showRegisterSuccessAlert = () => {
    return showSuccessAlert(
        '¡Registro Exitoso!',
        'Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.',
        {
            timer: 3000,
            timerProgressBar: true
        }
    );
};

/**
 * Muestra una alerta de formulario incompleto
 */
export const showFormIncompleteAlert = () => {
    return showWarningAlert(
        'Formulario Incompleto',
        'Por favor completa todos los campos obligatorios y corrige los errores marcados.'
    );
};

/**
 * Muestra una alerta de descuento por edad
 */
export const showAgeDiscountAlert = () => {
    return showSuccessAlert(
        '🎉 ¡Descuento Especial!',
        'Por ser mayor de 50 años, recibes un 50% de descuento en todos nuestros productos.',
        {
            confirmButtonText: '¡Genial!',
            timer: 5000,
            timerProgressBar: true
        }
    );
};

/**
 * Muestra una alerta de torta gratis para estudiantes Duoc
 */
export const showDuocBenefitAlert = () => {
    return showSuccessAlert(
        '🎂 ¡Torta Gratis!',
        'Como estudiante de Duoc, recibes una torta gratis en tu cumpleaños.',
        {
            confirmButtonText: '¡Excelente!',
            timer: 5000,
            timerProgressBar: true
        }
    );
};

/**
 * Muestra una alerta de descuento por código
 */
export const showCodeDiscountAlert = () => {
    return showSuccessAlert(
        '🎊 ¡Código Válido!',
        'Con el código FELICES50 recibes un 10% de descuento de por vida.',
        {
            confirmButtonText: '¡Perfecto!',
            timer: 5000,
            timerProgressBar: true
        }
    );
};

/**
 * Muestra una alerta de código inválido
 */
export const showInvalidCodeAlert = () => {
    return showErrorAlert(
        '❌ Código Inválido',
        'El código ingresado no es válido. Intenta con FELICES50.',
        {
            timer: 3000,
            timerProgressBar: true
        }
    );
};

/**
 * Muestra una alerta de producto agregado al carrito
 * @param {string} productName - Nombre del producto
 */
export const showProductAddedToCartAlert = (productName) => {
    return showSuccessAlert(
        '¡Producto Agregado!',
        `${productName} ha sido agregado a tu carrito.`,
        {
            timer: 2000,
            timerProgressBar: true
        }
    );
};

/**
 * Muestra una alerta de confirmación para vaciar carrito
 */
export const showClearCartConfirmAlert = () => {
    return showConfirmAlert(
        '¿Vaciar Carrito?',
        '¿Estás seguro de que quieres eliminar todos los productos del carrito?',
        {
            confirmButtonText: 'Sí, vaciar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: COLORS.DANGER
        }
    );
};

/**
 * Muestra una alerta de confirmación para eliminar producto del carrito
 * @param {string} productName - Nombre del producto
 */
export const showRemoveProductConfirmAlert = (productName) => {
    return showConfirmAlert(
        '¿Eliminar Producto?',
        `¿Estás seguro de que quieres eliminar "${productName}" del carrito?`,
        {
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: COLORS.DANGER
        }
    );
};

/**
 * Muestra un toast de éxito
 * @param {string} message - Mensaje a mostrar
 */
export const showSuccessToast = (message) => {
    return Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 2000,
        toast: true
    });
};

/**
 * Muestra un toast de error
 * @param {string} message - Mensaje a mostrar
 */
export const showErrorToast = (message) => {
    return Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: 3000,
        toast: true
    });
};
