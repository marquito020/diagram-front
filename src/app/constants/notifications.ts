/**
 * Tipos de notificaciones disponibles en la aplicación
 */
export enum NotificationType {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
    WARNING = 'warning'
}

/**
 * Claves para almacenar datos de notificaciones en sessionStorage
 */
export const NotificationStorageKeys = {
    WELCOME: 'welcomeUser',
    LOGOUT: 'showLogoutMessage'
} as const;

/**
 * Duración predeterminada de las notificaciones en milisegundos
 */
export const NOTIFICATION_DURATION = 3000;

/**
 * Mensajes predefinidos para las notificaciones del sistema
 */
export const NotificationMessages = {
    WELCOME: (name: string) => `¡Bienvenido ${name}!`,
    LOGOUT: '¡Hasta pronto! Has cerrado sesión correctamente',
    SESSION_EXPIRED: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
    GENERIC_ERROR: 'Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.'
} as const;

/**
 * Configuración de apariencia para cada tipo de notificación
 */
export const NotificationConfig = {
    [NotificationType.SUCCESS]: {
        icon: 'check-circle',
        className: 'bg-green-50 border-green-500 text-green-800'
    },
    [NotificationType.ERROR]: {
        icon: 'x-circle',
        className: 'bg-red-50 border-red-500 text-red-800'
    },
    [NotificationType.INFO]: {
        icon: 'information-circle',
        className: 'bg-blue-50 border-blue-500 text-blue-800'
    },
    [NotificationType.WARNING]: {
        icon: 'exclamation',
        className: 'bg-yellow-50 border-yellow-500 text-yellow-800'
    }
} as const;
