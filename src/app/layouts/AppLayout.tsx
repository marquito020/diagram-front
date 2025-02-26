import { ReactNode } from "react";
import { useNotification } from "../context/NotificationContext";
import { useLocation } from "react-router-dom";
import { PublicRoutes } from '../constants/routes';
import {
    NotificationType,
    NotificationStorageKeys,
    NotificationMessages
} from '../constants/notifications';

interface AppLayoutProps {
    children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
    const { showNotification } = useNotification();
    const location = useLocation();

    // Manejo de notificaciones basado en la ruta y el estado
    const isPublicRoute = Object.values(PublicRoutes).some(route => route === location.pathname);

    // Verificar mensaje de logout en rutas públicas
    const showLogoutMessage = sessionStorage.getItem(NotificationStorageKeys.LOGOUT);
    if (showLogoutMessage && isPublicRoute) {
        showNotification(NotificationMessages.LOGOUT, NotificationType.INFO);
        sessionStorage.removeItem(NotificationStorageKeys.LOGOUT);
    }

    // Verificar mensaje de bienvenida en rutas privadas
    const welcomeUser = sessionStorage.getItem(NotificationStorageKeys.WELCOME);
    if (welcomeUser && !isPublicRoute) {
        showNotification(NotificationMessages.WELCOME(welcomeUser), NotificationType.SUCCESS);
        sessionStorage.removeItem(NotificationStorageKeys.WELCOME);
    }

    return <>{children}</>;
};
