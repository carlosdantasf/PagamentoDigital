import React from 'react';
import './ErrorNotification.css';

interface ErrorNotificationProps {
  message: string;
  onRetry: () => void;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ message, onRetry }) => {
  return (
    <div className="error-notification">
      <p>{message}</p>
      <button onClick={onRetry}>Tente novamente</button>
    </div>
  );
};

export default ErrorNotification;
