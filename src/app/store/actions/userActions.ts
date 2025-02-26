import { UserAction, UserState } from "../../../@types/store";

export const loginUserAction = (userData: Omit<UserState, 'isAuthenticated'>): UserAction => ({
    type: 'LOGIN_USER',
    payload: userData
});

export const logoutUserAction = (): UserAction => ({
    type: 'LOGOUT_USER'
});

export const updateUserAction = (userData: Partial<UserState>): UserAction => ({
    type: 'UPDATE_USER',
    payload: userData
});
