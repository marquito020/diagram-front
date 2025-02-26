import axiosClient from './axiosClient';
import { Diagram } from '../../core/diagrams/entities/Diagram';
import { DiagramData } from '../../features/diagrams/types/diagramTypes';

interface DiagramResponse {
  data: Diagram;
  message: string;
}

interface DiagramsResponse {
  data: Diagram[];
  message: string;
}

export class DiagramService {
  private static instance: DiagramService;
  private readonly DIAGRAM_ENDPOINT = '/diagrams';
  
  private constructor() {}
  
  static getInstance(): DiagramService {
    if (!DiagramService.instance) {
      DiagramService.instance = new DiagramService();
    }
    return DiagramService.instance;
  }
  
  async getDiagramsByUserId(userId: string): Promise<Diagram[]> {
    try {
      const response = await axiosClient.get<DiagramsResponse>(
        `${this.DIAGRAM_ENDPOINT}/user/${userId}`
      );
      
      return response.data;
    } catch (error) {
      console.error('Error al obtener diagramas:', error);
      throw error;
    }
  }
  
  async createDiagram(name: string, anfitrionId: string): Promise<Diagram> {
    try {
      const response = await axiosClient.post<DiagramResponse>(
        `${this.DIAGRAM_ENDPOINT}`,
        { name, anfitrionId }
      );
      
      return response.data;
    } catch (error) {
      console.error('Error al crear diagrama:', error);
      throw error;
    }
  }
  
  async deleteDiagram(id: string, userId: string): Promise<void> {
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
    return {
      ...diagram,
      anfitrion: {
        firstName: diagram.anfitrion.firstName,
        lastName: diagram.anfitrion.lastName,
        _id: userId,
        email: userEmail
      },
      participantes: diagram.participantes.map(p => ({
        firstName: p.firstName,
        lastName: p.lastName,
        _id: userId,
        email: userEmail
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
}

export default DiagramService.getInstance();