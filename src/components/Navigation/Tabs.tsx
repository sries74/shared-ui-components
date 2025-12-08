import React, { useState, useRef, KeyboardEvent } from 'react';
import './Tabs.css';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

/**
 * Tabs component with keyboard navigation
 * 
 * @example
 * ```tsx
 * <Tabs
 *   tabs={[
 *     { id: '1', label: 'Tab 1', content: <div>Content 1</div> },
 *     { id: '2', label: 'Tab 2', content: <div>Content 2</div> },
 *   ]}
 *   variant="pills"
 * />
 * ```
 */
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  activeTab: controlledActiveTab,
  onTabChange,
  variant = 'default',
  orientation = 'horizontal',
  className = '',
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<string>(
    defaultTab || tabs.find((tab) => !tab.disabled)?.id || tabs[0]?.id || ''
  );
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const isControlled = controlledActiveTab !== undefined;
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;

  const handleTabChange = (tabId: string) => {
    if (isControlled) {
      onTabChange?.(tabId);
    } else {
      setInternalActiveTab(tabId);
      onTabChange?.(tabId);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let newIndex = currentIndex;

    if (orientation === 'horizontal') {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
      }
    } else {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
      }
    }

    if (e.key === 'Home') {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      newIndex = tabs.length - 1;
    }

    // Skip disabled tabs
    while (tabs[newIndex]?.disabled && newIndex !== currentIndex) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'Home') {
        newIndex = newIndex > 0 ? newIndex - 1 : tabs.length - 1;
      } else {
        newIndex = newIndex < tabs.length - 1 ? newIndex + 1 : 0;
      }
    }

    if (newIndex !== currentIndex && tabs[newIndex] && !tabs[newIndex].disabled) {
      handleTabChange(tabs[newIndex].id);
      tabRefs.current[tabs[newIndex].id]?.focus();
    }
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  const baseClass = 'tabs';
  const variantClass = `tabs--${variant}`;
  const orientationClass = `tabs--${orientation}`;

  const classes = [
    baseClass,
    variantClass,
    orientationClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div
        className="tabs__list"
        role="tablist"
        aria-orientation={orientation}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              aria-disabled={tab.disabled}
              id={`tab-${tab.id}`}
              className={`tabs__tab ${isActive ? 'tabs__tab--active' : ''} ${tab.disabled ? 'tabs__tab--disabled' : ''}`}
              onClick={() => !tab.disabled && handleTabChange(tab.id)}
              onKeyDown={(e) => !tab.disabled && handleKeyDown(e, index)}
              disabled={tab.disabled}
            >
              {tab.icon && <span className="tabs__icon" aria-hidden="true">{tab.icon}</span>}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
      {activeTabContent && (
        <div
          id={`tabpanel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="tabs__panel"
        >
          {activeTabContent}
        </div>
      )}
    </div>
  );
};

