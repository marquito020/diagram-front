import { axiosClient } from "./axiosClient";
import { handleAxiosError } from "./handleAxiosError";
import { AuthRepository } from "../../core/auth/ports/AuthRepository";
import { User } from "../../core/auth/entities/User";

const AUTH_ENDPOINT = "/auth";
const USER_ENDPOINT = "/users";

interface LoginResponse {
    message: string;
    data: {
        user: {
            _id: string;
            email: string;
            firstName: string;
            lastName: string;
        };
        access_token: string;
    };
}

export class AuthApi implements AuthRepository {
    async login(email: string, password: string): Promise<User> {
        try {
            const { data } = await axiosClient.post<LoginResponse>(`${AUTH_ENDPOINT}/login`, {
                email,
                password
            });

            // console.log(data);

            if (!data.data.user?._id || !data.data.user?.email || !data.data.user?.firstName || !data.data.user?.lastName) {
                throw new Error('Respuesta inválida del servidor');
            }

            // console.log(data.data.user);

            if (data.data.access_token) {
                localStorage.setItem('token', data.data.access_token);
            }

            return {
                _id: data.data.user._id,
                email: data.data.user.email,
                firstName: data.data.user.firstName,
                lastName: data.data.user.lastName,
                password: ''
            };
        } catch (error) {
            console.error('Error en login:', error);
            throw handleAxiosError(error);
        }
    }

    async register(user: User): Promise<User> {
        try {
            const response = await axiosClient.post(`${USER_ENDPOINT}`, user);
            console.log(response.data.data.user);
            return response.data.data.user;
        } catch (error) {
            throw handleAxiosError(error);
        }
    }

    async getCurrentUser(): Promise<User> {
        try {
            const response = await axiosClient.get(`${AUTH_ENDPOINT}/me`);
            return response.data;
        } catch (error) {
            throw handleAxiosError(error);
        }
    }
}
