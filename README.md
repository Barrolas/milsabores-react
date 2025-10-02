# 🍰 Mil Sabores React - Pastelería Artesanal

Una aplicación web moderna para la pastelería Mil Sabores, desarrollada con React y Bootstrap. Ofrece una experiencia completa de e-commerce con carrito de compras, sistema de productos, y diseño responsive.

![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-purple.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Componentes](#-componentes)
- [Hooks Personalizados](#-hooks-personalizados)
- [Contextos](#-contextos)
- [Servicios](#-servicios)
- [Scripts Disponibles](#-scripts-disponibles)
- [Configuración](#-configuración)
- [Contribución](#-contribución)

## ✨ Características

### 🛒 **Sistema de Carrito Avanzado**
- ✅ Carrito persistente en localStorage
- ✅ Contador en tiempo real en Navbar
- ✅ Modal de carrito con gestión de cantidades
- ✅ Cálculo automático de totales
- ✅ Confirmaciones con SweetAlert2

### 🎨 **Interfaz de Usuario**
- ✅ Diseño responsive con Bootstrap 5
- ✅ Carrusel de productos destacados
- ✅ Sidebar móvil con navegación
- ✅ Modal de detalles de productos
- ✅ Sistema de filtros y búsqueda

### 🔧 **Funcionalidades Técnicas**
- ✅ Routing con React Router DOM
- ✅ Estado global con Context API
- ✅ Hooks personalizados
- ✅ Validaciones de formularios
- ✅ Manejo de errores centralizado

## 🚀 Tecnologías

### **Frontend Core**
- **React 18.2.0** - Biblioteca de interfaz de usuario
- **React Router DOM** - Enrutamiento de aplicaciones
- **React Bootstrap** - Componentes UI basados en Bootstrap

### **Estilos y UI**
- **Bootstrap 5.3.0** - Framework CSS
- **FontAwesome** - Iconografía
- **CSS3** - Estilos personalizados

### **Herramientas y Utilidades**
- **SweetAlert2** - Alertas y confirmaciones
- **LocalStorage** - Persistencia de datos
- **Create React App** - Herramientas de desarrollo

## 📦 Instalación

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Barrolas/milsabores-react.git
   cd milsabores-react
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm start
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── cart/            # Componentes del carrito
│   │   ├── CartModal.js      # Modal del carrito
│   │   ├── CartModal.css     # Estilos del modal
│   │   ├── CartCounter.js    # Contador de items
│   │   └── CartCounter.css   # Estilos del contador
│   ├── layout/          # Componentes de layout
│   │   ├── Layout.js         # Layout principal
│   │   ├── Layout.css        # Estilos del layout
│   │   ├── Navbar.js         # Barra de navegación
│   │   ├── Navbar.css        # Estilos del navbar
│   │   ├── Footer.js         # Pie de página
│   │   └── Footer.css        # Estilos del footer
│   ├── products/        # Componentes de productos
│   │   ├── ProductGrid.js    # Grid de productos
│   │   ├── ProductGrid.css   # Estilos del grid
│   │   ├── ProductCard.js    # Tarjeta de producto
│   │   ├── ProductCard.css   # Estilos de tarjeta
│   │   ├── ProductModal.js   # Modal de producto
│   │   ├── ProductModal.css  # Estilos del modal
│   │   ├── ProductFilters.js # Filtros de productos
│   │   └── ProductFilters.css # Estilos de filtros
│   ├── Carousel.js      # Carrusel principal
│   ├── Carousel.css     # Estilos del carrusel
│   ├── Sidebar.js       # Sidebar móvil
│   └── Sidebar.css      # Estilos del sidebar
├── contexts/            # Contextos de React
│   ├── AuthContext.js   # Contexto de autenticación
│   └── CartContext.js   # Contexto del carrito
├── hooks/               # Hooks personalizados
│   ├── useAuth.js       # Hook de autenticación
│   ├── useLocalStorage.js # Hook de localStorage
│   └── useProducts.js   # Hook de productos
├── pages/               # Páginas de la aplicación
│   ├── Home.js          # Página principal
│   ├── Home.css         # Estilos de home
│   ├── Login.js         # Página de login
│   ├── Login.css        # Estilos de login
│   ├── Register.js      # Página de registro
│   └── Register.css     # Estilos de registro
├── services/            # Servicios de datos
│   ├── authService.js   # Servicio de autenticación
│   ├── cartService.js   # Servicio del carrito
│   └── productService.js # Servicio de productos
├── utils/               # Utilidades
│   ├── formatters.js    # Formateo de datos
│   ├── helpers.js       # Funciones auxiliares
│   ├── sweetAlert.js    # Configuración de alertas
│   └── validators.js    # Validaciones
├── data/                # Datos estáticos
│   ├── constants.js     # Constantes de la app
│   └── productosDB.js   # Base de datos de productos
└── styles/              # Estilos globales
    └── globals.css      # Estilos globales
```

## 🧩 Componentes

### **Layout Components**
- **`Layout.js`** - Estructura principal de la aplicación
- **`Navbar.js`** - Barra de navegación con carrito integrado
- **`Footer.js`** - Pie de página
- **`Sidebar.js`** - Panel lateral para móviles

### **Cart Components**
- **`CartModal.js`** - Modal del carrito de compras
- **`CartCounter.js`** - Contador de items en el carrito

### **Product Components**
- **`ProductGrid.js`** - Grid de productos con filtros
- **`ProductCard.js`** - Tarjeta individual de producto
- **`ProductModal.js`** - Modal de detalles del producto
- **`ProductFilters.js`** - Filtros de productos

### **UI Components**
- **`Carousel.js`** - Carrusel de productos destacados

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## 🎣 Hooks Personalizados

### **`useAuth`**
Manejo del estado de autenticación del usuario.
```javascript
const { user, login, logout, isAuthenticated } = useAuth();
```

### **`useCart`**
Gestión completa del carrito de compras.
```javascript
const { 
  cart, 
  totalItems, 
  totalPrice, 
  addToCart, 
  removeFromCart 
} = useCart();
```

### **`useProducts`**
Gestión de productos, filtros y búsqueda.
```javascript
const { 
  filteredProducts, 
  filterStats, 
  applyFilters, 
  clearFilters 
} = useProducts();
```

### **`useLocalStorage`**
Persistencia de datos en localStorage.
```javascript
const [value, setValue] = useLocalStorage('key', defaultValue);
```

## 🔄 Contextos

### **`CartContext`**
Estado global del carrito de compras.
- **Estado**: `cart`, `totalItems`, `totalPrice`, `loading`, `error`
- **Acciones**: `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`

### **`AuthContext`**
Estado global de autenticación.
- **Estado**: `user`, `isAuthenticated`, `loading`
- **Acciones**: `login`, `logout`, `register`

## 🛠️ Servicios

### **`cartService.js`**
Servicio para operaciones del carrito.
```javascript
// Métodos disponibles
CartService.addItem(productId, quantity)
CartService.removeItem(productId)
CartService.updateQuantity(productId, quantity)
CartService.getTotalItems(cart)
CartService.getTotalPrice(cart)
```

### **`productService.js`**
Servicio para operaciones de productos.
```javascript
// Métodos disponibles
ProductService.getAllProducts()
ProductService.getProductById(id)
ProductService.filterProducts(filters)
ProductService.searchProducts(query)
```

### **`authService.js`**
Servicio para operaciones de autenticación.
```javascript
// Métodos disponibles
AuthService.login(credentials)
AuthService.register(userData)
AuthService.logout()
AuthService.getCurrentUser()
```

## ⚙️ Configuración

### **Variables de Entorno**
Crear archivo `.env` en la raíz del proyecto:
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_APP_NAME=Mil Sabores
REACT_APP_VERSION=1.0.0
```

### **Configuración de Carrito**
En `src/data/constants.js`:
```javascript
export const CART_CONFIG = {
  STORAGE_KEY: 'milSaboresCart',
  MAX_QUANTITY: 99,
  MIN_QUANTITY: 1
};
```

### **Configuración de Colores**
```javascript
export const COLORS = {
  PRIMARY: '#e83e8c',      // Rosa principal
  PRIMARY_DARK: '#d63384', // Rosa oscuro
  SECONDARY: '#6c757d',    // Gris
  SUCCESS: '#28a745',      // Verde
  DANGER: '#dc3545'        // Rojo
};
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

### **Guías de Contribución**
- Seguir las convenciones de código existentes
- Agregar tests para nuevas funcionalidades
- Actualizar documentación cuando sea necesario
- Usar commits descriptivos

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autores

- **Barrolas** - *Desarrollo* - [GitHub](https://github.com/Barrolas)
- **Nicole Pollet** - *Desarrollo* - [GitHub](https://github.com/NicoleChavezGomez)

## 🙏 Agradecimientos

- React Bootstrap por los componentes UI
- FontAwesome por los iconos
- SweetAlert2 por las alertas elegantes
- Bootstrap por el framework CSS

## 📞 Contacto

- **Proyecto**: [https://github.com/Barrolas/milsabores-react](https://github.com/Barrolas/milsabores-react)
- **Issues**: [https://github.com/Barrolas/milsabores-react/issues](https://github.com/Barrolas/milsabores-react/issues)

---

⭐ **¡Si te gusta este proyecto, no olvides darle una estrella!** ⭐