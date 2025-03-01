import React, { useState, useEffect, useCallback } from 'react';
import { DiagramData } from '../../types/diagramTypes';
import Modal from '../../../../app/components/Modal';
import { useForm, SubmitHandler } from "react-hook-form";
import DiagramNameInput from './DiagramNameInput';
import EmailInput from './EmailInput';
import EmailList from './EmailList';
import ParticipantsList from './ParticipantsList';
import ModalFooter from './ModalFooter';
import ModalIcon from './ModalIcon';
import { useEmailList, useParticipants, useModalConstants } from './hooks';

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
    const { register, handleSubmit, formState: { errors }, reset } = useForm<EditDiagramFormData>({
        defaultValues: { name: '' }
    });

    // Estado para el envío del formulario
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Estado para manejar errores
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Hooks personalizados
    const constants = useModalConstants();
    const {
        emailInput,
        emailList,
        error,
        handleAddEmail,
        handleRemoveEmail,
        handleEmailInputChange,
        handleKeyPress,
        resetEmailList
    } = useEmailList(diagram?.sharedUsers);

    const { isRemovingParticipant, handleRemoveParticipant } = useParticipants(
        onRemoveParticipant,
        setErrorMessage
    );

    // Memoizar la función resetForm para evitar recreaciones en cada render
    const resetForm = useCallback(() => {
        if (diagram) {
            reset({ name: diagram.name });
            resetEmailList();
        }
    }, [diagram, reset, resetEmailList]);

    // Inicializar el formulario cuando cambia el diagrama o cuando se abre el modal
    useEffect(() => {
        if (isOpen && diagram) {
            resetForm();
        }
    }, [isOpen, diagram, resetForm]);

    if (!isOpen || !diagram) return null;

    // Manejar el envío del formulario
    const onSubmitForm: SubmitHandler<EditDiagramFormData> = (data) => {
        setIsSubmitting(true);
        try {
            onUpdate(data.name, emailList);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Manejar el cierre del modal
    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={constants.title}
            description={constants.description}
            icon={<ModalIcon iconType={constants.icon} />}
            footer={
                <ModalFooter
                    onClose={handleClose}
                    isSubmitting={isSubmitting}
                    buttonText={constants.button}
                />
            }
            variant="default"
            padding="normal"
        >
            <form id="edit-diagram-form" onSubmit={handleSubmit(onSubmitForm)}>
                <div className="space-y-6">
                    {/* Nombre del diagrama */}
                    <DiagramNameInput
                        register={register}
                        errors={errors}
                        label={constants.label}
                        placeholder={constants.placeholder}
                        required={constants.required}
                        minLength={constants.minLength}
                        minLengthMessage={constants.minLengthMessage}
                    />

                    {/* Añadir nuevos participantes */}
                    <EmailInput
                        value={emailInput}
                        onChange={handleEmailInputChange}
                        onKeyPress={handleKeyPress}
                        onAdd={handleAddEmail}
                        placeholder={constants.addParticipantPlaceholder}
                        buttonText={constants.addParticipantButton}
                        error={error || errorMessage}
                        title={constants.addParticipantTitle}
                        description={constants.addParticipantDescription}
                    />

                    {/* Lista de emails por añadir */}
                    <EmailList
                        emails={emailList}
                        onRemove={handleRemoveEmail}
                        label={constants.addParticipantLabel}
                    />

                    {/* Participantes actuales */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">
                            {constants.sharedParticipantsLabel}
                        </h3>
                        <ParticipantsList
                            participants={diagram.sharedUsers || []}
                            onRemoveParticipant={handleRemoveParticipant}
                            isRemovingParticipant={isRemovingParticipant}
                            emptyMessage={constants.sharedParticipantsDescription}
                        />
                    </div>
                </div>
            </form>
        </Modal>
    );
};
