import React from 'react';
import Loading from './Loading';

/**
 * Componente de ejemplo que muestra las diferentes variantes del componente Loading
 * Útil para documentación y pruebas
 */
const LoadingExample: React.FC = () => {
    return (
        <div className="p-6 space-y-8">
            <h1 className="text-2xl font-bold mb-4">Ejemplos del componente Loading</h1>

            {/* Tema claro */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Tema Claro (para fondos claros)</h2>
                <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
                    <div>
                        <h3 className="text-lg font-medium mb-2">Tamaño pequeño</h3>
                        <Loading theme="light" size="sm" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-2">Tamaño mediano (predeterminado)</h3>
                        <Loading theme="light" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-2">Tamaño grande</h3>
                        <Loading theme="light" size="lg" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-2">Sin texto</h3>
                        <Loading theme="light" text="" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-2">Texto personalizado</h3>
                        <Loading theme="light" text="Procesando datos..." />
                    </div>
                </div>
            </div>

            {/* Tema oscuro */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Tema Oscuro (para fondos oscuros)</h2>
                <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-white mb-2">Tamaño pequeño</h3>
                        <Loading theme="dark" size="sm" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-white mb-2">Tamaño mediano (predeterminado)</h3>
                        <Loading theme="dark" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-white mb-2">Tamaño grande</h3>
                        <Loading theme="dark" size="lg" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-white mb-2">Sin texto</h3>
                        <Loading theme="dark" text="" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-white mb-2">Texto personalizado</h3>
                        <Loading theme="dark" text="Procesando datos..." />
                    </div>
                </div>
            </div>

            {/* Ejemplos en contexto */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Ejemplos en contexto</h2>

                {/* Botón con loading */}
                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Botón con loading</h3>
                    <div className="flex space-x-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center justify-center w-40">
                            <Loading theme="dark" size="sm" text="" />
                            <span className="ml-2">Guardando</span>
                        </button>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center justify-center w-40">
                            <Loading theme="dark" size="sm" text="" />
                            <span className="ml-2">Enviando</span>
                        </button>
                    </div>
                </div>

                {/* Card con loading */}
                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Card con loading</h3>
                    <div className="bg-white p-6 rounded-lg shadow-md h-40 flex items-center justify-center">
                        <Loading theme="light" size="lg" text="Cargando contenido..." />
                    </div>
                </div>

                {/* Página completa con loading */}
                <div className="space-y-2">
                    <h3 className="text-lg font-medium">Página con loading</h3>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md h-64 flex items-center justify-center">
                        <Loading theme="light" size="lg" text="Cargando página..." />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingExample;