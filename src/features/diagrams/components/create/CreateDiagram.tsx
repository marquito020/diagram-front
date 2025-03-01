// src/features/diagrams/components/create/CreateDiagram.tsx
import { useForm, SubmitHandler } from "react-hook-form";
import { useDiagramFetch } from "../../hooks/useDiagramFetch";
import { useState, useEffect } from 'react';
import { CreateDiagramFormData } from "../../types/diagramTypes";
import { Toast } from "../../../../app/components/Toast";
import Loading from "../../../../app/components/Loading";
import Modal from "../../../../app/components/Modal";
import { DiagramMessages, DiagramToastTypes, INITIAL_TOAST_STATE, ToastState } from "../../../../app/constants/diagramMessages";
import { ModalConstants, ModalTitles, ModalDescriptions, ModalIcons, ModalButtons, ModalPlaceholders, ModalLabels, ModalRequired, ModalMinLengthMessage, ModalMinLength } from '../../../../app/constants/modals';

export default function CreateDiagram() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateDiagramFormData>();
    const { createDiagram, loading } = useDiagramFetch();
    const [isModalOpen, setModalOpen] = useState(false);
    const [toast, setToast] = useState<ToastState>(INITIAL_TOAST_STATE);

    const title = ModalTitles[ModalConstants.CREATE_DIAGRAM];
    const description = ModalDescriptions[ModalConstants.CREATE_DIAGRAM];
    const button = ModalButtons[ModalConstants.CREATE_DIAGRAM];
    const icon = ModalIcons[ModalConstants.CREATE_DIAGRAM];
    const placeholder = ModalPlaceholders[ModalConstants.CREATE_DIAGRAM];
    const label = ModalLabels[ModalConstants.CREATE_DIAGRAM];
    const required = ModalRequired[ModalConstants.CREATE_DIAGRAM];
    const minLength = ModalMinLength[ModalConstants.CREATE_DIAGRAM];
    const minLengthMessage = ModalMinLengthMessage[ModalConstants.CREATE_DIAGRAM];


    const onSubmit: SubmitHandler<CreateDiagramFormData> = async (data) => {
        try {
            await createDiagram(data.name);
            setModalOpen(false);
            reset();
            setToast({
                show: true,
                message: DiagramMessages.CREATE_SUCCESS,
                type: DiagramToastTypes.CREATE.SUCCESS
            });
        } catch (error) {
            console.error("Error creating diagram:", error);
            setToast({
                show: true,
                message: DiagramMessages.CREATE_ERROR,
                type: DiagramToastTypes.CREATE.ERROR
            });
        }
    };

    const closeToast = () => {
        setToast(prev => ({ ...prev, show: false }));
    };

    const closeModal = () => {
        setModalOpen(false);
        reset();
    };

    // Limpiar el toast cuando se desmonte el componente
    useEffect(() => {
        return () => {
            setToast(INITIAL_TOAST_STATE);
        };
    }, []);

    // Icono para el modal
    const modalIcon = (
        <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icon === 'plus' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            )}
        </svg>
    );

    // Botones para el footer del modal
    const modalFooter = (
        <>
            <button
                type="submit"
                form="create-diagram-form"
                disabled={loading}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
                {loading ? <Loading /> : button}
            </button>
            <button
                type="button"
                onClick={closeModal}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
                Cancelar
            </button>
        </>
    );

    return (
        <>
            <button
                onClick={() => setModalOpen(true)}
                className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-lg shadow-2xl bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 active:from-purple-700 active:to-blue-600 focus:ring-4 focus:ring-purple-200 transition-all duration-300"
            >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative flex items-center gap-2">
                    {button}
                </span>
            </button>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={title}
                description={description}
                icon={modalIcon}
                footer={modalFooter}
            >
                <form id="create-diagram-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder={placeholder}
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                        )}
                    </div>
                </form>
            </Modal>

            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={closeToast}
                />
            )}
        </>
    );
}
