import CreateDiagram from "../components/create/CreateDiagram";
import ListDiagrams from "../components/list/ListDiagrams";
import Navbar from "../../../app/components/Navbar";
import { motion } from "framer-motion";

export default function DiagramsPage() {

    return (
        <>
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="container mx-auto px-4 py-8 mt-16"
            >
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Mis Diagramas
                    </h1>
                    <p className="text-gray-600">
                        Gestiona y crea nuevos diagramas para tus proyectos
                    </p>
                </div>

                <div className="mb-8">
                    <CreateDiagram />
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 shadow-lg">
                    <div className="mb-6 flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Diagramas Recientes
                        </h2>
                        <div className="flex space-x-2">
                            <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                                Más recientes
                            </button>
                            <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                                Más antiguos
                            </button>
                        </div>
                    </div>
                    <ListDiagrams />
                </div>
            </motion.div>
        </>
    );
}
