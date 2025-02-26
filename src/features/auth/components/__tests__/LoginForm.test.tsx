import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../../../app/store/slices/userSlice';
import LoginForm from '../LoginForm';
import { vi } from 'vitest';
import { describe, it, expect, beforeEach } from 'vitest';

// Mock del hook useAuth
const mockLogin = vi.fn();
vi.mock('../../hooks/useLogin', () => ({
    useAuth: () => ({
        login: mockLogin,
        loading: false,
        showToast: false,
        toastMessage: '',
        toastType: 'success',
        setShowToast: vi.fn()
    })
}));

describe('LoginForm Component', () => {
    const renderLoginForm = () => {
        const store = configureStore({
            reducer: {
                user: userReducer
            }
        });

        return render(
            <Provider store={store}>
                <LoginForm />
            </Provider>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should validate required fields', async () => {
        renderLoginForm();
        
        const submitButton = screen.getByRole('button', { name: /login/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Email is required')).toBeInTheDocument();
            expect(screen.getByText('Password is required')).toBeInTheDocument();
        });
    });

    it('should call login function with form data', async () => {
        renderLoginForm();

        const emailInput = screen.getByPlaceholderText('Email Address');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: /login/i });

        fireEvent.change(emailInput, { target: { value: 'marco@gmail.com' } });
        fireEvent.change(passwordInput, { target: { value: '12345678' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('marco@gmail.com', '12345678');
        });
    });

    it('should validate email format', async () => {
        renderLoginForm();

        const emailInput = screen.getByPlaceholderText('Email Address');
        const submitButton = screen.getByRole('button', { name: /login/i });

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Invalid email format')).toBeInTheDocument();
        });
    });
}); 