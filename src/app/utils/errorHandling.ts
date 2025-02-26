export enum ErrorCode {
    AUTHENTICATION_ERROR = 'AUTH_ERROR',
    NETWORK_ERROR = 'NETWORK_ERROR',
    SERVER_ERROR = 'SERVER_ERROR',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    NOT_FOUND = 'NOT_FOUND',
    FORBIDDEN = 'FORBIDDEN',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export class AppError extends Error {
    constructor(
        message: string,
        public code: ErrorCode,
        public status: number = 500,
        public details?: any
    ) {
        super(message);
        this.name = 'AppError';
        // Esto es necesario debido a cómo funciona la herencia en TypeScript
        Object.setPrototypeOf(this, AppError.prototype);
    }

    static fromApiError(error: any): AppError {
        if (error.response) {
            // Error de respuesta del servidor
            const status = error.response.status;
            const data = error.response.data;
            const message = data?.message || 'Error en el servidor';

            switch (status) {
                case 400:
                    return new AppError(message, ErrorCode.VALIDATION_ERROR, status, data);
                case 401:
                    return new AppError('Sesión expirada o credenciales inválidas', ErrorCode.AUTHENTICATION_ERROR, status);
                case 403:
                    return new AppError('No tienes permisos para realizar esta acción', ErrorCode.FORBIDDEN, status);
                case 404:
                    return new AppError('Recurso no encontrado', ErrorCode.NOT_FOUND, status);
                case 500:
                default:
                    return new AppError('Error en el servidor', ErrorCode.SERVER_ERROR, status);
            }
        } else if (error.request) {
            // Error de red (sin respuesta)
            return new AppError(
                'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
                ErrorCode.NETWORK_ERROR,
                0
            );
        } else {
            // Error desconocido
            return new AppError(
                error.message || 'Ha ocurrido un error inesperado',
                ErrorCode.UNKNOWN_ERROR,
                500
            );
        }
    }

    getErrorMessage(): string {
        switch (this.code) {
            case ErrorCode.AUTHENTICATION_ERROR:
                return 'Error de autenticación. Por favor, inicia sesión nuevamente.';
            case ErrorCode.NETWORK_ERROR:
                return 'Error de conexión. Verifica tu conexión a internet.';
            case ErrorCode.SERVER_ERROR:
                return 'Error en el servidor. Inténtalo más tarde.';
            case ErrorCode.VALIDATION_ERROR:
                return `Error de validación: ${this.message}`;
            case ErrorCode.NOT_FOUND:
                return 'El recurso solicitado no existe.';
            case ErrorCode.FORBIDDEN:
                return 'No tienes permisos para realizar esta acción.';
            default:
                return this.message;
        }
    }
}

export const handleApiError = (error: unknown): AppError => {
    if (error instanceof AppError) {
        return error;
    }

    return AppError.fromApiError(error);
};
