import { Link } from "react-router-dom";
import { useLogout } from "../../../auth/hooks/useLogout";
import { PrivateRoutes } from "../../../../app/constants/routes";
import { FaProjectDiagram, FaUserCircle, FaSignOutAlt, FaBell } from "react-icons/fa";
import { LocalStorageService, StorageKeys } from '../../../../infrastructure/storage/localStorage';
import { useState } from "react";
import { User } from "../../../../core/auth/entities/User";
export default function Navbar() {
  const user = LocalStorageService.getItem<User>(StorageKeys.USER);
  const { logout } = useLogout();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      <nav className="bg-gradient-to-r from-purple-700 to-indigo-800 shadow-xl fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo y nombre */}
            <Link
              to={PrivateRoutes.INDEX}
              className="flex items-center space-x-3 text-white hover:text-purple-200 transition-all duration-300 transform hover:scale-105"
            >
              <FaProjectDiagram className="w-8 h-8" />
              <span className="text-xl font-bold tracking-wider">DiagramFlow</span>
            </Link>

            {/* Navegación central */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to={PrivateRoutes.HOME}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link
                to="/diagrams"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Mis Diagramas
              </Link>
            </div>

            {/* Menú derecho */}
            <div className="flex items-center space-x-4">
              {/* Notificaciones */}
              <button className="text-gray-300 hover:text-white p-2 rounded-full hover:bg-purple-600 transition-all duration-200">
                <FaBell className="w-5 h-5" />
              </button>

              {/* Perfil de usuario */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                    <FaUserCircle className="w-6 h-6" />
                  </div>
                  <span className="hidden md:block text-sm font-medium">
                    {user?.email}
                  </span>
                </button>

                {/* Menú desplegable */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                      <p className="text-gray-500 text-xs">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mi Perfil
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}