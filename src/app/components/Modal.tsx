import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Componente Modal reutilizable
 * 
 * @param isOpen - Controla si el modal está abierto o cerrado
 * @param onClose - Función para cerrar el modal
 * @param title - Título opcional del modal
 * @param description - Descripción opcional del modal
 * @param icon - Icono opcional para mostrar junto al título
 * @param children - Contenido del modal
 * @param footer - Pie opcional del modal (botones de acción)
 * @param maxWidth - Ancho máximo del modal (sm, md, lg, xl)
 */
const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    description,
    icon,
    children,
    footer,
    maxWidth = 'lg'
}) => {
    if (!isOpen) return null;

    const maxWidthClasses = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl'
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Overlay de fondo oscuro */}
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div
                        className="absolute inset-0 bg-gray-500 opacity-75"
                        onClick={onClose}
                    ></div>
                </div>

                {/* Centrado vertical */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                {/* Modal */}
                <div className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${maxWidthClasses[maxWidth]} sm:w-full`}>
                    {/* Cabecera */}
                    {title && (
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                {icon && (
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 sm:mx-0 sm:h-10 sm:w-10">
                                        {icon}
                                    </div>
                                )}
                                <div className={`${icon ? 'mt-3 sm:mt-0 sm:ml-4' : ''} text-center sm:text-left flex-grow`}>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            {title}
                                        </h3>
                                        <button
                                            onClick={onClose}
                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                            type="button"
                                        >
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    {description && (
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                {description}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Contenido */}
                    <div className={`bg-white ${title ? 'px-4 pt-2 pb-4 sm:p-6 sm:pt-2 sm:pb-4' : 'px-4 pt-5 pb-4 sm:p-6 sm:pb-4'}`}>
                        {children}
                    </div>

                    {/* Pie */}
                    {footer && (
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal; 