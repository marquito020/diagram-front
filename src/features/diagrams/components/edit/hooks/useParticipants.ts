import { useState, useCallback } from 'react';

interface UseParticipantsReturn {
    isRemovingParticipant: boolean;
    handleRemoveParticipant: (userId: string) => Promise<void>;
}

export const useParticipants = (
    onRemoveParticipant: (userId: string) => Promise<void>,
    setError: (error: string | null) => void
): UseParticipantsReturn => {
    const [isRemovingParticipant, setIsRemovingParticipant] = useState(false);

    const handleRemoveParticipant = useCallback(async (userId: string) => {
        setIsRemovingParticipant(true);
        try {
            await onRemoveParticipant(userId);
        } catch (err) {
            setError('Error al eliminar el participante');
        } finally {
            setIsRemovingParticipant(false);
        }
    }, [onRemoveParticipant, setError]);

    return {
        isRemovingParticipant,
        handleRemoveParticipant
    };
};
