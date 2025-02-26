import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Toast } from '../components/Toast';
import { NotificationType, NOTIFICATION_DURATION } from '../constants/notifications';

interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<NotificationType>(NotificationType.SUCCESS);

  const showNotification = (message: string, type: NotificationType) => {
    setMessage(message);
    setType(type);
    setShowToast(true);
  };

  const hideNotification = () => {
    setShowToast(false);
  };

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      {showToast && (
        <Toast
          message={message}
          type={type}
          onClose={hideNotification}
          duration={NOTIFICATION_DURATION}
        />
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification debe usarse dentro de un NotificationProvider');
  }
  return context;
}
