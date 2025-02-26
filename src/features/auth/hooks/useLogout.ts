import { useState } from "react";
import { useAppDispatch } from "../../../app/store";
import { logoutUserAction } from "../../../app/store/actions/userActions";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../../app/constants/routes";
import { NotificationTypes } from "../../../app/constants/notifications";

interface LogoutState {
    loading: boolean;
    error: string | null;
}

export const useLogout = () => {
    const [state, setState] = useState<LogoutState>({
        loading: false,
        error: null
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logout = async (): Promise<void> => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            // Eliminar token del localStorage
            localStorage.removeItem('token');

            // Limpiar el estado de Redux
            dispatch(logoutUserAction());

            // Guardamos el estado de logout para mostrar el mensaje
            sessionStorage.setItem(NotificationTypes.LOGOUT, 'true');

            // Navegar al login después de un breve delay
            navigate(PublicRoutes.LOGIN);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Error al cerrar sesión";
            setState(prev => ({ ...prev, error: message }));
            throw error;
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    return {
        ...state,
        logout,
    };
};