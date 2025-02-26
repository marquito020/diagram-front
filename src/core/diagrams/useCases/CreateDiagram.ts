import { DiagramRepository } from '../ports/DiagramRepository';
import { Diagram } from '../entities/Diagram';

export class CreateDiagram {
    constructor(private diagramRepository: DiagramRepository) {}

    async execute(name: string, anfitrionId: string): Promise<Diagram> {
        return this.diagramRepository.createDiagram(name, anfitrionId);
    }
}