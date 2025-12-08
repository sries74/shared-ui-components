import React, { useState } from 'react';
import {
  Button,
  Card,
  Badge,
  LoadingSpinner,
  SearchBar,
  FormTextarea,
  FormSelect,
  TagInput,
  DataTable,
  Modal,
  Tabs,
  ToastProvider,
  useToast,
} from '../../../src';
import type { PropertyControl } from '../components/PropertyPanel';
import { FormInputWrapper } from '../components/FormInputWrapper';
import { SearchBarWrapper } from '../components/SearchBarWrapper';
import { FormTextareaWrapper } from '../components/FormTextareaWrapper';
import { FormSelectWrapper } from '../components/FormSelectWrapper';
import { TagInputWrapper } from '../components/TagInputWrapper';
import { ModalWrapper } from '../components/ModalWrapper';
import { ToastWrapper } from '../components/ToastWrapper';
import { TabsWrapper } from '../components/TabsWrapper';
import { DataTableWrapper } from '../components/DataTableWrapper';

export interface ComponentConfig {
  name: string;
  description: string;
  category: string;
  importPath: string;
  defaultProps: Record<string, any>;
  propertyControls: (props: Record<string, any>, setProps: (props: Record<string, any>) => void) => PropertyControl[];
  renderComponent: (props: Record<string, any>, setProps: (props: Record<string, any>) => void) => React.ReactNode;
  generateCode: (props: Record<string, any>) => string;
  popularAttributes: Array<{
    name: string;
    description: string;
    examples: string[];
  }>;
}

// Button Config
const ButtonConfig: ComponentConfig = {
  name: 'Button',
  description: 'A versatile button component with multiple variants, sizes, and states. Perfect for actions, forms, and navigation.',
  category: 'Common',
  importPath: "import { Button } from '@scott/shared-ui-components';",
  defaultProps: {
    variant: 'primary',
    size: 'md',
    children: 'Click Me',
    disabled: false,
    isLoading: false,
    fullWidth: false,
  },
  propertyControls: (props, setProps) => [
    {
      name: 'variant',
      label: 'Variant',
      type: 'select',
      value: props.variant,
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Success', value: 'success' },
        { label: 'Danger', value: 'danger' },
        { label: 'Outline', value: 'outline' },
        { label: 'Ghost', value: 'ghost' },
        { label: 'Link', value: 'link' },
      ],
      onChange: (value) => setProps({ ...props, variant: value }),
    },
    {
      name: 'size',
      label: 'Size',
      type: 'select',
      value: props.size,
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
      onChange: (value) => setProps({ ...props, size: value }),
    },
    {
      name: 'children',
      label: 'Label',
      type: 'text',
      value: props.children,
      onChange: (value) => setProps({ ...props, children: value }),
    },
    {
      name: 'disabled',
      label: 'Disabled',
      type: 'boolean',
      value: props.disabled,
      onChange: (value) => setProps({ ...props, disabled: value }),
    },
    {
      name: 'isLoading',
      label: 'Loading',
      type: 'boolean',
      value: props.isLoading,
      onChange: (value) => setProps({ ...props, isLoading: value }),
    },
    {
      name: 'fullWidth',
      label: 'Full Width',
      type: 'boolean',
      value: props.fullWidth,
      onChange: (value) => setProps({ ...props, fullWidth: value }),
    },
  ],
  renderComponent: (props) => <Button {...props} onClick={() => console.log('Clicked!')} />,
  generateCode: (props) => {
    const propsStr = Object.entries(props)
      .filter(([key, value]) => {
        if (key === 'children') return false;
        if (value === false || value === '') return false;
        if (key === 'variant' && value === 'primary') return false;
        if (key === 'size' && value === 'md') return false;
        return true;
      })
      .map(([key, value]) => {
        if (typeof value === 'string') return `${key}="${value}"`;
        if (typeof value === 'boolean') return key;
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(' ');

    return `<Button${propsStr ? ` ${propsStr}` : ''}>\n  ${props.children}\n</Button>`;
  },
  popularAttributes: [
    {
      name: 'variant',
      description: 'Button style variant',
      examples: ['primary', 'secondary', 'success', 'danger', 'outline', 'ghost', 'link'],
    },
    {
      name: 'size',
      description: 'Button size',
      examples: ['sm', 'md', 'lg'],
    },
    {
      name: 'isLoading',
      description: 'Show loading spinner',
      examples: ['true', 'false'],
    },
    {
      name: 'disabled',
      description: 'Disable button interaction',
      examples: ['true', 'false'],
    },
  ],
};

// Card Config
const CardConfig: ComponentConfig = {
  name: 'Card',
  description: 'A flexible container component for displaying content with optional header and footer sections.',
  category: 'Data Display',
  importPath: "import { Card } from '@scott/shared-ui-components';",
  defaultProps: {
    variant: 'default',
    padding: 'md',
    hoverable: false,
    clickable: false,
    children: 'Card content goes here',
    header: 'Card Header',
    footer: 'Card Footer',
  },
  propertyControls: (props, setProps) => [
    {
      name: 'variant',
      label: 'Variant',
      type: 'select',
      value: props.variant,
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Outlined', value: 'outlined' },
        { label: 'Elevated', value: 'elevated' },
      ],
      onChange: (value) => setProps({ ...props, variant: value }),
    },
    {
      name: 'padding',
      label: 'Padding',
      type: 'select',
      value: props.padding,
      options: [
        { label: 'None', value: 'none' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
      onChange: (value) => setProps({ ...props, padding: value }),
    },
    {
      name: 'hoverable',
      label: 'Hoverable',
      type: 'boolean',
      value: props.hoverable,
      onChange: (value) => setProps({ ...props, hoverable: value }),
    },
    {
      name: 'clickable',
      label: 'Clickable',
      type: 'boolean',
      value: props.clickable,
      onChange: (value) => setProps({ ...props, clickable: value }),
    },
  ],
  renderComponent: (props) => (
    <Card
      {...props}
      header={props.header ? <h3 style={{ margin: 0 }}>{props.header}</h3> : undefined}
      footer={props.footer ? <Button size="sm">{props.footer}</Button> : undefined}
    >
      {props.children}
    </Card>
  ),
  generateCode: (props) => {
    const hasHeader = props.header;
    const hasFooter = props.footer;
    const propsStr = Object.entries(props)
      .filter(([key, value]) => {
        if (['children', 'header', 'footer'].includes(key)) return false;
        if (value === false || value === '') return false;
        if (key === 'variant' && value === 'default') return false;
        if (key === 'padding' && value === 'md') return false;
        return true;
      })
      .map(([key, value]) => {
        if (typeof value === 'boolean') return key;
        return `${key}="${value}"`;
      })
      .join(' ');

    let code = '<Card';
    if (propsStr) code += ` ${propsStr}`;
    code += '>\n';
    if (hasHeader) code += `  <Card.Header>${props.header}</Card.Header>\n`;
    code += `  ${props.children}\n`;
    if (hasFooter) code += `  <Card.Footer>${props.footer}</Card.Footer>\n`;
    code += '</Card>';
    return code;
  },
  popularAttributes: [
    {
      name: 'variant',
      description: 'Card style variant',
      examples: ['default', 'outlined', 'elevated'],
    },
    {
      name: 'hoverable',
      description: 'Add hover effect',
      examples: ['true', 'false'],
    },
    {
      name: 'padding',
      description: 'Internal padding size',
      examples: ['none', 'sm', 'md', 'lg'],
    },
  ],
};

// Badge Config
const BadgeConfig: ComponentConfig = {
  name: 'Badge',
  description: 'A small status indicator or label component, perfect for tags, notifications, and status displays.',
  category: 'Data Display',
  importPath: "import { Badge } from '@scott/shared-ui-components';",
  defaultProps: {
    variant: 'primary',
    size: 'md',
    children: 'Badge',
    removable: false,
    dot: false,
  },
  propertyControls: (props, setProps) => [
    {
      name: 'variant',
      label: 'Variant',
      type: 'select',
      value: props.variant,
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Primary', value: 'primary' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
        { label: 'Info', value: 'info' },
      ],
      onChange: (value) => setProps({ ...props, variant: value }),
    },
    {
      name: 'size',
      label: 'Size',
      type: 'select',
      value: props.size,
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
      onChange: (value) => setProps({ ...props, size: value }),
    },
    {
      name: 'children',
      label: 'Label',
      type: 'text',
      value: props.children,
      onChange: (value) => setProps({ ...props, children: value }),
    },
    {
      name: 'removable',
      label: 'Removable',
      type: 'boolean',
      value: props.removable,
      onChange: (value) => setProps({ ...props, removable: value }),
    },
    {
      name: 'dot',
      label: 'Dot Only',
      type: 'boolean',
      value: props.dot,
      onChange: (value) => setProps({ ...props, dot: value }),
    },
  ],
  renderComponent: (props) => <Badge {...props} onRemove={props.removable ? () => {} : undefined} />,
  generateCode: (props) => {
    const propsStr = Object.entries(props)
      .filter(([key, value]) => {
        if (key === 'children') return false;
        if (value === false || value === '') return false;
        if (key === 'variant' && value === 'primary') return false;
        if (key === 'size' && value === 'md') return false;
        return true;
      })
      .map(([key, value]) => {
        if (typeof value === 'boolean') return key;
        return `${key}="${value}"`;
      })
      .join(' ');

    return `<Badge${propsStr ? ` ${propsStr}` : ''}>\n  ${props.children}\n</Badge>`;
  },
  popularAttributes: [
    {
      name: 'variant',
      description: 'Badge color variant',
      examples: ['default', 'primary', 'success', 'warning', 'error', 'info'],
    },
    {
      name: 'size',
      description: 'Badge size',
      examples: ['sm', 'md', 'lg'],
    },
    {
      name: 'removable',
      description: 'Show remove button',
      examples: ['true', 'false'],
    },
  ],
};

// FormInput Config
const FormInputConfig: ComponentConfig = {
  name: 'FormInput',
  description: 'A comprehensive text input component with label, error handling, validation states, and icon support.',
  category: 'Forms',
  importPath: "import { FormInput } from '@scott/shared-ui-components';",
  defaultProps: {
    label: 'Email',
    name: 'email',
    type: 'text',
    placeholder: 'Enter your email',
    value: '',
    error: '',
    required: false,
    disabled: false,
    showClearButton: false,
  },
  propertyControls: (props, setProps) => [
    {
      name: 'label',
      label: 'Label',
      type: 'text',
      value: props.label,
      onChange: (value) => setProps({ ...props, label: value }),
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      value: props.type,
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Email', value: 'email' },
        { label: 'Password', value: 'password' },
        { label: 'Number', value: 'number' },
        { label: 'Tel', value: 'tel' },
        { label: 'URL', value: 'url' },
        { label: 'Search', value: 'search' },
      ],
      onChange: (value) => setProps({ ...props, type: value }),
    },
    {
      name: 'placeholder',
      label: 'Placeholder',
      type: 'text',
      value: props.placeholder,
      onChange: (value) => setProps({ ...props, placeholder: value }),
    },
    {
      name: 'value',
      label: 'Value',
      type: 'text',
      value: props.value,
      onChange: (value) => setProps({ ...props, value }),
    },
    {
      name: 'error',
      label: 'Error Message',
      type: 'text',
      value: props.error,
      onChange: (value) => setProps({ ...props, error: value }),
    },
    {
      name: 'required',
      label: 'Required',
      type: 'boolean',
      value: props.required,
      onChange: (value) => setProps({ ...props, required: value }),
    },
    {
      name: 'disabled',
      label: 'Disabled',
      type: 'boolean',
      value: props.disabled,
      onChange: (value) => setProps({ ...props, disabled: value }),
    },
    {
      name: 'showClearButton',
      label: 'Show Clear Button',
      type: 'boolean',
      value: props.showClearButton,
      onChange: (value) => setProps({ ...props, showClearButton: value }),
    },
  ],
  renderComponent: (props, setProps) => <FormInputWrapper props={props} setProps={setProps} />,
  generateCode: (props) => {
    const propsStr = Object.entries(props)
      .filter(([key, value]) => {
        if (value === false || value === '') return false;
        if (key === 'type' && value === 'text') return false;
        return true;
      })
      .map(([key, value]) => {
        if (typeof value === 'string') return `${key}="${value}"`;
        if (typeof value === 'boolean') return key;
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(' ');

    return `<FormInput\n  ${propsStr}\n  onChange={(e) => setValue(e.target.value)}\n/>`;
  },
  popularAttributes: [
    {
      name: 'type',
      description: 'Input type',
      examples: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    {
      name: 'error',
      description: 'Error message to display',
      examples: ['"Invalid email"', '""'],
    },
    {
      name: 'required',
      description: 'Mark field as required',
      examples: ['true', 'false'],
    },
    {
      name: 'showClearButton',
      description: 'Show clear button when input has value',
      examples: ['true', 'false'],
    },
  ],
};

// LoadingSpinner Config
const LoadingSpinnerConfig: ComponentConfig = {
  name: 'LoadingSpinner',
  description: 'A loading indicator component with multiple variants and sizes. Perfect for async operations and data fetching states.',
  category: 'Feedback',
  importPath: "import { LoadingSpinner } from '@scott/shared-ui-components';",
  defaultProps: {
    size: 'md',
    variant: 'spinner',
    text: '',
    fullPage: false,
  },
  propertyControls: (props, setProps) => [
    {
      name: 'size',
      label: 'Size',
      type: 'select',
      value: props.size,
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
      onChange: (value) => setProps({ ...props, size: value }),
    },
    {
      name: 'variant',
      label: 'Variant',
      type: 'select',
      value: props.variant,
      options: [
        { label: 'Spinner', value: 'spinner' },
        { label: 'Dots', value: 'dots' },
        { label: 'Pulse', value: 'pulse' },
      ],
      onChange: (value) => setProps({ ...props, variant: value }),
    },
    {
      name: 'text',
      label: 'Text',
      type: 'text',
      value: props.text,
      onChange: (value) => setProps({ ...props, text: value }),
    },
    {
      name: 'fullPage',
      label: 'Full Page Overlay',
      type: 'boolean',
      value: props.fullPage,
      onChange: (value) => setProps({ ...props, fullPage: value }),
    },
  ],
  renderComponent: (props) => <LoadingSpinner {...props} />,
  generateCode: (props) => {
    const propsStr = Object.entries(props)
      .filter(([key, value]) => {
        if (value === false || value === '') return false;
        if (key === 'size' && value === 'md') return false;
        if (key === 'variant' && value === 'spinner') return false;
        return true;
      })
      .map(([key, value]) => {
        if (typeof value === 'string') return `${key}="${value}"`;
        if (typeof value === 'boolean') return key;
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(' ');

    return `<LoadingSpinner${propsStr ? ` ${propsStr}` : ''} />`;
  },
  popularAttributes: [
    {
      name: 'variant',
      description: 'Spinner animation style',
      examples: ['spinner', 'dots', 'pulse'],
    },
    {
      name: 'size',
      description: 'Spinner size',
      examples: ['sm', 'md', 'lg'],
    },
    {
      name: 'fullPage',
      description: 'Show as full page overlay',
      examples: ['true', 'false'],
    },
  ],
};

// SearchBar Config
const SearchBarConfig: ComponentConfig = {
  name: 'SearchBar',
  description: 'A search input component with debouncing, recent searches, and loading states. Perfect for search interfaces and filtering.',
  category: 'Common',
  importPath: "import { SearchBar } from '@scott/shared-ui-components';",
  defaultProps: {
    value: '',
    placeholder: 'Search...',
    debounceMs: 300,
    isLoading: false,
    showRecentSearches: true,
  },
  propertyControls: (props, setProps) => [
    {
      name: 'placeholder',
      label: 'Placeholder',
      type: 'text',
      value: props.placeholder,
      onChange: (value) => setProps({ ...props, placeholder: value }),
    },
    {
      name: 'debounceMs',
      label: 'Debounce (ms)',
      type: 'number',
      value: props.debounceMs,
      onChange: (value) => setProps({ ...props, debounceMs: value }),
    },
    {
      name: 'isLoading',
      label: 'Loading',
      type: 'boolean',
      value: props.isLoading,
      onChange: (value) => setProps({ ...props, isLoading: value }),
    },
    {
      name: 'showRecentSearches',
      label: 'Show Recent Searches',
      type: 'boolean',
      value: props.showRecentSearches,
      onChange: (value) => setProps({ ...props, showRecentSearches: value }),
    },
  ],
  renderComponent: (props, setProps) => <SearchBarWrapper props={props} setProps={setProps} />,
  generateCode: (props) => {
    const propsStr = Object.entries(props)
      .filter(([key, value]) => {
        if (key === 'value' || key === 'onChange') return false;
        if (value === false || value === '') return false;
        if (key === 'debounceMs' && value === 300) return false;
        if (key === 'placeholder' && value === 'Search...') return false;
        return true;
      })
      .map(([key, value]) => {
        if (typeof value === 'string') return `${key}="${value}"`;
        if (typeof value === 'boolean') return key;
        return `${key}={${value}}`;
      })
      .join(' ');

    return `<SearchBar\n  value={searchTerm}\n  onChange={setSearchTerm}${propsStr ? `\n  ${propsStr}` : ''}\n/>`;
  },
  popularAttributes: [
    {
      name: 'debounceMs',
      description: 'Debounce delay in milliseconds',
      examples: ['300', '500', '1000'],
    },
    {
      name: 'showRecentSearches',
      description: 'Show recent searches dropdown',
      examples: ['true', 'false'],
    },
    {
      name: 'isLoading',
      description: 'Show loading indicator',
      examples: ['true', 'false'],
    },
  ],
};

// FormTextarea Config
const FormTextareaConfig: ComponentConfig = {
  name: 'FormTextarea',
  description: 'A multi-line text input component with auto-resize, character count, and validation support.',
  category: 'Forms',
  importPath: "import { FormTextarea } from '@scott/shared-ui-components';",
  defaultProps: {
    label: 'Description',
    name: 'description',
    value: '',
    placeholder: 'Enter description...',
    rows: 3,
    autoResize: false,
    showCharCount: false,
    maxLength: 0,
    error: '',
    required: false,
    disabled: false,
  },
  propertyControls: (props, setProps) => [
    {
      name: 'label',
      label: 'Label',
      type: 'text',
      value: props.label,
      onChange: (value) => setProps({ ...props, label: value }),
    },
    {
      name: 'placeholder',
      label: 'Placeholder',
      type: 'text',
      value: props.placeholder,
      onChange: (value) => setProps({ ...props, placeholder: value }),
    },
    {
      name: 'value',
      label: 'Value',
      type: 'text',
      value: props.value,
      onChange: (value) => setProps({ ...props, value }),
    },
    {
      name: 'rows',
      label: 'Rows',
      type: 'number',
      value: props.rows,
      onChange: (value) => setProps({ ...props, rows: value }),
    },
    {
      name: 'autoResize',
      label: 'Auto Resize',
      type: 'boolean',
      value: props.autoResize,
      onChange: (value) => setProps({ ...props, autoResize: value }),
    },
    {
      name: 'showCharCount',
      label: 'Show Character Count',
      type: 'boolean',
      value: props.showCharCount,
      onChange: (value) => setProps({ ...props, showCharCount: value }),
    },
    {
      name: 'maxLength',
      label: 'Max Length',
      type: 'number',
      value: props.maxLength,
      onChange: (value) => setProps({ ...props, maxLength: value }),
    },
    {
      name: 'error',
      label: 'Error Message',
      type: 'text',
      value: props.error,
      onChange: (value) => setProps({ ...props, error: value }),
    },
    {
      name: 'required',
      label: 'Required',
      type: 'boolean',
      value: props.required,
      onChange: (value) => setProps({ ...props, required: value }),
    },
    {
      name: 'disabled',
      label: 'Disabled',
      type: 'boolean',
      value: props.disabled,
      onChange: (value) => setProps({ ...props, disabled: value }),
    },
  ],
  renderComponent: (props, setProps) => <FormTextareaWrapper props={props} setProps={setProps} />,
  generateCode: (props) => {
    const propsStr = Object.entries(props)
      .filter(([key, value]) => {
        if (key === 'value' || key === 'onChange') return false;
        if (value === false || value === 0 || value === '') return false;
        if (key === 'rows' && value === 3) return false;
        return true;
      })
      .map(([key, value]) => {
        if (typeof value === 'string') return `${key}="${value}"`;
        if (typeof value === 'boolean') return key;
        return `${key}={${value}}`;
      })
      .join(' ');

    return `<FormTextarea\n  ${propsStr}\n  value={value}\n  onChange={(e) => setValue(e.target.value)}\n/>`;
  },
  popularAttributes: [
    {
      name: 'autoResize',
      description: 'Automatically resize based on content',
      examples: ['true', 'false'],
    },
    {
      name: 'showCharCount',
      description: 'Display character count',
      examples: ['true', 'false'],
    },
    {
      name: 'maxLength',
      description: 'Maximum character limit',
      examples: ['100', '500', '1000'],
    },
  ],
};

// FormSelect Config
const FormSelectConfig: ComponentConfig = {
  name: 'FormSelect',
  description: 'A flexible select component supporting single/multi-select, searchable options, and option groups.',
  category: 'Forms',
  importPath: "import { FormSelect } from '@scott/shared-ui-components';",
  defaultProps: {
    label: 'Select Option',
    name: 'select',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
    value: undefined,
    multiple: false,
    searchable: false,
    placeholder: 'Select an option...',
    error: '',
    required: false,
    disabled: false,
  },
  propertyControls: (props, setProps) => [
    {
      name: 'label',
      label: 'Label',
      type: 'text',
      value: props.label,
      onChange: (value) => setProps({ ...props, label: value }),
    },
    {
      name: 'placeholder',
      label: 'Placeholder',
      type: 'text',
      value: props.placeholder,
      onChange: (value) => setProps({ ...props, placeholder: value }),
    },
    {
      name: 'multiple',
      label: 'Multiple Selection',
      type: 'boolean',
      value: props.multiple,
      onChange: (value) => setProps({ ...props, multiple: value }),
    },
    {
      name: 'searchable',
      label: 'Searchable',
      type: 'boolean',
      value: props.searchable,
      onChange: (value) => setProps({ ...props, searchable: value }),
    },
    {
      name: 'error',
      label: 'Error Message',
      type: 'text',
      value: props.error,
      onChange: (value) => setProps({ ...props, error: value }),
    },
    {
      name: 'required',
      label: 'Required',
      type: 'boolean',
      value: props.required,
      onChange: (value) => setProps({ ...props, required: value }),
    },
    {
      name: 'disabled',
      label: 'Disabled',
      type: 'boolean',
      value: props.disabled,
      onChange: (value) => setProps({ ...props, disabled: value }),
    },
  ],
  renderComponent: (props, setProps) => <FormSelectWrapper props={props} setProps={setProps} />,
  generateCode: (props) => {
    const optionsStr = JSON.stringify(props.options || [], null, 2).split('\n').map((line, i) => i === 0 ? line : '  ' + line).join('\n');
    const propsStr = Object.entries(props)
      .filter(([key, value]) => {
        if (['options', 'value', 'onChange'].includes(key)) return false;
        if (value === false || value === '') return false;
        return true;
      })
      .map(([key, value]) => {
        if (typeof value === 'boolean') return key;
        return `${key}="${value}"`;
      })
      .join(' ');

    return `<FormSelect\n  ${propsStr}\n  options={${optionsStr}}\n  value={value}\n  onChange={setValue}\n/>`;
  },
  popularAttributes: [
    {
      name: 'multiple',
      description: 'Allow multiple selections',
      examples: ['true', 'false'],
    },
    {
      name: 'searchable',
      description: 'Enable search/filter functionality',
      examples: ['true', 'false'],
    },
    {
      name: 'options',
      description: 'Array of select options',
      examples: ['[{value: "1", label: "Option 1"}]'],
    },
  ],
};

// TagInput Config
const TagInputConfig: ComponentConfig = {
  name: 'TagInput',
  description: 'A tag input component for adding and removing tags with validation, duplicate prevention, and autocomplete suggestions.',
  category: 'Forms',
  importPath: "import { TagInput } from '@scott/shared-ui-components';",
  defaultProps: {
    tags: [],
    placeholder: 'Add tags...',
    maxTags: 0,
    allowDuplicates: false,
    suggestions: ['react', 'typescript', 'javascript', 'node', 'css'],
  },
  propertyControls: (props, setProps) => [
    {
      name: 'placeholder',
      label: 'Placeholder',
      type: 'text',
      value: props.placeholder,
      onChange: (value) => setProps({ ...props, placeholder: value }),
    },
    {
      name: 'maxTags',
      label: 'Max Tags',
      type: 'number',
      value: props.maxTags,
      onChange: (value) => setProps({ ...props, maxTags: value }),
    },
    {
      name: 'allowDuplicates',
      label: 'Allow Duplicates',
      type: 'boolean',
      value: props.allowDuplicates,
      onChange: (value) => setProps({ ...props, allowDuplicates: value }),
    },
  ],
  renderComponent: (props, setProps) => <TagInputWrapper props={props} setProps={setProps} />,
  generateCode: (props) => {
    const suggestionsStr = props.suggestions && props.suggestions.length > 0 
      ? `\n  suggestions={${JSON.stringify(props.suggestions)}}` 
      : '';
    const propsStr = Object.entries(props)
      .filter(([key, value]) => {
        if (['tags', 'onChange', 'suggestions'].includes(key)) return false;
        if (value === false || value === 0 || value === '') return false;
        return true;
      })
      .map(([key, value]) => {
        if (typeof value === 'boolean') return key;
        return `${key}="${value}"`;
      })
      .join(' ');

    return `<TagInput\n  tags={tags}\n  onChange={setTags}${propsStr ? `\n  ${propsStr}` : ''}${suggestionsStr}\n/>`;
  },
  popularAttributes: [
    {
      name: 'maxTags',
      description: 'Maximum number of tags allowed',
      examples: ['5', '10', '0 (unlimited)'],
    },
    {
      name: 'allowDuplicates',
      description: 'Allow duplicate tags',
      examples: ['true', 'false'],
    },
    {
      name: 'suggestions',
      description: 'Autocomplete suggestions array',
      examples: ['["tag1", "tag2"]'],
    },
  ],
};

// DataTable Config
const DataTableConfig: ComponentConfig = {
  name: 'DataTable',
  description: 'A powerful data table component with sorting, filtering, pagination, and row selection capabilities.',
  category: 'Data Display',
  importPath: "import { DataTable } from '@scott/shared-ui-components';",
  defaultProps: {
    loading: false,
    sortable: true,
    filterable: true,
    selectable: false,
    pagination: { pageSize: 10 },
  },
  propertyControls: (props, setProps) => [
    {
      name: 'sortable',
      label: 'Sortable',
      type: 'boolean',
      value: props.sortable,
      onChange: (value) => setProps({ ...props, sortable: value }),
    },
    {
      name: 'filterable',
      label: 'Filterable',
      type: 'boolean',
      value: props.filterable,
      onChange: (value) => setProps({ ...props, filterable: value }),
    },
    {
      name: 'selectable',
      label: 'Row Selection',
      type: 'boolean',
      value: props.selectable,
      onChange: (value) => setProps({ ...props, selectable: value }),
    },
    {
      name: 'loading',
      label: 'Loading',
      type: 'boolean',
      value: props.loading,
      onChange: (value) => setProps({ ...props, loading: value }),
    },
  ],
  renderComponent: (props, setProps) => <DataTableWrapper props={props} setProps={setProps} />,
  generateCode: (props) => {
    const columnsExample = `[\n  { key: 'name', header: 'Name', accessor: (row) => row.name, sortable: true },\n  { key: 'email', header: 'Email', accessor: (row) => row.email, filterable: true },\n]`;
    const propsStr = Object.entries(props)
      .filter(([key, value]) => {
        if (['data', 'columns', 'pagination'].includes(key)) return false;
        if (value === false) return false;
        if (key === 'sortable' && value === true) return false;
        if (key === 'filterable' && value === true) return false;
        return true;
      })
      .map(([key, value]) => {
        if (typeof value === 'boolean') return key;
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(' ');

    return `<DataTable\n  data={data}\n  columns={${columnsExample}}${propsStr ? `\n  ${propsStr}` : ''}\n  pagination={{ pageSize: 10 }}\n/>`;
  },
  popularAttributes: [
    {
      name: 'sortable',
      description: 'Enable column sorting',
      examples: ['true', 'false'],
    },
    {
      name: 'filterable',
      description: 'Enable column filtering',
      examples: ['true', 'false'],
    },
    {
      name: 'selectable',
      description: 'Enable row selection',
      examples: ['true', 'false'],
    },
    {
      name: 'pagination',
      description: 'Pagination configuration',
      examples: ['{ pageSize: 10 }', '{ pageSize: 25 }'],
    },
  ],
};

// Toast Config
const ToastConfig: ComponentConfig = {
  name: 'Toast',
  description: 'A toast notification system with context-based API. Show success, error, warning, and info messages anywhere in your app.',
  category: 'Feedback',
  importPath: "import { ToastProvider, useToast } from '@scott/shared-ui-components';",
  defaultProps: {
    message: 'This is a toast notification',
    type: 'info',
    duration: 5000,
    position: 'top-right',
  },
  propertyControls: (props, setProps) => [
    {
      name: 'message',
      label: 'Message',
      type: 'text',
      value: props.message,
      onChange: (value) => setProps({ ...props, message: value }),
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      value: props.type,
      options: [
        { label: 'Success', value: 'success' },
        { label: 'Error', value: 'error' },
        { label: 'Warning', value: 'warning' },
        { label: 'Info', value: 'info' },
      ],
      onChange: (value) => setProps({ ...props, type: value }),
    },
    {
      name: 'duration',
      label: 'Duration (ms)',
      type: 'number',
      value: props.duration,
      onChange: (value) => setProps({ ...props, duration: value }),
    },
    {
      name: 'position',
      label: 'Position',
      type: 'select',
      value: props.position,
      options: [
        { label: 'Top Right', value: 'top-right' },
        { label: 'Top Left', value: 'top-left' },
        { label: 'Top Center', value: 'top-center' },
        { label: 'Bottom Right', value: 'bottom-right' },
        { label: 'Bottom Left', value: 'bottom-left' },
        { label: 'Bottom Center', value: 'bottom-center' },
      ],
      onChange: (value) => setProps({ ...props, position: value }),
    },
  ],
  renderComponent: (props, setProps) => <ToastWrapper props={props} setProps={setProps} />,
  generateCode: (props) => {
    return `// Setup provider in your app root
<ToastProvider position="${props.position || 'top-right'}">
  <App />
</ToastProvider>

// Use in components
const { success, error, warning, info } = useToast();

// Show toast
${props.type}('${props.message}', { duration: ${props.duration} });`;
  },
  popularAttributes: [
    {
      name: 'type',
      description: 'Toast type/variant',
      examples: ['success', 'error', 'warning', 'info'],
    },
    {
      name: 'duration',
      description: 'Auto-dismiss duration in milliseconds',
      examples: ['3000', '5000', '0 (no auto-dismiss)'],
    },
    {
      name: 'position',
      description: 'Toast container position',
      examples: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
    },
  ],
};

// Modal Config
const ModalConfig: ComponentConfig = {
  name: 'Modal',
  description: 'A modal dialog component with focus trap, keyboard navigation, and portal rendering. Perfect for confirmations, forms, and content display.',
  category: 'Overlay',
  importPath: "import { Modal } from '@scott/shared-ui-components';",
  defaultProps: {
    isOpen: false,
    title: 'Modal Title',
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showCloseButton: true,
    children: 'Modal content goes here',
  },
  propertyControls: (props, setProps) => [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      value: props.title,
      onChange: (value) => setProps({ ...props, title: value }),
    },
    {
      name: 'size',
      label: 'Size',
      type: 'select',
      value: props.size,
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
        { label: 'Full', value: 'full' },
      ],
      onChange: (value) => setProps({ ...props, size: value }),
    },
    {
      name: 'closeOnOverlayClick',
      label: 'Close on Overlay Click',
      type: 'boolean',
      value: props.closeOnOverlayClick,
      onChange: (value) => setProps({ ...props, closeOnOverlayClick: value }),
    },
    {
      name: 'closeOnEscape',
      label: 'Close on Escape',
      type: 'boolean',
      value: props.closeOnEscape,
      onChange: (value) => setProps({ ...props, closeOnEscape: value }),
    },
    {
      name: 'showCloseButton',
      label: 'Show Close Button',
      type: 'boolean',
      value: props.showCloseButton,
      onChange: (value) => setProps({ ...props, showCloseButton: value }),
    },
  ],
  renderComponent: (props, setProps) => <ModalWrapper props={props} setProps={setProps} />,
  generateCode: (props) => {
    const propsStr = Object.entries(props)
      .filter(([key, value]) => {
        if (['isOpen', 'onClose', 'children'].includes(key)) return false;
        if (value === false || value === '') return false;
        if (key === 'size' && value === 'md') return false;
        if (key === 'closeOnOverlayClick' && value === true) return false;
        if (key === 'closeOnEscape' && value === true) return false;
        if (key === 'showCloseButton' && value === true) return false;
        return true;
      })
      .map(([key, value]) => {
        if (typeof value === 'string') return `${key}="${value}"`;
        if (typeof value === 'boolean') return key;
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(' ');

    return `<Modal\n  isOpen={isOpen}\n  onClose={() => setIsOpen(false)}${propsStr ? `\n  ${propsStr}` : ''}\n>\n  ${props.children || 'Modal content'}\n</Modal>`;
  },
  popularAttributes: [
    {
      name: 'size',
      description: 'Modal size',
      examples: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    {
      name: 'closeOnOverlayClick',
      description: 'Close when clicking backdrop',
      examples: ['true', 'false'],
    },
    {
      name: 'closeOnEscape',
      description: 'Close on Escape key',
      examples: ['true', 'false'],
    },
  ],
};

// Tabs Config
const TabsConfig: ComponentConfig = {
  name: 'Tabs',
  description: 'A tab navigation component with keyboard support, multiple variants, and horizontal/vertical orientations.',
  category: 'Navigation',
  importPath: "import { Tabs } from '@scott/shared-ui-components';",
  defaultProps: {
    tabs: [
      { id: '1', label: 'Tab 1', content: 'Content 1' },
      { id: '2', label: 'Tab 2', content: 'Content 2' },
      { id: '3', label: 'Tab 3', content: 'Content 3' },
    ],
    variant: 'default',
    orientation: 'horizontal',
  },
  propertyControls: (props, setProps) => [
    {
      name: 'variant',
      label: 'Variant',
      type: 'select',
      value: props.variant,
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Pills', value: 'pills' },
        { label: 'Underline', value: 'underline' },
      ],
      onChange: (value) => setProps({ ...props, variant: value }),
    },
    {
      name: 'orientation',
      label: 'Orientation',
      type: 'select',
      value: props.orientation,
      options: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Vertical', value: 'vertical' },
      ],
      onChange: (value) => setProps({ ...props, orientation: value }),
    },
  ],
  renderComponent: (props, setProps) => <TabsWrapper props={props} setProps={setProps} />,
  generateCode: (props) => {
    const tabsExample = `[\n  { id: '1', label: 'Tab 1', content: <div>Content 1</div> },\n  { id: '2', label: 'Tab 2', content: <div>Content 2</div> },\n]`;
    const propsStr = Object.entries(props)
      .filter(([key, value]) => {
        if (['tabs', 'onTabChange'].includes(key)) return false;
        if (value === false || value === '') return false;
        if (key === 'variant' && value === 'default') return false;
        if (key === 'orientation' && value === 'horizontal') return false;
        return true;
      })
      .map(([key, value]) => {
        if (typeof value === 'string') return `${key}="${value}"`;
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(' ');

    return `<Tabs\n  tabs={${tabsExample}}${propsStr ? `\n  ${propsStr}` : ''}\n/>`;
  },
  popularAttributes: [
    {
      name: 'variant',
      description: 'Tab style variant',
      examples: ['default', 'pills', 'underline'],
    },
    {
      name: 'orientation',
      description: 'Tab orientation',
      examples: ['horizontal', 'vertical'],
    },
  ],
};

export const componentConfigs: Record<string, ComponentConfig> = {
  'common-button': ButtonConfig,
  'common-searchbar': SearchBarConfig,
  'forms-forminput': FormInputConfig,
  'forms-formtextarea': FormTextareaConfig,
  'forms-formselect': FormSelectConfig,
  'forms-taginput': TagInputConfig,
  'datadisplay-card': CardConfig,
  'datadisplay-badge': BadgeConfig,
  'datadisplay-datatable': DataTableConfig,
  'feedback-toast': ToastConfig,
  'feedback-loadingspinner': LoadingSpinnerConfig,
  'overlay-modal': ModalConfig,
  'navigation-tabs': TabsConfig,
};

export const getComponentConfig = (category: string, component: string): ComponentConfig | null => {
  const key = `${category}-${component.toLowerCase()}`;
  return componentConfigs[key] || null;
};

