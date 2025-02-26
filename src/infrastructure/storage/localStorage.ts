// import { User } from "../../core/auth/entities/User";

// Claves para el almacenamiento local
export const StorageKeys = {
    USER: 'user',
    TOKEN: 'token',
    THEME: 'theme'
};

export class LocalStorageService {
    static setItem(key: string, value: any): void {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error(`Error al guardar en localStorage: ${key}`, error);
        }
    }

    static getItem<T>(key: string, defaultValue: T | null = null): T | null {
        try {
            const serializedValue = localStorage.getItem(key);
            if (serializedValue === null) {
                return defaultValue;
            }
            return JSON.parse(serializedValue) as T;
        } catch (error) {
            console.error(`Error al recuperar de localStorage: ${key}`, error);
            return defaultValue;
        }
    }

    static removeItem(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error al eliminar de localStorage: ${key}`, error);
        }
    }

    static clear(): void {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error al limpiar localStorage', error);
        }
    }
}

// export const persistLocalStorageUser = (user: User) => {
//     localStorage.setItem("user", JSON.stringify(user));
// };

// export const clearLocalStorageUser = () => {
//     localStorage.removeItem("user");
// };