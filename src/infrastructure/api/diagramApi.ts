// infrastructure/api/diagramApi.ts
import { DiagramRepository } from "../../core/diagrams/ports/DiagramRepository";
import { Diagram } from "../../core/diagrams/entities/Diagram";
import { axiosClient } from "./axiosClient";
import { handleAxiosError } from "./handleAxiosError";

const DIAGRAMS_ENDPOINT = "/diagrams";

export class DiagramApi implements DiagramRepository {
    async createDiagram(name: string, anfitrionId: string): Promise<Diagram> {
        try {
            const response = await axiosClient.post(DIAGRAMS_ENDPOINT, {
                name,
                anfitrion: anfitrionId
            });
            return response.data;
        } catch (error) {
            throw handleAxiosError(error);
        }
    }

    async getDiagramsByUserId(userId: string): Promise<Diagram[]> {
        try {
            const response = await axiosClient.get(`${DIAGRAMS_ENDPOINT}/user/${userId}`);
            return response.data;
        } catch (error) {
            throw handleAxiosError(error);
        }
    }

    async getDiagramById(id: string): Promise<Diagram> {
        try {
            const response = await axiosClient.get(`${DIAGRAMS_ENDPOINT}/${id}`);
            return response.data;
        } catch (error) {
            throw handleAxiosError(error);
        }
    }

    async updateDiagram(id: string, data: Partial<Diagram>): Promise<Diagram> {
        try {
            const response = await axiosClient.put(`${DIAGRAMS_ENDPOINT}/${id}`, data);
            return response.data;
        } catch (error) {
            throw handleAxiosError(error);
        }
    }

    async deleteDiagram(id: string, userId: string): Promise<void> {
        try {
            await axiosClient.delete(`${DIAGRAMS_ENDPOINT}/${id}/${userId}`);
        } catch (error) {
            throw handleAxiosError(error);
        }
    }
}