import React, { useState, useEffect } from 'react';
import { SearchBar } from '../../../src';

interface SearchBarWrapperProps {
  props: Record<string, any>;
  setProps: (props: Record<string, any>) => void;
}

// Initialize recent searches synchronously at module level
if (typeof window !== 'undefined') {
  try {
    const existingSearches = localStorage.getItem('search-bar-recent-searches');
    if (!existingSearches || JSON.parse(existingSearches).length === 0) {
      const sampleSearches = [
        'React components',
        'TypeScript tutorial',
        'CSS styling',
        'JavaScript hooks',
        'UI design patterns'
      ];
      localStorage.setItem('search-bar-recent-searches', JSON.stringify(sampleSearches));
    }
  } catch (e) {
    // Ignore localStorage errors
  }
}

export const SearchBarWrapper: React.FC<SearchBarWrapperProps> = ({ props, setProps }) => {
  const [localValue, setLocalValue] = useState(props.value || '');

  useEffect(() => {
    setLocalValue(props.value || '');
  }, [props.value]);

  return (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      <SearchBar
        value={localValue}
        onChange={(value) => {
          setLocalValue(value);
          setProps({ ...props, value });
        }}
        placeholder={props.placeholder || 'Search...'}
        debounceMs={props.debounceMs ?? 300}
        isLoading={props.isLoading === true}
        showRecentSearches={props.showRecentSearches === true}
        onSearch={(value) => {
          console.log('Search:', value);
        }}
      />
    </div>
  );
};

