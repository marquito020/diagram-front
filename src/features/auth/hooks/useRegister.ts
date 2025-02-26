import { useState } from "react";
import { loginUser } from "../../../app/store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../app/constants/routes";
import { useAppDispatch } from "../../../app/store";
import authService from "../../../infrastructure/api/authApi";
import { LocalStorageService, StorageKeys } from "../../../infrastructure/storage/localStorage";
import { NotificationLocalStorageKeys } from "../../../app/constants/notifications";

interface RegisterState {
    loading: boolean;
    error: string | null;
}

export const useRegister = () => {
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

            dispatch(loginUser({
                _id: user._id || "",
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }));

            LocalStorageService.setItem(NotificationLocalStorageKeys.WELCOME, user.firstName);

            LocalStorageService.setItem(StorageKeys.USER, user);

            navigate(PrivateRoutes.HOME);

            return user;
        } catch (error) {
            const message = error instanceof Error ? error.message : "Error en el registro";
            setState(prev => ({ ...prev, error: message }));
            throw error;
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    return {
        ...state,
        register,
    };
};