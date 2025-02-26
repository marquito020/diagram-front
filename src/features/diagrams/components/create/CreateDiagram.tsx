// src/features/diagrams/components/CreateDiagram.tsx
import { useForm, SubmitHandler } from "react-hook-form";
import { useDiagramFetch } from "../../hooks/useDiagramFetch";
import { useState } from 'react';
import { CreateDiagramFormData } from "../../types/diagramTypes";
import { Toast } from "../../../../app/components/Toast";
import Loading from "../../../../app/components/Loading";
import { motion } from "framer-motion";
import { NotificationType } from "../../../../app/constants/notifications";
export default function CreateDiagram() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateDiagramFormData>();
    const { createDiagram, loading } = useDiagramFetch();
    const [isModalOpen, setModalOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const onSubmit: SubmitHandler<CreateDiagramFormData> = async (data) => {
        try {
            await createDiagram(data.name);
            setModalOpen(false);
            reset();
            setShowToast(true);
        } catch (error) {
            console.error("Error creating diagram:", error);
        }
    };

    return (
        <>
            <button
                onClick={() => setModalOpen(true)}
                className="group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-lg shadow-2xl bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 active:from-purple-700 active:to-blue-600 focus:ring-4 focus:ring-purple-200 transition-all duration-300"
            >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Crear Diagrama
                </span>
            </button>

            {isModalOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-white bg-opacity-80 rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">Crear Nuevo Diagrama</h3>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nombre del Diagrama
                                </label>
                                <input
                                    {...register("name", {
                                        required: "El nombre es requerido",
                                        minLength: {
                                            value: 3,
                                            message: "El nombre debe tener al menos 3 caracteres"
                                        }
                                    })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Mi Diagrama"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                )}
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                                >
                                    <svg className="w-5 h-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    {loading ? <Loading /> : "Crear Diagrama"}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            )}

            {showToast && (
                <Toast
                    message="Diagrama creado exitosamente"
                    type={NotificationType.SUCCESS}
                    onClose={() => setShowToast(false)}
                />
            )}
        </>
    );
}
