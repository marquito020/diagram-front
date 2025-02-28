import React, { useState, useEffect } from 'react';
import { DiagramData } from '../../types/diagramTypes';
import Modal from '../../../../app/components/Modal';

interface EditModalProps {
    isOpen: boolean;
    diagram: DiagramData | null;
    onClose: () => void;
    onUpdate: (newName: string) => void;
}

export const EditModal: React.FC<EditModalProps> = ({
    isOpen,
    diagram,
    onClose,
    onUpdate
}) => {
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (diagram) {
            setName(diagram.name);
        }
    }, [diagram]);

    if (!isOpen || !diagram) return null;

    const handleSubmit = () => {
        if (!name.trim()) {
            setError('El nombre no puede estar vacío');
            return;
        }
        if (name === diagram.name) {
            onClose();
            return;
        }
        // Enviar el nuevo nombre
        onUpdate(name);
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
                        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                    >
                        Guardar
                    </button>
                </div>
            }
        >
            <div className="space-y-4">
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

                <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Participantes actuales</h3>
                    <div className="bg-gray-50 rounded-md p-3">
                        {diagram.sharedUsers && diagram.sharedUsers.length > 0 ? (
                            <ul className="space-y-2">
                                {diagram.sharedUsers.map(user => (
                                    <li key={user._id} className="flex items-center space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm">
                                            {user.firstName[0]}{user.lastName[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
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