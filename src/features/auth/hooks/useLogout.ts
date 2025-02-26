import { useAppDispatch } from "../../../app/store";
import { logoutUserAction } from "../../../app/store/actions/userActions";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../../app/constants/routes";
import { NotificationLocalStorageKeys } from "../../../app/constants/notifications";
import { useErrorHandler } from "../../../app/hooks/useErrorHandler";
import { LocalStorageService, StorageKeys } from "../../../infrastructure/storage/localStorage";

export const useLogout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { handleError } = useErrorHandler();

    const logout = () => {
        try {
            // Limpiamos el token si existe
            LocalStorageService.removeItem(StorageKeys.TOKEN);

            // Dispatch de la acción de logout
            dispatch(logoutUserAction());

            // También lo guardamos en localStorage
            LocalStorageService.setItem(NotificationLocalStorageKeys.LOGOUT, 'true');

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
