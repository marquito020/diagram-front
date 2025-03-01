import { useState, useCallback } from 'react';
import { DiagramUser } from '../../../types/diagramTypes';

interface UseEmailListReturn {
    emailInput: string;
    emailList: string[];
    error: string | null;
    setEmailInput: (value: string) => void;
    handleAddEmail: () => void;
    handleRemoveEmail: (email: string) => void;
    handleEmailInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    resetEmailList: () => void;
}

export const useEmailList = (existingUsers?: DiagramUser[]): UseEmailListReturn => {
    const [emailInput, setEmailInput] = useState('');
    const [emailList, setEmailList] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const validateEmail = useCallback((email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }, []);

    const handleAddEmail = useCallback(() => {
        if (!emailInput.trim()) {
            setError('Por favor, ingresa un correo electrónico');
            return;
        }

        if (!validateEmail(emailInput)) {
            setError('Por favor, ingresa un correo electrónico válido');
            return;
        }

        if (emailList.includes(emailInput)) {
            setError('Este correo electrónico ya está en la lista');
            return;
        }

        if (existingUsers?.some(user => user.email === emailInput)) {
            setError('Este usuario ya es participante del diagrama');
            return;
        }

        setEmailList(prev => [...prev, emailInput]);
        setEmailInput('');
        setError(null);
    }, [emailInput, emailList, existingUsers, validateEmail]);

    const handleRemoveEmail = useCallback((emailToRemove: string) => {
        setEmailList(prev => prev.filter(email => email !== emailToRemove));
    }, []);

    const handleEmailInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailInput(e.target.value);
        setError(null);
    }, []);

    const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddEmail();
        }
    }, [handleAddEmail]);

    const resetEmailList = useCallback(() => {
        setEmailList([]);
        setEmailInput('');
        setError(null);
    }, []);

    return {
        emailInput,
        emailList,
        error,
        setEmailInput,
        handleAddEmail,
        handleRemoveEmail,
        handleEmailInputChange,
        handleKeyPress,
        resetEmailList
    };
};
