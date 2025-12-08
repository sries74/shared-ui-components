/**
 * Shared UI Components Library
 * 
 * A reusable React component library built with TypeScript
 */

// Components - Common
export { Button, SearchBar } from './components/Common';
export type { ButtonProps, SearchBarProps } from './components/Common';

// Components - Forms
export { FormInput, FormTextarea, FormSelect, TagInput } from './components/Forms';
export type { FormInputProps, FormTextareaProps, FormSelectProps, SelectOption, TagInputProps } from './components/Forms';

// Components - Data Display
export { Card, Badge, DataTable } from './components/DataDisplay';
export type { CardProps, BadgeProps, DataTableProps, Column } from './components/DataDisplay';

// Components - Navigation
export { Tabs } from './components/Navigation';
export type { TabsProps, Tab } from './components/Navigation';

// Components - Feedback
export { ToastProvider, useToast, LoadingSpinner } from './components/Feedback';
export type { ToastProps, ToastProviderProps, LoadingSpinnerProps } from './components/Feedback';

// Components - Overlay
export { Modal } from './components/Overlay';
export type { ModalProps } from './components/Overlay';

// Hooks
export { useClickOutside, useFocusTrap, useDebounce, useLocalStorage } from './hooks';

// Types
export type {
  ButtonVariant,
  ButtonSize,
  InputType,
  ToastType,
  ToastPosition,
  ModalSize,
  CardVariant,
  CardPadding,
} from './types';

// Styles
import './styles/global.css';

