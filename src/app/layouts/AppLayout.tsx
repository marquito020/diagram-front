import { ReactNode } from "react";
import { useNotification } from "../context/NotificationContext";
import { useLocation } from "react-router-dom";
import { PublicRoutes } from '../constants/routes';
import { NotificationTypes, NotificationMessages } from '../constants/notifications';

interface AppLayoutProps {
    children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
    const { showNotification } = useNotification();
    const location = useLocation();

    // Manejo de notificaciones basado en la ruta y el estado
    const isPublicRoute = Object.values(PublicRoutes).some(route => route === location.pathname);

    // Verificar mensaje de logout en rutas públicas
    const showLogoutMessage = sessionStorage.getItem(NotificationTypes.LOGOUT);
    if (showLogoutMessage && isPublicRoute) {
        showNotification(NotificationMessages.LOGOUT, 'info');
        sessionStorage.removeItem(NotificationTypes.LOGOUT);
    }

    // Verificar mensaje de bienvenida en rutas privadas
    const welcomeUser = sessionStorage.getItem(NotificationTypes.WELCOME);
    if (welcomeUser && !isPublicRoute) {
        showNotification(NotificationMessages.WELCOME(welcomeUser), "success");
        sessionStorage.removeItem(NotificationTypes.WELCOME);
    }

    return <>{children}</>;
};
