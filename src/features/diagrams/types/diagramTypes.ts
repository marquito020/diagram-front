// src/features/diagrams/types/diagramTypes.ts
export interface CreateDiagramFormData {
    name: string;
}

export interface DiagramUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface DiagramData {
    _id: string;
    name: string;
    user: DiagramUser;
    sharedUsers?: DiagramUser[];
    createdAt: string;
    updatedAt: string;
}

export interface DiagramState {
    diagrams: DiagramData[];
    loading: boolean;
    error: string | null;
    selectedDiagram: DiagramData | null;
}