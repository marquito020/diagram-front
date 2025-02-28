import { useState, useCallback } from 'react';
import { DiagramData } from '../types/diagramTypes';
import { useDiagramFetch } from './useDiagramFetch';
// import { updateDiagram } from '../../../app/store/slices/diagramSlice';

/**
 * Hook para actualizar un diagrama
 *
 * @param {UseUpdateDiagramProps} props - Propiedades del hook
 * @param {Function} props.onSuccess - Función a ejecutar en caso de éxito
 * @param {Function} props.onError - Función a ejecutar en caso de error
 */

interface UseUpdateDiagramProps {
    onSuccess: () => void;
    onError: () => void;
}

export const useUpdateDiagram = ({ onSuccess, onError }: UseUpdateDiagramProps) => {
    const { updateDiagramName } = useDiagramFetch();

    const [updateModal, setUpdateModal] = useState<{
        isOpen: boolean;
        diagram: DiagramData | null;
        handleConfirm: (newName: string) => void;
    }>({
        isOpen: false,
        diagram: null,
        handleConfirm: () => { }
    });

    const closeUpdateModal = useCallback(() => {
        setUpdateModal(prev => ({
            ...prev,
            isOpen: false
        }));
    }, []);

    const handleUpdate = useCallback((diagram: DiagramData) => {
        setUpdateModal({
            isOpen: true,
            diagram,
            handleConfirm: async (newName: string) => {
                try {
                    await updateDiagramName(diagram._id, newName);
                    closeUpdateModal();
                    onSuccess();
                } catch (error) {
                    onError();
                }
            }
        });
    }, [updateDiagramName, onSuccess, onError, closeUpdateModal]);

    return { handleUpdate, updateModal, closeUpdateModal };
};
