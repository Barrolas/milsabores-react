// Custom Hook para manejar localStorage de forma segura

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para manejar localStorage con React
 * @param {string} key - Clave en localStorage
 * @param {any} initialValue - Valor inicial
 * @returns {Array} [storedValue, setValue, removeValue]
 */
export const useLocalStorage = (key, initialValue) => {
    // Estado para almacenar nuestro valor
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Obtener del localStorage
            const item = window.localStorage.getItem(key);
            // Parsear JSON almacenado o si no hay ninguno, devolver valor inicial
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // Si hay error, devolver valor inicial
            console.error(`Error al leer localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // Devolver una versión envuelta de la función setState de useState que
    // persiste el nuevo valor en localStorage
    const setValue = useCallback((value) => {
        try {
            // Permitir que value sea una función para que tengamos la misma API que useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            
            // Guardar en el estado
            setStoredValue(valueToStore);
            
            // Guardar en localStorage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error al guardar en localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);

    // Función para remover el valor del localStorage
    const removeValue = useCallback(() => {
        try {
            // Remover del estado
            setStoredValue(initialValue);
            
            // Remover de localStorage
            window.localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error al remover localStorage key "${key}":`, error);
        }
    }, [key, initialValue]);

    return [storedValue, setValue, removeValue];
};

/**
 * Hook para manejar localStorage con callback de cambio
 * @param {string} key - Clave en localStorage
 * @param {any} initialValue - Valor inicial
 * @param {Function} onChange - Callback cuando cambia el valor
 * @returns {Array} [storedValue, setValue, removeValue]
 */
export const useLocalStorageWithCallback = (key, initialValue, onChange) => {
    const [storedValue, setStoredValue, removeValue] = useLocalStorage(key, initialValue);

    const setValue = useCallback((value) => {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        
        // Llamar callback si existe
        if (onChange) {
            onChange(valueToStore, storedValue);
        }
    }, [storedValue, onChange]);

    return [storedValue, setValue, removeValue];
};

/**
 * Hook para manejar múltiples claves de localStorage
 * @param {Object} keys - Objeto con claves y valores iniciales
 * @returns {Object} Objeto con valores y funciones setter
 */
export const useMultipleLocalStorage = (keys) => {
    const result = {};
    
    Object.entries(keys).forEach(([key, initialValue]) => {
        const [value, setValue, removeValue] = useLocalStorage(key, initialValue);
        result[key] = { value, setValue, removeValue };
    });
    
    return result;
};

/**
 * Hook para sincronizar localStorage entre pestañas
 * @param {string} key - Clave en localStorage
 * @param {any} initialValue - Valor inicial
 * @returns {Array} [storedValue, setValue, removeValue]
 */
export const useLocalStorageSync = (key, initialValue) => {
    const [storedValue, setStoredValue, removeValue] = useLocalStorage(key, initialValue);

    // Escuchar cambios en otras pestañas
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === key && e.newValue !== null) {
                try {
                    setStoredValue(JSON.parse(e.newValue));
                } catch (error) {
                    console.error(`Error al parsear localStorage key "${key}":`, error);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key, setStoredValue]);

    return [storedValue, setStoredValue, removeValue];
};

/**
 * Hook para localStorage con TTL (Time To Live)
 * @param {string} key - Clave en localStorage
 * @param {any} initialValue - Valor inicial
 * @param {number} ttl - Tiempo de vida en milisegundos
 * @returns {Array} [storedValue, setValue, removeValue]
 */
export const useLocalStorageWithTTL = (key, initialValue, ttl = 24 * 60 * 60 * 1000) => { // 24 horas por defecto
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (!item) return initialValue;
            
            const parsedItem = JSON.parse(item);
            
            // Verificar si ha expirado
            if (parsedItem.timestamp && Date.now() - parsedItem.timestamp > ttl) {
                window.localStorage.removeItem(key);
                return initialValue;
            }
            
            return parsedItem.value;
        } catch (error) {
            console.error(`Error al leer localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = useCallback((value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            
            // Crear objeto con timestamp
            const itemToStore = {
                value: valueToStore,
                timestamp: Date.now()
            };
            
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(itemToStore));
        } catch (error) {
            console.error(`Error al guardar en localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);

    const removeValue = useCallback(() => {
        try {
            setStoredValue(initialValue);
            window.localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error al remover localStorage key "${key}":`, error);
        }
    }, [key, initialValue]);

    return [storedValue, setValue, removeValue];
};
