// Contexto de Autenticación - Para compartir estado de autenticación entre componentes

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Estado inicial de autenticación
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

// Tipos de acciones
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS'
};

// Reducer de autenticación
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };

    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: false, // El usuario debe hacer login después del registro
        loading: false,
        error: null
      };

    default:
      return state;
  }
};

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Provider del contexto
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Cargar estado de autenticación desde localStorage al inicializar
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('authUser');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: user });
      }
    } catch (error) {
      console.error('Error al cargar estado de autenticación:', error);
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: 'Error al cargar el estado de autenticación' });
    }
  }, []);

  // Guardar estado de autenticación en localStorage cuando cambie
  useEffect(() => {
    try {
      if (state.user && state.isAuthenticated) {
        localStorage.setItem('authUser', JSON.stringify(state.user));
      } else {
        localStorage.removeItem('authUser');
      }
    } catch (error) {
      console.error('Error al guardar estado de autenticación:', error);
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: 'Error al guardar el estado de autenticación' });
    }
  }, [state.user, state.isAuthenticated]);

  // Funciones de autenticación
  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular login exitoso
      const user = {
        id: '1',
        email: credentials.email,
        name: 'Usuario Demo',
        loginDate: new Date().toISOString(),
        isAuthenticated: true
      };
      
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: user });
      return true;
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: 'Error al iniciar sesión' });
      return false;
    }
  };

  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simular registro exitoso
      const user = {
        id: '2',
        nombre: userData.nombre,
        apellido: userData.apellido,
        email: userData.email,
        fechaNacimiento: userData.fechaNacimiento,
        registerDate: new Date().toISOString(),
        isAuthenticated: false
      };
      
      dispatch({ type: AUTH_ACTIONS.REGISTER_SUCCESS, payload: user });
      return { success: true, user };
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: 'Error al registrarse' });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    
    try {
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: 'Error al cerrar sesión' });
    }
  };

  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const value = {
    // Estado
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    error: state.error,
    
    // Funciones
    login,
    register,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
