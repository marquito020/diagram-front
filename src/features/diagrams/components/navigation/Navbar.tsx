import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../../../auth/hooks/useLogout";
import { PrivateRoutes } from "../../../../app/constants/routes";
import {
  FaProjectDiagram,
  FaUserCircle,
  FaSignOutAlt,
  FaBell,
  FaChartLine,
  FaSitemap
} from "react-icons/fa";
import { LocalStorageService, StorageKeys } from '../../../../infrastructure/storage/localStorage';
import { User } from "../../../../core/auth/entities/User";

/**
 * Componente de navegación principal de la aplicación
 * Muestra la barra de navegación con enlaces a las principales secciones
 * y opciones de usuario
 */
export default function Navbar() {
  // Estado y referencias
  const user = LocalStorageService.getItem<User>(StorageKeys.USER);
  const { logout } = useLogout();
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Maneja clics fuera del menú de usuario para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Enlaces de navegación principal
  const navLinks = [
    { to: PrivateRoutes.HOME, label: "Dashboard", icon: <FaChartLine className="mr-2" /> },
    { to: "/diagrams", label: "Mis Diagramas", icon: <FaSitemap className="mr-2" /> }
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-800 to-indigo-900 shadow-xl fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y nombre */}
          <Link
            to={PrivateRoutes.INDEX}
            className="flex items-center space-x-3 text-white hover:text-purple-200 transition-all duration-300 transform hover:scale-105"
            aria-label="DiagramFlow Home"
          >
            <FaProjectDiagram className="w-7 h-7" />
            <span className="text-xl font-bold tracking-wider">DiagramFlow</span>
          </Link>

          {/* Navegación central */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-300 hover:text-white hover:bg-purple-700/40 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Menú derecho */}
          <div className="flex items-center space-x-4">
            {/* Notificaciones */}
            <button
              className="text-gray-300 hover:text-white p-2 rounded-full hover:bg-purple-700/50 transition-all duration-200 relative"
              aria-label="Notificaciones"
            >
              <FaBell className="w-5 h-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-purple-800"></span>
            </button>

            {/* Perfil de usuario */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white focus:outline-none bg-purple-700/30 hover:bg-purple-600/40 px-3 py-1.5 rounded-full transition-all duration-200"
                aria-expanded={showUserMenu}
                aria-haspopup="true"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-md">
                  <FaUserCircle className="w-6 h-6" />
                </div>
                <span className="hidden md:block text-sm font-medium max-w-[150px] truncate">
                  {user?.email}
                </span>
                {/* Indicador de menú desplegable */}
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Tooltip para dispositivos móviles */}
              <div className="absolute -top-10 right-0 md:hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                Haz clic para ver opciones
              </div>

              {/* Menú desplegable con animación mejorada */}
              {showUserMenu && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-lg shadow-xl py-1 bg-white dark:bg-gray-800 ring-1 ring-black/5 z-50 overflow-hidden animate-fadeIn"
                  style={{
                    animation: 'fadeIn 0.2s ease-out',
                  }}
                >
                  {/* Cabecera con información del usuario */}
                  <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-md">
                        <FaUserCircle className="w-9 h-9 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 dark:text-white">{user?.firstName} {user?.lastName}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 truncate">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Estado del usuario */}
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-xs text-gray-600 dark:text-gray-300">En línea</span>
                    </div>
                  </div>

                  {/* Opciones principales */}
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center"
                    >
                      <FaUserCircle className="w-4 h-4 mr-3 text-purple-600 dark:text-purple-400" />
                      Mi Perfil
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center"
                    >
                      <FaChartLine className="w-4 h-4 mr-3 text-indigo-600 dark:text-indigo-400" />
                      Estadísticas
                    </Link>
                    <Link
                      to="/favorites"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center"
                    >
                      <FaSitemap className="w-4 h-4 mr-3 text-blue-600 dark:text-blue-400" />
                      Diagramas Favoritos
                    </Link>
                  </div>

                  {/* Sección de cerrar sesión */}
                  <div className="py-1 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150 flex items-center"
                    >
                      <FaSignOutAlt className="w-4 h-4 mr-3" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}