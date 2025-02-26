// src/core/diagrams/useCases/DeleteDiagram.ts
import { DiagramRepository } from "../ports/DiagramRepository";

export class DeleteDiagram {
    constructor(private repository: DiagramRepository) {}

    async execute(id: string, userId: string): Promise<void> {
        return this.repository.deleteDiagram(id, userId);
    }
}