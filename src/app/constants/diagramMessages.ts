import { NotificationType } from './notifications';

/**
 * Mensajes relacionados con operaciones de diagramas
 */
export const DiagramMessages = {
    // Mensajes de éxito
    CREATE_SUCCESS: 'Diagrama creado exitosamente',
    UPDATE_SUCCESS: 'Diagrama actualizado exitosamente',
    DELETE_SUCCESS: 'Diagrama eliminado exitosamente',
    SHARE_SUCCESS: 'Diagrama compartido exitosamente',

    // Mensajes de error
    CREATE_ERROR: 'Error al crear el diagrama. Inténtalo de nuevo.',
    UPDATE_ERROR: 'Error al actualizar el diagrama. Inténtalo de nuevo.',
    DELETE_ERROR: 'Error al eliminar el diagrama. Inténtalo de nuevo.',
    SHARE_ERROR: 'Error al compartir el diagrama. Inténtalo de nuevo.',
    LOAD_ERROR: 'Error al cargar los diagramas. Inténtalo de nuevo.',

    // Mensajes informativos
    NO_DIAGRAMS: 'No tienes diagramas creados. Crea tu primer diagrama para comenzar.',
    DIAGRAM_EMPTY: 'Este diagrama está vacío. Comienza a añadir elementos.',

    // Mensajes de confirmación
    DELETE_CONFIRM: (name: string) => `¿Estás seguro que deseas eliminar el diagrama "${name}"? Esta acción no se puede deshacer.`
} as const;

/**
 * Tipos de Toast para operaciones de diagramas
 */
export const DiagramToastTypes = {
    CREATE: {
        SUCCESS: NotificationType.SUCCESS,
        ERROR: NotificationType.ERROR
    },
    UPDATE: {
        SUCCESS: NotificationType.SUCCESS,
        ERROR: NotificationType.ERROR
    },
    DELETE: {
        SUCCESS: NotificationType.SUCCESS,
        ERROR: NotificationType.ERROR
    },
    SHARE: {
        SUCCESS: NotificationType.SUCCESS,
        ERROR: NotificationType.ERROR
    },
    LOAD: {
        ERROR: NotificationType.ERROR
    }
} as const;

/**
 * Duración de los Toast para operaciones de diagramas (en milisegundos)
 */
export const DIAGRAM_TOAST_DURATION = 3000;

/**
 * Estado inicial para el Toast en componentes de diagramas
 */
export const INITIAL_TOAST_STATE : ToastState = {
    show: false,
    message: '',
    type: NotificationType.SUCCESS
};

/**
 * Interfaz para el estado del Toast
 */
export interface ToastState {
    show: boolean;
    message: string;
    type: NotificationType;
}
