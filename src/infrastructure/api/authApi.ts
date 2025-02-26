import axiosClient from './axiosClient';
import { User } from '../../core/auth/entities/User';
import { StorageKeys } from '../storage/localStorage';
import { LocalStorageService } from '../storage/localStorage';

interface LoginResponse {
    data: {
        user: User;
        access_token: string;
    };
    message: string;
}

interface RegisterResponse {
    data: {
        user: User;
        access_token: string;
    };
    message: string;
}

export class AuthService {
    private static instance: AuthService;
    private readonly AUTH_ENDPOINT = '/auth';
    private readonly USER_ENDPOINT = '/users';

    private constructor() { }

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async login(email: string, password: string): Promise<User> {
        try {
            const response = await axiosClient.post<LoginResponse>(
                `${this.AUTH_ENDPOINT}/login`,
                { email, password }
            );

            if (response.data?.access_token) {
                this.saveToken(response.data.access_token);
            } else {
                throw new Error('No se recibió un token de acceso');
            }

            return {
                _id: response.data.user._id,
                email: response.data.user.email,
                firstName: response.data.user.firstName,
                lastName: response.data.user.lastName,
                password: ''
            };
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    }

    async register(user: User): Promise<User> {
        try {
            const response = await axiosClient.post<RegisterResponse>(
                `${this.USER_ENDPOINT}`,
                user
            );

            if (response.data?.access_token) {
                this.saveToken(response.data.access_token);
            } else {
                throw new Error('No se recibió un token de acceso');
            }

            return response.data.user;
        } catch (error) {
            console.error('Error en registro:', error);
            throw error;
        }
    }

    async getCurrentUser(): Promise<User> {
        try {
            const response = await axiosClient.get<{ data: User }>(
                `${this.AUTH_ENDPOINT}/me`
            );

            return response.data;
        } catch (error) {
            console.error('Error al obtener usuario actual:', error);
            throw error;
        }
    }

    logout(): void {
        LocalStorageService.removeItem(StorageKeys.TOKEN);
    }

    //token lo guardamos en el localStorage
    saveToken(token: string): void {
        LocalStorageService.setItem(StorageKeys.TOKEN, token);
    }
}

export default AuthService.getInstance();
