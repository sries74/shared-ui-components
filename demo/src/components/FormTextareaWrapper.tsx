import React, { useState, useEffect } from 'react';
import { FormTextarea } from '../../../src';

interface FormTextareaWrapperProps {
  props: Record<string, any>;
  setProps: (props: Record<string, any>) => void;
}

export const FormTextareaWrapper: React.FC<FormTextareaWrapperProps> = ({ props, setProps }) => {
  const [localValue, setLocalValue] = useState(props.value || '');

  useEffect(() => {
    setLocalValue(props.value || '');
  }, [props.value]);

  return (
    <FormTextarea
      {...props}
      name={props.name || 'textarea'}
      value={localValue}
      onChange={(e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        setProps({ ...props, value: newValue });
      }}
      onClear={() => {
        setLocalValue('');
        setProps({ ...props, value: '' });
      }}
    />
  );
};

