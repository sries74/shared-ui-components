import React, { ReactNode } from 'react';
import { CardVariant, CardPadding } from '../../types';
import './Card.css';

export interface CardProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
}

/**
 * Card component with header, body, and footer sections
 * 
 * @example
 * ```tsx
 * <Card
 *   header={<h3>Rule Name</h3>}
 *   footer={<Button>View Details</Button>}
 *   hoverable
 * >
 *   <p>Rule description...</p>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  children,
  header,
  footer,
  hoverable = false,
  clickable = false,
  onClick,
  variant = 'default',
  padding = 'md',
  className = '',
}) => {
  const baseClass = 'card';
  const variantClass = `card--${variant}`;
  const paddingClass = `card--padding-${padding}`;
  const hoverableClass = hoverable ? 'card--hoverable' : '';
  const clickableClass = clickable || onClick ? 'card--clickable' : '';

  const classes = [
    baseClass,
    variantClass,
    paddingClass,
    hoverableClass,
    clickableClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Component = clickable || onClick ? 'button' : 'div';
  const componentProps = (clickable || onClick)
    ? {
        type: 'button' as const,
        onClick,
        role: 'button',
        tabIndex: 0,
      }
    : {};

  return (
    <Component className={classes} {...componentProps}>
      {header && <div className="card__header">{header}</div>}
      <div className="card__body">{children}</div>
      {footer && <div className="card__footer">{footer}</div>}
    </Component>
  );
};

