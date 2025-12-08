import React, { useState, useEffect } from 'react';
import { FormInput } from '../../../src';

interface FormInputWrapperProps {
  props: Record<string, any>;
  setProps: (props: Record<string, any>) => void;
}

export const FormInputWrapper: React.FC<FormInputWrapperProps> = ({ props, setProps }) => {
  const [localValue, setLocalValue] = useState(props.value || '');

  useEffect(() => {
    setLocalValue(props.value || '');
  }, [props.value]);

  return (
    <FormInput
      {...props}
      name={props.name || 'input'}
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

