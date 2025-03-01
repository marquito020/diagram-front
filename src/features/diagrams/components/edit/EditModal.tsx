import React, { useState, useEffect } from 'react';
import { DiagramData } from '../../types/diagramTypes';
import Modal from '../../../../app/components/Modal';
import { ModalConstants, ModalTitles, ModalDescriptions, ModalIcons, ModalButtons, ModalPlaceholders, ModalLabels, ModalAddParticipantLabels, ModalSharedParticipantsDescription, ModalRequired, ModalMinLength, ModalMinLengthMessage } from '../../../../app/constants/modals';
import { useForm, SubmitHandler } from "react-hook-form";

interface EditModalProps {
    isOpen: boolean;
    diagram: DiagramData | null;
    onClose: () => void;
    onUpdate: (newName: string, participantEmail: string[]) => void;
    onRemoveParticipant: (userId: string) => Promise<void>;
}

interface EditDiagramFormData {
    name: string;
}

export const EditModal: React.FC<EditModalProps> = ({
    isOpen,
    diagram,
    onClose,
    onUpdate,
    onRemoveParticipant
}) => {
    // React Hook Form para manejar el formulario
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<EditDiagramFormData>();

    const [emailInput, setEmailInput] = useState('');
    const [emailList, setEmailList] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRemovingParticipant, setIsRemovingParticipant] = useState(false);

    const title = ModalTitles[ModalConstants.EDIT_DIAGRAM];
    const description = ModalDescriptions[ModalConstants.EDIT_DIAGRAM];
    const label = ModalLabels[ModalConstants.EDIT_DIAGRAM];
    const button = ModalButtons[ModalConstants.EDIT_DIAGRAM];
    const icon = ModalIcons[ModalConstants.EDIT_DIAGRAM];
    const addParticipantButton = ModalButtons[ModalConstants.ADD_PARTICIPANT];
    const addParticipantTitle = ModalTitles[ModalConstants.ADD_PARTICIPANT];
    const addParticipantDescription = ModalDescriptions[ModalConstants.ADD_PARTICIPANT];
    const addParticipantPlaceholder = ModalPlaceholders[ModalConstants.ADD_PARTICIPANT];
    const placeholder = ModalPlaceholders[ModalConstants.EDIT_DIAGRAM];
    const addParticipantLabel = ModalAddParticipantLabels[ModalConstants.ADD_PARTICIPANT];
    const sharedParticipantsLabel = ModalAddParticipantLabels[ModalConstants.EDIT_DIAGRAM];
    const sharedParticipantsDescription = ModalSharedParticipantsDescription[ModalConstants.EDIT_DIAGRAM];
    const required = ModalRequired[ModalConstants.EDIT_DIAGRAM];
    const minLength = ModalMinLength[ModalConstants.EDIT_DIAGRAM];
    const minLengthMessage = ModalMinLengthMessage[ModalConstants.EDIT_DIAGRAM];

    // Inicializar el formulario cuando cambia el diagrama
    useEffect(() => {
        if (diagram) {
            setValue('name', diagram.name);
            setEmailList([]);
            setEmailInput('');
            setError(null);
        }
    }, [diagram, setValue]);

    // Renderizar el icono basado en la constante
    const modalIcon = (
        <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icon === 'pencil-alt' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            )}
        </svg>
    );

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

    const onSubmitForm: SubmitHandler<EditDiagramFormData> = (data) => {
        setIsSubmitting(true);
        try {
            onUpdate(data.name, emailList);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    const modalFooter = (
        <div className="flex justify-end space-x-3">
            <button
                type="button"
                onClick={handleClose}
                className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:text-sm"
            >
                Cancelar
            </button>
            <button
                type="submit"
                form="edit-diagram-form"
                disabled={isSubmitting}
                className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm disabled:bg-blue-400"
            >
                {isSubmitting ? 'Guardando...' : button}
            </button>
        </div>
    );

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddEmail();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={title}
            description={description}
            icon={modalIcon}
            footer={modalFooter}
        >
            <form id="edit-diagram-form" onSubmit={handleSubmit(onSubmitForm)}>
                <div className="space-y-6">
                    {/* Nombre del diagrama */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            {label}
                        </label>
                        <input
                            {...register("name", {
                                required: required,
                                minLength: {
                                    value: minLength,
                                    message: minLengthMessage
                                }
                            })}
                            id="name"
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={placeholder}
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Añadir nuevos participantes */}
                    <div>
                        <label htmlFor="participant-email" className="block text-sm font-medium text-gray-700 mb-1">
                            {addParticipantTitle}
                        </label>
                        <p className="text-sm text-gray-500 mb-2">
                            {addParticipantDescription}
                        </p>
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
                                placeholder={addParticipantPlaceholder}
                            />
                            <button
                                type="button"
                                onClick={handleAddEmail}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                {addParticipantButton}
                            </button>
                        </div>
                        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

                        {/* Lista de emails por añadir */}
                        {emailList.length > 0 && (
                            <div className="mt-3">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">
                                    {addParticipantLabel}
                                </h4>
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
                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                            {sharedParticipantsLabel}
                        </h3>
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
                                <p className="text-sm text-gray-500">
                                    {sharedParticipantsDescription}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </Modal>
    );
};
