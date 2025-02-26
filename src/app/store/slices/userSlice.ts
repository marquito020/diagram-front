import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../../@types/store';

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
            return {
                ...action.payload,
                isAuthenticated: true
            };
        },
        logoutUser: () => initialState,
        updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
            return {
                ...state,
                ...action.payload
            };
        }
    }
});

export const { loginUser, logoutUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
