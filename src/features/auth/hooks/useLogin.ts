import { useState } from "react";
import { useAppDispatch } from "../../../app/store";
import { loginUserAction } from "../../../app/store/actions/userActions";
import { AuthApi } from "../../../infrastructure/api/authApi";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../app/constants/routes";
import { useNotification } from "../../../app/context/NotificationContext";
import { User } from "../../../core/auth/entities/User";
import {
  NotificationType,
  NotificationStorageKeys,
  NotificationMessages
} from "../../../app/constants/notifications";

interface LoginState {
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [state, setState] = useState<LoginState>({
    loading: false,
    error: null
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const login = async (email: string, password: string): Promise<User> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const authApi = new AuthApi();
      const userData = await authApi.login(email, password);

      dispatch(loginUserAction({
        _id: userData._id || "",
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName
      }));

      // Almacenamos el nombre de usuario en sessionStorage para recuperarlo después de la navegación
      sessionStorage.setItem(NotificationStorageKeys.WELCOME, userData.firstName);

      // Navegamos a la página principal
      navigate(PrivateRoutes.HOME);

      return userData;
    } catch (error) {
      const message = error instanceof Error ? error.message : NotificationMessages.GENERIC_ERROR;
      setState(prev => ({ ...prev, error: message }));
      showNotification(message, NotificationType.ERROR);
      throw error;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  return {
    ...state,
    login
  };
};