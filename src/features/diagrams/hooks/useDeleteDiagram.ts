import { useState } from 'react';
import { DiagramData } from '../types/diagramTypes';
import { useDiagramFetch } from './useDiagramFetch';

interface UseDeleteDiagramProps {
    onSuccess: () => void;
    onError: () => void;
}

export const useDeleteDiagram = ({ onSuccess, onError }: UseDeleteDiagramProps) => {
    const { deleteDiagram } = useDiagramFetch();
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        diagram: DiagramData | null;
        handleConfirm: () => void;
    }>({
        isOpen: false,
        diagram: null,
        handleConfirm: () => {}
    });

    const handleDelete = (diagram: DiagramData) => {
        setDeleteModal({
            isOpen: true,
            diagram,
            handleConfirm: async () => {
                try {
                    await deleteDiagram(diagram._id);
                    closeDeleteModal();
                    // Llamar al callback de éxito proporcionado por el componente padre
                    onSuccess();
                } catch (error) {
                    console.error('Error al eliminar el diagrama:', error);
                    // Llamar al callback de error proporcionado por el componente padre
                    onError();
                }
            }
        });
    };

    const closeDeleteModal = () => {
        setDeleteModal(prev => ({
            ...prev,
            isOpen: false
        }));
    };

    return {
        handleDelete,
        deleteModal,
        closeDeleteModal
    };
};
