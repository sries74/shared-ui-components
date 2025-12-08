import React from 'react';
import { createPortal } from 'react-dom';
import './LoadingSpinner.css';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
  fullPage?: boolean;
  text?: string;
  className?: string;
}

/**
 * LoadingSpinner component for loading states
 * 
 * @example
 * ```tsx
 * <LoadingSpinner size="md" variant="spinner" />
 * <LoadingSpinner fullPage text="Loading..." />
 * ```
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'spinner',
  fullPage = false,
  text,
  className = '',
}) => {
  const baseClass = 'loading-spinner';
  const sizeClass = `loading-spinner--${size}`;
  const variantClass = `loading-spinner--${variant}`;
  const fullPageClass = fullPage ? 'loading-spinner--full-page' : '';

  const classes = [
    baseClass,
    sizeClass,
    variantClass,
    fullPageClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="loading-spinner__dots">
            <span />
            <span />
            <span />
          </div>
        );
      case 'pulse':
        return <div className="loading-spinner__pulse" />;
      case 'spinner':
      default:
        return (
          <svg
            className="loading-spinner__svg"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="loading-spinner__circle"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="32"
              strokeDashoffset="32"
            >
              <animate
                attributeName="stroke-dasharray"
                dur="2s"
                values="0 32;16 16;0 32;0 32"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-dashoffset"
                dur="2s"
                values="0;-16;-32;-32"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        );
    }
  };

  const content = (
    <div className={classes} role="status" aria-live="polite" aria-label={text || 'Loading'}>
      {renderSpinner()}
      {text && <span className="loading-spinner__text">{text}</span>}
    </div>
  );

  if (fullPage) {
    return createPortal(
      <div className="loading-spinner__overlay">
        {content}
      </div>,
      document.body
    );
  }

  return content;
};

