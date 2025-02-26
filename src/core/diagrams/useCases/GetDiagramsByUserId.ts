// src/core/diagrams/useCases/GetDiagramsByUserId.ts
import { DiagramRepository } from "../ports/DiagramRepository";
import { Diagram } from "../entities/Diagram";

export class GetDiagramsByUserId {
    constructor(private repository: DiagramRepository) { }

    async execute(userId: string): Promise<Diagram[]> {
        return this.repository.getDiagramsByUserId(userId);
    }
}