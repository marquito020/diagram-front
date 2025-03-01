import React from 'react';
import { DiagramData } from '../../types/diagramTypes';
import { ModalConstants, ModalTitles, ModalDescriptions, ModalIcons, ModalButtons } from '../../../../app/constants/modals';
import Modal from '../../../../app/components/Modal';

interface DeleteModalProps {
    isOpen: boolean;
    diagram: DiagramData | null;
    onClose: () => void;
    onConfirm: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
    isOpen,
    diagram,
    onClose,
    onConfirm
}) => {
    const title = ModalTitles[ModalConstants.DELETE_DIAGRAM];
    const description = ModalDescriptions[ModalConstants.DELETE_DIAGRAM];
    const icon = ModalIcons[ModalConstants.DELETE_DIAGRAM];
    const button = ModalButtons[ModalConstants.DELETE_DIAGRAM];
    const description2 = ModalDescriptions[ModalConstants.DELETE_DIAGRAM_2];

    if (!isOpen || !diagram) return null;

    const modalIcon = (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icon === 'trash' && (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            )}
        </svg>
    );

    // Crear el footer con los botones
    const modalFooter = (
        <>
            <button
                type="button"
                onClick={onConfirm}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
                {button}
            </button>
            <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
                Cancelar
            </button>
        </>
    );

    const fullDescription = `${description} "${diagram.name}" ${description2}`;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            description={fullDescription}
            icon={modalIcon}
            footer={modalFooter}
            maxWidth="sm"
            variant="danger"
            padding="compact"
        />
    );
};
