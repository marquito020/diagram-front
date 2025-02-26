import { useState, useCallback } from 'react';
import { useDiagramFetch } from '../hooks/useDiagramFetch';
import { DiagramData } from '../types/diagramTypes';

interface UseDeleteDiagramOptions {
    onSuccess: () => void;
    onError: () => void;
}

export const useDeleteDiagram = ({ onSuccess, onError }: UseDeleteDiagramOptions) => {
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        diagram: DiagramData | null;
    }>({
        isOpen: false,
        diagram: null
    });
    const { deleteDiagram } = useDiagramFetch();

    const handleDelete = useCallback((diagram: DiagramData) => {
        setDeleteModal({ isOpen: true, diagram });
    }, []);

    const handleConfirm = async () => {
        if (!deleteModal.diagram) return;

        try {
            await deleteDiagram(deleteModal.diagram._id);
            onSuccess();
        } catch (error) {
            onError();
        } finally {
            closeDeleteModal();
        }
    };

    const closeDeleteModal = () => {
        setDeleteModal({ isOpen: false, diagram: null });
    };

    return {
        deleteModal: {
            ...deleteModal,
            handleConfirm
        },
        handleDelete,
        closeDeleteModal
    };
}; 