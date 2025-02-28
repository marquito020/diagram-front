import Loading from "../../../../app/components/Loading";
import { motion } from "framer-motion";

/**
 * Componente para mostrar el estado de carga
 */
const LoadingState: React.FC<{ text?: string }> = ({ text = "Cargando diagramas..." }) => (
    <div className="flex justify-center items-center h-64">
        <Loading theme="light" size="md" text={text} />
    </div>
);

/**
 * Componente para mostrar el estado de error
 */
const ErrorState: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => (
    <div className="text-center p-4">
        <p className="text-red-600 mb-4">Error al cargar los diagramas: {error}</p>
        <button
            onClick={onRetry}
            className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
        >
            Reintentar
        </button>
    </div>
);

/**
 * Componente para mostrar el estado vacío
 */
const EmptyState: React.FC<{ onRefresh: () => void; renderToast: () => React.ReactNode }> = ({ onRefresh, renderToast }) => (
    <>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200"
        >
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay diagramas</h3>
            <p className="text-gray-600 mb-4">Crea tu primer diagrama para comenzar</p>
            <button
                onClick={onRefresh}
                className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            >
                Refrescar
            </button>
        </motion.div>
        {renderToast()}
    </>
);

export { LoadingState, ErrorState, EmptyState };