import React, { useId, forwardRef } from 'react';
import { InputType } from '../../types';
import './FormInput.css';

export interface FormInputProps {
  label?: string;
  name: string;
  type?: InputType;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showClearButton?: boolean;
  onClear?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  inputClassName?: string;
}

/**
 * FormInput component with label, error handling, and icon support
 * 
 * @example
 * ```tsx
 * <FormInput
 *   label="Email"
 *   name="email"
 *   type="email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   error={errors.email}
 *   required
 * />
 * ```
 */
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
  label,
  name,
  type = 'text',
  value,
  defaultValue,
  placeholder,
  error,
  helperText,
  required = false,
  disabled = false,
  readOnly = false,
  leftIcon,
  rightIcon,
  showClearButton = false,
  onClear,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  className = '',
  inputClassName = '',
}, ref) => {
  const inputId = useId();
  const errorId = error ? `${inputId}-error` : undefined;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  const hasValue = value !== undefined && value !== '';
  const showClear = showClearButton && hasValue && !disabled && !readOnly;

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      const syntheticEvent = {
        target: { value: '', name },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  const baseClass = 'form-input';
  const errorClass = error ? 'form-input--error' : '';
  const disabledClass = disabled ? 'form-input--disabled' : '';
  const hasLeftIconClass = leftIcon ? 'form-input--has-left-icon' : '';
  const hasRightIconClass = (rightIcon || showClear) ? 'form-input--has-right-icon' : '';

  const wrapperClasses = [
    baseClass,
    errorClass,
    disabledClass,
    hasLeftIconClass,
    hasRightIconClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [
    'form-input__field',
    inputClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={inputId} className="form-input__label">
          {label}
          {required && <span className="form-input__required" aria-label="required">*</span>}
        </label>
      )}
      <div className="form-input__wrapper">
        {leftIcon && (
          <span className="form-input__icon form-input__icon--left" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          aria-required={required}
        />
        {showClear && (
          <button
            type="button"
            className="form-input__clear"
            onClick={handleClear}
            aria-label="Clear input"
            tabIndex={-1}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        {rightIcon && !showClear && (
          <span className="form-input__icon form-input__icon--right" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </div>
      {error && (
        <div id={errorId} className="form-input__error" role="alert">
          {error}
        </div>
      )}
      {helperText && !error && (
        <div id={helperId} className="form-input__helper">
          {helperText}
        </div>
      )}
    </div>
  );
});

FormInput.displayName = 'FormInput';

