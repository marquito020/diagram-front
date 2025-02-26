// infrastructure/api/handleAxiosError.ts
import { AxiosError } from "axios";

interface ApiError {
    message: string;
    code?: string;
    status?: number;
}

export function handleAxiosError(error: unknown): Error {
    if (error instanceof AxiosError) {
        const data = error.response?.data as ApiError | undefined;
        const status = error.response?.status;

        // Manejar errores específicos según el código de estado
        switch (status) {
            case 401:
                return new Error(data?.message || "No autorizado. Por favor, inicie sesión nuevamente.");
            case 403:
                return new Error(data?.message || "No tiene permisos para realizar esta acción.");
            case 404:
                return new Error(data?.message || "Recurso no encontrado.");
            case 422:
                return new Error(data?.message || "Datos inválidos. Por favor, verifique la información.");
            default:
                return new Error(data?.message || "Ha ocurrido un error. Por favor, intente nuevamente.");
        }
    }

    if (error instanceof Error) {
        return error;
    }

    return new Error("Ha ocurrido un error inesperado.");
}