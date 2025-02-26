// src/features/diagrams/components/create/CreateDiagram.tsx
import { useForm, SubmitHandler } from "react-hook-form";
import { useDiagramFetch } from "../../hooks/useDiagramFetch";
import { useState, useEffect } from 'react';
import { CreateDiagramFormData } from "../../types/diagramTypes";
import { Toast } from "../../../../app/components/Toast";
import Loading from "../../../../app/components/Loading";
import { DiagramMessages, DiagramToastTypes, INITIAL_TOAST_STATE, ToastState } from "../../../../app/constants/diagramMessages";

export default function CreateDiagram() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateDiagramFormData>();
    const { createDiagram, loading } = useDiagramFetch();
    const [isModalOpen, setModalOpen] = useState(false);
    const [toast, setToast] = useState<ToastState>(INITIAL_TOAST_STATE);

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

    // Limpiar el toast cuando se desmonte el componente
    useEffect(() => {
        return () => {
            setToast(INITIAL_TOAST_STATE);
        };
    }, []);

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
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Crear nuevo diagrama
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Ingresa un nombre para tu nuevo diagrama. Podrás editarlo y compartirlo más tarde.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nombre del diagrama
                                            </label>
                                            <input
                                                {...register("name", {
                                                    required: "El nombre es requerido",
                                                    minLength: {
                                                        value: 3,
                                                        message: "El nombre debe tener al menos 3 caracteres"
                                                    }
                                                })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                placeholder="Mi Diagrama"
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                            )}
                                        </div>

                                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            >
                                                {loading ? <Loading /> : "Crear"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setModalOpen(false)}
                                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
