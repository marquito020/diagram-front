import { useCallback, useState } from "react";
import { useDiagramFetch } from "../../hooks/useDiagramFetch";
import { Toast } from "../../../../app/components/Toast";
import { DiagramCard } from './DiagramCard';
import { DeleteModal } from './DeleteModal';
import { EditModal } from "../edit/EditModal";
import { useDeleteDiagram } from '../../hooks/useDeleteDiagram';
import { motion } from "framer-motion";
import { DiagramMessages, DiagramToastTypes, INITIAL_TOAST_STATE, ToastState } from "../../../../app/constants/diagramMessages";
import DiagramsHeader from "./DiagramsHeader";
import { LoadingState, ErrorState, EmptyState } from "./DiagramStates";
import { useUpdateDiagram } from "../../hooks/useUpdateDiagram";
/**
 * Componente principal que muestra la lista de diagramas
 * Utiliza varios hooks personalizados para gestionar los diagramas y su eliminación
 */
const ListDiagrams = () => {
    const { diagrams, loading, error, refreshDiagrams } = useDiagramFetch();
    const [toast, setToast] = useState<ToastState>(INITIAL_TOAST_STATE);

    // Función para cerrar el toast
    const closeToast = useCallback(() => {
        setToast(prev => ({ ...prev, show: false }));
    }, []);

    // Funciones para manejar el éxito y error en la eliminación
    const handleDeleteSuccess = useCallback(() => {
        setToast({
            show: true,
            message: DiagramMessages.DELETE_SUCCESS,
            type: DiagramToastTypes.DELETE.SUCCESS
        });
        refreshDiagrams();
    }, [refreshDiagrams]);

    const handleDeleteError = useCallback(() => {
        setToast({
            show: true,
            message: DiagramMessages.DELETE_ERROR,
            type: DiagramToastTypes.DELETE.ERROR
        });
    }, []);

    // Hook para manejar la eliminación de diagramas
    const { handleDelete, deleteModal, closeDeleteModal } = useDeleteDiagram({
        onSuccess: handleDeleteSuccess,
        onError: handleDeleteError
    });

    // Funciones para manejar el éxito y error en la actualización de diagramas
    const handleUpdateSuccess = useCallback(() => {
        setToast({
            show: true,
            message: DiagramMessages.UPDATE_SUCCESS,
            type: DiagramToastTypes.UPDATE.SUCCESS
        });
        refreshDiagrams();
    }, [refreshDiagrams]);

    const handleUpdateError = useCallback(() => {
        setToast({
            show: true,
            message: DiagramMessages.UPDATE_ERROR,
            type: DiagramToastTypes.UPDATE.ERROR
        });
    }, []);

    // Hook para manejar la actualización de diagramas
    const { handleUpdate, updateModal, closeUpdateModal } = useUpdateDiagram({
        onSuccess: handleUpdateSuccess,
        onError: handleUpdateError
    });

    // Renderizar la lista de diagramas
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
                    onUpdate={handleUpdate}
                />
            ))}
        </motion.div>
    ), [diagrams, handleDelete, handleUpdate]);

    // Renderizar el toast
    const renderToast = useCallback(() => (
        toast.show ? (
            <Toast
                message={toast.message}
                type={toast.type}
                onClose={closeToast}
            />
        ) : null
    ), [toast, closeToast]);

    // Renderizar el modal de eliminación
    const renderDeleteModal = useCallback(() => (
        <DeleteModal
            isOpen={deleteModal.isOpen}
            diagram={deleteModal.diagram}
            onClose={closeDeleteModal}
            onConfirm={deleteModal.handleConfirm}
        />
    ), [deleteModal, closeDeleteModal]);

    // Renderizar el modal de actualización solo si está abierto
    const renderUpdateModal = useCallback(() => (
        <EditModal
            isOpen={updateModal.isOpen}
            diagram={updateModal.diagram}
            onClose={closeUpdateModal}
            onUpdate={updateModal.handleConfirm}
        />
    ), [updateModal, closeUpdateModal]);

    // Renderizar según el estado
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
                {renderUpdateModal()}
            </>
        );
    }

    return (
        <>
            <DiagramsHeader count={diagrams.length} onRefresh={refreshDiagrams} />
            {renderDiagramList()}
            {renderDeleteModal()}
            {renderUpdateModal()}
            {renderToast()}
        </>
    );
};

export default ListDiagrams;
