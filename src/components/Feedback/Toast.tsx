import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { ToastType, ToastPosition } from '../../types';
import './Toast.css';

export interface ToastProps {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number; // milliseconds, 0 = no auto-dismiss
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  showToast: (props: Omit<ToastProps, 'id'>) => void;
  success: (message: string, options?: Partial<Omit<ToastProps, 'id' | 'message' | 'type'>>) => void;
  error: (message: string, options?: Partial<Omit<ToastProps, 'id' | 'message' | 'type'>>) => void;
  warning: (message: string, options?: Partial<Omit<ToastProps, 'id' | 'message' | 'type'>>) => void;
  info: (message: string, options?: Partial<Omit<ToastProps, 'id' | 'message' | 'type'>>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
  defaultDuration?: number;
}

/**
 * Toast Provider component
 * 
 * @example
 * ```tsx
 * <ToastProvider position="top-right">
 *   <App />
 * </ToastProvider>
 * ```
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'top-right',
  defaultDuration = 5000,
}) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (props: Omit<ToastProps, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const toast: ToastProps = {
        ...props,
        id,
        duration: props.duration ?? defaultDuration,
      };
      setToasts((prev) => [...prev, toast]);
    },
    [defaultDuration]
  );

  const success = useCallback(
    (message: string, options?: Partial<Omit<ToastProps, 'id' | 'message' | 'type'>>) => {
      showToast({ ...options, message, type: 'success' });
    },
    [showToast]
  );

  const error = useCallback(
    (message: string, options?: Partial<Omit<ToastProps, 'id' | 'message' | 'type'>>) => {
      showToast({ ...options, message, type: 'error' });
    },
    [showToast]
  );

  const warning = useCallback(
    (message: string, options?: Partial<Omit<ToastProps, 'id' | 'message' | 'type'>>) => {
      showToast({ ...options, message, type: 'warning' });
    },
    [showToast]
  );

  const info = useCallback(
    (message: string, options?: Partial<Omit<ToastProps, 'id' | 'message' | 'type'>>) => {
      showToast({ ...options, message, type: 'info' });
    },
    [showToast]
  );

  const contextValue: ToastContextType = {
    showToast,
    success,
    error,
    warning,
    info,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} position={position} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

/**
 * Hook to use Toast context
 * 
 * @example
 * ```tsx
 * const { success, error } = useToast();
 * success('Item saved successfully!');
 * ```
 */
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastContainerProps {
  toasts: ToastProps[];
  position: ToastPosition;
  onRemove: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, position, onRemove }) => {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className={`toast-container toast-container--${position}`} role="region" aria-live="polite" aria-label="Notifications">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: ToastProps;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const { id, message, type = 'info', duration = 5000, action } = toast;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onRemove(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onRemove]);

  const handleClose = () => {
    onRemove(id);
    toast.onClose?.();
  };

  const handleAction = () => {
    action?.onClick();
    handleClose();
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.667 5L7.5 14.167 3.333 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'error':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'warning':
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 6.667V10M10 13.333H10.008M8.333 3.333L2.05 15.833C1.79167 16.3056 1.66667 16.8333 1.66667 17.5C1.66667 18.7917 2.70833 19.8333 4 19.8333H16C16.6667 19.8333 17.1944 19.7083 17.6667 19.45C18.1389 19.1917 18.5 18.8333 18.75 18.375C19 17.9167 19.0833 17.3889 19 16.7917C18.9167 16.1944 18.6667 15.6667 18.25 15.2083L11.6667 3.333C11.3056 2.80556 10.8333 2.41667 10.25 2.16667C9.66667 1.91667 9.02778 1.83333 8.33333 1.91667C7.63889 2 7.02778 2.25 6.5 2.66667C5.97222 3.08333 5.58333 3.61111 5.33333 4.25C5.08333 4.88889 5 5.55556 5.08333 6.25C5.16667 6.94444 5.41667 7.55556 5.83333 8.08333L8.333 3.333Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 13.333V10M10 6.667H10.008M18.333 10C18.333 14.6024 14.6024 18.333 10 18.333C5.39763 18.333 1.66667 14.6024 1.66667 10C1.66667 5.39763 5.39763 1.66667 10 1.66667C14.6024 1.66667 18.333 5.39763 18.333 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
    }
  };

  return (
    <div className={`toast toast--${type}`} role="alert">
      <div className="toast__icon">{getIcon()}</div>
      <div className="toast__content">
        <p className="toast__message">{message}</p>
        {action && (
          <button type="button" className="toast__action" onClick={handleAction}>
            {action.label}
          </button>
        )}
      </div>
      <button
        type="button"
        className="toast__close"
        onClick={handleClose}
        aria-label="Close notification"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 4L4 12M4 4L12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

