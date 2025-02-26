export const NotificationTypes = {
    WELCOME: 'welcomeUser',
    LOGOUT: 'showLogoutMessage'
} as const;

export const NotificationMessages = {
    WELCOME: (name: string) => `¡Bienvenido ${name}!`,
    LOGOUT: '¡Hasta pronto! Has cerrado sesión correctamente'
} as const;
