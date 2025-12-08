import React, { useId, useRef, useEffect, useState } from 'react';
import { FormInputProps } from './FormInput';
import './FormTextarea.css';

export interface FormTextareaProps extends Omit<FormInputProps, 'type' | 'onChange' | 'onBlur'> {
  rows?: number;
  minRows?: number;
  maxRows?: number;
  autoResize?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

/**
 * FormTextarea component for multi-line text input
 * 
 * @example
 * ```tsx
 * <FormTextarea
 *   label="Description"
 *   name="description"
 *   value={description}
 *   onChange={(e) => setDescription(e.target.value)}
 *   autoResize
 *   showCharCount
 *   maxLength={500}
 * />
 * ```
 */
export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  name,
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
  className = '',
  inputClassName = '',
  rows = 3,
  minRows,
  maxRows,
  autoResize = false,
  showCharCount = false,
  maxLength,
}) => {
  const inputId = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [currentRows, setCurrentRows] = useState(rows);
  const errorId = error ? `${inputId}-error` : undefined;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  const currentValue = value !== undefined ? value : (textareaRef.current?.value || '');
  const charCount = currentValue.length;
  const hasValue = currentValue !== '';
  const showClear = showClearButton && hasValue && !disabled && !readOnly;

  // Auto-resize functionality
  useEffect(() => {
    if (!autoResize || !textareaRef.current) {
      return;
    }

    const textarea = textareaRef.current;
    
    // Reset height to calculate scrollHeight
    textarea.style.height = 'auto';
    
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10) || 24;
    const padding = parseInt(getComputedStyle(textarea).paddingTop, 10) + 
                    parseInt(getComputedStyle(textarea).paddingBottom, 10);
    
    const scrollHeight = textarea.scrollHeight;
    const calculatedRows = Math.ceil((scrollHeight - padding) / lineHeight);
    
    let newRows = calculatedRows;
    if (minRows !== undefined) {
      newRows = Math.max(newRows, minRows);
    }
    if (maxRows !== undefined) {
      newRows = Math.min(newRows, maxRows);
    }
    
    setCurrentRows(newRows);
    textarea.style.height = `${newRows * lineHeight + padding}px`;
  }, [currentValue, autoResize, minRows, maxRows]);

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange && textareaRef.current) {
      const syntheticEvent = {
        target: { value: '', name },
        currentTarget: textareaRef.current,
      } as React.ChangeEvent<HTMLTextAreaElement>;
      onChange(syntheticEvent);
      if (autoResize) {
        setCurrentRows(minRows || rows);
      }
    }
  };

  const baseClass = 'form-textarea';
  const errorClass = error ? 'form-textarea--error' : '';
  const disabledClass = disabled ? 'form-textarea--disabled' : '';
  const hasLeftIconClass = leftIcon ? 'form-textarea--has-left-icon' : '';
  const hasRightIconClass = (rightIcon || showClear) ? 'form-textarea--has-right-icon' : '';

  const wrapperClasses = [
    baseClass,
    errorClass,
    disabledClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const textareaClasses = [
    'form-textarea__field',
    hasLeftIconClass,
    hasRightIconClass,
    inputClassName,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={inputId} className="form-textarea__label">
          {label}
          {required && <span className="form-textarea__required" aria-label="required">*</span>}
        </label>
      )}
      <div className="form-textarea__wrapper">
        {leftIcon && (
          <span className="form-textarea__icon form-textarea__icon--left" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        <textarea
          ref={textareaRef}
          id={inputId}
          name={name}
          rows={autoResize ? currentRows : rows}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          onChange={onChange}
          onBlur={onBlur}
          className={textareaClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          aria-required={required}
          style={autoResize ? { resize: 'none', overflow: 'hidden' } : undefined}
        />
        {showClear && (
          <button
            type="button"
            className="form-textarea__clear"
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
          <span className="form-textarea__icon form-textarea__icon--right" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </div>
      <div className="form-textarea__footer">
        {error && (
          <div id={errorId} className="form-textarea__error" role="alert">
            {error}
          </div>
        )}
        {helperText && !error && (
          <div id={helperId} className="form-textarea__helper">
            {helperText}
          </div>
        )}
        {showCharCount && maxLength && (
          <div className="form-textarea__char-count">
            {charCount} / {maxLength}
          </div>
        )}
      </div>
    </div>
  );
};

