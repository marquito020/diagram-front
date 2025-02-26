import { ReactNode, useEffect } from "react";
import { useNotification } from "../context/NotificationContext";
import { useLocation } from "react-router-dom";
import { PublicRoutes } from '../constants/routes';
import {
    NotificationType,
    NotificationLocalStorageKeys,
    NotificationMessages
} from '../constants/notifications';
import { LocalStorageService } from "../../infrastructure/storage/localStorage";

interface AppLayoutProps {
    children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
    const { showNotification } = useNotification();
    const location = useLocation();

    const isPublicRoute = Object.values(PublicRoutes).some(route => route === location.pathname);

    useEffect(() => {
        const showLogoutMessagePersistent = LocalStorageService.getItem<string>(NotificationLocalStorageKeys.LOGOUT);

        if ((showLogoutMessagePersistent) && isPublicRoute) {
            showNotification(NotificationMessages.LOGOUT, NotificationType.INFO);
            if (showLogoutMessagePersistent) {
                LocalStorageService.removeItem(NotificationLocalStorageKeys.LOGOUT);
            }
        }

        const welcomeUserPersistent = LocalStorageService.getItem<string>(NotificationLocalStorageKeys.WELCOME);

        if ((welcomeUserPersistent) && !isPublicRoute) {
            const userName = welcomeUserPersistent || '';
            showNotification(NotificationMessages.WELCOME(userName), NotificationType.SUCCESS);
            if (welcomeUserPersistent) {
                LocalStorageService.removeItem(NotificationLocalStorageKeys.WELCOME);
            }
        }

    }, [showNotification, isPublicRoute, location.pathname]);

    return <>{children}</>;
};
