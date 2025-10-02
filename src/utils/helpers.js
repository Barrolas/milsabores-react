// Funciones auxiliares - Helpers generales para la aplicación

/**
 * Genera un ID único
 * @returns {string} ID único
 */
export const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Debounce function para limitar llamadas a funciones
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} Función con debounce
 */
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Scroll suave a un elemento
 * @param {string|HTMLElement} target - ID del elemento o elemento HTML
 * @param {number} offset - Offset adicional en píxeles
 */
export const scrollToElement = (target, offset = 0) => {
    const element = typeof target === 'string' ? document.getElementById(target) : target;
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

/**
 * Verifica si un elemento está visible en el viewport
 * @param {HTMLElement} element - Elemento a verificar
 * @returns {boolean} true si está visible
 */
export const isElementVisible = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

/**
 * Copia texto al portapapeles
 * @param {string} text - Texto a copiar
 * @returns {Promise<boolean>} true si se copió exitosamente
 */
export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback para navegadores más antiguos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
    }
};

/**
 * Descarga un archivo
 * @param {string} content - Contenido del archivo
 * @param {string} filename - Nombre del archivo
 * @param {string} type - Tipo MIME del archivo
 */
export const downloadFile = (content, filename, type = 'text/plain') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

/**
 * Formatea bytes a formato legible
 * @param {number} bytes - Bytes a formatear
 * @returns {string} Tamaño formateado
 */
export const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Verifica si es un dispositivo móvil
 * @returns {boolean} true si es móvil
 */
export const isMobile = () => {
    return window.innerWidth <= 768;
};

/**
 * Verifica si es un dispositivo tablet
 * @returns {boolean} true si es tablet
 */
export const isTablet = () => {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
};

/**
 * Verifica si es un dispositivo desktop
 * @returns {boolean} true si es desktop
 */
export const isDesktop = () => {
    return window.innerWidth > 1024;
};

/**
 * Obtiene el tipo de dispositivo actual
 * @returns {string} 'mobile', 'tablet', o 'desktop'
 */
export const getDeviceType = () => {
    if (isMobile()) return 'mobile';
    if (isTablet()) return 'tablet';
    return 'desktop';
};

/**
 * Convierte un objeto a query string
 * @param {Object} params - Parámetros a convertir
 * @returns {string} Query string
 */
export const objectToQueryString = (params) => {
    return Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
};

/**
 * Convierte un query string a objeto
 * @param {string} queryString - Query string a convertir
 * @returns {Object} Objeto con los parámetros
 */
export const queryStringToObject = (queryString) => {
    const params = {};
    const pairs = queryString.split('&');
    
    pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        if (key && value) {
            params[decodeURIComponent(key)] = decodeURIComponent(value);
        }
    });
    
    return params;
};

/**
 * Verifica si una URL es válida
 * @param {string} url - URL a verificar
 * @returns {boolean} true si es válida
 */
export const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/**
 * Obtiene la extensión de un archivo
 * @param {string} filename - Nombre del archivo
 * @returns {string} Extensión del archivo
 */
export const getFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

/**
 * Verifica si un archivo es una imagen
 * @param {string} filename - Nombre del archivo
 * @returns {boolean} true si es imagen
 */
export const isImageFile = (filename) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
    const extension = getFileExtension(filename).toLowerCase();
    return imageExtensions.includes(extension);
};

/**
 * Crea un delay (espera) asíncrono
 * @param {number} ms - Milisegundos a esperar
 * @returns {Promise} Promise que se resuelve después del delay
 */
export const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Verifica si un valor está vacío (null, undefined, string vacío, array vacío, objeto vacío)
 * @param {any} value - Valor a verificar
 * @returns {boolean} true si está vacío
 */
export const isEmpty = (value) => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
};

/**
 * Verifica si un valor NO está vacío
 * @param {any} value - Valor a verificar
 * @returns {boolean} true si NO está vacío
 */
export const isNotEmpty = (value) => {
    return !isEmpty(value);
};
