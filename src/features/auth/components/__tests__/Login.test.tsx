import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../../../app/store/slices/userSlice';
import Login from '../Login';
import { expect, vi } from 'vitest';

// Mock del hook useNavigate
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => vi.fn()
    };
});

// Mock del hook useAuth
vi.mock('../../hooks/useLogin', () => ({
    useAuth: () => ({
        login: vi.fn(),
        loading: false,
        showToast: false,
        toastMessage: '',
        toastType: 'success',
        setShowToast: vi.fn()
    })
}));

describe('Login Component', () => {
    const renderLogin = () => {
        const store = configureStore({
            reducer: {
                user: userReducer
            }
        });

        return render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );
    };

    it('renders login form correctly', () => {
        renderLogin();

        // Verificar elementos principales
        expect(screen.getByText('DiagramFlow')).toBeInTheDocument();
        expect(screen.getByText('Bienvenido de nuevo')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('shows registration link', () => {
        renderLogin();
        expect(screen.getByText('¿No tienes una cuenta?')).toBeInTheDocument();
        expect(screen.getByText('Regístrate aquí')).toBeInTheDocument();
    });

    it('shows password when toggle button is clicked', () => {
        renderLogin();
        const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
        const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });

        expect(passwordInput.type).toBe('password');
        fireEvent.click(toggleButton);
        expect(passwordInput.type).toBe('text');
    });
}); 