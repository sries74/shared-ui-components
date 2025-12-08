import React from 'react';
import { FormSelect } from '../../../src';

interface FormSelectWrapperProps {
  props: Record<string, any>;
  setProps: (props: Record<string, any>) => void;
}

export const FormSelectWrapper: React.FC<FormSelectWrapperProps> = ({ props, setProps }) => {
  return (
    <FormSelect
      {...props}
      name={props.name || 'select'}
      onChange={(value) => {
        setProps({ ...props, value });
      }}
    />
  );
};

