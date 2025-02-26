// infrastructure/api/handleAxiosError.ts
import { AppError, handleApiError } from '../../app/utils/errorHandling';

export const handleAxiosError = (error: unknown): AppError => {
    return handleApiError(error);
};