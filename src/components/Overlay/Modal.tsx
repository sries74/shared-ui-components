import React, { useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ModalSize } from '../../types';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import './Modal.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/**
 * Modal component with focus trap, keyboard navigation, and portal rendering
 * 
 * @example
 * ```tsx
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Delete"
 *   size="md"
 * >
 *   <p>Are you sure you want to delete this item?</p>
 *   <Modal.Footer>
 *     <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
 *     <Button variant="danger" onClick={handleDelete}>Delete</Button>
 *   </Modal.Footer>
 * </Modal>
 * ```
 */
const ModalComponent: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  children,
  footer,
  className = '',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useFocusTrap(modalRef, isOpen);
  useClickOutside(modalRef, (e) => {
    if (closeOnOverlayClick && (e.target as HTMLElement).classList.contains('modal__backdrop')) {
      onClose();
    }
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // Store the previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
      
      // Restore focus to previous element
      previousActiveElement.current?.focus();
    };
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) {
    return null;
  }

  const modalContent = (
    <div className="modal__backdrop" role="dialog" aria-modal="true" aria-labelledby={title ? 'modal-title' : undefined}>
      <div
        ref={modalRef}
        className={`modal modal--${size} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="modal__header">
            {title && (
              <h2 id="modal-title" className="modal__title">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                className="modal__close"
                onClick={onClose}
                aria-label="Close modal"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
        <div className="modal__body">{children}</div>
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

// Modal sub-components for convenience
const ModalFooter: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`modal__footer ${className}`}>{children}</div>
);

// Export Modal with Footer sub-component
export const Modal = Object.assign(ModalComponent, {
  Footer: ModalFooter,
});

