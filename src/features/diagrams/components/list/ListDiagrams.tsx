import { useDiagramFetch } from "../../hooks/useDiagramFetch";
import { useState, useCallback } from "react";
import { DiagramData } from "../../types/diagramTypes";
import { Toast } from "../../../../app/components/Toast";
import Loading from "../../../../app/components/Loading";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { motion } from "framer-motion";
import { NotificationType } from "../../../../app/constants/notifications";

/**
 * Componente que muestra la lista de diagramas del usuario
 * Los diagramas se cargan automáticamente a través del hook useDiagramFetch
 */
export default function ListDiagrams() {
    // Estado y hooks
    const { diagrams, loading, error, deleteDiagram, refreshDiagrams } = useDiagramFetch();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDiagram, setSelectedDiagram] = useState<DiagramData | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    // Manejadores de eventos
    const handleDeleteClick = useCallback((diagram: DiagramData) => {
        setSelectedDiagram(diagram);
        setShowDeleteModal(true);
    }, []);

    const handleConfirmDelete = useCallback(async () => {
        if (!selectedDiagram) return;

        try {
            await deleteDiagram(selectedDiagram._id);
            setToastMessage("Diagrama eliminado exitosamente");
            setShowToast(true);
        } catch (error) {
            setToastMessage("Error al eliminar el diagrama");
            setShowToast(true);
        } finally {
            setShowDeleteModal(false);
            setSelectedDiagram(null);
        }
    }, [selectedDiagram, deleteDiagram]);

    const handleRefresh = useCallback(() => {
        refreshDiagrams();
    }, [refreshDiagrams]);

    // Renderizado condicional para estados de carga y error
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loading theme="light" size="md" text="Cargando diagramas..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-4">
                <p className="text-red-600 mb-4">Error al cargar los diagramas: {error}</p>
                <button
                    onClick={handleRefresh}
                    className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    // Renderizado de la lista vacía
    if (!diagrams || diagrams.length === 0) {
        return (
            <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay diagramas</h3>
                <p className="text-gray-600 mb-4">Crea tu primer diagrama para comenzar</p>
                <button
                    onClick={handleRefresh}
                    className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                >
                    Refrescar
                </button>
            </div>
        );
    }

    // Renderizado principal
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                    {diagrams.length} {diagrams.length === 1 ? 'diagrama encontrado' : 'diagramas encontrados'}
                </h3>
                <button
                    onClick={handleRefresh}
                    className="flex items-center text-sm text-purple-600 hover:text-purple-800"
                >
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Actualizar
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {diagrams.map((diagram) => (
                    <div
                        key={diagram._id}
                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-gray-900 truncate">
                                    {diagram.name}
                                </h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleDeleteClick(diagram)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                        aria-label="Eliminar diagrama"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                    Creado por: {diagram.user?.firstName || 'Usuario'} {diagram.user?.lastName || ''}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Creado el: {format(new Date(diagram.createdAt), "d 'de' MMMM, yyyy", { locale: es })}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Participantes: {diagram.sharedUsers?.length || 0}
                                </p>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={() => {/* Implementar navegación al editor */ }}
                                    className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                                >
                                    Abrir Editor
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de Confirmación de Eliminación */}
            {showDeleteModal && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                >
                    <div className="bg-white bg-opacity-80 rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Confirmar eliminación</h3>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-gray-600 mb-4">
                            ¿Estás seguro de que deseas eliminar el diagrama "{selectedDiagram?.name}"? Esta acción no se puede deshacer.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Toast de notificación */}
            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastMessage.includes("exitosamente") ? NotificationType.SUCCESS : NotificationType.ERROR}
                    onClose={() => setShowToast(false)}
                />
            )}
        </>
    );
}