import React, { useState, useEffect } from 'react';
import { DiagramData } from '../../types/diagramTypes';
import Modal from '../../../../app/components/Modal';

interface EditModalProps {
    isOpen: boolean;
    diagram: DiagramData | null;
    onClose: () => void;
    onUpdate: (newName: string, participantEmail: string[]) => void;
    onRemoveParticipant: (userId: string) => Promise<void>;
}

export const EditModal: React.FC<EditModalProps> = ({
    isOpen,
    diagram,
    onClose,
    onUpdate,
    onRemoveParticipant
}) => {
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [emailInput, setEmailInput] = useState('');
    const [emailList, setEmailList] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRemovingParticipant, setIsRemovingParticipant] = useState(false);

    useEffect(() => {
        if (diagram) {
            setName(diagram.name);
            setEmailList([]);
            setEmailInput('');
            setError(null);
        }
    }, [diagram]);

    if (!isOpen || !diagram) return null;

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleAddEmail = () => {
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

        if (diagram.sharedUsers?.some(user => user.email === emailInput)) {
            setError('Este usuario ya es participante del diagrama');
            return;
        }

        setEmailList(prev => [...prev, emailInput]);
        setEmailInput('');
        setError(null);
    };

    const handleRemoveEmail = (emailToRemove: string) => {
        setEmailList(prev => prev.filter(email => email !== emailToRemove));
    };

    const handleRemoveParticipant = async (userId: string) => {
        console.log('handleRemoveParticipant', userId);
        if (!diagram) return;
        
        setIsRemovingParticipant(true);
        try {
            await onRemoveParticipant(userId);
        } catch (err) {
            setError('Error al eliminar el participante');
        } finally {
            setIsRemovingParticipant(false);
        }
    };

    const handleSubmit = () => {
        if (!name.trim()) {
            setError('El nombre no puede estar vacío');
            return;
        }

        setIsSubmitting(true);
        try {
            onUpdate(name, emailList);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddEmail();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Editar Diagrama"
            footer={
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:text-sm"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm disabled:bg-blue-400"
                    >
                        {isSubmitting ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            }
        >
            <div className="space-y-6">
                {/* Nombre del diagrama */}
                <div>
                    <label htmlFor="diagram-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre del diagrama
                    </label>
                    <input
                        type="text"
                        id="diagram-name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError(null);
                        }}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nombre del diagrama"
                    />
                    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                </div>

                {/* Añadir nuevos participantes */}
                <div>
                    <label htmlFor="participant-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Añadir participantes
                    </label>
                    <div className="flex space-x-2">
                        <input
                            type="email"
                            id="participant-email"
                            value={emailInput}
                            onChange={(e) => {
                                setEmailInput(e.target.value);
                                setError(null);
                            }}
                            onKeyPress={handleKeyPress}
                            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="correo@ejemplo.com"
                        />
                        <button
                            type="button"
                            onClick={handleAddEmail}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Añadir
                        </button>
                    </div>
                    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

                    {/* Lista de emails por añadir */}
                    {emailList.length > 0 && (
                        <div className="mt-3">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Participantes por añadir:</h4>
                            <div className="space-y-2">
                                {emailList.map((email, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                        <span className="text-sm text-gray-600">{email}</span>
                                        <button
                                            onClick={() => handleRemoveEmail(email)}
                                            className="text-red-500 hover:text-red-700"
                                            type="button"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Participantes actuales */}
                <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Participantes actuales</h3>
                    <div className="bg-gray-50 rounded-md p-3">
                        {diagram.sharedUsers && diagram.sharedUsers.length > 0 ? (
                            <ul className="space-y-2">
                                {diagram.sharedUsers.map(user => (
                                    <li key={user._id} className="flex items-center justify-between bg-white p-2 rounded-md shadow-sm">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm">
                                                {user.firstName[0]}{user.lastName[0]}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveParticipant(user._id)}
                                            className="text-red-500 hover:text-red-700 disabled:text-gray-400"
                                            disabled={isRemovingParticipant}
                                            type="button"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500">No hay participantes compartidos</p>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
};