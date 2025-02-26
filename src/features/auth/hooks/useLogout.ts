import { useAppDispatch } from "../../../app/store";
import { logoutUserAction } from "../../../app/store/actions/userActions";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../../app/constants/routes";
import { NotificationStorageKeys } from "../../../app/constants/notifications";
import { useErrorHandler } from "../../../app/hooks/useErrorHandler";

export const useLogout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { handleError } = useErrorHandler();

    const logout = () => {
        try {
            // Limpiamos el token si existe
            localStorage.removeItem('token');

            // Dispatch de la acción de logout
            dispatch(logoutUserAction());

            // Guardamos el estado de logout para mostrar el mensaje
            sessionStorage.setItem(NotificationStorageKeys.LOGOUT, 'true');

            // Navegamos al login
            navigate(PublicRoutes.LOGIN);
        } catch (error) {
            handleError(error);
        }
    };

    return {
        logout
    };
};
