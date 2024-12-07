import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root"; // Archivo Root.jsx
import Home from "./Home"; // Página de inicio
import Login from "./Login"; // Página de login
import Register from "./Register"; // Página de registro
import InventarioPage from "./InventarioPage"; // Página de inventario
import Users from "./Users"; // Página de usuarios
import Error404 from "./Error404"; // Página de error

// Configuración de las rutas
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // Usa Root como layout principal
    children: [
      { path: "/", element: <Home /> }, // Ruta de inicio
      { path: "/login", element: <Login /> }, // Ruta de login
      { path: "/register", element: <Register /> }, // Ruta de registro
      { path: "/inventario", element: <InventarioPage /> }, // Ruta de inventario
      { path: "/users", element: <Users /> }, // Ruta de usuarios
      { path: "*", element: <Error404 /> }, // Ruta para manejar errores 404
    ],
  },
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
