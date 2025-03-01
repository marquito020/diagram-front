import React from 'react';

interface ModalFooterProps {
    onClose: () => void;
    isSubmitting: boolean;
    buttonText: string;
}

const ModalFooter: React.FC<ModalFooterProps> = ({
    onClose,
    isSubmitting,
    buttonText
}) => {
    return (
        <div className="flex justify-end space-x-3">
            <button
                type="button"
                onClick={onClose}
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
                {isSubmitting ? 'Guardando...' : buttonText}
            </button>
        </div>
    );
};

export default ModalFooter;
