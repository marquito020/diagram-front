import { DiagramData } from "../../features/diagrams/types/diagramTypes";

// Interfaces para el estado del usuario
export interface UserState {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    isAuthenticated: boolean;
}

// Interface para el estado de los diagramas
export interface DiagramState {
    diagrams: DiagramData[];
    loading: boolean;
    error: string | null;
    selectedDiagram: DiagramData | null;
}

// Interface para el estado de notificaciones
export interface NotificationState {
    message: string | null;
    type: 'success' | 'error' | 'info' | 'warning' | null;
    isVisible: boolean;
}

// Interface para el estado global completo
export interface RootState {
    user: UserState;
    diagrams: DiagramState;
    notifications: NotificationState;
}

// Tipos para las acciones
export type UserAction =
    | { type: 'LOGIN_USER'; payload: Omit<UserState, 'isAuthenticated'> }
    | { type: 'LOGOUT_USER' }
    | { type: 'UPDATE_USER'; payload: Partial<UserState> };

export type DiagramAction =
    | { type: 'SET_DIAGRAMS'; payload: DiagramData[] }
    | { type: 'ADD_DIAGRAM'; payload: DiagramData }
    | { type: 'UPDATE_DIAGRAM'; payload: DiagramData }
    | { type: 'DELETE_DIAGRAM'; payload: string }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'SELECT_DIAGRAM'; payload: DiagramData | null };
