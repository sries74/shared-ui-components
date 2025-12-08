import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { Badge } from '../DataDisplay/Badge';
import { useClickOutside } from '../../hooks/useClickOutside';
import './TagInput.css';

export interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  allowDuplicates?: boolean;
  suggestions?: string[];
  validate?: (tag: string) => boolean | string;
  className?: string;
}

/**
 * TagInput component for adding and removing tags
 * 
 * @example
 * ```tsx
 * <TagInput
 *   tags={tags}
 *   onChange={setTags}
 *   placeholder="Add tags..."
 *   maxTags={10}
 *   suggestions={['react', 'typescript', 'javascript']}
 * />
 * ```
 */
export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onChange,
  placeholder = 'Add tags...',
  maxTags,
  allowDuplicates = false,
  suggestions = [],
  validate,
  className = '',
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setShowSuggestions(false));

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      (!maxTags || tags.length < maxTags) &&
      (allowDuplicates || !tags.includes(suggestion))
  );

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim();

    if (!trimmedTag) {
      return;
    }

    // Check max tags
    if (maxTags && tags.length >= maxTags) {
      setError(`Maximum ${maxTags} tags allowed`);
      return;
    }

    // Check duplicates
    if (!allowDuplicates && tags.includes(trimmedTag)) {
      setError('Tag already exists');
      return;
    }

    // Validate tag
    if (validate) {
      const validationResult = validate(trimmedTag);
      if (validationResult === false) {
        setError('Invalid tag');
        return;
      }
      if (typeof validationResult === 'string') {
        setError(validationResult);
        return;
      }
    }

    onChange([...tags, trimmedTag]);
    setInputValue('');
    setError(null);
    setShowSuggestions(false);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
    setError(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim()) {
        handleAddTag(inputValue);
      } else if (filteredSuggestions.length > 0) {
        handleAddTag(filteredSuggestions[0]);
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      handleRemoveTag(tags[tags.length - 1]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setInputValue('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError(null);
    setShowSuggestions(suggestions.length > 0 && e.target.value.length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleAddTag(suggestion);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className={`tag-input ${className}`} ref={containerRef}>
      <div className="tag-input__container">
        <div className="tag-input__tags">
          {tags.map((tag, index) => (
            <Badge
              key={`${tag}-${index}`}
              variant="primary"
              size="sm"
              removable
              onRemove={() => handleRemoveTag(tag)}
              className="tag-input__tag"
            >
              {tag}
            </Badge>
          ))}
          <input
            ref={inputRef}
            type="text"
            className="tag-input__input"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (suggestions.length > 0 && inputValue.length > 0) {
                setShowSuggestions(true);
              }
            }}
            placeholder={tags.length === 0 ? placeholder : ''}
            disabled={maxTags ? tags.length >= maxTags : false}
          />
        </div>
      </div>
      {error && (
        <div className="tag-input__error" role="alert">
          {error}
        </div>
      )}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="tag-input__suggestions">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              className="tag-input__suggestion"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
      {maxTags && (
        <div className="tag-input__counter">
          {tags.length} / {maxTags}
        </div>
      )}
    </div>
  );
};

