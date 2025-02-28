import { useCallback, useState } from "react";
import { useDiagramFetch } from "../../hooks/useDiagramFetch";
import { Toast } from "../../../../app/components/Toast";
import { DiagramCard } from './DiagramCard';
import { DeleteModal } from './DeleteModal';
import { useDeleteDiagram } from '../../hooks/useDeleteDiagram';
import { motion } from "framer-motion";
import { DiagramMessages, DiagramToastTypes, INITIAL_TOAST_STATE, ToastState } from "../../../../app/constants/diagramMessages";
import DiagramsHeader from "./DiagramsHeader";
import { LoadingState, ErrorState, EmptyState } from "./DiagramStates";

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
