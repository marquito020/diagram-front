import { useDiagramFetch } from "../../hooks/useDiagramFetch";
import { useState, useEffect } from "react";
import { DiagramData } from "../../types/diagramTypes";
import { Toast } from "../../../../app/components/Toast";
import Loading from "../../../../app/components/Loading";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { motion } from "framer-motion";
import { NotificationType } from "../../../../app/constants/notifications";
export default function ListDiagrams() {
    const { diagrams, loading, error, deleteDiagram, refreshDiagrams } = useDiagramFetch();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDiagram, setSelectedDiagram] = useState<DiagramData | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    // Cargar diagramas cuando el componente se monte
    useEffect(() => {
        console.log("Cargando diagramas...");
        refreshDiagrams();
    }, [refreshDiagrams]);

    const handleDeleteClick = (diagram: DiagramData) => {
        setSelectedDiagram(diagram);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
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
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 p-4">
                <p>Error al cargar los diagramas: {error}</p>
            </div>
        );
    }

    return (
        <>
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
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                    Creado por: {diagram.anfitrion.firstName} {diagram.anfitrion.lastName}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Creado el: {format(new Date(diagram.createdAt), "d 'de' MMMM, yyyy", { locale: es })}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Participantes: {diagram.participantes?.length || 0}
                                </p>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={() => {/* Implementar navegación al editor */}}
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
                            <h3 className="text-xl font-bold text-gray-900 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                ¿Eliminar diagrama?
                            </h3>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-gray-600 mb-6">
                            ¿Estás seguro de que deseas eliminar el diagrama "<span className="font-semibold">{selectedDiagram?.name}</span>"? Esta acción no se puede deshacer.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-200"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors duration-200"
                            >
                                <svg className="w-5 h-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
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
                    type={toastMessage.includes("error") ? NotificationType.ERROR : NotificationType.SUCCESS}
                    onClose={() => setShowToast(false)}
                />
            )}
        </>
    );
}