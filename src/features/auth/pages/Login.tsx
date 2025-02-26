import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../../app/constants/routes";
import LoginForm from "../components/LoginForm";
import { motion } from "framer-motion";
import { FaProjectDiagram } from "react-icons/fa";

export default function Login() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                {/* Logo y Título */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block"
                    >
                        <FaProjectDiagram className="w-16 h-16 text-indigo-600 mx-auto" />
                    </motion.div>
                    <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-2">DiagramFlow</h1>
                    <p className="text-gray-600">Tu herramienta de diagramación colaborativa</p>
                </div>

                {/* Contenedor del formulario */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-8 rounded-2xl shadow-xl backdrop-blur-sm backdrop-filter bg-opacity-90"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Bienvenido de nuevo</h2>
                    <p className="text-gray-600 mb-6">
                        Inicia sesión para continuar con tus proyectos
                    </p>

                    <LoginForm />

                    {/* Enlaces adicionales */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            ¿No tienes una cuenta?{" "}
                            <button
                                onClick={() => navigate(PublicRoutes.REGISTER)}
                                className="text-indigo-600 font-medium hover:text-indigo-500 transition-colors duration-200"
                            >
                                Regístrate aquí
                            </button>
                        </p>
                    </div>
                </motion.div>

                {/* Footer */}
                <div className="text-center mt-8 text-sm text-gray-600">
                    <p>© 2024 DiagramFlow. Todos los derechos reservados.</p>
                </div>
            </motion.div>
        </div>
    );
}