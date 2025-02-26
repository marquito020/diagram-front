import React, { useCallback, useState } from "react";
import { useDiagramFetch } from "../../hooks/useDiagramFetch";
import { DiagramData } from "../../types/diagramTypes";
import { Toast } from "../../../../app/components/Toast";
import Loading from "../../../../app/components/Loading";
import { DiagramCard } from './DiagramCard';
import { DeleteModal } from './DeleteModal';
import { useDeleteDiagram } from '../../hooks/useDeleteDiagram';
import { motion } from "framer-motion";
import { DiagramMessages, DiagramToastTypes, INITIAL_TOAST_STATE, ToastState } from "../../../../app/constants/diagramMessages";

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
const EmptyState: React.FC<{ onRefresh: () => void; renderToast: () => React.ReactNode }> = ({ onRefresh, renderToast }) => (
    <>
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
        {renderToast()}
    </>
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
const ListDiagrams = () => {
    const { diagrams, loading, error, refreshDiagrams } = useDiagramFetch();
    const [toast, setToast] = useState<ToastState>(INITIAL_TOAST_STATE);

    const closeToast = useCallback(() => {
        setToast(prev => ({ ...prev, show: false }));
    }, []);

    const handleSuccess = useCallback(() => {
        setToast({
            show: true,
            message: DiagramMessages.DELETE_SUCCESS,
            type: DiagramToastTypes.DELETE.SUCCESS
        });
        refreshDiagrams();
    }, [refreshDiagrams]);

    const handleError = useCallback(() => {
        setToast({
            show: true,
            message: DiagramMessages.DELETE_ERROR,
            type: DiagramToastTypes.DELETE.ERROR
        });
    }, []);

    const { handleDelete, deleteModal, closeDeleteModal } = useDeleteDiagram({
        onSuccess: handleSuccess,
        onError: handleError
    });

    const renderDiagramList = useCallback(() => (
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
    ), [diagrams, handleDelete]);

    const renderToast = useCallback(() => (
        toast.show ? (
            <Toast
                message={toast.message}
                type={toast.type}
                onClose={closeToast}
            />
        ) : null
    ), [toast, closeToast]);

    const renderDeleteModal = useCallback(() => (
        <DeleteModal
            isOpen={deleteModal.isOpen}
            diagram={deleteModal.diagram}
            onClose={closeDeleteModal}
            onConfirm={deleteModal.handleConfirm}
        />
    ), [deleteModal, closeDeleteModal]);

    if (loading) {
        return (
            <>
                <LoadingState />
                {renderToast()}
            </>
        );
    }

    if (error) {
        return (
            <>
                <ErrorState error={error} onRetry={refreshDiagrams} />
                {renderToast()}
            </>
        );
    }

    if (!diagrams?.length) {
        return (
            <>
                <EmptyState onRefresh={refreshDiagrams} renderToast={renderToast} />
                {renderDeleteModal()}
            </>
        );
    }

    return (
        <>
            <DiagramsHeader count={diagrams.length} onRefresh={refreshDiagrams} />
            {renderDiagramList()}
            {renderDeleteModal()}
            {renderToast()}
        </>
    );
};

export default ListDiagrams;
