import React, { useId, useState, useRef, useEffect } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import './FormSelect.css';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface FormSelectProps {
  label?: string;
  name: string;
  options: SelectOption[];
  value?: string | number | (string | number)[];
  multiple?: boolean;
  searchable?: boolean;
  placeholder?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (value: string | number | (string | number)[]) => void;
}

/**
 * FormSelect component for single and multi-select dropdowns
 * 
 * @example
 * ```tsx
 * <FormSelect
 *   label="Country"
 *   name="country"
 *   options={countries}
 *   value={selectedCountry}
 *   onChange={(value) => setSelectedCountry(value)}
 *   searchable
 * />
 * ```
 */
export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name: _name,
  options,
  value,
  multiple = false,
  searchable = false,
  placeholder = 'Select an option...',
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  onChange,
}) => {
  const inputId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const errorId = error ? `${inputId}-error` : undefined;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  useClickOutside(selectRef, () => setIsOpen(false));

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Group options by group property
  const groupedOptions = options.reduce((acc, option) => {
    const group = option.group || 'default';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(option);
    return acc;
  }, {} as Record<string, SelectOption[]>);

  // Filter options based on search query
  const filteredOptions = searchable && searchQuery
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const filteredGroupedOptions = searchable && searchQuery
    ? filteredOptions.reduce((acc, option) => {
        const group = option.group || 'default';
        if (!acc[group]) {
          acc[group] = [];
        }
        acc[group].push(option);
        return acc;
      }, {} as Record<string, SelectOption[]>)
    : groupedOptions;

  const isSelected = (optionValue: string | number): boolean => {
    if (multiple && Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return value === optionValue;
  };

  const handleSelect = (optionValue: string | number) => {
    if (disabled) return;

    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = isSelected(optionValue)
        ? currentValues.filter((v) => v !== optionValue)
        : [...currentValues, optionValue];
      onChange?.(newValues);
    } else {
      onChange?.(optionValue);
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (multiple) {
      onChange?.([]);
    } else {
      onChange?.(undefined as any);
    }
  };

  const getDisplayValue = (): string => {
    if (multiple && Array.isArray(value) && value.length > 0) {
      const selectedLabels = value
        .map((val) => options.find((opt) => opt.value === val)?.label)
        .filter(Boolean);
      return selectedLabels.length > 0 ? `${selectedLabels.length} selected` : placeholder;
    }
    if (!multiple && value !== undefined) {
      const selectedOption = options.find((opt) => opt.value === value);
      return selectedOption?.label || placeholder;
    }
    return placeholder;
  };

  const hasValue = (multiple && Array.isArray(value) && value.length > 0) ||
                   (!multiple && value !== undefined);

  const baseClass = 'form-select';
  const errorClass = error ? 'form-select--error' : '';
  const disabledClass = disabled ? 'form-select--disabled' : '';
  const openClass = isOpen ? 'form-select--open' : '';

  const wrapperClasses = [
    baseClass,
    errorClass,
    disabledClass,
    openClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses} ref={selectRef}>
      {label && (
        <label htmlFor={inputId} className="form-select__label">
          {label}
          {required && <span className="form-select__required" aria-label="required">*</span>}
        </label>
      )}
      <div className="form-select__wrapper">
        <button
          type="button"
          id={inputId}
          className="form-select__trigger"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          aria-required={required}
        >
          <span className={`form-select__value ${!hasValue ? 'form-select__value--placeholder' : ''}`}>
            {getDisplayValue()}
          </span>
          {hasValue && (
            <button
              type="button"
              className="form-select__clear"
              onClick={handleClear}
              aria-label="Clear selection"
              tabIndex={-1}
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
          )}
          <svg
            className="form-select__arrow"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="form-select__dropdown" role="listbox">
            {searchable && (
              <div className="form-select__search">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="form-select__search-input"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            <div className="form-select__options">
              {Object.entries(filteredGroupedOptions).map(([group, groupOptions]) => (
                <div key={group}>
                  {group !== 'default' && (
                    <div className="form-select__group-label">{group}</div>
                  )}
                  {groupOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected(option.value)}
                      className={`form-select__option ${
                        isSelected(option.value) ? 'form-select__option--selected' : ''
                      } ${option.disabled ? 'form-select__option--disabled' : ''}`}
                      onClick={() => !option.disabled && handleSelect(option.value)}
                      disabled={option.disabled}
                    >
                      {multiple && (
                        <span className="form-select__checkbox">
                          {isSelected(option.value) && (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path
                                d="M13.333 4L6 11.333 2.667 8"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                      )}
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              ))}
              {filteredOptions.length === 0 && (
                <div className="form-select__empty">No options found</div>
              )}
            </div>
          </div>
        )}
      </div>
      {error && (
        <div id={errorId} className="form-select__error" role="alert">
          {error}
        </div>
      )}
      {helperText && !error && (
        <div id={helperId} className="form-select__helper">
          {helperText}
        </div>
      )}
    </div>
  );
};

