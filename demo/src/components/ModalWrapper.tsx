import React, { useState, useEffect } from 'react';
import { Modal, Button } from '../../../src';

interface ModalWrapperProps {
  props: Record<string, any>;
  setProps: (props: Record<string, any>) => void;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({ props, setProps }) => {
  const [isOpen, setIsOpen] = useState(props.isOpen || false);

  useEffect(() => {
    setIsOpen(props.isOpen || false);
  }, [props.isOpen]);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        {...props}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setProps({ ...props, isOpen: false });
        }}
      >
        {props.children || <p>Modal content goes here</p>}
      </Modal>
    </div>
  );
};

