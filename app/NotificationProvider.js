import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id),
    );
  };

  const addNotification = (type, message) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = {
      id,
      type,
      message,
    };

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);

    setTimeout(() => {
      removeNotification(id);
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}>
        {notifications.map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotify = () => {
  const { addNotification } = useContext(NotificationContext);

  const success = (message) => {
    addNotification('success', message);
  };

  const error = (message) => {
    addNotification('error', message);
  };

  const info = (message) => {
    addNotification('info', message);
  };

  const warning = (message) => {
    addNotification('warning', message);
  };

  return { success, error, info, warning };
};

const Notification = ({ notification }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'info':
        return '?';
      case 'warning':
        return '⚠';
      default:
        return '';
    }
  };

  return (
    <div
      style={{
        background: notification.type === 'error' ? 'red' : 'green',
        color: 'white',
        padding: '10px',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <span style={{ marginRight: '10px' }}>{getIcon(notification.type)}</span>
      {notification.message}
    </div>
  );
};
