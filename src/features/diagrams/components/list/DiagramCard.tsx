import React from 'react';
import { DiagramData, DiagramUser } from "../../types/diagramTypes";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { motion } from "framer-motion";
import DiagramParticipants from './DiagramParticipants';
import { Link } from 'react-router-dom';

interface DiagramCardProps {
    diagram: DiagramData;
    onDelete: (diagram: DiagramData) => void;
    onUpdate: (updatedDiagram: DiagramData) => void;
}

export const DiagramCard: React.FC<DiagramCardProps> = ({ diagram, onDelete, onUpdate }) => {
    // Obtener el creador y los usuarios compartidos por separado
    const creator = diagram.user;
    const sharedUsers = diagram.sharedUsers || [];

    // Función para mostrar el nombre del usuario
    const getUserName = (user: DiagramUser) => {
        return `${user.firstName} ${user.lastName}`;
    };

    // Manejador para el botón de eliminar
    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onDelete(diagram);
    };

    // Manejador para el botón de editar
    const handleEditClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onUpdate(diagram);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative"
        >
            {/* Botones de acción fuera del Link */}
            <div className="absolute top-4 right-4 flex space-x-2 z-10">
                <button
                    onClick={handleEditClick}
                    className="text-gray-400 hover:text-blue-500 transition-colors bg-white rounded-full p-1 shadow-sm"
                    aria-label="Editar diagrama"
                    type="button"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
                <button
                    onClick={handleDeleteClick}
                    className="text-gray-400 hover:text-red-500 transition-colors bg-white rounded-full p-1 shadow-sm"
                    aria-label="Eliminar diagrama"
                    type="button"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>

            {/* Contenido del diagrama como Link */}
            <Link to={`/diagrams/${diagram._id}`} className="block p-6">
                <div className="mb-4 pr-16"> {/* Espacio para los botones */}
                    <h3 className="text-lg font-semibold text-gray-900 truncate hover:text-blue-600 transition-colors">
                        {diagram.name}
                    </h3>
                </div>

                {/* Información del creador */}
                <div className="mb-3">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-medium border-2 border-white">
                            {creator.firstName[0]}{creator.lastName[0]}
                        </div>
                        <div className="ml-2">
                            <p className="text-sm font-medium text-gray-900">
                                {getUserName(creator)}
                            </p>
                            <p className="text-xs text-gray-500">Creador</p>
                        </div>
                    </div>
                </div>

                {/* Usuarios compartidos (si existen) */}
                {sharedUsers.length > 0 && (
                    <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-1">Compartido con:</p>
                        <DiagramParticipants participants={sharedUsers} maxDisplay={3} />
                    </div>
                )}

                <div className="flex justify-between items-center text-sm text-gray-500 mt-4 pt-3 border-t border-gray-100">
                    <span>
                        Creado: {format(new Date(diagram.createdAt), "d 'de' MMMM, yyyy", { locale: es })}
                    </span>
                    <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {format(new Date(diagram.updatedAt), "d MMM", { locale: es })}
                    </span>
                </div>
            </Link>
        </motion.div>
    );
};
