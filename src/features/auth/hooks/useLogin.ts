import { useState } from "react";
import { useAppDispatch } from "../../../app/store";
import { loginUserAction } from "../../../app/store/actions/userActions";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../app/constants/routes";
import { User } from "../../../core/auth/entities/User";
import { NotificationLocalStorageKeys } from "../../../app/constants/notifications";
import { useErrorHandler } from "../../../app/hooks/useErrorHandler";
import authService from "../../../infrastructure/api/authApi";
import { LocalStorageService } from "../../../infrastructure/storage/localStorage";

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
  const { handleError } = useErrorHandler();

  const login = async (email: string, password: string): Promise<User> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const userData = await authService.login(email, password);

      console.log(userData);

      dispatch(loginUserAction({
        _id: userData._id || "",
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName
      }));

      // También lo almacenamos en localStorage usando el servicio
      LocalStorageService.setItem(NotificationLocalStorageKeys.WELCOME, userData.firstName);

      // Navegamos a la página principal
      navigate(PrivateRoutes.HOME);

      return userData;
    } catch (error) {
      const appError = handleError(error, true);
      setState(prev => ({ ...prev, error: appError.message }));
      throw appError;
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  return {
    ...state,
    login
  };
};