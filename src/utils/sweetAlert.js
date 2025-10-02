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
 * @param {Object} benefits - Beneficios obtenidos por el usuario
 */
export const showRegisterSuccessAlert = (benefits = {}) => {
    const hasBenefits = benefits.duocBenefit || benefits.ageDiscount || benefits.promoCode;
    
    if (hasBenefits) {
        // Construir lista de beneficios
        const benefitsList = [];
        if (benefits.duocBenefit) benefitsList.push(`🎂 ${benefits.duocBenefit}`);
        if (benefits.ageDiscount) benefitsList.push(`💰 ${benefits.ageDiscount}`);
        if (benefits.promoCode) benefitsList.push(`🎁 ${benefits.promoCode}`);
        
        return Swal.fire({
            ...swalConfig,
            title: '🎉 ¡Registro Exitoso!',
            html: `
                <div class="text-center">
                    <p class="mb-3">Tu cuenta ha sido creada correctamente. ¡Disfruta de tus beneficios!</p>
                    <div class="alert alert-success d-inline-block">
                        <strong>🎁 ¡Beneficios obtenidos!</strong>
                        <div class="benefits-list text-start mt-2">
                            ${benefitsList.map(benefit => `<small class="d-block">${benefit}</small>`).join('')}
                        </div>
                    </div>
                    <p class="mt-3 small text-muted">Ahora puedes iniciar sesión</p>
                </div>
            `,
            icon: 'success',
            confirmButtonText: '¡Perfecto!',
            timer: 5000,
            timerProgressBar: true,
            showConfirmButton: true
        });
    } else {
        return showSuccessAlert(
            '¡Registro Exitoso!',
            'Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.',
            {
                timer: 3000,
                timerProgressBar: true
            }
        );
    }
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
    return Swal.fire({
        ...swalConfig,
        title: '🎉 ¡Descuento Especial!',
        html: `
            <div class="text-center">
                <p class="mb-3">Por tu edad, obtienes:</p>
                <div class="alert alert-warning d-inline-block">
                    <strong>💰 50% de descuento en todas tus compras</strong>
                </div>
                <p class="mt-3 small text-muted">Válido para todos los productos</p>
            </div>
        `,
        icon: 'success',
        confirmButtonText: '¡Excelente!',
        timer: 5000,
        showConfirmButton: true,
        allowOutsideClick: false
    });
};

/**
 * Muestra una alerta de torta gratis para estudiantes Duoc
 */
export const showDuocBenefitAlert = () => {
    return Swal.fire({
        ...swalConfig,
        title: '🎓 ¡Beneficio Duoc UC!',
        html: `
            <div class="text-center">
                <p class="mb-3">Al usar tu email de Duoc UC, obtienes:</p>
                <div class="alert alert-success d-inline-block">
                    <strong>🎂 Torta gratis en tu cumpleaños</strong>
                </div>
                <p class="mt-3 small text-muted">Presenta tu cédula de identidad en tu cumpleaños</p>
            </div>
        `,
        icon: 'success',
        confirmButtonText: '¡Genial!',
        timer: 5000,
        showConfirmButton: true,
        allowOutsideClick: false
    });
};

/**
 * Muestra una alerta de descuento por código
 */
export const showCodeDiscountAlert = () => {
    return Swal.fire({
        ...swalConfig,
        title: '🎁 ¡Código Válido!',
        html: `
            <div class="text-center">
                <p class="mb-3">Tu código de descuento te da:</p>
                <div class="alert alert-info d-inline-block">
                    <strong>💸 10% de descuento adicional</strong>
                </div>
                <p class="mt-3 small text-muted">Se aplicará automáticamente en el checkout</p>
            </div>
        `,
        icon: 'success',
        confirmButtonText: '¡Perfecto!',
        timer: 4000,
        showConfirmButton: true,
        allowOutsideClick: false
    });
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
    return     Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: 3000,
        toast: true
    });
};

