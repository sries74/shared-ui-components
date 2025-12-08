import React, { ReactNode } from 'react';
import './Badge.css';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

/**
 * Badge component for labels, tags, and status indicators
 * 
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="error" removable onRemove={() => console.log('removed')}>
 *   New
 * </Badge>
 * <Badge variant="primary" dot>Notification</Badge>
 * ```
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  removable = false,
  onRemove,
  className = '',
}) => {
  const baseClass = 'badge';
  const variantClass = `badge--${variant}`;
  const sizeClass = `badge--${size}`;
  const dotClass = dot ? 'badge--dot' : '';

  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    dotClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <span className={classes}>
      {dot && <span className="badge__dot" aria-hidden="true" />}
      {!dot && <span className="badge__content">{children}</span>}
      {removable && !dot && (
        <button
          type="button"
          className="badge__remove"
          onClick={handleRemove}
          aria-label="Remove badge"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 3L3 9M3 3L9 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

