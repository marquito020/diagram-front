import { UserAction, UserState } from "../../../@types/store";
import { loginUser, logoutUser, updateUser } from "../slices/userSlice";
import { AppDispatch } from "..";

/**
 * Tipo para las funciones de acción tipadas que retornan una función de thunk
 */
type ActionCreator<P, R = UserAction> = (payload: P) => (dispatch: AppDispatch) => R;

/**
 * Acciones tipadas que utilizan UserAction para mejorar la seguridad de tipos
 * y seguir las mejores prácticas de Redux y TypeScript
 */

/**
 * Acción para iniciar sesión de usuario
 * @param userData Datos del usuario a iniciar sesión
 * @returns Acción de thunk para iniciar sesión
 */
export const loginUserAction: ActionCreator<Omit<UserState, 'isAuthenticated'>> = (userData) =>
    (dispatch) => {
        const action = loginUser(userData);
        dispatch(action);
        return {
            type: 'LOGIN_USER',
            payload: userData
        };
    };

/**
 * Acción para cerrar sesión de usuario
 * @returns Acción de thunk para cerrar sesión
 */
export const logoutUserAction: ActionCreator<void> = () =>
    (dispatch) => {
        const action = logoutUser();
        dispatch(action);
        return {
            type: 'LOGOUT_USER'
        };
    };

/**
 * Acción para actualizar datos del usuario
 * @param userData Datos del usuario a actualizar
 * @returns Acción de thunk para actualizar datos del usuario
 */
export const updateUserAction: ActionCreator<Partial<UserState>> = (userData) =>
    (dispatch) => {
        const action = updateUser(userData);
        dispatch(action);
        return {
            type: 'UPDATE_USER',
            payload: userData
        };
    };

