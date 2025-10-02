// Contexto del Carrito - Para compartir estado del carrito entre componentes

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CART_CONFIG } from '../data/constants';
import { getProductById } from '../data/productosDB';

// Estado inicial del carrito
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  loading: false,
  error: null
};

// Tipos de acciones
const CART_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  LOAD_CART: 'LOAD_CART',
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART'
};

// Reducer del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case CART_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case CART_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        items: action.payload,
        totalItems: action.payload.reduce((sum, item) => sum + item.cantidad, 0),
        totalPrice: action.payload.reduce((sum, item) => sum + (item.precio * item.cantidad), 0),
        loading: false,
        error: null
      };

    case CART_ACTIONS.ADD_ITEM:
      const existingItem = state.items.find(item => item.id === action.payload.id);
      let newItems;
      
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, cantidad: Math.min(item.cantidad + action.payload.cantidad, CART_CONFIG.MAX_QUANTITY) }
            : item
        );
      } else {
        newItems = [...state.items, action.payload];
      }
      
      return {
        ...state,
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.cantidad, 0),
        totalPrice: newItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0),
        loading: false,
        error: null
      };

    case CART_ACTIONS.REMOVE_ITEM:
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      
      return {
        ...state,
        items: filteredItems,
        totalItems: filteredItems.reduce((sum, item) => sum + item.cantidad, 0),
        totalPrice: filteredItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0),
        loading: false,
        error: null
      };

    case CART_ACTIONS.UPDATE_QUANTITY:
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, cantidad: Math.max(CART_CONFIG.MIN_QUANTITY, Math.min(action.payload.cantidad, CART_CONFIG.MAX_QUANTITY)) }
          : item
      ).filter(item => item.cantidad > 0);
      
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, item) => sum + item.cantidad, 0),
        totalPrice: updatedItems.reduce((sum, item) => sum + (item.precio * item.cantidad), 0),
        loading: false,
        error: null
      };

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0,
        loading: false,
        error: null
      };

    default:
      return state;
  }
};

// Crear el contexto
const CartContext = createContext();

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

// Provider del contexto
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Cargar carrito desde localStorage al inicializar
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_CONFIG.STORAGE_KEY);
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartItems });
      }
    } catch (error) {
      console.error('Error al cargar carrito desde localStorage:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Error al cargar el carrito' });
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    try {
      localStorage.setItem(CART_CONFIG.STORAGE_KEY, JSON.stringify(state.items));
    } catch (error) {
      console.error('Error al guardar carrito en localStorage:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Error al guardar el carrito' });
    }
  }, [state.items]);

  // Funciones del carrito
  const addToCart = (productId, quantity = 1) => {
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
    
    try {
      // Obtener el producto real desde la base de datos
      const productData = getProductById(productId);
      
      if (!productData) {
        dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Producto no encontrado' });
        return;
      }
      
      // Crear el producto para el carrito con los datos reales
      const product = {
        id: productData.id,
        nombre: productData.nombre,
        precio: productData.precio,
        cantidad: quantity,
        imagen: productData.imagen,
        descripcion: productData.descripcion
      };
      
      dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Error al agregar producto al carrito' });
    }
  };

  const removeFromCart = (productId) => {
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: productId, cantidad: quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const getProductQuantity = (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.cantidad : 0;
  };

  const isProductInCart = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  const clearError = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    // Estado
    cart: state.items,
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
    loading: state.loading,
    error: state.error,
    
    // Funciones
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getProductQuantity,
    isProductInCart,
    clearError
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
