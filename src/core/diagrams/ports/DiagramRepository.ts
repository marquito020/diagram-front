import { Diagram } from "../entities/Diagram";

// core/diagrams/ports/DiagramRepository.ts
export interface DiagramRepository {
    /**
     * Crea un nuevo diagrama.
     * @param name - Nombre del diagrama.
     * @param anfitrionId - ID del usuario que crea el diagrama.
     * @returns El diagrama creado.
     */
    createDiagram(name: string, anfitrionId: string): Promise<Diagram>;

    /**
     * Elimina un diagrama existente.
     * @param id - ID del diagrama a eliminar.
     * @param userId - ID del usuario que realiza la eliminación.
     */
    deleteDiagram(id: string, userId: string): Promise<void>;

    /**
     * Obtiene todos los diagramas de un usuario.
     * @param userId - ID del usuario.
     * @returns Una lista de diagramas.
     */
    getDiagramsByUserId(userId: string): Promise<Diagram[]>;
}