import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { NotificationType, NOTIFICATION_DURATION, NotificationConfig } from '../constants/notifications';

interface ToastProps {
    message: string;
    type?: NotificationType;
    duration?: number;
    onClose: () => void;
}

const toastIcons: Record<NotificationType, React.ReactNode> = {
    [NotificationType.SUCCESS]: NotificationConfig[NotificationType.SUCCESS].icon,
    [NotificationType.ERROR]: NotificationConfig[NotificationType.ERROR].icon,
    [NotificationType.INFO]: NotificationConfig[NotificationType.INFO].icon,
    [NotificationType.WARNING]: NotificationConfig[NotificationType.WARNING].icon
};

const toastStyles: Record<NotificationType, string> = {
    [NotificationType.SUCCESS]: NotificationConfig[NotificationType.SUCCESS].className,
    [NotificationType.ERROR]: NotificationConfig[NotificationType.ERROR].className,
    [NotificationType.INFO]: NotificationConfig[NotificationType.INFO].className,
    [NotificationType.WARNING]: NotificationConfig[NotificationType.WARNING].className
};

export const Toast = ({ message, type = NotificationType.INFO, duration = NOTIFICATION_DURATION, onClose }: ToastProps) => {
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