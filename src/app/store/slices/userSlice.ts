import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../../@types/store';
import { LocalStorageService, StorageKeys } from '../../../infrastructure/storage/localStorage';

const initialState: UserState = {
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    isAuthenticated: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<Omit<UserState, 'isAuthenticated'>>) => {
            const newState = {
                ...action.payload,
                isAuthenticated: true
            };

            LocalStorageService.setItem(StorageKeys.USER, newState);

            return newState;
        },
        logoutUser: () => {
            LocalStorageService.removeItem(StorageKeys.USER);
            return initialState;
        },
        updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
            LocalStorageService.setItem(StorageKeys.USER, action.payload);
            return {
                ...state,
                ...action.payload
            };
        }
    }
});

export const { loginUser, logoutUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
