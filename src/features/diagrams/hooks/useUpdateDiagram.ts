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
    const { updateDiagramName, addParticipantToDiagram, removeParticipantFromDiagram } = useDiagramFetch();

    const [updateModal, setUpdateModal] = useState<{
        isOpen: boolean;
        diagram: DiagramData | null;
        handleConfirm: (newName: string, participantEmail: string[]) => void;
        handleRemoveParticipant: (userId: string) => Promise<void>;
    }>({
        isOpen: false,
        diagram: null,
        handleConfirm: () => { },
        handleRemoveParticipant: () => Promise.resolve()
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
            handleConfirm: async (newName: string, participantEmail: string[]) => {
                try {
                    await updateDiagramName(diagram._id, newName);
                    await addParticipantToDiagram(diagram._id, participantEmail);
                    closeUpdateModal();
                    onSuccess();
                } catch (error) {
                    onError();
                }
                },
            handleRemoveParticipant: async (userId: string) => {
                try {
                    await removeParticipantFromDiagram(diagram._id, userId);
                    closeUpdateModal();
                    onSuccess();
                } catch (error) {
                    onError();
                }
            }
        });
    }, [updateDiagramName, addParticipantToDiagram, onSuccess, onError, closeUpdateModal]);

    return { handleUpdate, updateModal, closeUpdateModal };
};
