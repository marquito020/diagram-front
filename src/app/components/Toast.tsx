import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    duration?: number;
    onClose: () => void;
}

const toastIcons = {
    success: <FaCheckCircle className="w-5 h-5 text-green-500" />,
    error: <FaExclamationCircle className="w-5 h-5 text-red-500" />,
    info: <FaInfoCircle className="w-5 h-5 text-blue-500" />
};

const toastStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
};

export const Toast = ({ message, type = 'info', duration = 3000, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-5 right-5 z-50"
            >
                <div className={`flex items-center p-4 rounded-lg shadow-lg border ${toastStyles[type]}`}>
                    <div className="flex items-center">
                        {toastIcons[type]}
                        <p className="ml-3 font-medium">{message}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-8 focus:outline-none"
                    >
                        <IoMdClose className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity" />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};