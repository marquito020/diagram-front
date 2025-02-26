import axiosClient from './axiosClient';
import { Diagram } from '../../core/diagrams/entities/Diagram';
import { DiagramData } from '../../features/diagrams/types/diagramTypes';

// Interfaces para las respuestas de la API
interface ApiResponse<T> {
    data: T;
    message: string;
    success?: boolean;
}

// interface DiagramResponse extends ApiResponse<Diagram> {}
// interface DiagramsResponse extends ApiResponse<Diagram[]> {}

// Tipo unión para manejar diferentes formatos de respuesta
type ApiResponseVariant<T> = ApiResponse<T> | T;

export class DiagramService {
    private static instance: DiagramService;
    private readonly DIAGRAM_ENDPOINT = '/class-diagram';

    private constructor() { }

    static getInstance(): DiagramService {
        if (!DiagramService.instance) {
            DiagramService.instance = new DiagramService();
        }
        return DiagramService.instance;
    }

    /**
     * Procesa la respuesta de la API para extraer los datos según su formato
     * @param response Respuesta de la API que puede tener diferentes formatos
     * @returns Los datos extraídos de la respuesta
     */
    private extractData<T>(response: ApiResponseVariant<T>): T {
        if (response === null || response === undefined) {
            throw new Error('Respuesta de API vacía');
        }

        // Si la respuesta tiene una propiedad 'data', asumimos que es ApiResponse<T>
        if (response && typeof response === 'object' && 'data' in response) {
            return response.data;
        }

        // Si no, asumimos que la respuesta ya es directamente T
        return response as T;
    }

    async getDiagramsByUserId(userId: string): Promise<Diagram[]> {
        if (!userId) {
            console.warn('Se intentó obtener diagramas sin proporcionar un ID de usuario');
            return [];
        }

        try {
            const response = await axiosClient.get<ApiResponseVariant<Diagram[]>>(
                `${this.DIAGRAM_ENDPOINT}/user/${userId}`
            );

            try {
                return this.extractData(response);
            } catch (error) {
                console.error('Error al procesar la respuesta:', error);
                return [];
            }
        } catch (error) {
            console.error('Error al obtener diagramas:', error);
            throw error;
        }
    }

    async createDiagram(name: string, user: string): Promise<Diagram> {
        if (!user) {
            throw new Error('Se requiere un ID de usuario para crear un diagrama');
        }

        try {
            const response = await axiosClient.post<ApiResponseVariant<Diagram>>(
                `${this.DIAGRAM_ENDPOINT}`,
                { name, user: user }
            );

            return this.extractData(response);
        } catch (error) {
            console.error('Error al crear diagrama:', error);
            throw error;
        }
    }

    async deleteDiagram(id: string, userId: string): Promise<void> {
        if (!id || !userId) {
            throw new Error('Se requieren ID de diagrama y usuario para eliminar un diagrama');
        }

        try {
            await axiosClient.delete(
                `${this.DIAGRAM_ENDPOINT}/${id}?userId=${userId}`
            );
        } catch (error) {
            console.error('Error al eliminar diagrama:', error);
            throw error;
        }
    }

    // Método para transformar Diagram a DiagramData
    transformToData(diagram: Diagram, userId: string, userEmail: string): DiagramData {
        if (!diagram) {
            console.error('Se intentó transformar un diagrama nulo o indefinido');
            throw new Error('Diagrama inválido');
        }

        return {
            ...diagram,
            user: {
                firstName: diagram.user?.firstName || 'Usuario',
                lastName: diagram.user?.lastName || '',
                _id: userId,
                email: userEmail
            },
            sharedUsers: diagram.sharedUsers?.map(p => ({
                firstName: p.firstName || 'Usuario',
                lastName: p.lastName || '',
                _id: p._id || "",
                email: p.email || ""
            })) || [],
            createdAt: diagram.createdAt || new Date().toISOString(),
            updatedAt: diagram.updatedAt || new Date().toISOString()
        };
    }
}

export default DiagramService.getInstance();