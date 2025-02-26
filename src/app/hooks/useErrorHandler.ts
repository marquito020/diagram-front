import { useNotification } from '../context/NotificationContext';
import { handleApiError } from '../utils/errorHandling';
import { NotificationType } from '../constants/notifications';
import { useNavigate } from 'react-router-dom';
import { PublicRoutes } from '../constants/routes';
import { useAppDispatch } from '../store';
import { logoutUserAction } from '../store/actions/userActions';

export const useErrorHandler = () => {
    const { showNotification } = useNotification();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleError = (error: unknown, showNotificationMessage = true) => {
        const appError = handleApiError(error);

        // Log del error para debugging
        console.error('Error capturado:', appError);

        // Manejo específico según el tipo de error
        if (appError.code === 'AUTH_ERROR') {
            // Limpiar sesión y redirigir a login
            localStorage.removeItem('token');
            dispatch(logoutUserAction());
            navigate(PublicRoutes.LOGIN);
        }

        // Mostrar notificación si es necesario
        if (showNotificationMessage) {
            showNotification(appError.getErrorMessage(), NotificationType.ERROR);
        }

        return appError;
    };

    return { handleError };
};
