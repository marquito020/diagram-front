import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useLogin";
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Loading from '../../../app/components/Loading';

// Definimos la interfaz para los datos del formulario
interface FormData {
    email: string;
    password: string;
}

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>(); // Especificamos el tipo FormData
    const { loading, login } = useAuth(); // Eliminamos `error` si no se usa
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: FormData) => { // Usamos el tipo FormData
        try {
            console.log("Login data:", data);
            await login(data.email, data.password);
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Campo de Email */}
                <div className="flex flex-col mb-6">
                    <label htmlFor="email" className="mb-2 text-sm font-semibold text-gray-700">Email Address</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email Address"
                            {...register("email", { required: true })}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                        />
                    </div>
                    {errors.email && <span className="text-xs text-red-500 mt-1">Email is required</span>}
                </div>

                {/* Campo de Contraseña */}
                <div className="flex flex-col mb-6">
                    <label htmlFor="password" className="mb-2 text-sm font-semibold text-gray-700">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <LockClosedIcon className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Password"
                            {...register("password", { required: true })}
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="w-5 h-5 text-gray-400 hover:text-indigo-500 transition-colors duration-200" />
                            ) : (
                                <EyeIcon className="w-5 h-5 text-gray-400 hover:text-indigo-500 transition-colors duration-200" />
                            )}
                        </button>
                    </div>
                    {errors.password && <span className="text-xs text-red-500 mt-1">Password is required</span>}
                </div>

                {/* Recordar Contraseña */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="remember" className="ml-2 text-sm text-gray-700">Remember Me</label>
                    </div>
                    <a href="/forgot-password" className="text-sm text-indigo-500 hover:text-indigo-600 transition-colors duration-200">
                        Forgot Password?
                    </a>
                </div>

                {/* Botón de Envío */}
                <div className="flex w-full mb-4">
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? <Loading /> : "Login"}
                    </button>
                </div>
            </form>
        </>
    );
}