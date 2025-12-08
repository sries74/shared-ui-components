import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { FormInput } from '../Forms/FormInput';
import { useDebounce } from '../../hooks/useDebounce';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LoadingSpinner } from '../Feedback/LoadingSpinner';
import './SearchBar.css';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  isLoading?: boolean;
  showRecentSearches?: boolean;
  onSearch?: (value: string) => void;
  className?: string;
}

/**
 * SearchBar component with debouncing and recent searches
 * 
 * @example
 * ```tsx
 * <SearchBar
 *   value={searchTerm}
 *   onChange={setSearchTerm}
 *   debounceMs={300}
 *   isLoading={isSearching}
 *   showRecentSearches
 * />
 * ```
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  debounceMs = 300,
  isLoading = false,
  showRecentSearches = false,
  onSearch,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>(
    'search-bar-recent-searches',
    []
  );
  const debouncedValue = useDebounce(value, debounceMs);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Trigger search callback when debounced value changes
  useEffect(() => {
    if (debouncedValue && onSearch) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
    searchInputRef.current?.focus();
  };

  const handleSearch = (searchValue: string) => {
    if (!searchValue.trim()) return;

    // Add to recent searches
    if (showRecentSearches) {
      setRecentSearches((prev) => {
        const filtered = prev.filter((s) => s !== searchValue);
        return [searchValue, ...filtered].slice(0, 5); // Keep last 5
      });
    }

    if (onSearch) {
      onSearch(searchValue);
    }
    setIsFocused(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(value);
    } else if (e.key === 'Escape') {
      setIsFocused(false);
      searchInputRef.current?.blur();
    }
  };

  const handleRecentSearchClick = (searchValue: string) => {
    onChange(searchValue);
    handleSearch(searchValue);
  };

  const handleRemoveRecentSearch = (e: React.MouseEvent, searchValue: string) => {
    e.stopPropagation();
    setRecentSearches((prev) => prev.filter((s) => s !== searchValue));
  };

  const displayRecentSearches = showRecentSearches && isFocused && recentSearches.length > 0 && !value;

  return (
    <div className={`search-bar ${className}`}>
      <div className="search-bar__input-wrapper">
        <FormInput
          ref={searchInputRef}
          name="search"
          type="search"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            // Delay to allow recent search clicks
            setTimeout(() => setIsFocused(false), 200);
          }}
          placeholder={placeholder}
          showClearButton={!!value}
          onClear={handleClear}
          leftIcon={
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 19L14.65 14.65"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          rightIcon={isLoading ? <LoadingSpinner size="sm" variant="spinner" /> : undefined}
          className="search-bar__input"
          inputClassName="search-bar__input-field"
        />
      </div>
      {displayRecentSearches && (
        <div className="search-bar__recent">
          <div className="search-bar__recent-header">
            <span>Recent searches</span>
          </div>
          <div className="search-bar__recent-list">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                type="button"
                className="search-bar__recent-item"
                onClick={() => handleRecentSearchClick(search)}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.333 12.667C10.278 12.667 12.667 10.278 12.667 7.333C12.667 4.388 10.278 2 7.333 2C4.388 2 2 4.388 2 7.333C2 10.278 4.388 12.667 7.333 12.667Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 14L11.1 11.1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{search}</span>
                <button
                  type="button"
                  className="search-bar__recent-remove"
                  onClick={(e) => handleRemoveRecentSearch(e, search)}
                  aria-label="Remove recent search"
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
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

