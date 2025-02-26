import React, { useCallback } from "react";
import { useDiagramFetch } from "../../hooks/useDiagramFetch";
import { DiagramData } from "../../types/diagramTypes";
import { Toast } from "../../../../app/components/Toast";
import Loading from "../../../../app/components/Loading";
import { NotificationType } from "../../../../app/constants/notifications";
import { DiagramCard } from './DiagramCard';
import { DeleteModal } from './DeleteModal';
import { useDeleteDiagram } from '../../hooks/useDeleteDiagram';
import { motion } from "framer-motion";

/**
 * Componente para mostrar el estado de carga
 */
const LoadingState: React.FC<{ text?: string }> = ({ text = "Cargando diagramas..." }) => (
    <div className="flex justify-center items-center h-64">
        <Loading theme="light" size="md" text={text} />
    </div>
);

/**
 * Componente para mostrar el estado de error
 */
const ErrorState: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => (
    <div className="text-center p-4">
        <p className="text-red-600 mb-4">Error al cargar los diagramas: {error}</p>
        <button
            onClick={onRetry}
            className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
        >
            Reintentar
        </button>
    </div>
);

/**
 * Componente para mostrar el estado vacío
 */
const EmptyState: React.FC<{ onRefresh: () => void }> = ({ onRefresh }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200"
    >
        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay diagramas</h3>
        <p className="text-gray-600 mb-4">Crea tu primer diagrama para comenzar</p>
        <button
            onClick={onRefresh}
            className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
        >
            Refrescar
        </button>
    </motion.div>
);

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

/**
 * Componente principal que muestra la lista de diagramas
 * Utiliza varios hooks personalizados para gestionar los diagramas y su eliminación
 */
export default function ListDiagrams(): JSX.Element {
    // Obtener datos y funciones de los diagramas
    const { diagrams, loading, error, refreshDiagrams } = useDiagramFetch();

    // Gestionar la eliminación de diagramas
    const { handleDelete, deleteModal, closeDeleteModal } = useDeleteDiagram({
        onSuccess: () => {
            // Mostrar notificación de éxito
            const toastElement = document.getElementById('toast-container');
            if (toastElement) {
                toastElement.setAttribute('data-message', 'Diagrama eliminado exitosamente');
                toastElement.setAttribute('data-type', NotificationType.SUCCESS);
                toastElement.setAttribute('data-visible', 'true');
            }
        },
        onError: () => {
            // Mostrar notificación de error
            const toastElement = document.getElementById('toast-container');
            if (toastElement) {
                toastElement.setAttribute('data-message', 'Error al eliminar el diagrama');
                toastElement.setAttribute('data-type', NotificationType.ERROR);
                toastElement.setAttribute('data-visible', 'true');
            }
        }
    });

    // Función para renderizar la lista de diagramas
    const renderDiagramList = useCallback(() => {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {diagrams.map((diagram) => (
                    <DiagramCard
                        key={diagram._id}
                        diagram={diagram}
                        onDelete={handleDelete}
                    />
                ))}
            </motion.div>
        );
    }, [diagrams, handleDelete]);

    // Renderizado condicional según el estado
    if (loading) return <LoadingState />;
    if (error) return <ErrorState error={error} onRetry={refreshDiagrams} />;
    if (!diagrams?.length) return <EmptyState onRefresh={refreshDiagrams} />;

    return (
        <>
            <DiagramsHeader count={diagrams.length} onRefresh={refreshDiagrams} />

            {renderDiagramList()}

            <DeleteModal
                isOpen={deleteModal.isOpen}
                diagram={deleteModal.diagram}
                onClose={closeDeleteModal}
                onConfirm={deleteModal.handleConfirm}
            />

            {/* Toast container para notificaciones */}
            <div id="toast-container" className="hidden">
                <Toast
                    message=""
                    type={NotificationType.SUCCESS}
                    onClose={() => {
                        const toastElement = document.getElementById('toast-container');
                        if (toastElement) {
                            toastElement.setAttribute('data-visible', 'false');
                        }
                    }}
                />
            </div>
        </>
    );
}