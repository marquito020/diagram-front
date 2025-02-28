import { DiagramData } from "../../types/diagramTypes";

/**
 * Componente para mostrar el encabezado de la lista de diagramas
 */
const DiagramsHeader: React.FC<{ count: number; onRefresh: () => Promise<DiagramData[]> }> = ({ count, onRefresh }) => (
    <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">
            {count} {count === 1 ? 'diagrama encontrado' : 'diagramas encontrados'}
        </h3>
        <button
            onClick={onRefresh}
            className="flex items-center text-sm text-purple-600 hover:text-purple-800 transition-colors"
            aria-label="Actualizar lista de diagramas"
        >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Actualizar
        </button>
    </div>
);

export default DiagramsHeader;