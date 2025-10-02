// Constantes de la aplicación - Migradas desde el proyecto original

// Colores de la marca
export const COLORS = {
    PRIMARY: '#e83e8c',
    PRIMARY_DARK: '#d63384',
    SECONDARY: '#6c757d',
    SUCCESS: '#28a745',
    DANGER: '#dc3545',
    WARNING: '#ffc107',
    INFO: '#17a2b8',
    LIGHT: '#f8f9fa',
    DARK: '#343a40'
};

// Configuración de la aplicación
export const APP_CONFIG = {
    NAME: 'Mil Sabores',
    DESCRIPTION: 'Pastelería',
    VERSION: '1.0.0',
    CURRENCY: 'CLP',
    LOCALE: 'es-CL'
};

// Configuración de validaciones
export const VALIDATION_RULES = {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_MIN_LENGTH: 6,
    PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    NAME_MIN_LENGTH: 2,
    NAME_REGEX: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    MIN_AGE: 18,
    MAX_AGE: 130
};

// Configuración de beneficios especiales
export const BENEFITS = {
    DUOC_EMAIL_SUFFIX: '@duoc.cl',
    DUOC_BENEFIT: 'Torta gratis en cumpleaños',
    AGE_DISCOUNT_MIN: 50,
    AGE_DISCOUNT_PERCENTAGE: 50,
    PROMO_CODE: 'FELICES50',
    PROMO_DISCOUNT_PERCENTAGE: 10
};

// Configuración del carrito
export const CART_CONFIG = {
    STORAGE_KEY: 'milSaboresCart',
    MAX_QUANTITY: 99,
    MIN_QUANTITY: 1
};

// Configuración de filtros
export const FILTER_CONFIG = {
    DEFAULT_MIN_PRICE: 0,
    DEFAULT_MAX_PRICE: 999999,
    PRICE_STEP: 1000
};

// Mensajes de la aplicación
export const MESSAGES = {
    SUCCESS: {
        LOGIN: '¡Login exitoso!',
        REGISTER: '¡Registro exitoso!',
        ADD_TO_CART: 'Producto agregado al carrito',
        REMOVE_FROM_CART: 'Producto eliminado del carrito'
    },
    ERROR: {
        REQUIRED_FIELD: 'Este campo es obligatorio',
        INVALID_EMAIL: 'Ingresa un email válido',
        PASSWORD_TOO_SHORT: 'La contraseña debe tener al menos 6 caracteres',
        PASSWORDS_DONT_MATCH: 'Las contraseñas no coinciden',
        INVALID_NAME: 'El nombre solo puede contener letras',
        INVALID_AGE: 'Debes ser mayor de 18 años',
        PRODUCT_NOT_FOUND: 'Producto no encontrado',
        CART_EMPTY: 'Tu carrito está vacío'
    },
    INFO: {
        CART_EMPTY_MESSAGE: 'Agrega algunos productos para comenzar',
        NO_PRODUCTS_FOUND: 'No se encontraron productos',
        ADJUST_FILTERS: 'Intenta ajustar los filtros'
    }
};

// Configuración de SweetAlert
export const SWEET_ALERT_CONFIG = {
    CONFIRM_BUTTON_COLOR: COLORS.PRIMARY,
    CANCEL_BUTTON_COLOR: COLORS.SECONDARY,
    TIMER: 3000,
    TIMER_PROGRESS_BAR: true
};

// Configuración de imágenes del carrusel
export const CAROUSEL_IMAGES = [
    {
        id: 'TE002',
        image: '/assets/images/carrusel1.png',
        alt: 'Torta Especial de Boda'
    },
    {
        id: 'PSA002',
        image: '/assets/images/carrusel2.png',
        alt: 'Cheesecake de Maracuyá Sin Azúcar'
    },
    {
        id: 'TT003',
        image: '/assets/images/carrusel3.png',
        alt: 'Torta Circular de Frutilla'
    },
    {
        id: 'TE001',
        image: '/assets/images/carrusel4.png',
        alt: 'Torta Especial de Cumpleaños'
    }
];

// Configuración de navegación
export const NAVIGATION = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/registro',
    PRODUCTS_SECTION: '#productos',
    ABOUT_SECTION: '#sobre-nosotros'
};
