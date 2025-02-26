import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/useRegister";
import { UserIcon, EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Toast } from "../../../app/components/Toast";
import Loading from '../../../app/components/Loading';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const { loading, register: registerUser, showToast, toastMessage, toastType, setShowToast } = useRegister();

    const onSubmit = async (data: FormData) => {
        try {
            await registerUser(data);
        } catch (error) {
            setShowToast(true);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Campo de Nombre */}
                <div className="flex flex-col mb-6">
                    <label htmlFor="firstName" className="mb-2 text-sm font-semibold text-gray-700">First Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <UserIcon className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="firstName"
                            placeholder="First Name"
                            {...register("firstName", { required: true })}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                        />
                    </div>
                    {errors.firstName && <span className="text-xs text-red-500 mt-1">First Name is required</span>}
                </div>

                {/* Campo de Apellido */}
                <div className="flex flex-col mb-6">
                    <label htmlFor="lastName" className="mb-2 text-sm font-semibold text-gray-700">Last Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <UserIcon className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="lastName"
                            placeholder="Last Name"
                            {...register("lastName", { required: true })}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                        />
                    </div>
                    {errors.lastName && <span className="text-xs text-red-500 mt-1">Last Name is required</span>}
                </div>

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
                            type="password"
                            id="password"
                            placeholder="Password"
                            {...register("password", { required: true })}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200"
                        />
                    </div>
                    {errors.password && <span className="text-xs text-red-500 mt-1">Password is required</span>}
                </div>

                {/* Botón de Envío */}
                <div className="flex w-full mb-4">
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-200 flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? <Loading /> : "Register"}
                    </button>
                </div>
            </form>

            {/* Toast de error */}
            {showToast && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                />
            )}
        </>
    );
}