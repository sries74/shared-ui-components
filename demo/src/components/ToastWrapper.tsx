import React from 'react';
import { ToastProvider, useToast } from '../../../src';
import { Button } from '../../../src';

interface ToastWrapperProps {
  props: Record<string, any>;
  setProps: (props: Record<string, any>) => void;
}

const ToastDemo: React.FC<{ props: Record<string, any> }> = ({ props }) => {
  const { success, error, warning, info } = useToast();

  const handleShow = () => {
    const type = props.type || 'info';
    const message = props.message || 'This is a toast notification';
    
    switch (type) {
      case 'success':
        success(message, { duration: props.duration || 5000 });
        break;
      case 'error':
        error(message, { duration: props.duration || 5000 });
        break;
      case 'warning':
        warning(message, { duration: props.duration || 5000 });
        break;
      case 'info':
      default:
        info(message, { duration: props.duration || 5000 });
        break;
    }
  };

  return (
    <div>
      <Button onClick={handleShow}>Show Toast</Button>
    </div>
  );
};

export const ToastWrapper: React.FC<ToastWrapperProps> = ({ props, setProps }) => {
  return (
    <ToastProvider position={props.position || 'top-right'}>
      <ToastDemo props={props} />
    </ToastProvider>
  );
};

