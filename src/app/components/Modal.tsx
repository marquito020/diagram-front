import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    footer?: React.ReactNode;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'default' | 'danger' | 'warning' | 'success';
    hideCloseButton?: boolean;
    padding?: 'normal' | 'compact' | 'none';
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
 * @param variant - Variante de estilo del modal (default, danger, warning, success)
 * @param hideCloseButton - Oculta el botón de cierre en la esquina superior derecha
 * @param padding - Control del padding interno (normal, compact, none)
 */
const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    description,
    icon,
    children,
    footer,
    maxWidth = 'lg',
    variant = 'default',
    hideCloseButton = false,
    padding = 'normal'
}) => {
    if (!isOpen) return null;

    const maxWidthClasses = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl'
    };

    const variantClasses = {
        default: {
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
            primaryButton: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
            secondaryButton: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-purple-500'
        },
        danger: {
            iconBg: 'bg-red-100',
            iconColor: 'text-red-600',
            primaryButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
            secondaryButton: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-red-500'
        },
        warning: {
            iconBg: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
            primaryButton: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
            secondaryButton: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-yellow-500'
        },
        success: {
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600',
            primaryButton: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
            secondaryButton: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-green-500'
        }
    };

    const paddingClasses = {
        normal: {
            header: 'px-4 pt-5 pb-4 sm:p-6 sm:pb-4',
            content: 'px-4 pt-2 pb-4 sm:p-6 sm:pt-2 sm:pb-4',
            footer: 'px-4 py-3 sm:px-6'
        },
        compact: {
            header: 'px-4 pt-4 pb-2 sm:p-4 sm:pb-2',
            content: 'px-4 py-2 sm:p-4 sm:py-2',
            footer: 'px-4 py-2 sm:px-4 sm:py-2'
        },
        none: {
            header: 'p-0',
            content: 'p-0',
            footer: 'p-0'
        }
    };

    // Aplicar la clase de color al icono
    const iconWithColor = icon && React.isValidElement(icon)
        ? React.cloneElement(icon as React.ReactElement, {
            className: `${(icon as React.ReactElement).props.className || ''} ${variantClasses[variant].iconColor}`.trim()
        })
        : icon;

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
                        <div className={`bg-white ${paddingClasses[padding].header}`}>
                            <div className="sm:flex sm:items-start">
                                {icon && (
                                    <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${variantClasses[variant].iconBg} sm:mx-0 sm:h-10 sm:w-10`}>
                                        {iconWithColor}
                                    </div>
                                )}
                                <div className={`${icon ? 'mt-3 sm:mt-0 sm:ml-4' : ''} text-center sm:text-left flex-grow`}>
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            {title}
                                        </h3>
                                        {!hideCloseButton && (
                                            <button
                                                onClick={onClose}
                                                className="text-gray-400 hover:text-gray-600 transition-colors"
                                                type="button"
                                            >
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
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
                    {children && (
                        <div className={`bg-white ${paddingClasses[padding].content}`}>
                            {children}
                        </div>
                    )}

                    {/* Pie */}
                    {footer && (
                        <div className={`bg-gray-50 ${paddingClasses[padding].footer} sm:flex sm:flex-row-reverse`}>
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal; 