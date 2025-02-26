import { useState } from "react";
import { loginUserAction } from "../../../app/store/actions/userActions";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../app/constants/routes";
import { useAppDispatch } from "../../../app/store";
import authService from "../../../infrastructure/api/authApi";
import { LocalStorageService, StorageKeys } from "../../../infrastructure/storage/localStorage";
import { NotificationLocalStorageKeys, NotificationType } from "../../../app/constants/notifications";
import { handleAxiosError } from "../../../infrastructure/api/handleAxiosError";

interface RegisterState {
    loading: boolean;
    error: string | null;
}

export const useRegister = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<NotificationType | null>(null);
    const [state, setState] = useState<RegisterState>({
        loading: false,
        error: null
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const register = async (userData: {
        firstName: string;
        lastName: string;
        email: string;
        password: string
    }) => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const user = await authService.register(userData);

            dispatch(loginUserAction({
                _id: user._id || "",
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }));

            navigate(PrivateRoutes.HOME);

            return user;
        } catch (error) {
            const appError = handleAxiosError(error);
            const errorMessage = appError.getErrorMessage();
            setState(prev => ({ ...prev, error: errorMessage }));
            setShowToast(true);
            setToastType(NotificationType.ERROR);
            setToastMessage(errorMessage);
            throw appError;
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    return {
        ...state,
        register,
        showToast,
        toastMessage,
        toastType,
        setShowToast
    };
};