import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../useLogin';
import { vi } from 'vitest';
import { AuthApi } from '../../../../infrastructure/api/authApi';

// Mock de react-redux
vi.mock('react-redux', () => ({
    useDispatch: () => vi.fn()
}));

// Mock de react-router-dom
vi.mock('react-router-dom', () => ({
    useNavigate: () => vi.fn()
}));

// Mock de AuthApi
vi.mock('../../../../infrastructure/api/authApi', () => ({
    AuthApi: vi.fn().mockImplementation(() => ({
        login: vi.fn()
    }))
}));

describe('useAuth Hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should initialize with default values', () => {
        const { result } = renderHook(() => useAuth());

        expect(result.current.loading).toBe(false);
        expect(result.current.showToast).toBe(false);
        expect(result.current.toastMessage).toBe('');
        expect(result.current.toastType).toBe('success');
    });

    it('should handle successful login', async () => {
        const mockUserData = {
            _id: '1',
            email: 'test@test.com',
            firstName: 'Test',
            lastName: 'User'
        };

        // Mock de la respuesta exitosa
        (AuthApi as jest.Mock).mockImplementation(() => ({
            login: vi.fn().mockResolvedValue(mockUserData)
        }));

        const { result } = renderHook(() => useAuth());

        await act(async () => {
            await result.current.login('test@test.com', 'password123');
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.showToast).toBe(true);
        expect(result.current.toastType).toBe('success');
        expect(result.current.toastMessage).toContain('¡Bienvenido');
    });

    it('should handle login error', async () => {
        const errorMessage = 'Invalid credentials';

        // Mock de la respuesta con error
        (AuthApi as jest.Mock).mockImplementation(() => ({
            login: vi.fn().mockRejectedValue(new Error(errorMessage))
        }));

        const { result } = renderHook(() => useAuth());

        await act(async () => {
            try {
                await result.current.login('test@test.com', 'wrongpassword');
            } catch (error) {
                // Esperamos que lance el error
            }
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.showToast).toBe(true);
        expect(result.current.toastType).toBe('error');
        expect(result.current.toastMessage).toBe(errorMessage);
    });
}); 